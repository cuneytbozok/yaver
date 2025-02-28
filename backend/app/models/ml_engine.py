from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime

class MLEngineBase(BaseModel):
    name: str
    provider: Literal["openai", "anthropic", "llama", "gemini"]
    api_key: str
    model_version: Optional[str] = None
    description: Optional[str] = None

class MLEngineCreate(MLEngineBase):
    pass

class MLEngine(MLEngineBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True 