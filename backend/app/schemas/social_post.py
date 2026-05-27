from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime

class SocialPostBase(BaseModel):
    platform: str
    url: Optional[str] = None
    embed_code: str
    is_active: Optional[bool] = True
    display_order: Optional[int] = 0

class SocialPostCreate(SocialPostBase):
    pass

class SocialPostUpdate(BaseModel):
    platform: Optional[str] = None
    url: Optional[str] = None
    embed_code: Optional[str] = None
    is_active: Optional[bool] = None
    display_order: Optional[int] = None

class SocialPostResponse(SocialPostBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
