from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import create_tables

from fastapi.staticfiles import StaticFiles
import os
from .routers import auth, services, projects, blog, team, testimonials, faqs, contact, settings as site_settings, upload, social_posts, newsletter

# Create tables for SQLite if they don't exist
create_tables()

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

app = FastAPI(
    title="Namho API",
    description="Backend API for Namho",
    version="1.0.0"
)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Set up CORS
origins = [
    settings.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(services.router)
app.include_router(projects.router)
app.include_router(blog.router)
app.include_router(team.router)
app.include_router(testimonials.router)
app.include_router(faqs.router)
app.include_router(contact.router)
app.include_router(site_settings.router)
app.include_router(upload.router)
app.include_router(social_posts.router)
app.include_router(newsletter.router)

@app.get("/api/v1/health", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "Namho API is running"}
