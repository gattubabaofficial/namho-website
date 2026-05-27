from sqlalchemy import Column, String, Text, Boolean, Integer, JSON, Date, ForeignKey
from .base import TimestampMixin
from ..database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Project(Base, TimestampMixin):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(50), nullable=False, index=True)
    technologies = Column(JSON, default=list) # List of tech stack
    image_url = Column(String(500), nullable=True)
    live_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    status = Column(String(20), default='completed', index=True) # 'completed', 'in-progress', 'upcoming'
    project_date = Column(Date, nullable=True)
    is_featured = Column(Boolean, default=False, index=True)
    display_order = Column(Integer, default=0)
    service_id = Column(String, ForeignKey("services.id"), nullable=True) # Link to service

    # Adding SEO fields
    meta_title = Column(String(100), nullable=True)
    meta_description = Column(String(255), nullable=True)
