import asyncio
from app.database import SessionLocal, create_tables
from app.models import AdminUser, Service, SiteSetting
from app.utils.security import get_password_hash

def seed_db():
    create_tables()
    db = SessionLocal()
    
    # 1. Admin User
    admin = db.query(AdminUser).filter(AdminUser.username == "admin").first()
    if not admin:
        admin = AdminUser(
            username="admin",
            email="admin@namho.com",
            password_hash=get_password_hash("admin123"),
            role="super_admin"
        )
        db.add(admin)
        
    # 2. Settings
    setting = db.query(SiteSetting).filter(SiteSetting.key == "company_name").first()
    if not setting:
        db.add_all([
            SiteSetting(key="company_name", value="Namho", type="text"),
            SiteSetting(key="contact_email", value="hello@namho.com", type="text"),
        ])
        
    # 3. Services
    service = db.query(Service).first()
    if not service:
        db.add_all([
            Service(
                title="Custom Software Development",
                description="Enterprise-grade software solutions tailored to your business needs.",
                icon="Code",
                category="tech",
                features=["Enterprise Apps", "SaaS", "APIs"],
                display_order=1
            ),
            Service(
                title="SEO Optimization",
                description="Data-driven SEO strategies to improve your search rankings.",
                icon="Search",
                category="marketing",
                features=["On-page SEO", "Technical SEO", "Link Building"],
                display_order=2
            )
        ])

    db.commit()
    db.close()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_db()
