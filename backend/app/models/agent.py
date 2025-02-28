from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any
from enum import Enum
from datetime import datetime

class Gender(str, Enum):
    MALE = "MALE"
    FEMALE = "FEMALE"
    NON_BINARY = "NON_BINARY"
    PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY"

class EducationLevel(str, Enum):
    HIGH_SCHOOL = "HIGH_SCHOOL"
    ASSOCIATES = "ASSOCIATES"
    BACHELORS = "BACHELORS"
    MASTERS = "MASTERS"
    DOCTORATE = "DOCTORATE"
    NONE = "NONE"

class CommunicationPreference(str, Enum):
    EMAIL = "EMAIL"
    SMS = "SMS"
    PHONE = "PHONE"
    SOCIAL_MEDIA = "SOCIAL_MEDIA"
    DIRECT_MAIL = "DIRECT_MAIL"

class PurchaseFrequency(str, Enum):
    DAILY = "DAILY"
    WEEKLY = "WEEKLY"
    MONTHLY = "MONTHLY"
    QUARTERLY = "QUARTERLY"
    YEARLY = "YEARLY"
    RARELY = "RARELY"

class AgentBase(BaseModel):
    name: str
    description: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    occupation: Optional[str] = None
    income_level: Optional[str] = None
    education_level: Optional[str] = None
    interests: Optional[List[str]] = None
    personality_traits: Optional[List[str]] = None
    buying_preferences: Optional[Dict[str, Any]] = None
    ml_engine_id: str  # Reference to the ML engine
    purchase_behaviors: List[str] = Field(..., min_items=1)
    purchase_frequency: PurchaseFrequency
    communication_preferences: List[CommunicationPreference] = Field(..., min_items=1)
    location: str = Field(..., min_length=2)
    social_media_usage: Optional[List[str]] = None
    brand_loyalty: int = Field(..., ge=1, le=10)
    price_sensitivity: int = Field(..., ge=1, le=10)
    tech_savviness: int = Field(..., ge=1, le=10)
    
    @validator('interests', 'purchase_behaviors')
    def check_list_items(cls, v):
        if not all(isinstance(item, str) and len(item.strip()) > 0 for item in v):
            raise ValueError('All items must be non-empty strings')
        return v

class AgentCreate(AgentBase):
    pass

class Agent(AgentBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True

class AgentResponse(Agent):
    pass 