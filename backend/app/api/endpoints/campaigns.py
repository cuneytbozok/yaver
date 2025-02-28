from fastapi import APIRouter, HTTPException
from typing import List
import logging
from app.models.campaign import CampaignCreate, Campaign
from app.services.mindsdb_service import MindsDBService
from datetime import datetime

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/", response_model=Campaign)
async def create_campaign(campaign: CampaignCreate):
    """Create a new marketing campaign"""
    logger.info(f"Received request to create campaign: {campaign.name}")
    try:
        mindsdb_service = MindsDBService()
        result = mindsdb_service.create_campaign(campaign)
        logger.info(f"Campaign created successfully: {result.id}")
        return result
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Failed to create campaign: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create campaign: {str(e)}")

@router.get("/", response_model=List[Campaign])
async def get_campaigns():
    """Get all campaigns"""
    logger.info("Received request to get all campaigns")
    try:
        mindsdb_service = MindsDBService()
        
        # Use SQL to list tables (campaigns)
        try:
            query = "SHOW TABLES FROM marketing_agents;"
            logger.info(f"Executing query: {query}")
            
            # Execute the query and get the raw response
            query_result = mindsdb_service.client.query(query)
            
            # Log the raw response for debugging
            logger.info(f"Raw query result: {query_result}")
            
            # Try to extract data from the query result
            campaigns = []
            
            # Try different methods to extract data
            try:
                # Method 1: Try to iterate directly
                for row in query_result:
                    logger.info(f"Row: {row}")
                    if hasattr(row, 'name') and row.name.startswith('campaign_'):
                        # Get campaign data
                        try:
                            campaign_query = f"SELECT * FROM marketing_agents.{row.name} LIMIT 1;"
                            campaign_data = mindsdb_service.client.query(campaign_query)
                            
                            if hasattr(campaign_data, '__iter__'):
                                for data in campaign_data:
                                    campaigns.append(
                                        Campaign(
                                            id=row.name,
                                            name=data.name if hasattr(data, 'name') else row.name.replace('campaign_', '').replace('_', ' ').title(),
                                            description=data.description if hasattr(data, 'description') else "",
                                            target_audience=data.target_audience if hasattr(data, 'target_audience') else "",
                                            budget=data.budget if hasattr(data, 'budget') else "",
                                            marketing_channel=data.marketing_channel if hasattr(data, 'marketing_channel') else "",
                                            message_type=data.message_type if hasattr(data, 'message_type') else "informational",
                                            content=data.content if hasattr(data, 'content') else "",
                                            created_at=datetime.fromisoformat(data.created_at) if hasattr(data, 'created_at') else datetime.now()
                                        )
                                    )
                                    break  # We only need the first row
                        except Exception as e:
                            logger.warning(f"Error getting data for campaign {row.name}: {str(e)}")
            except Exception as e:
                logger.warning(f"Method 1 failed: {str(e)}")
                
                # If all methods fail, try to read from local storage
                try:
                    import os
                    import json
                    
                    # Check if the campaigns directory exists
                    if os.path.exists("/app/campaigns"):
                        # Read all campaign files
                        for filename in os.listdir("/app/campaigns"):
                            if filename.endswith(".json") and filename.startswith("campaign_"):
                                try:
                                    with open(f"/app/campaigns/{filename}", "r") as f:
                                        campaign_info = json.load(f)
                                        
                                        # Convert string date to datetime
                                        if "created_at" in campaign_info:
                                            campaign_info["created_at"] = datetime.fromisoformat(campaign_info["created_at"])
                                        
                                        campaigns.append(Campaign(**campaign_info))
                                except Exception as e:
                                    logger.warning(f"Error reading campaign file {filename}: {str(e)}")
                except Exception as e:
                    logger.warning(f"Error reading campaigns from local storage: {str(e)}")
            
            logger.info(f"Retrieved {len(campaigns)} campaigns")
            return campaigns
            
        except Exception as e:
            logger.error(f"Failed to get campaigns: {str(e)}")
            
            # If SQL fails, try to read from local storage
            try:
                import os
                import json
                
                campaigns = []
                
                # Check if the campaigns directory exists
                if os.path.exists("/app/campaigns"):
                    # Read all campaign files
                    for filename in os.listdir("/app/campaigns"):
                        if filename.endswith(".json") and filename.startswith("campaign_"):
                            try:
                                with open(f"/app/campaigns/{filename}", "r") as f:
                                    campaign_info = json.load(f)
                                    
                                    # Convert string date to datetime
                                    if "created_at" in campaign_info:
                                        campaign_info["created_at"] = datetime.fromisoformat(campaign_info["created_at"])
                                    
                                    campaigns.append(Campaign(**campaign_info))
                            except Exception as e:
                                logger.warning(f"Error reading campaign file {filename}: {str(e)}")
                
                logger.info(f"Retrieved {len(campaigns)} campaigns from local storage")
                return campaigns
            except Exception as e:
                logger.warning(f"Error reading campaigns from local storage: {str(e)}")
                
                # If all else fails, return empty list
                return []
                
    except Exception as e:
        logger.error(f"Failed to get campaigns: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get campaigns: {str(e)}") 