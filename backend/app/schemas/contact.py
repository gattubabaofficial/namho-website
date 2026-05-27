from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessageUpdate(BaseModel):
    is_read: Optional[bool] = None
    is_replied: Optional[bool] = None

class ContactMessageResponse(ContactMessageBase):
    id: str
    is_read: bool
    is_replied: bool
    replied_at: Optional[datetime] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
