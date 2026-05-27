from sqlalchemy import Column, String, Text, Boolean, Integer, JSON
from .base import TimestampMixin
from ..database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Service(Base, TimestampMixin):
    __tablename__ = "services"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    icon = Column(String(50), nullable=False)
    category = Column(String(20), nullable=False, index=True) # 'tech' or 'marketing'
    features = Column(JSON, default=list) # Storing list of features as JSON
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True, index=True)
    
    # Adding SEO fields
    meta_title = Column(String(100), nullable=True)
    meta_description = Column(String(255), nullable=True)
