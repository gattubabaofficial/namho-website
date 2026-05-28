from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ServiceBase(BaseModel):
    title: str
    description: str
    icon: str
    category: str
    features: List[str] = []
    display_order: int = 0
    is_active: bool = True
    color: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    category: Optional[str] = None
    features: Optional[List[str]] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None
    color: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

class ServiceResponse(ServiceBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
