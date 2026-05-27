from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models.newsletter import NewsletterSubscriber
from ..schemas.newsletter import NewsletterSubscriberCreate, NewsletterSubscriberResponse
from ..schemas.common import PaginatedResponse
from ..middleware.auth import get_current_user

router = APIRouter(prefix="/api/v1/newsletter", tags=["Newsletter"])

@router.get("", response_model=PaginatedResponse[NewsletterSubscriberResponse])
def get_subscribers(
    skip: int = 0,
    limit: int = 10,
    is_active: bool = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = db.query(NewsletterSubscriber)
    if is_active is not None:
        query = query.filter(NewsletterSubscriber.is_active == is_active)
    
    total = query.count()
    subscribers = query.order_by(NewsletterSubscriber.created_at.desc()).offset(skip).limit(limit).all()
    
    return {
        "items": subscribers,
        "total": total,
        "page": skip // limit + 1,
        "size": limit,
        "pages": (total + limit - 1) // limit
    }

@router.post("", status_code=status.HTTP_201_CREATED)
def subscribe_newsletter(sub: NewsletterSubscriberCreate, db: Session = Depends(get_db)):
    # Check if already subscribed
    existing = db.query(NewsletterSubscriber).filter(NewsletterSubscriber.email == sub.email).first()
    if existing:
        if not existing.is_active:
            existing.is_active = True
            db.commit()
            return {"message": "Successfully re-subscribed."}
        return {"message": "Already subscribed."}
        
    db_sub = NewsletterSubscriber(email=sub.email)
    db.add(db_sub)
    db.commit()
    return {"message": "Successfully subscribed to newsletter."}

@router.delete("/{subscriber_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_subscriber(subscriber_id: str, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    db_sub = db.query(NewsletterSubscriber).filter(NewsletterSubscriber.id == subscriber_id).first()
    if not db_sub:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    
    db.delete(db_sub)
    db.commit()
