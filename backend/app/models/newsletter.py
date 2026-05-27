from sqlalchemy import Column, String, Boolean
from .base import TimestampMixin
from ..database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class NewsletterSubscriber(Base, TimestampMixin):
    __tablename__ = "newsletter_subscribers"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, nullable=False, index=True)
    is_active = Column(Boolean, default=True) # If they unsubscribe, set to False
