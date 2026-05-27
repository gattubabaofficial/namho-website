from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.faq import FAQ
from ..schemas.faq import FAQCreate, FAQUpdate, FAQResponse
from ..middleware.auth import get_current_active_admin

router = APIRouter(prefix="/api/v1/faqs", tags=["FAQs"])

@router.get("", response_model=List[FAQResponse])
def list_faqs(db: Session = Depends(get_db)):
    return db.query(FAQ).filter(FAQ.is_active == True).order_by(FAQ.display_order).all()

@router.get("/admin", response_model=List[FAQResponse])
def admin_list_faqs(db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    return db.query(FAQ).order_by(FAQ.display_order).all()

@router.post("", response_model=FAQResponse, status_code=status.HTTP_201_CREATED)
def create_faq(faq: FAQCreate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_faq = FAQ(**faq.dict())
    db.add(db_faq)
    db.commit()
    db.refresh(db_faq)
    return db_faq

@router.get("/{faq_id}", response_model=FAQResponse)
def get_faq(faq_id: str, db: Session = Depends(get_db)):
    faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return faq

@router.put("/{faq_id}", response_model=FAQResponse)
def update_faq(faq_id: str, faq_update: FAQUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not db_faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    update_data = faq_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_faq, key, value)
        
    db.commit()
    db.refresh(db_faq)
    return db_faq

@router.delete("/{faq_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_faq(faq_id: str, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_faq = db.query(FAQ).filter(FAQ.id == faq_id).first()
    if not db_faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    db.delete(db_faq)
    db.commit()
    return None
