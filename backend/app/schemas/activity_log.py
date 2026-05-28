from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class ActivityLogBase(BaseModel):
    action: str
    entity_type: str
    entity_id: Optional[str] = None
    old_values: Optional[Dict[str, Any]] = None
    new_values: Optional[Dict[str, Any]] = None

class ActivityLogCreate(ActivityLogBase):
    user_id: Optional[str] = None
    ip_address: Optional[str] = None

class ActivityLogResponse(ActivityLogBase):
    id: str
    user_id: Optional[str] = None
    ip_address: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
