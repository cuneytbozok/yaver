from fastapi import APIRouter, HTTPException
from typing import List
import logging
from app.models.ml_engine import MLEngineCreate, MLEngine
from app.services.mindsdb_service import MindsDBService
from datetime import datetime

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/", response_model=MLEngine)
async def create_ml_engine(engine: MLEngineCreate):
    """Create a new ML engine"""
    logger.info(f"Received request to create ML engine: {engine.name}")
    try:
        mindsdb_service = MindsDBService()
        result = mindsdb_service.create_ml_engine(engine)
        logger.info(f"ML engine created successfully: {result.id}")
        return result
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Failed to create ML engine: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create ML engine: {str(e)}")

@router.get("/", response_model=List[MLEngine])
async def get_ml_engines():
    """Get all ML engines"""
    logger.info("Received request to get all ML engines")
    try:
        mindsdb_service = MindsDBService()
        
        # Try to get engines directly from the project
        try:
            # Use the project's engines property
            engines_list = []
            try:
                # Try to access engines through the project
                if hasattr(mindsdb_service, 'project') and mindsdb_service.project:
                    engines_list = mindsdb_service.project.engines.list()
            except Exception as e:
                logger.warning(f"Error listing engines through project: {str(e)}")
            
            # Process the engines
            engines = []
            for engine in engines_list:
                engines.append(
                    MLEngine(
                        id=engine.name,
                        name=engine.name,
                        provider=engine.handler,
                        api_key="*****",  # Hide API key
                        created_at=datetime.now()  # MindsDB might not provide creation time
                    )
                )
            
            if engines:
                logger.info(f"Retrieved {len(engines)} engines through project")
                return engines
        except Exception as e:
            logger.warning(f"Error getting engines through project: {str(e)}")
        
        # If we couldn't get engines through the project, try SQL
        try:
            # Try direct SQL query to list engines
            query_result = mindsdb_service.client.query("SHOW ENGINES;")
            
            # Convert query result to list if it's not already iterable
            if hasattr(query_result, 'fetch_all'):
                rows = query_result.fetch_all()
            elif hasattr(query_result, 'to_dict'):
                rows = query_result.to_dict()
            else:
                # Try to convert to string and parse
                rows_str = str(query_result)
                logger.info(f"Query result as string: {rows_str}")
                
                # Return empty list as fallback
                rows = []
            
            engines = []
            for row in rows:
                if isinstance(row, dict) and 'name' in row and 'handler' in row:
                    engines.append(
                        MLEngine(
                            id=row['name'],
                            name=row['name'],
                            provider=row['handler'],
                            api_key="*****",
                            created_at=datetime.now()
                        )
                    )
                elif hasattr(row, 'name') and hasattr(row, 'handler'):
                    engines.append(
                        MLEngine(
                            id=row.name,
                            name=row.name,
                            provider=row.handler,
                            api_key="*****",
                            created_at=datetime.now()
                        )
                    )
            
            logger.info(f"Retrieved {len(engines)} engines through SQL")
            return engines
        except Exception as e:
            logger.warning(f"Error listing engines through SQL: {str(e)}")
        
        # If all else fails, try to get engines directly from the client
        try:
            # Try to use the client's list_engines method if available
            if hasattr(mindsdb_service.client, 'list_engines'):
                engines_list = mindsdb_service.client.list_engines()
                
                engines = []
                for engine in engines_list:
                    engines.append(
                        MLEngine(
                            id=engine.name,
                            name=engine.name,
                            provider=engine.handler,
                            api_key="*****",
                            created_at=datetime.now()
                        )
                    )
                
                logger.info(f"Retrieved {len(engines)} engines through client")
                return engines
        except Exception as e:
            logger.warning(f"Error listing engines through client: {str(e)}")
        
        # If all methods fail, return empty list
        logger.info("Returning empty engines list as fallback")
        return []
                
    except Exception as e:
        logger.error(f"Failed to get ML engines: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to get ML engines: {str(e)}") 