'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function UITestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">UI Component Test</h1>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Card Component</CardTitle>
            <CardDescription>This is a shadcn/ui card component</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This card should have proper styling if shadcn/ui is working.</p>
          </CardContent>
          <CardFooter>
            <Button>Primary Button</Button>
            <Button variant="outline" className="ml-2">Outline Button</Button>
            <Button variant="destructive" className="ml-2">Destructive Button</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 