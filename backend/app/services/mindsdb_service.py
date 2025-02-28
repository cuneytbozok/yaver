import os
from mindsdb_sdk import connect as mindsdb_connect
from app.models.ml_engine import MLEngineCreate, MLEngine
from app.models.agent import AgentCreate, Agent
from datetime import datetime

class MindsDBService:
    def __init__(self):
        # Get MindsDB connection details from environment variables
        mindsdb_host = os.getenv("MINDSDB_HOST", "http://mindsdb:47334")
        
        # Check if we're connecting to cloud or local instance
        if "cloud.mindsdb.com" in mindsdb_host:
            # Cloud connection requires username and password
            self.client = mindsdb_connect(
                host=mindsdb_host,
                user=os.getenv("MINDSDB_USER"),
                password=os.getenv("MINDSDB_PASSWORD")
            )
        else:
            # Local connection just needs the host
            self.client = mindsdb_connect(mindsdb_host)
            
        # Get or create the marketing_agents project
        try:
            self.project = self.client.get_project("marketing_agents")
        except:
            self.project = self.client.create_project("marketing_agents")
    
    def create_ml_engine(self, engine: MLEngineCreate) -> MLEngine:
        """Create a new ML engine in MindsDB"""
        engine_params = {
            "api_key": engine.api_key
        }
        
        if engine.model_version:
            engine_params["model_name"] = engine.model_version
            
        # Create the engine in MindsDB
        try:
            mindsdb_engine = self.project.engines.create(
                name=engine.name,
                handler=engine.provider,
                params=engine_params
            )
            
            # Return the created engine
            return MLEngine(
                id=mindsdb_engine.name,
                name=engine.name,
                provider=engine.provider,
                api_key=engine.api_key,
                model_version=engine.model_version,
                description=engine.description,
                created_at=datetime.now()
            )
        except Exception as e:
            # Log the error and re-raise
            print(f"Error creating ML engine: {str(e)}")
            raise
    
    def create_agent(self, agent: AgentCreate) -> Agent:
        """Create a new agent in MindsDB using the specified ML engine"""
        try:
            # Get the ML engine
            engine = self.project.engines.get(agent.ml_engine_id)
            
            # Create agent model in MindsDB
            agent_model = self.project.models.create(
                name=agent.name,
                engine=engine.name,
                params={
                    "prompt_template": self._generate_agent_prompt(agent),
                    "agent_description": agent.description,
                    "agent_attributes": {
                        "age": agent.age,
                        "gender": agent.gender,
                        "occupation": agent.occupation,
                        "income_level": agent.income_level,
                        "education_level": agent.education_level,
                        "interests": agent.interests,
                        "personality_traits": agent.personality_traits,
                        "buying_preferences": agent.buying_preferences,
                        "purchase_behaviors": agent.purchase_behaviors,
                        "purchase_frequency": agent.purchase_frequency,
                        "communication_preferences": agent.communication_preferences,
                        "location": agent.location,
                        "social_media_usage": agent.social_media_usage,
                        "brand_loyalty": agent.brand_loyalty,
                        "price_sensitivity": agent.price_sensitivity,
                        "tech_savviness": agent.tech_savviness
                    }
                }
            )
            
            # Return the created agent
            return Agent(
                id=agent_model.name,
                name=agent.name,
                description=agent.description,
                age=agent.age,
                gender=agent.gender,
                occupation=agent.occupation,
                income_level=agent.income_level,
                education_level=agent.education_level,
                interests=agent.interests,
                personality_traits=agent.personality_traits,
                buying_preferences=agent.buying_preferences,
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
            # Log the error and re-raise
            print(f"Error creating agent: {str(e)}")
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