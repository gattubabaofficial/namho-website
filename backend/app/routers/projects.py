from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models.project import Project
from ..schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from ..schemas.common import PaginatedResponse
from ..middleware.auth import get_current_active_admin

router = APIRouter(prefix="/api/v1/projects", tags=["Projects"])

@router.get("", response_model=PaginatedResponse[ProjectResponse])
def list_projects(
    skip: int = 0, 
    limit: int = 100, 
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Project)
    
    if category:
        query = query.filter(Project.category == category)
    if featured is not None:
        query = query.filter(Project.is_featured == featured)
        
    total = query.count()
    projects = query.order_by(Project.display_order).offset(skip).limit(limit).all()
    
    return {
        "items": projects,
        "total": total,
        "page": (skip // limit) + 1 if limit > 0 else 1,
        "size": limit,
        "pages": (total + limit - 1) // limit if limit > 0 else 1
    }

@router.get("/admin", response_model=List[ProjectResponse])
def admin_list_projects(db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    return db.query(Project).order_by(Project.display_order).all()

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(project: ProjectCreate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_project = Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(project_id: str, project_update: ProjectUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = project_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_project, key, value)
        
    db.commit()
    db.refresh(db_project)
    return db_project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: str, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(db_project)
    db.commit()
    return None
