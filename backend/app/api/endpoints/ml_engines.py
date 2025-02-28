from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models.ml_engine import MLEngineCreate, MLEngine
from app.services.mindsdb_service import MindsDBService

router = APIRouter()

@router.post("/", response_model=MLEngine)
def create_ml_engine(engine: MLEngineCreate):
    """Create a new ML engine"""
    mindsdb_service = MindsDBService()
    try:
        return mindsdb_service.create_ml_engine(engine)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create ML engine: {str(e)}")

@router.get("/", response_model=List[MLEngine])
def get_ml_engines():
    """Get all ML engines"""
    mindsdb_service = MindsDBService()
    try:
        engines = mindsdb_service.project.engines.list()
        return [
            MLEngine(
                id=engine.name,
                name=engine.name,
                provider=engine.handler,
                api_key="*****",  # Hide API key
                created_at=engine.created_at
            )
            for engine in engines
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get ML engines: {str(e)}") 