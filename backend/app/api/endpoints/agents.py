from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models.agent import AgentCreate, Agent
from app.services.mindsdb_service import MindsDBService
from datetime import datetime
import logging

router = APIRouter()

logger = logging.getLogger(__name__)

@router.post("/", response_model=Agent)
def create_agent(agent: AgentCreate):
    """Create a new agent"""
    mindsdb_service = MindsDBService()
    try:
        return mindsdb_service.create_agent(agent)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create agent: {str(e)}")

@router.get("/", response_model=List[Agent])
async def get_agents():
    """Get all agents"""
    logger.info("Received request to get all agents")
    try:
        mindsdb_service = MindsDBService()
        
        # Use SQL to list models (agents)
        try:
            query = "SHOW MODELS FROM marketing_agents;"
            logger.info(f"Executing query: {query}")
            
            # Execute the query and get the raw response
            query_result = mindsdb_service.client.query(query)
            
            # Log the raw response for debugging
            logger.info(f"Raw query result: {query_result}")
            
            # Try to extract data from the query result
            agents = []
            
            # Try different methods to extract data
            try:
                # Method 1: Try to iterate directly
                for row in query_result:
                    logger.info(f"Row: {row}")
                    if hasattr(row, 'name'):
                        # Create an agent with basic information
                        agent_data = {
                            "id": row.name,
                            "name": row.name.replace('_', ' ').title(),
                            "location": "Unknown",  # Required field
                            "purchase_behaviors": [],  # Required field
                            "purchase_frequency": "Unknown",  # Required field
                            "brand_loyalty": 5,  # Required field
                            "price_sensitivity": 5,  # Required field
                            "tech_savviness": 5,  # Required field
                            "ml_engine_id": "Unknown",  # Required field
                            "created_at": datetime.now()
                        }
                        
                        # Try to get more details about the agent
                        try:
                            model_query = f"DESCRIBE MODEL marketing_agents.{row.name};"
                            model_details = mindsdb_service.client.query(model_query)
                            
                            # Try to extract agent attributes from model details
                            for detail in model_details:
                                if hasattr(detail, 'key') and hasattr(detail, 'value'):
                                    if detail.key == 'agent_attributes':
                                        try:
                                            import json
                                            attributes = json.loads(detail.value)
                                            agent_data.update(attributes)
                                        except:
                                            pass
                        except Exception as e:
                            logger.warning(f"Error getting details for agent {row.name}: {str(e)}")
                        
                        agents.append(Agent(**agent_data))
            except Exception as e:
                logger.warning(f"Method 1 failed: {str(e)}")
                
                # If all methods fail, try to read from local storage
                try:
                    import os
                    import json
                    
                    # Check if the agents directory exists
                    if os.path.exists("/app/agents"):
                        # Read all agent files
                        for filename in os.listdir("/app/agents"):
                            if filename.endswith(".json"):
                                try:
                                    with open(f"/app/agents/{filename}", "r") as f:
                                        agent_info = json.load(f)
                                        
                                        # Convert string date to datetime
                                        if "created_at" in agent_info:
                                            agent_info["created_at"] = datetime.fromisoformat(agent_info["created_at"])
                                        
                                        agents.append(Agent(**agent_info))
                                except Exception as e:
                                    logger.warning(f"Error reading agent file {filename}: {str(e)}")
                except Exception as e:
                    logger.warning(f"Error reading agents from local storage: {str(e)}")
            
            logger.info(f"Retrieved {len(agents)} agents")
            return agents
            
        except Exception as e:
            logger.error(f"Failed to get agents: {str(e)}")
            
            # If SQL fails, try to read from local storage
            try:
                import os
                import json
                
                agents = []
                
                # Check if the agents directory exists
                if os.path.exists("/app/agents"):
                    # Read all agent files
                    for filename in os.listdir("/app/agents"):
                        if filename.endswith(".json"):
                            try:
                                with open(f"/app/agents/{filename}", "r") as f:
                                    agent_info = json.load(f)
                                    
                                    # Convert string date to datetime
                                    if "created_at" in agent_info:
                                        agent_info["created_at"] = datetime.fromisoformat(agent_info["created_at"])
                                    
                                    agents.append(Agent(**agent_info))
                            except Exception as e:
                                logger.warning(f"Error reading agent file {filename}: {str(e)}")
                
                logger.info(f"Retrieved {len(agents)} agents from local storage")
                return agents
            except Exception as e:
                logger.warning(f"Error reading agents from local storage: {str(e)}")
                
                # If all else fails, return empty list
                return []
                
    except Exception as e:
        logger.error(f"Failed to get agents: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get agents: {str(e)}") 