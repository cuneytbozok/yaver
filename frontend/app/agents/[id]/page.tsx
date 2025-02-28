'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAgent } from '@/services/agentService';
import { Agent } from '@/types/agent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAgent() {
      try {
        setLoading(true);
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        const data = await getAgent(id);
        setAgent(data);
      } catch (error) {
        console.error('Error loading agent:', error);
        toast.error('Failed to load agent details');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadAgent();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-64">
          <p>Loading agent details...</p>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="container py-10">
        <div className="flex justify-center items-center h-64">
          <p>Agent not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Button 
        variant="outline" 
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{agent.name}</CardTitle>
          <CardDescription>
            {agent.age} years old, {agent.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Demographics</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Gender:</span> {agent.gender.replace('_', ' ')}
                </div>
                <div>
                  <span className="font-medium">Education:</span> {agent.education_level.replace('_', ' ')}
                </div>
                <div>
                  <span className="font-medium">Income:</span> ${agent.income_level.toLocaleString()}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Psychographics</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Brand Loyalty:</span> {agent.brand_loyalty}/10
                </div>
                <div>
                  <span className="font-medium">Price Sensitivity:</span> {agent.price_sensitivity}/10
                </div>
                <div>
                  <span className="font-medium">Tech Savviness:</span> {agent.tech_savviness}/10
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {agent.interests.map((interest) => (
                <span 
                  key={interest} 
                  className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Purchase Behaviors</h3>
            <div className="flex flex-wrap gap-2">
              {agent.purchase_behaviors.map((behavior) => (
                <span 
                  key={behavior} 
                  className="px-2 py-1 bg-secondary/20 text-secondary-foreground rounded-md text-sm"
                >
                  {behavior}
                </span>
              ))}
            </div>
            <div className="mt-2">
              <span className="font-medium">Purchase Frequency:</span> {agent.purchase_frequency.replace('_', ' ')}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Communication</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {agent.communication_preferences.map((pref) => (
                <span 
                  key={pref} 
                  className="px-2 py-1 bg-accent/20 text-accent-foreground rounded-md text-sm"
                >
                  {pref.replace('_', ' ')}
                </span>
              ))}
            </div>
            {agent.social_media_usage && agent.social_media_usage.length > 0 && (
              <div>
                <span className="font-medium">Social Media:</span> {agent.social_media_usage.join(', ')}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 