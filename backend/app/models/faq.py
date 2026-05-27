from sqlalchemy import Column, String, Text, Boolean, Integer
from .base import TimestampMixin
from ..database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class FAQ(Base, TimestampMixin):
    __tablename__ = "faqs"

    id = Column(String, primary_key=True, default=generate_uuid)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    category = Column(String(50), default="General")
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
