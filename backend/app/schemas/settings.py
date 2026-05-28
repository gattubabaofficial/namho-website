from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SiteSettingBase(BaseModel):
    key: str
    value: Optional[str] = None
    type: str = "text"
    description: Optional[str] = None

class SiteSettingCreate(SiteSettingBase):
    pass

class SiteSettingUpdate(BaseModel):
    value: Optional[str] = None
    description: Optional[str] = None

class SiteSettingResponse(SiteSettingBase):
    id: str
    updated_at: datetime

    class Config:
        from_attributes = True
