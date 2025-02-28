import os
import logging
from datetime import datetime
from mindsdb_sdk import connect as mindsdb_connect
from app.models.ml_engine import MLEngineCreate, MLEngine
from app.models.agent import AgentCreate, Agent
from app.models.campaign import CampaignCreate, Campaign

logger = logging.getLogger(__name__)

class MindsDBService:
    def __init__(self):
        # Get MindsDB connection details from environment variables
        mindsdb_host = os.getenv("MINDSDB_HOST", "http://mindsdb:47334")
        
        logger.info(f"Connecting to MindsDB at {mindsdb_host}")
        
        # Try multiple connection methods
        for attempt in range(3):
            try:
                if attempt == 0:
                    # Try connecting without credentials
                    logger.info("Attempting connection without credentials")
                    self.client = mindsdb_connect(mindsdb_host)
                elif attempt == 1:
                    # Try with empty credentials
                    logger.info("Attempting connection with empty credentials")
                    self.client = mindsdb_connect(mindsdb_host, "", "")
                else:
                    # Try with default credentials
                    logger.info("Attempting connection with default credentials")
                    self.client = mindsdb_connect(mindsdb_host, "mindsdb", "mindsdb")
                    
                logger.info("Connected to MindsDB successfully")
                
                # Create the marketing_agents project if it doesn't exist
                try:
                    # Check if database exists using SQL
                    query = "SHOW DATABASES;"
                    result = self.client.query(query)
                    
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
                        self.client.query(create_query)
                    else:
                        logger.info("Found existing marketing_agents database")
                    
                    # If we got here, connection is successful
                    break
                    
                except Exception as e:
                    logger.error(f"Error checking/creating database: {str(e)}")
                    # Continue without raising - we'll handle missing database in each method
                    break
                    
            except Exception as e:
                logger.warning(f"Connection attempt {attempt+1} failed: {str(e)}")
                if attempt == 2:  # Last attempt
                    logger.error(f"All connection attempts to MindsDB failed")
                    raise
    
    def create_ml_engine(self, engine: MLEngineCreate) -> MLEngine:
        """Create a new ML engine in MindsDB"""
        logger.info(f"Creating ML engine: {engine.name} with provider {engine.provider}")
        
        # Set up engine parameters according to provider
        if engine.provider == "openai":
            handler = "openai"
            params = {
                "openai_api_key": engine.api_key
            }
            if engine.model_version:
                params["model_name"] = engine.model_version
        elif engine.provider == "anthropic":
            handler = "anthropic"
            params = {
                "anthropic_api_key": engine.api_key
            }
            if engine.model_version:
                params["model_name"] = engine.model_version
        elif engine.provider == "llama":
            handler = "llama"
            params = {}
            if engine.api_key:
                params["api_key"] = engine.api_key
            if engine.model_version:
                params["model_name"] = engine.model_version
        elif engine.provider == "gemini":
            handler = "google"
            params = {
                "api_key": engine.api_key
            }
            if engine.model_version:
                params["model_name"] = engine.model_version
        else:
            raise ValueError(f"Unsupported provider: {engine.provider}")
            
        try:
            # Format engine name to comply with MindsDB naming requirements
            engine_name = engine.name.lower().replace(' ', '_').replace('-', '_')
            
            # Create the engine using SQL
            query = f"""
            CREATE ENGINE marketing_agents.{engine_name} 
            FROM {handler}
            USING """
            
            # Add parameters as JSON
            import json
            params_json = json.dumps(params)
            query += params_json + ";"
            
            # Execute the query
            logger.info(f"Executing SQL query: {query}")
            result = self.client.query(query)
            logger.info(f"SQL query result: {result}")
            
            # Return the created engine
            return MLEngine(
                id=engine_name,
                name=engine.name,
                provider=engine.provider,
                api_key="*****",  # Hide API key for security
                model_version=engine.model_version,
                description=engine.description,
                created_at=datetime.now()
            )
        except Exception as e:
            logger.error(f"Error creating ML engine: {str(e)}")
            raise
    
    def create_agent(self, agent: AgentCreate) -> Agent:
        """Create a new agent in MindsDB using the specified ML engine"""
        logger.info(f"Creating agent: {agent.name} with ML engine: {agent.ml_engine_id}")
        
        try:
            # Format agent name to comply with MindsDB naming requirements
            agent_name = agent.name.lower().replace(' ', '_').replace('-', '_')
            
            # Prepare agent attributes
            agent_attributes = {
                "age": agent.age,
                "gender": agent.gender,
                "occupation": agent.occupation,
                "income_level": agent.income_level,
                "education_level": agent.education_level,
                "interests": agent.interests,
                "personality_traits": agent.personality_traits,
                "purchase_behaviors": agent.purchase_behaviors,
                "purchase_frequency": agent.purchase_frequency,
                "communication_preferences": agent.communication_preferences,
                "location": agent.location,
                "social_media_usage": agent.social_media_usage,
                "brand_loyalty": agent.brand_loyalty,
                "price_sensitivity": agent.price_sensitivity,
                "tech_savviness": agent.tech_savviness
            }
            
            # Filter out None values to avoid MindsDB errors
            agent_attributes = {k: v for k, v in agent_attributes.items() if v is not None}
            
            # Generate the prompt template
            prompt_template = self._generate_agent_prompt(agent)
            
            # Create agent model in MindsDB using SQL
            logger.info(f"Creating agent model with name: {agent_name}")
            
            # Convert attributes to JSON string
            import json
            attributes_json = json.dumps(agent_attributes)
            description = agent.description.replace("'", "''") if agent.description else ""
            
            # Create the model using SQL
            query = f"""
            CREATE MODEL marketing_agents.{agent_name}
            PREDICT response
            USING
                engine = '{agent.ml_engine_id}',
                prompt_template = '{prompt_template.replace("'", "''")}',
                agent_description = '{description}',
                agent_attributes = '{attributes_json}';
            """
            
            logger.info(f"Executing SQL query: {query}")
            result = self.client.query(query)
            logger.info(f"SQL query result: {result}")
            
            logger.info(f"Agent created successfully: {agent_name}")
            
            # Return the created agent
            return Agent(
                id=agent_name,
                name=agent.name,
                description=agent.description,
                age=agent.age,
                gender=agent.gender,
                occupation=agent.occupation,
                income_level=agent.income_level,
                education_level=agent.education_level,
                interests=agent.interests,
                personality_traits=agent.personality_traits,
                ml_engine_id=agent.ml_engine_id,
                purchase_behaviors=agent.purchase_behaviors,
                purchase_frequency=agent.purchase_frequency,
                communication_preferences=agent.communication_preferences,
                location=agent.location,
                social_media_usage=agent.social_media_usage,
                brand_loyalty=agent.brand_loyalty,
                price_sensitivity=agent.price_sensitivity,
                tech_savviness=agent.tech_savviness,
                created_at=datetime.now()
            )
        except Exception as e:
            logger.error(f"Error creating agent: {str(e)}")
            raise
    
    def _generate_agent_prompt(self, agent: AgentCreate) -> str:
        """Generate a prompt template for the agent based on its attributes"""
        prompt = f"""You are roleplaying as a person with the following characteristics:
        
Name: {agent.name}
Age: {agent.age if agent.age else "Not specified"}
Gender: {agent.gender if agent.gender else "Not specified"}
Occupation: {agent.occupation if agent.occupation else "Not specified"}
Income Level: {agent.income_level if agent.income_level else "Not specified"}
Education Level: {agent.education_level if agent.education_level else "Not specified"}
Location: {agent.location}
Interests: {', '.join(agent.interests) if agent.interests else "Not specified"}
Personality Traits: {', '.join(agent.personality_traits) if agent.personality_traits else "Not specified"}
Purchase Behaviors: {', '.join(agent.purchase_behaviors)}
Purchase Frequency: {agent.purchase_frequency}
Brand Loyalty (1-10): {agent.brand_loyalty}
Price Sensitivity (1-10): {agent.price_sensitivity}
Tech Savviness (1-10): {agent.tech_savviness}

When presented with a marketing campaign, respond as this person would.
Evaluate the campaign based on your interests, needs, and preferences.
Explain why you would or would not be interested in the product or service.
Rate your likelihood to engage with this campaign on a scale of 1-10.
"""
        return prompt 
    
    def create_campaign(self, campaign: CampaignCreate) -> Campaign:
        """Create a new marketing campaign in MindsDB using SQL"""
        logger.info(f"Creating campaign: {campaign.name}")
        
        try:
            # Format campaign name to comply with MindsDB naming requirements
            campaign_name = campaign.name.lower().replace(' ', '_').replace('-', '_')
            
            # Create a table to store the campaign data using SQL
            create_table_query = f"""
            CREATE TABLE marketing_agents.campaign_{campaign_name} (
                name VARCHAR(255),
                description TEXT,
                target_audience VARCHAR(255),
                budget VARCHAR(100),
                marketing_channel VARCHAR(100),
                message_type VARCHAR(50),
                content TEXT,
                created_at DATETIME
            );
            """
            
            # Execute the query to create the table
            logger.info(f"Executing SQL query to create campaign table: {create_table_query}")
            result = self.client.query(create_table_query)
            
            # Insert the campaign data
            insert_query = f"""
            INSERT INTO marketing_agents.campaign_{campaign_name} (
                name, description, target_audience, budget, 
                marketing_channel, message_type, content, created_at
            ) VALUES (
                '{campaign.name.replace("'", "''")}',
                '{campaign.description.replace("'", "''")}',
                '{campaign.target_audience.replace("'", "''")}',
                '{campaign.budget.replace("'", "''")}',
                '{campaign.marketing_channel.replace("'", "''")}',
                '{campaign.message_type}',
                '{campaign.content.replace("'", "''")}',
                '{datetime.now().isoformat()}'
            );
            """
            
            # Execute the insert query
            logger.info(f"Executing SQL query to insert campaign data: {insert_query}")
            insert_result = self.client.query(insert_query)
            
            logger.info(f"Campaign created successfully: campaign_{campaign_name}")
            
            # Return the created campaign
            return Campaign(
                id=f"campaign_{campaign_name}",
                name=campaign.name,
                description=campaign.description,
                target_audience=campaign.target_audience,
                budget=campaign.budget,
                marketing_channel=campaign.marketing_channel,
                message_type=campaign.message_type,
                content=campaign.content,
                created_at=datetime.now()
            )
        except Exception as e:
            logger.error(f"Error creating campaign: {str(e)}")
            raise 