from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
import os
import aiofiles
from uuid import uuid4
from ..config import settings
from ..middleware.auth import get_current_active_admin

router = APIRouter(prefix="/api/v1/upload", tags=["Upload"])

@router.post("")
async def upload_file(file: UploadFile = File(...), current_user = Depends(get_current_active_admin)):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    # Create uploads directory if it doesn't exist
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    
    # Check file size (rough check since we read in chunks)
    # Ideally, this should be done via a custom middleware or Request.stream() 
    # to reject early, but for simplicity we do a basic check.
    
    file_ext = os.path.splitext(file.filename)[1]
    safe_filename = f"{uuid4()}{file_ext}"
    file_path = os.path.join(settings.UPLOAD_DIR, safe_filename)
    
    try:
        async with aiofiles.open(file_path, 'wb') as out_file:
            content = await file.read()
            if len(content) > settings.MAX_UPLOAD_SIZE:
                raise HTTPException(status_code=413, detail="File too large")
            await out_file.write(content)
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
    # Return the URL path
    return {"url": f"/uploads/{safe_filename}", "filename": safe_filename}
