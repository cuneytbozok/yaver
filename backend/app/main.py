import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import agents, campaigns, ml_engines
from app.scripts.setup_mindsdb import setup_mindsdb
import asyncio

app = FastAPI(title="Marketing Campaign Evaluation API")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(agents.router, prefix="/api/agents", tags=["agents"])
app.include_router(campaigns.router, prefix="/api/campaigns", tags=["campaigns"])
app.include_router(ml_engines.router, prefix="/api/ml-engines", tags=["ml_engines"])

@app.get("/api/hello")
async def hello():
    return {"message": "Hello from the Marketing Campaign Evaluation API!"}

@app.on_event("startup")
async def startup_event():
    # Run MindsDB setup in a separate thread to avoid blocking the startup
    loop = asyncio.get_event_loop()
    try:
        logger.info("Setting up MindsDB...")
        await loop.run_in_executor(None, setup_mindsdb)
        logger.info("MindsDB setup completed")
    except Exception as e:
        logger.error(f"Error setting up MindsDB: {str(e)}")
        logger.info("Continuing without initial MindsDB setup - will try to connect when needed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 