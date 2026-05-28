from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class TeamMemberBase(BaseModel):
    name: str
    role: str
    bio: Optional[str] = None
    image_url: Optional[str] = None
    email: Optional[EmailStr] = None
    linkedin_url: Optional[str] = None
    twitter_url: Optional[str] = None
    github_url: Optional[str] = None
    display_order: int = 0
    is_active: bool = True

class TeamMemberCreate(TeamMemberBase):
    pass

class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    bio: Optional[str] = None
    image_url: Optional[str] = None
    email: Optional[EmailStr] = None
    linkedin_url: Optional[str] = None
    twitter_url: Optional[str] = None
    github_url: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None

class TeamMemberResponse(TeamMemberBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
