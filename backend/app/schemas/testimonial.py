from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TestimonialBase(BaseModel):
    name: str
    company: Optional[str] = None
    role: Optional[str] = None
    content: str
    rating: int = 5
    image_url: Optional[str] = None
    is_featured: bool = False
    is_active: bool = True

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    company: Optional[str] = None
    role: Optional[str] = None
    content: Optional[str] = None
    rating: Optional[int] = None
    image_url: Optional[str] = None
    is_featured: Optional[bool] = None
    is_active: Optional[bool] = None

class TestimonialResponse(TestimonialBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
