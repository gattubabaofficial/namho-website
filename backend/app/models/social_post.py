from sqlalchemy import Column, String, Boolean, Integer, Text
from .base import TimestampMixin
from ..database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class SocialPost(Base, TimestampMixin):
    __tablename__ = "social_posts"

    id = Column(String, primary_key=True, default=generate_uuid)
    platform = Column(String(50), nullable=False, index=True) # 'linkedin' or 'instagram'
    url = Column(String(255), nullable=True) # Link to original post
    embed_code = Column(Text, nullable=False) # The actual embed HTML or unique post ID
    is_active = Column(Boolean, default=True, index=True)
    display_order = Column(Integer, default=0)
