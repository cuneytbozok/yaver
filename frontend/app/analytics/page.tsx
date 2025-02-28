"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart4, Users, Target, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Analytics</h1>
          <p className="text-muted-foreground mt-2">
            View performance metrics and insights for your marketing campaigns
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Campaigns
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Agents
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">
                +22 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Engagement Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5%</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>+5.2% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <BarChart4 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.3%</div>
              <div className="flex items-center text-xs text-red-500">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                <span>-1.1% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>
                  Performance metrics for your recent campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="font-medium">Summer Sale 2023</div>
                        <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                          Active
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">78% success</div>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="font-medium">New Product Launch</div>
                        <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                          Active
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">64% success</div>
                    </div>
                    <Progress value={64} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="font-medium">Holiday Special</div>
                        <div className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                          Pending
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">42% success</div>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="font-medium">Brand Awareness</div>
                        <div className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-100">
                          Ended
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">89% success</div>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="demographics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
                <CardDescription>
                  Breakdown of agent demographics engaging with your campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Age Distribution</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">35%</div>
                        <div className="text-sm text-muted-foreground">18-34</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">42%</div>
                        <div className="text-sm text-muted-foreground">35-54</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">23%</div>
                        <div className="text-sm text-muted-foreground">55+</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Income Level</h4>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">18%</div>
                        <div className="text-sm text-muted-foreground">Low</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">37%</div>
                        <div className="text-sm text-muted-foreground">Medium</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">32%</div>
                        <div className="text-sm text-muted-foreground">High</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">13%</div>
                        <div className="text-sm text-muted-foreground">Very High</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Gender Distribution</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">48%</div>
                        <div className="text-sm text-muted-foreground">Male</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">46%</div>
                        <div className="text-sm text-muted-foreground">Female</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold">6%</div>
                        <div className="text-sm text-muted-foreground">Other</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="engagement" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>
                  Detailed engagement metrics across different channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Social Media</div>
                      <div className="text-sm text-muted-foreground">32.4% engagement</div>
                    </div>
                    <Progress value={32.4} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">24.8% engagement</div>
                    </div>
                    <Progress value={24.8} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Search Ads</div>
                      <div className="text-sm text-muted-foreground">18.2% engagement</div>
                    </div>
                    <Progress value={18.2} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Display Ads</div>
                      <div className="text-sm text-muted-foreground">15.7% engagement</div>
                    </div>
                    <Progress value={15.7} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Video Ads</div>
                      <div className="text-sm text-muted-foreground">28.9% engagement</div>
                    </div>
                    <Progress value={28.9} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Influencer Marketing</div>
                      <div className="text-sm text-muted-foreground">35.6% engagement</div>
                    </div>
                    <Progress value={35.6} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 