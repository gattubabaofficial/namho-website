from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class NewsletterSubscriberBase(BaseModel):
    email: EmailStr

class NewsletterSubscriberCreate(NewsletterSubscriberBase):
    pass

class NewsletterSubscriberResponse(NewsletterSubscriberBase):
    id: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
