from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from ..database import get_db
from ..models.blog import BlogPost, Category, Tag
from ..schemas.blog import BlogPostCreate, BlogPostUpdate, BlogPostResponse, CategoryResponse, TagResponse
from ..schemas.common import PaginatedResponse
from ..middleware.auth import get_current_active_admin
from ..utils.slug import slugify
import datetime

router = APIRouter(prefix="/api/v1/blog", tags=["Blog"])

@router.get("", response_model=PaginatedResponse[BlogPostResponse])
def list_posts(
    skip: int = 0, 
    limit: int = 100, 
    category_id: Optional[str] = None,
    tag_id: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(BlogPost).filter(BlogPost.is_published == True)
    
    if category_id:
        query = query.filter(BlogPost.category_id == category_id)
    if tag_id:
        query = query.filter(BlogPost.tags.any(id=tag_id))
        
    total = query.count()
    posts = query.options(joinedload(BlogPost.category), joinedload(BlogPost.tags)).order_by(BlogPost.publish_date.desc()).offset(skip).limit(limit).all()
    
    return {
        "items": posts,
        "total": total,
        "page": (skip // limit) + 1 if limit > 0 else 1,
        "size": limit,
        "pages": (total + limit - 1) // limit if limit > 0 else 1
    }

@router.get("/admin", response_model=List[BlogPostResponse])
def admin_list_posts(db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    return db.query(BlogPost).options(joinedload(BlogPost.category), joinedload(BlogPost.tags)).order_by(BlogPost.created_at.desc()).all()

@router.post("", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
def create_post(post: BlogPostCreate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    post_data = post.model_dump(exclude={"tag_ids"})
    if not post_data.get("slug"):
        post_data["slug"] = slugify(post.title)
        
    db_post = BlogPost(**post_data)
    
    if post.tag_ids:
        tags = db.query(Tag).filter(Tag.id.in_(post.tag_ids)).all()
        db_post.tags = tags
        
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.get("/{slug}", response_model=BlogPostResponse)
def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).options(joinedload(BlogPost.category), joinedload(BlogPost.tags)).filter(BlogPost.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    # Increment view count
    post.view_count += 1
    db.commit()
    db.refresh(post)
    
    return post

@router.put("/{post_id}", response_model=BlogPostResponse)
def update_post(post_id: str, post_update: BlogPostUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    update_data = post_update.model_dump(exclude_unset=True, exclude={"tag_ids"})
    for key, value in update_data.items():
        setattr(db_post, key, value)
        
    if post_update.tag_ids is not None:
        tags = db.query(Tag).filter(Tag.id.in_(post_update.tag_ids)).all()
        db_post.tags = tags
        
    db.commit()
    db.refresh(db_post)
    return db_post

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: str, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    db.delete(db_post)
    db.commit()
    return None
