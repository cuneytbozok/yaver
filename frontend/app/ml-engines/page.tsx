"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2, Key } from "lucide-react"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  provider: z.enum(["openai", "anthropic", "llama", "gemini"]),
  api_key: z.string().min(10, {
    message: "API key is required.",
  }),
  model_version: z.string().optional(),
  description: z.string().optional(),
})

export default function MLEnginesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [engines, setEngines] = useState([])
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      provider: "openai",
      api_key: "",
      model_version: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/ml-engines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create ML engine')
      }
      
      const data = await response.json()
      toast.success("ML Engine created successfully!")
      form.reset()
      fetchEngines()
    } catch (error) {
      toast.error("Failed to create ML engine")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  async function fetchEngines() {
    try {
      const response = await fetch('/api/ml-engines')
      if (!response.ok) {
        throw new Error('Failed to fetch ML engines')
      }
      const data = await response.json()
      setEngines(data)
    } catch (error) {
      console.error(error)
    }
  }
  
  // Fetch engines on component mount
  useEffect(() => {
    fetchEngines()
  }, [])

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ML Engines</h1>
          <p className="text-muted-foreground mt-2">
            Configure ML engines to power your virtual agents
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Create ML Engine</CardTitle>
            <CardDescription>
              Connect to AI providers like OpenAI, Anthropic, and more
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Engine Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My OpenAI Engine" {...field} />
                      </FormControl>
                      <FormDescription>
                        A descriptive name for this ML engine
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="openai">OpenAI</SelectItem>
                          <SelectItem value="anthropic">Anthropic</SelectItem>
                          <SelectItem value="llama">Llama</SelectItem>
                          <SelectItem value="gemini">Google Gemini</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The AI provider for this engine
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="api_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your API key for the selected provider
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="model_version"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model Version (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="gpt-4" {...field} />
                      </FormControl>
                      <FormDescription>
                        Specific model version to use (e.g., gpt-4, claude-3)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Engine for creating marketing agents" {...field} />
                      </FormControl>
                      <FormDescription>
                        A brief description of this engine's purpose
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Key className="mr-2 h-4 w-4" />
                  Create ML Engine
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Your ML Engines</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {engines.map((engine) => (
              <Card key={engine.id}>
                <CardHeader>
                  <CardTitle>{engine.name}</CardTitle>
                  <CardDescription>{engine.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{engine.description || "No description provided"}</p>
                  <p className="text-sm mt-2">Model: {engine.model_version || "Default"}</p>
                </CardContent>
              </Card>
            ))}
            {engines.length === 0 && (
              <p className="text-muted-foreground col-span-2 text-center py-8">No ML engines created yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 