"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

// Define the Campaign type
interface Campaign {
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

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch campaigns from API
    async function fetchCampaigns() {
      try {
        const response = await fetch('/api/campaigns')
        if (response.ok) {
          const data = await response.json()
          setCampaigns(data)
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketing Campaigns</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your marketing campaigns
          </p>
        </div>
        <Link href="/campaigns/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading campaigns...</p>
        </div>
      ) : campaigns.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <CardTitle>{campaign.name}</CardTitle>
                <CardDescription>
                  Target: {campaign.target_audience} | Channel: {campaign.marketing_channel}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {campaign.description}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/campaigns/${campaign.id}`}>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border rounded-lg">
          <h3 className="text-lg font-medium mb-2">No campaigns yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first marketing campaign to get started
          </p>
          <Link href="/campaigns/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
} 