from sqlalchemy import Column, String, JSON, ForeignKey
from .base import TimestampMixin
from ..database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class ActivityLog(Base, TimestampMixin):
    __tablename__ = "activity_logs"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("admin_users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String(50), nullable=False)
    entity_type = Column(String(50), nullable=False)
    entity_id = Column(String, nullable=True)
    old_values = Column(JSON, nullable=True)
    new_values = Column(JSON, nullable=True)
    ip_address = Column(String(45), nullable=True)
