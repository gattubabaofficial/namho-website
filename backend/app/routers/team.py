from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models.team import TeamMember
from ..schemas.team import TeamMemberCreate, TeamMemberUpdate, TeamMemberResponse
from ..middleware.auth import get_current_active_admin

router = APIRouter(prefix="/api/v1/team", tags=["Team"])

@router.get("", response_model=List[TeamMemberResponse])
def list_team(db: Session = Depends(get_db)):
    return db.query(TeamMember).filter(TeamMember.is_active == True).order_by(TeamMember.display_order).all()

@router.get("/admin", response_model=List[TeamMemberResponse])
def admin_list_team(db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    return db.query(TeamMember).order_by(TeamMember.display_order).all()

@router.post("", response_model=TeamMemberResponse, status_code=status.HTTP_201_CREATED)
def create_team_member(member: TeamMemberCreate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_member = TeamMember(**member.dict())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member

@router.get("/{member_id}", response_model=TeamMemberResponse)
def get_team_member(member_id: str, db: Session = Depends(get_db)):
    member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    return member

@router.put("/{member_id}", response_model=TeamMemberResponse)
def update_team_member(member_id: str, member_update: TeamMemberUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not db_member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    update_data = member_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_member, key, value)
        
    db.commit()
    db.refresh(db_member)
    return db_member

@router.delete("/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team_member(member_id: str, db: Session = Depends(get_db), current_user = Depends(get_current_active_admin)):
    db_member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not db_member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    db.delete(db_member)
    db.commit()
    return None
