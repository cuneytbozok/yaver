from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models.agent import AgentCreate, Agent
from app.services.mindsdb_service import MindsDBService

router = APIRouter()

@router.post("/", response_model=Agent)
def create_agent(agent: AgentCreate):
    """Create a new agent"""
    mindsdb_service = MindsDBService()
    try:
        return mindsdb_service.create_agent(agent)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create agent: {str(e)}")

@router.get("/", response_model=List[Agent])
def get_agents():
    """Get all agents"""
    mindsdb_service = MindsDBService()
    try:
        models = mindsdb_service.project.models.list()
        return [
            Agent(
                id=model.name,
                name=model.name,
                description=model.params.get("agent_description"),
                ml_engine_id=model.engine,
                created_at=model.created_at,
                # Extract other attributes from model.params["agent_attributes"]
                **model.params.get("agent_attributes", {})
            )
            for model in models
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get agents: {str(e)}") 