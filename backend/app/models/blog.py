from sqlalchemy import Column, String, Text, Boolean, Integer, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from .base import TimestampMixin
from ..database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Category(Base, TimestampMixin):
    __tablename__ = "categories"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String(50), nullable=False)
    slug = Column(String(50), unique=True, nullable=False)
    description = Column(Text, nullable=True)

    posts = relationship("BlogPost", back_populates="category")

class Tag(Base, TimestampMixin):
    __tablename__ = "tags"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String(50), nullable=False)
    slug = Column(String(50), unique=True, nullable=False)

    posts = relationship("BlogPost", secondary="blog_post_tags", back_populates="tags")

class BlogPostTag(Base):
    __tablename__ = "blog_post_tags"

    post_id = Column(String, ForeignKey("blog_posts.id", ondelete="CASCADE"), primary_key=True)
    tag_id = Column(String, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True)

class BlogPost(Base, TimestampMixin):
    __tablename__ = "blog_posts"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False, index=True)
    excerpt = Column(Text, nullable=True)
    content = Column(Text, nullable=False)
    author = Column(String(100), nullable=False)
    category_id = Column(String, ForeignKey("categories.id", ondelete="SET NULL"), nullable=True, index=True)
    image_url = Column(String(500), nullable=True)
    is_published = Column(Boolean, default=False, index=True)
    publish_date = Column(DateTime(timezone=True), nullable=True, index=True)
    view_count = Column(Integer, default=0)
    
    # Adding SEO & reading time
    meta_title = Column(String(100), nullable=True)
    meta_description = Column(String(255), nullable=True)
    reading_time = Column(Integer, default=0) # in minutes

    category = relationship("Category", back_populates="posts")
    tags = relationship("Tag", secondary="blog_post_tags", back_populates="posts")
