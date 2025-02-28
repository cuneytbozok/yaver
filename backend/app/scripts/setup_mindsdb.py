from app.utils.mindsdb_client import get_mindsdb_client
import logging

logger = logging.getLogger(__name__)

def setup_mindsdb():
    """
    Set up the necessary tables and projects in MindsDB
    """
    try:
        # Get MindsDB client
        client = get_mindsdb_client()
        
        # Create project if it doesn't exist
        try:
            project = client.get_project('marketing_agents')
            logger.info("Project 'marketing_agents' already exists")
        except Exception:
            project = client.create_project('marketing_agents')
            logger.info("Created project 'marketing_agents'")
        
        # Create agents table if it doesn't exist
        try:
            query = """
            CREATE TABLE marketing_agents.agents (
                id VARCHAR(36) NOT NULL,
                name VARCHAR(100) NOT NULL,
                age INT NOT NULL,
                gender VARCHAR(20) NOT NULL,
                income_level INT NOT NULL,
                education_level VARCHAR(50) NOT NULL,
                interests TEXT NOT NULL,
                purchase_behaviors TEXT NOT NULL,
                purchase_frequency VARCHAR(20) NOT NULL,
                communication_preferences TEXT NOT NULL,
                location VARCHAR(100) NOT NULL,
                social_media_usage TEXT,
                brand_loyalty INT NOT NULL,
                price_sensitivity INT NOT NULL,
                tech_savviness INT NOT NULL,
                PRIMARY KEY (id)
            )
            """
            project.query(query)
            logger.info("Created table 'agents'")
        except Exception as e:
            logger.info(f"Table 'agents' may already exist: {e}")
        
        logger.info("MindsDB setup completed successfully")
    
    except Exception as e:
        logger.error(f"Error setting up MindsDB: {e}")
        raise

if __name__ == "__main__":
    setup_mindsdb() 