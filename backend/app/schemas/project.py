from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime

class ProjectBase(BaseModel):
    title: str
    description: str
    category: str
    technologies: List[str] = []
    image_url: Optional[str] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    status: str = 'completed'
    project_date: Optional[date] = None
    is_featured: bool = False
    display_order: int = 0
    service_id: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    technologies: Optional[List[str]] = None
    image_url: Optional[str] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    status: Optional[str] = None
    project_date: Optional[date] = None
    is_featured: Optional[bool] = None
    display_order: Optional[int] = None
    service_id: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

class ProjectResponse(ProjectBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
