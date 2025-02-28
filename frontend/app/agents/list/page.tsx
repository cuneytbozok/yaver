'use client';

import { useEffect, useState } from 'react';
import { getAgents } from '@/services/agentService';
import { Agent } from '@/types/agent';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AgentsListPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAgents() {
      try {
        setLoading(true);
        const data = await getAgents();
        setAgents(data);
      } catch (error) {
        console.error('Error loading agents:', error);
        toast.error('Failed to load agents');
      } finally {
        setLoading(false);
      }
    }

    loadAgents();
  }, []);

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Marketing Agents</h1>
        <Button asChild>
          <Link href="/agents">Create New Agent</Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading agents...</p>
        </div>
      ) : agents.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No agents found. Create your first agent to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="h-full">
              <CardHeader>
                <CardTitle>{agent.name}</CardTitle>
                <CardDescription>
                  {agent.age} years old, {agent.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Interests:</span>{' '}
                    {agent.interests.join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">Education:</span>{' '}
                    {agent.education_level.replace('_', ' ')}
                  </div>
                  <div>
                    <span className="font-medium">Income:</span> ${agent.income_level}
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <span className="font-medium">Brand Loyalty:</span> {agent.brand_loyalty}/10
                    </div>
                    <div>
                      <span className="font-medium">Tech Savviness:</span> {agent.tech_savviness}/10
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href={`/agents/${agent.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 