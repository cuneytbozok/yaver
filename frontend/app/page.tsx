'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserPlus, Users, Zap, BarChart4, Target, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Marketing Campaign Evaluation Platform</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Create and evaluate marketing campaigns using AI-powered agent simulations to optimize your marketing strategy
          </p>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Create Agents</CardTitle>
                  <CardDescription>
                    Design AI-powered marketing agents with specific demographics and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md">
                    <UserPlus className="h-16 w-16 text-primary/60" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/agents">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Get Started
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Design Campaigns</CardTitle>
                  <CardDescription>
                    Create marketing campaigns and test them with your agent population
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md">
                    <Target className="h-16 w-16 text-primary/60" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/campaigns">
                      <Target className="mr-2 h-4 w-4" />
                      Create Campaign
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Analyze Results</CardTitle>
                  <CardDescription>
                    View detailed analytics and insights from your campaign simulations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md">
                    <BarChart4 className="h-16 w-16 text-primary/60" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/analytics">
                      <BarChart4 className="mr-2 h-4 w-4" />
                      View Analytics
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold tracking-tight mb-4">How It Works</h2>
              <Separator className="mb-8" />
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <UserPlus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">1. Create Agents</h3>
                  <p className="text-muted-foreground">Design virtual consumers with specific demographics, preferences, and behaviors</p>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">2. Design Campaigns</h3>
                  <p className="text-muted-foreground">Create marketing campaigns with specific messaging, visuals, and targeting</p>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">3. Analyze Results</h3>
                  <p className="text-muted-foreground">Get detailed insights on campaign performance and agent responses</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="agents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Agents</CardTitle>
                <CardDescription>
                  Create and manage AI-powered marketing agents that simulate real consumers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/agents">
                      <UserPlus className="h-5 w-5" />
                      Create Marketing Agents
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link href="/agents/list">
                      <Users className="h-5 w-5" />
                      View All Agents
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="campaigns" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Marketing Campaigns</CardTitle>
                <CardDescription>
                  Design and test marketing campaigns with your virtual agent population
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/campaigns/create">
                      <Target className="h-5 w-5" />
                      Create New Campaign
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link href="/campaigns/list">
                      <BarChart4 className="h-5 w-5" />
                      View Campaign Results
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="mt-8 border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">API Connection</CardTitle>
            <CardDescription>
              Test the connection to the backend API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="secondary"
              size="lg"
              className="gap-2"
              onClick={async () => {
                const res = await fetch('/api/hello');
                const data = await res.json();
                alert(JSON.stringify(data));
              }}
            >
              <Zap className="h-5 w-5" />
              Test API Connection
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 