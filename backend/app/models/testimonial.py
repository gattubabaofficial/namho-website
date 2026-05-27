from sqlalchemy import Column, String, Text, Boolean, Integer
from .base import TimestampMixin
from ..database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Testimonial(Base, TimestampMixin):
    __tablename__ = "testimonials"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String(100), nullable=False)
    company = Column(String(100), nullable=True)
    role = Column(String(100), nullable=True)
    content = Column(Text, nullable=False)
    rating = Column(Integer, default=5)
    image_url = Column(String(500), nullable=True)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
