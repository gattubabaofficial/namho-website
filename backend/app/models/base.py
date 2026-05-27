from sqlalchemy import Column, DateTime
from sqlalchemy.sql import func
from ..database import Base
import datetime

class TimestampMixin:
    """Mixin to add created_at and updated_at columns to models."""
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
