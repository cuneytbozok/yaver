import os
from mindsdb_sdk import connect
from functools import lru_cache

@lru_cache()
def get_mindsdb_client():
    """
    Get a MindsDB client instance.
    Uses environment variables for connection details.
    """
    host = os.getenv("MINDSDB_HOST", "cloud.mindsdb.com")
    user = os.getenv("MINDSDB_USER")
    password = os.getenv("MINDSDB_PASSWORD")
    
    if not user or not password:
        raise ValueError("MindsDB credentials not found in environment variables")
    
    return connect(host, user, password) 