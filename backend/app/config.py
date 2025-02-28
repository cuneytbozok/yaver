import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MindsDB configuration
MINDSDB_HOST = os.getenv("MINDSDB_HOST", "cloud.mindsdb.com")
MINDSDB_USER = os.getenv("MINDSDB_USER", "your_mindsdb_user")
MINDSDB_PASSWORD = os.getenv("MINDSDB_PASSWORD", "your_mindsdb_password") 