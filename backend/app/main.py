from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import agents
from app.scripts.setup_mindsdb import setup_mindsdb
import asyncio
import logging

app = FastAPI(title="Python Backend API")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(agents.router)

@app.get("/api/hello")
async def hello():
    return {"message": "Hello from the Python backend!"}

@app.on_event("startup")
async def startup_event():
    # Run MindsDB setup in a separate thread to avoid blocking the startup
    loop = asyncio.get_event_loop()
    try:
        await loop.run_in_executor(None, setup_mindsdb)
        logger.info("MindsDB setup completed successfully")
    except Exception as e:
        logger.error(f"Error setting up MindsDB: {e}")
        # Continue startup even if MindsDB setup fails
        # The application can still function, and setup can be retried later

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 