from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.testimonial import Testimonial
from ..schemas.testimonial import TestimonialCreate, TestimonialUpdate, TestimonialResponse
from ..middleware.auth import get_current_active_admin

router = APIRouter(prefix="/api/v1/testimonials", tags=["Testimonials"])

@router.get("", response_model=List[TestimonialResponse])
def list_testimonials(db: Session = Depends(get_db)):
    return db.query(Testimonial).filter(Testimonial.is_active == True).all()

@router.get("/admin", response_model=List[TestimonialResponse])
def admin_list_testimonials(db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    return db.query(Testimonial).all()

@router.post("", response_model=TestimonialResponse, status_code=status.HTTP_201_CREATED)
def create_testimonial(testimonial: TestimonialCreate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_testimonial = Testimonial(**testimonial.dict())
    db.add(db_testimonial)
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

@router.get("/{testimonial_id}", response_model=TestimonialResponse)
def get_testimonial(testimonial_id: str, db: Session = Depends(get_db)):
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return testimonial

@router.put("/{testimonial_id}", response_model=TestimonialResponse)
def update_testimonial(testimonial_id: str, testimonial_update: TestimonialUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not db_testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    update_data = testimonial_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_testimonial, key, value)
        
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

@router.delete("/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_testimonial(testimonial_id: str, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not db_testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    db.delete(db_testimonial)
    db.commit()
    return None
