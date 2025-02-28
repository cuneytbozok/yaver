from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.agent import Agent, AgentCreate, AgentResponse
from app.utils.mindsdb_client import get_mindsdb_client
import json
import uuid

router = APIRouter(
    prefix="/api/agents",
    tags=["agents"],
)

@router.post("/", response_model=AgentResponse)
async def create_agent(agent: AgentCreate):
    """
    Create a new agent profile in MindsDB
    """
    try:
        # Get MindsDB client
        client = get_mindsdb_client()
        
        # Convert agent model to dictionary
        agent_dict = agent.dict()
        
        # Convert lists to JSON strings for storage
        agent_dict['interests'] = json.dumps(agent_dict['interests'])
        agent_dict['purchase_behaviors'] = json.dumps(agent_dict['purchase_behaviors'])
        agent_dict['communication_preferences'] = json.dumps([pref.value for pref in agent_dict['communication_preferences']])
        if agent_dict.get('social_media_usage'):
            agent_dict['social_media_usage'] = json.dumps(agent_dict['social_media_usage'])
        
        # Generate a unique ID for the agent
        agent_id = str(uuid.uuid4())
        
        # Get the project
        project = client.get_project('marketing_agents')
        
        # Build the INSERT query
        columns = ', '.join(agent_dict.keys())
        placeholders = ', '.join([f"'{value}'" if isinstance(value, str) else str(value) for value in agent_dict.values()])
        
        query = f"""
        INSERT INTO marketing_agents.agents (id, {columns})
        VALUES ('{agent_id}', {placeholders})
        """
        
        # Execute the query
        project.query(query)
        
        # Return the created agent with ID
        return {**agent_dict, "id": agent_id}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create agent: {str(e)}")

@router.get("/", response_model=List[AgentResponse])
async def get_agents():
    """
    Get all agent profiles
    """
    try:
        # Get MindsDB client
        client = get_mindsdb_client()
        
        # Query all agents
        project = client.get_project('marketing_agents')
        query = "SELECT * FROM marketing_agents.agents"
        result = project.query(query)
        
        rows = result.fetch()
        
        # Convert JSON strings back to lists for each agent
        agents = []
        for row in rows:
            row['interests'] = json.loads(row['interests'])
            row['purchase_behaviors'] = json.loads(row['purchase_behaviors'])
            row['communication_preferences'] = json.loads(row['communication_preferences'])
            if row.get('social_media_usage'):
                row['social_media_usage'] = json.loads(row['social_media_usage'])
            agents.append(row)
        
        return agents
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get agents: {str(e)}")

@router.get("/{agent_id}", response_model=AgentResponse)
async def get_agent(agent_id: str):
    """
    Get a specific agent profile by ID
    """
    try:
        # Get MindsDB client
        client = get_mindsdb_client()
        
        # Query the agent
        project = client.get_project('marketing_agents')
        query = f"SELECT * FROM marketing_agents.agents WHERE id = '{agent_id}'"
        result = project.query(query)
        
        rows = result.fetch()
        if not rows:
            raise HTTPException(status_code=404, detail="Agent not found")
        
        row = rows[0]
        
        # Convert JSON strings back to lists
        row['interests'] = json.loads(row['interests'])
        row['purchase_behaviors'] = json.loads(row['purchase_behaviors'])
        row['communication_preferences'] = json.loads(row['communication_preferences'])
        if row.get('social_media_usage'):
            row['social_media_usage'] = json.loads(row['social_media_usage'])
        
        return row
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get agent: {str(e)}") 