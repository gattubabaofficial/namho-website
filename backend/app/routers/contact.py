from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from ..database import get_db
from ..models.contact import ContactMessage
from ..schemas.contact import ContactMessageCreate, ContactMessageUpdate, ContactMessageResponse
from ..schemas.common import PaginatedResponse
from ..middleware.auth import get_current_active_admin

router = APIRouter(prefix="/api/v1/contact", tags=["Contact"])

@router.post("", response_model=ContactMessageResponse, status_code=status.HTTP_201_CREATED)
def submit_contact(message: ContactMessageCreate, request: Request, db: Session = Depends(get_db)):
    db_message = ContactMessage(**message.dict())
    
    # Store request IP and user agent
    db_message.ip_address = request.client.host if request.client else None
    db_message.user_agent = request.headers.get('user-agent')
    
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    # Here we would integrate email service to notify admin
    
    return db_message

@router.get("/admin/messages", response_model=PaginatedResponse[ContactMessageResponse])
def admin_list_messages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    total = db.query(ContactMessage).count()
    messages = db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).offset(skip).limit(limit).all()
    
    return {
        "items": messages,
        "total": total,
        "page": (skip // limit) + 1 if limit > 0 else 1,
        "size": limit,
        "pages": (total + limit - 1) // limit if limit > 0 else 1
    }

@router.get("/admin/messages/{message_id}", response_model=ContactMessageResponse)
def get_message(message_id: str, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    # Mark as read if it wasn't
    if not message.is_read:
        message.is_read = True
        db.commit()
        db.refresh(message)
        
    return message

@router.put("/admin/messages/{message_id}", response_model=ContactMessageResponse)
def update_message(message_id: str, message_update: ContactMessageUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    update_data = message_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_message, key, value)
        
    if update_data.get('is_replied') and not db_message.replied_at:
        db_message.replied_at = datetime.utcnow()
        
    db.commit()
    db.refresh(db_message)
    return db_message

@router.delete("/admin/messages/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_message(message_id: str, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    db.delete(db_message)
    db.commit()
    return None
