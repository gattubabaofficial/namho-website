from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FAQBase(BaseModel):
    question: str
    answer: str
    category: str = "General"
    display_order: int = 0
    is_active: bool = True

class FAQCreate(FAQBase):
    pass

class FAQUpdate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    category: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None

class FAQResponse(FAQBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
