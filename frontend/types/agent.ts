export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NON_BINARY = "NON_BINARY",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
  OTHER = "OTHER"
}

export enum EducationLevel {
  HIGH_SCHOOL = "HIGH_SCHOOL",
  ASSOCIATES = "ASSOCIATES",
  BACHELORS = "BACHELORS",
  MASTERS = "MASTERS",
  DOCTORATE = "DOCTORATE",
  NONE = "NONE",
  OTHER = "OTHER"
}

export enum CommunicationPreference {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PHONE = "PHONE",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  DIRECT_MAIL = "DIRECT_MAIL"
}

export enum PurchaseFrequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  YEARLY = "YEARLY",
  RARELY = "RARELY"
}

export interface Agent {
  id?: string;
  name: string;
  age: number;
  gender: Gender;
  income_level: number;
  education_level: EducationLevel;
  interests: string[];
  purchase_behaviors: string[];
  purchase_frequency: PurchaseFrequency;
  communication_preferences: CommunicationPreference[];
  location: string;
  social_media_usage?: string[];
  brand_loyalty: number;
  price_sensitivity: number;
  tech_savviness: number;
} 