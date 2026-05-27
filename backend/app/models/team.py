from sqlalchemy import Column, String, Text, Boolean, Integer
from .base import TimestampMixin
from ..database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class TeamMember(Base, TimestampMixin):
    __tablename__ = "team_members"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String(100), nullable=False)
    role = Column(String(100), nullable=False)
    bio = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=True)
    email = Column(String(255), nullable=True)
    linkedin_url = Column(String(500), nullable=True)
    twitter_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
