"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Agent } from "@/types"

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch agents from API
    async function fetchAgents() {
      try {
        const response = await fetch('/api/agents')
        if (response.ok) {
          const data = await response.json()
          setAgents(data)
        }
      } catch (error) {
        console.error("Error fetching agents:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAgents()
  }, [])

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Virtual Agents</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your virtual consumer agents
          </p>
        </div>
        <Link href="/agents/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Agent
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading agents...</p>
        </div>
      ) : agents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.id}>
              <CardHeader>
                <CardTitle>{agent.name}</CardTitle>
                <CardDescription>
                  {agent.age} years old | {agent.gender}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {agent.occupation || "No occupation"} | {agent.location}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {agent.interests && agent.interests.map((interest, i) => (
                      <Badge key={i} variant="outline">{interest}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/agents/${agent.id}`}>
                  <Button variant="outline" size="sm">View Profile</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border rounded-lg">
          <h3 className="text-lg font-medium mb-2">No agents yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first virtual agent to get started
          </p>
          <Link href="/agents/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Agent
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
} 