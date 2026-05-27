from pydantic import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite:///./namho.db"

    # JWT
    SECRET_KEY: str = "namho-dev-secret-key-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # CORS
    FRONTEND_URL: str = "http://localhost:5173"

    # Email
    EMAIL_PROVIDER: str = "console"  # "console" | "sendgrid" | "resend"
    SENDGRID_API_KEY: Optional[str] = None
    ADMIN_EMAIL: str = "admin@namho.com"

    # Upload
    UPLOAD_DIR: str = "./uploads"
    MAX_UPLOAD_SIZE: int = 5 * 1024 * 1024  # 5MB

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
