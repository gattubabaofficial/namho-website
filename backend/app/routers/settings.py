from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.settings import SiteSetting
from ..schemas.settings import SiteSettingCreate, SiteSettingUpdate, SiteSettingResponse
from ..middleware.auth import get_current_active_admin

router = APIRouter(prefix="/api/v1/settings", tags=["Settings"])

@router.get("", response_model=List[SiteSettingResponse])
def get_all_settings(db: Session = Depends(get_db)):
    return db.query(SiteSetting).all()

@router.get("/{key}", response_model=SiteSettingResponse)
def get_setting(key: str, db: Session = Depends(get_db)):
    setting = db.query(SiteSetting).filter(SiteSetting.key == key).first()
    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")
    return setting

@router.put("/{key}", response_model=SiteSettingResponse)
def update_setting(key: str, setting_update: SiteSettingUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_setting = db.query(SiteSetting).filter(SiteSetting.key == key).first()
    if not db_setting:
        # Create it if it doesn't exist
        db_setting = SiteSetting(key=key, **setting_update.dict())
        db.add(db_setting)
    else:
        # Update existing
        update_data = setting_update.dict(exclude_unset=True)
        for k, v in update_data.items():
            setattr(db_setting, k, v)
            
    db.commit()
    db.refresh(db_setting)
    return db_setting
