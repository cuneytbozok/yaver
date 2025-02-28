import os
import logging
from mindsdb_sdk import connect as mindsdb_connect

logger = logging.getLogger(__name__)

def setup_mindsdb():
    """Set up MindsDB connection and create necessary resources"""
    try:
        # Get MindsDB connection details from environment variables
        mindsdb_host = os.getenv("MINDSDB_HOST", "http://mindsdb:47334")
        
        logger.info(f"Setting up MindsDB at {mindsdb_host}")
        
        # Try multiple connection methods
        for attempt in range(3):
            try:
                if attempt == 0:
                    # Try connecting without credentials
                    logger.info("Attempting connection without credentials")
                    client = mindsdb_connect(mindsdb_host)
                elif attempt == 1:
                    # Try with empty credentials
                    logger.info("Attempting connection with empty credentials")
                    client = mindsdb_connect(mindsdb_host, "", "")
                else:
                    # Try with default credentials
                    logger.info("Attempting connection with default credentials")
                    client = mindsdb_connect(mindsdb_host, "mindsdb", "mindsdb")
                    
                logger.info("Connected to MindsDB successfully")
                
                # Create the marketing_agents database if it doesn't exist
                try:
                    # Check if database exists using SQL
                    query = "SHOW DATABASES;"
                    result = client.query(query)
                    
                    # Try to extract database names from the result
                    database_exists = False
                    try:
                        # Try different methods to extract data
                        for row in result:
                            if hasattr(row, 'Database') and row.Database == "marketing_agents":
                                database_exists = True
                                break
                    except Exception:
                        # If iteration fails, try string parsing
                        result_str = str(result)
                        if "marketing_agents" in result_str:
                            database_exists = True
                    
                    if not database_exists:
                        # Create the database using SQL
                        logger.info("Creating marketing_agents database")
                        create_query = "CREATE DATABASE marketing_agents;"
                        client.query(create_query)
                        logger.info("Created marketing_agents database")
                    else:
                        logger.info("Found existing marketing_agents database")
                    
                    # Setup completed successfully
                    logger.info("MindsDB setup completed successfully")
                    return
                    
                except Exception as e:
                    logger.error(f"Error setting up MindsDB database: {str(e)}")
                    # Continue without raising - we'll handle missing database in each method
                    return
                    
            except Exception as e:
                logger.warning(f"Connection attempt {attempt+1} failed: {str(e)}")
                if attempt == 2:  # Last attempt
                    raise
                
    except Exception as e:
        logger.error(f"Error setting up MindsDB: {str(e)}")
        raise

if __name__ == "__main__":
    # Configure logging
    logging.basicConfig(level=logging.INFO)
    
    # Run the setup
    setup_mindsdb() 