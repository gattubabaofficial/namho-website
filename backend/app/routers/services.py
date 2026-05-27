from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.service import Service
from ..schemas.service import ServiceCreate, ServiceUpdate, ServiceResponse
from ..schemas.common import PaginatedResponse
from ..middleware.auth import get_current_active_admin

router = APIRouter(prefix="/api/v1/services", tags=["Services"])

@router.get("", response_model=PaginatedResponse[ServiceResponse])
def list_services(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    total = db.query(Service).filter(Service.is_active == True).count()
    services = db.query(Service).filter(Service.is_active == True).order_by(Service.display_order).offset(skip).limit(limit).all()
    
    return {
        "items": services,
        "total": total,
        "page": (skip // limit) + 1 if limit > 0 else 1,
        "size": limit,
        "pages": (total + limit - 1) // limit if limit > 0 else 1
    }

@router.get("/admin", response_model=List[ServiceResponse])
def admin_list_services(db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    return db.query(Service).order_by(Service.display_order).all()

@router.post("", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
def create_service(service: ServiceCreate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_service = Service(**service.dict())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

@router.get("/{service_id}", response_model=ServiceResponse)
def get_service(service_id: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(service_id: str, service_update: ServiceUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    update_data = service_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_service, key, value)
        
    db.commit()
    db.refresh(db_service)
    return db_service

@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(service_id: str, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    db.delete(db_service)
    db.commit()
    return None
