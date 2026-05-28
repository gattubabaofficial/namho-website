from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.payment import PaymentTransaction
from ..schemas.payment import PaymentCreate, PaymentResponse
from ..middleware.auth import get_current_active_admin

router = APIRouter(prefix="/api/v1/payments", tags=["Payments"])

@router.get("/transactions", response_model=List[PaymentResponse])
def list_transactions(db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    """Retrieve all payment transactions (admin-only)."""
    return db.query(PaymentTransaction).order_by(PaymentTransaction.created_at.desc()).all()

@router.post("/transaction", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
def log_transaction(payment: PaymentCreate, db: Session = Depends(get_db)):
    """Log a payment transaction (can be called by stripe webhook)."""
    # Check if transaction already exists
    db_payment = db.query(PaymentTransaction).filter(PaymentTransaction.stripe_session_id == payment.stripe_session_id).first()
    if db_payment:
        # Just update status if needed
        db_payment.status = payment.status
        db.commit()
        db.refresh(db_payment)
        return db_payment

    db_payment = PaymentTransaction(**payment.dict())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment
