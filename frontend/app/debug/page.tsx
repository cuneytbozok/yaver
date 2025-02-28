"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function DebugPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Style Debug Page</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Button Styles</CardTitle>
            <CardDescription>Test different button variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><span>🔍</span></Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => toast.success("Toast works!")}>Test Toast</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Card Styling</CardTitle>
            <CardDescription>This card tests card styling</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This text should be in muted foreground color</p>
            <p className="text-primary">This text should be in primary color</p>
            <p className="text-secondary">This text should be in secondary color</p>
            <div className="bg-accent p-2 mt-2 rounded">This should have accent background</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 