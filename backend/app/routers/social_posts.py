from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models.social_post import SocialPost
from ..schemas.social_post import SocialPostCreate, SocialPostUpdate, SocialPostResponse
from ..schemas.common import PaginatedResponse
from ..middleware.auth import get_current_user

router = APIRouter(prefix="/api/v1/social-posts", tags=["Social Posts"])

@router.get("", response_model=PaginatedResponse[SocialPostResponse])
def get_social_posts(
    skip: int = 0,
    limit: int = 10,
    platform: str = None,
    is_active: bool = None,
    db: Session = Depends(get_db)
):
    query = db.query(SocialPost)
    if platform:
        query = query.filter(SocialPost.platform == platform)
    if is_active is not None:
        query = query.filter(SocialPost.is_active == is_active)
    
    total = query.count()
    posts = query.order_by(SocialPost.display_order.asc(), SocialPost.created_at.desc()).offset(skip).limit(limit).all()
    
    return {
        "items": posts,
        "total": total,
        "page": skip // limit + 1,
        "size": limit,
        "pages": (total + limit - 1) // limit
    }

@router.post("", response_model=SocialPostResponse, status_code=status.HTTP_201_CREATED)
def create_social_post(post: SocialPostCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    db_post = SocialPost(**post.model_dump())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.put("/{post_id}", response_model=SocialPostResponse)
def update_social_post(post_id: str, post_update: SocialPostUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    db_post = db.query(SocialPost).filter(SocialPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Social post not found")
    
    for key, value in post_update.model_dump(exclude_unset=True).items():
        setattr(db_post, key, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_social_post(post_id: str, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    db_post = db.query(SocialPost).filter(SocialPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Social post not found")
    
    db.delete(db_post)
    db.commit()
