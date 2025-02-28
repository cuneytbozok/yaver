// ML Engine type
export interface MLEngine {
  id: string;
  name: string;
  provider: string;
  model_version?: string;
  description?: string;
  created_at: string;
}

// Agent type
export interface Agent {
  id: string;
  name: string;
  description?: string;
  age?: number;
  gender?: string;
  occupation?: string;
  income_level?: string;
  education_level?: string;
  interests?: string[];
  personality_traits?: string[];
  purchase_behaviors: string[];
  purchase_frequency: string;
  communication_preferences: string[];
  location: string;
  social_media_usage?: string[];
  brand_loyalty: number;
  price_sensitivity: number;
  tech_savviness: number;
  ml_engine_id: string;
  created_at: string;
}

// Campaign type
export interface Campaign {
  id: string;
  name: string;
  description: string;
  target_audience: string;
  budget: string;
  marketing_channel: string;
  message_type: string;
  content: string;
  created_at: string;
} 