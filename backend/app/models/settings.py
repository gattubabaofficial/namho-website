from sqlalchemy import Column, String, Text
from .base import TimestampMixin
from ..database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class SiteSetting(Base, TimestampMixin):
    __tablename__ = "site_settings"

    id = Column(String, primary_key=True, default=generate_uuid)
    key = Column(String(100), unique=True, nullable=False)
    value = Column(Text, nullable=True)
    type = Column(String(20), default="text") # 'text', 'json', 'html', 'number', 'boolean'
    description = Column(Text, nullable=True)
