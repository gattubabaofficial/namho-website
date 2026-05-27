from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: str
    slug: str
    created_at: datetime
    
    class Config:
        orm_mode = True

class TagBase(BaseModel):
    name: str

class TagCreate(TagBase):
    pass

class TagResponse(TagBase):
    id: str
    slug: str
    
    class Config:
        orm_mode = True

class BlogPostBase(BaseModel):
    title: str
    excerpt: Optional[str] = None
    content: str
    author: str
    category_id: Optional[str] = None
    image_url: Optional[str] = None
    is_published: bool = False
    publish_date: Optional[datetime] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

class BlogPostCreate(BlogPostBase):
    tag_ids: List[str] = []

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    category_id: Optional[str] = None
    image_url: Optional[str] = None
    is_published: Optional[bool] = None
    publish_date: Optional[datetime] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    tag_ids: Optional[List[str]] = None

class BlogPostResponse(BlogPostBase):
    id: str
    slug: str
    view_count: int
    reading_time: int
    created_at: datetime
    updated_at: datetime
    category: Optional[CategoryResponse] = None
    tags: List[TagResponse] = []

    class Config:
        orm_mode = True
