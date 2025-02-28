from pydantic import BaseModel, Field, validator
from typing import List, Optional
from enum import Enum

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
    name: str = Field(..., min_length=2, max_length=100)
    age: int = Field(..., ge=18, le=100)
    gender: Gender
    income_level: int = Field(..., ge=0, le=1000000)
    education_level: EducationLevel
    interests: List[str] = Field(..., min_items=1)
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

class AgentResponse(Agent):
    pass 