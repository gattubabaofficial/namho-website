import os
from fastapi import FastAPI, Request, Depends, Response
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .config import settings
from .database import create_tables, get_db, SessionLocal
from .models import SiteSetting
from .models.contact import ContactMessage
from .models.newsletter import NewsletterSubscriber
from .schemas.contact import ContactMessageCreate
from .schemas.newsletter import NewsletterSubscriberCreate

from .routers import (
    auth, services, projects, blog, team, testimonials,
    faqs, contact, settings as site_settings, upload,
    social_posts, newsletter, payments
)

# Create tables for SQLite if they don't exist
create_tables()

# Auto-seed database if empty
db = SessionLocal()
try:
    if not db.query(SiteSetting).first():
        print("Database is empty. Auto-seeding...")
        try:
            from seed import seed_db
            seed_db()
        except Exception as e:
            print(f"Auto-seeding failed or seed script could not be imported: {e}")
finally:
    db.close()

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

app = FastAPI(
    title="VELOS — Digital Intelligence Agency",
    description="Backend API for the VELOS website and admin panel.",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# Serve uploaded files and static files
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")
templates = Jinja2Templates(directory="templates")

# Set up CORS
origins = [
    settings.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex="https?://.*",
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
app.include_router(payments.router)

# ── Page route ────────────────────────────────────────────────────────────
@app.api_route("/", methods=["GET", "HEAD"], include_in_schema=False)
async def index(request: Request):
    """Handles GET and HEAD requests at the root. Redirects GET to the frontend; returns 200 for HEAD."""
    if request.method == "HEAD":
        return Response(status_code=200)
    host = request.url.hostname or "localhost"
    if host in ["localhost", "127.0.0.1", "0.0.0.0"]:
        return RedirectResponse(url="http://localhost:3000")
    return RedirectResponse(url=settings.FRONTEND_URL)

# ── Health route ─────────────────────────────────────────────────────────
@app.api_route("/api/v1/health", methods=["GET", "HEAD"], tags=["Health"])
def health_check(request: Request):
    if request.method == "HEAD":
        return Response(status_code=200)
    return {"status": "ok", "message": "Namho API is running"}

# ── Fallback Legacy /api routes ──────────────────────────────────────────
@app.post("/api/contact", tags=["Contact"], include_in_schema=False)
def legacy_submit_contact(message: ContactMessageCreate, request: Request, db: Session = Depends(get_db)):
    db_message = ContactMessage(**message.dict())
    db_message.ip_address = request.client.host if request.client else None
    db_message.user_agent = request.headers.get('user-agent')
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@app.post("/api/newsletter", tags=["Newsletter"], include_in_schema=False)
def legacy_subscribe_newsletter(sub: NewsletterSubscriberCreate, db: Session = Depends(get_db)):
    existing = db.query(NewsletterSubscriber).filter(NewsletterSubscriber.email == sub.email).first()
    if existing:
        if not existing.is_active:
            existing.is_active = True
            db.commit()
            return {"message": "Successfully re-subscribed."}
        return {"message": "Already subscribed."}
        
    db_sub = NewsletterSubscriber(email=sub.email)
    db.add(db_sub)
    db.commit()
    return {"message": "Successfully subscribed to newsletter."}
