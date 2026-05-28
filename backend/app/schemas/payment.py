from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class PaymentBase(BaseModel):
    user_id: str
    email: Optional[str] = None
    stripe_session_id: str
    amount_total: int
    currency: Optional[str] = "usd"
    status: Optional[str] = "pending"
    plan_name: Optional[str] = None

class PaymentCreate(PaymentBase):
    pass

class PaymentUpdate(BaseModel):
    status: str

class PaymentResponse(PaymentBase):
    id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
