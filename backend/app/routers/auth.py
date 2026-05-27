from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from ..database import get_db
from ..models.user import AdminUser
from ..schemas.auth import Token, UserResponse, UserCreate
from ..utils.security import verify_password, create_access_token, get_password_hash
from ..config import settings
from ..middleware.auth import get_current_user
import datetime

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    # Check if username or email already exists
    existing_user = db.query(AdminUser).filter(
        (AdminUser.username == user.username) | (AdminUser.email == user.email)
    ).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")
        
    new_user = AdminUser(
        username=user.username,
        email=user.email,
        password_hash=get_password_hash(user.password),
        role="admin" # Defaulting to admin for this simple system
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Check if the input is either a username or an email
    user = db.query(AdminUser).filter(
        (AdminUser.username == form_data.username) | (AdminUser.email == form_data.username)
    ).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    # Update last login
    user.last_login = datetime.datetime.utcnow()
    db.commit()

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: AdminUser = Depends(get_current_user)):
    return current_user
