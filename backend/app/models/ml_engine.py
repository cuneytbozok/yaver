from pydantic import BaseModel, Field, validator
from typing import Optional, Literal
from datetime import datetime

class MLEngineBase(BaseModel):
    name: str
    provider: Literal["openai", "anthropic", "llama", "gemini"]
    api_key: str
    model_version: Optional[str] = None
    description: Optional[str] = None
    
    @validator('name')
    def name_must_be_valid(cls, v):
        if not v or not v.strip():
            raise ValueError('Name cannot be empty')
        # MindsDB has restrictions on engine names
        if ' ' in v or '-' in v or any(c.isupper() for c in v):
            raise ValueError('Name must be lowercase with no spaces or hyphens')
        return v

class MLEngineCreate(MLEngineBase):
    pass

class MLEngine(MLEngineBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True 