import { Agent } from "@/types/agent";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function createAgent(agent: Agent): Promise<Agent> {
  const response = await fetch(`${API_URL}/api/agents/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(agent),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to create agent');
  }

  return response.json();
}

export async function getAgents(): Promise<Agent[]> {
  const response = await fetch(`${API_URL}/api/agents/`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to fetch agents');
  }

  return response.json();
}

export async function getAgent(id: string): Promise<Agent> {
  const response = await fetch(`${API_URL}/api/agents/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to fetch agent');
  }

  return response.json();
} 