from sqlalchemy import Column, String, Integer, DateTime
from .base import TimestampMixin
from ..database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class PaymentTransaction(Base, TimestampMixin):
    __tablename__ = "payment_transactions"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String(50), nullable=False, index=True)
    email = Column(String(255), nullable=True)
    stripe_session_id = Column(String(255), unique=True, nullable=False, index=True)
    amount_total = Column(Integer, nullable=False) # In cents
    currency = Column(String(10), default="usd")
    status = Column(String(50), default="pending") # paid, pending, failed
    plan_name = Column(String(100), nullable=True)
