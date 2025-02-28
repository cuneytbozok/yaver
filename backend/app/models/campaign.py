from pydantic import BaseModel, Field, validator
from typing import Optional, List, Literal
from datetime import datetime

class CampaignBase(BaseModel):
    name: str
    description: str
    target_audience: str
    budget: str
    marketing_channel: str
    message_type: Literal["informational", "promotional", "emotional"]
    content: str
    
    @validator('name')
    def name_must_be_valid(cls, v):
        if not v or not v.strip():
            raise ValueError('Name cannot be empty')
        # MindsDB has restrictions on model names
        if any(c.isupper() for c in v):
            raise ValueError('Name must be lowercase')
        return v

class CampaignCreate(CampaignBase):
    pass

class Campaign(CampaignBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True 