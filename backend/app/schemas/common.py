from pydantic import BaseModel
from typing import Generic, TypeVar, List, Optional, Any

T = TypeVar("T")

class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    size: int
    pages: int

class ErrorResponse(BaseModel):
    detail: str
    code: Optional[str] = None
