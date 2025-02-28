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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  age: z.number().min(18).max(100).optional(),
  gender: z.string().optional(),
  occupation: z.string().optional(),
  income_level: z.string().optional(),
  education_level: z.string().optional(),
  interests: z.array(z.string()).optional(),
  personality_traits: z.array(z.string()).optional(),
  purchase_behaviors: z.array(z.string()).min(1, {
    message: "At least one purchase behavior is required",
  }),
  purchase_frequency: z.string(),
  communication_preferences: z.array(z.string()).min(1, {
    message: "At least one communication preference is required",
  }),
  location: z.string().min(2, {
    message: "Location is required",
  }),
  social_media_usage: z.array(z.string()).optional(),
  brand_loyalty: z.number().min(1).max(10),
  price_sensitivity: z.number().min(1).max(10),
  tech_savviness: z.number().min(1).max(10),
  ml_engine_id: z.string({
    required_error: "Please select an ML engine",
  }),
})

export default function CreateAgentPage() {
  const [engines, setEngines] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Fetch ML engines on component mount
  useEffect(() => {
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
        toast.error("Failed to load ML engines")
      }
    }
    
    fetchEngines()
  }, [])
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      age: 30,
      gender: "",
      occupation: "",
      income_level: "",
      education_level: "",
      interests: [],
      personality_traits: [],
      purchase_behaviors: [],
      purchase_frequency: "MONTHLY",
      communication_preferences: [],
      location: "",
      social_media_usage: [],
      brand_loyalty: 5,
      price_sensitivity: 5,
      tech_savviness: 5,
      ml_engine_id: "",
    },
  })
  
  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create agent')
      }
      
      const data = await response.json()
      toast.success("Agent created successfully!")
      form.reset()
    } catch (error) {
      toast.error("Failed to create agent")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Agent</h1>
          <p className="text-muted-foreground mt-2">
            Create a virtual agent to simulate consumer behavior
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Agent Details</CardTitle>
            <CardDescription>
              Define the characteristics of your virtual agent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of your virtual agent
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
                          <Textarea placeholder="A brief description of this agent" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age (Optional)</FormLabel>
                          <FormControl>
                            <Input type="number" min={18} max={100} {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="MALE">Male</SelectItem>
                              <SelectItem value="FEMALE">Female</SelectItem>
                              <SelectItem value="NON_BINARY">Non-binary</SelectItem>
                              <SelectItem value="PREFER_NOT_TO_SAY">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Software Engineer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="New York, USA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="income_level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Income Level (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select income level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="LOW">Low</SelectItem>
                              <SelectItem value="MEDIUM">Medium</SelectItem>
                              <SelectItem value="HIGH">High</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="education_level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education Level (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select education level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                              <SelectItem value="ASSOCIATES">Associate's Degree</SelectItem>
                              <SelectItem value="BACHELORS">Bachelor's Degree</SelectItem>
                              <SelectItem value="MASTERS">Master's Degree</SelectItem>
                              <SelectItem value="DOCTORATE">Doctorate</SelectItem>
                              <SelectItem value="NONE">None</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* ML Engine Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">ML Engine</h3>
                  
                  <FormField
                    control={form.control}
                    name="ml_engine_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ML Engine</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an ML engine" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {engines.length > 0 ? (
                              engines.map((engine) => (
                                <SelectItem key={engine.id} value={engine.id}>
                                  {engine.name} ({engine.provider})
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="default">No ML engines available. Create one first.</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The ML engine that will power this agent
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Consumer Behavior */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Consumer Behavior</h3>
                  
                  <FormField
                    control={form.control}
                    name="purchase_frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchase Frequency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select purchase frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="DAILY">Daily</SelectItem>
                            <SelectItem value="WEEKLY">Weekly</SelectItem>
                            <SelectItem value="MONTHLY">Monthly</SelectItem>
                            <SelectItem value="QUARTERLY">Quarterly</SelectItem>
                            <SelectItem value="YEARLY">Yearly</SelectItem>
                            <SelectItem value="RARELY">Rarely</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Add other fields as needed */}
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting || engines.length === 0}>
                    {isSubmitting ? "Creating..." : "Create Agent"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 