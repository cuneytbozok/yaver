"use client"

import { useState } from "react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Campaign name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  target_audience: z.string({
    required_error: "Please select a target audience.",
  }),
  budget: z.string().min(1, {
    message: "Budget is required.",
  }),
  marketing_channel: z.string({
    required_error: "Please select a marketing channel.",
  }),
  message_type: z.enum(["informational", "promotional", "emotional"], {
    required_error: "Please select a message type.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
})

export default function CreateCampaignPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      target_audience: "",
      budget: "",
      marketing_channel: "",
      message_type: "informational",
      content: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Placeholder for API call
      console.log(values)
      toast.success("Campaign created successfully!")
      form.reset()
    } catch (error) {
      toast.error("Failed to create campaign")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Marketing Campaign</h1>
          <p className="text-muted-foreground mt-2">
            Design a marketing campaign to test with your virtual agent population
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>
              Enter the details for your marketing campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Summer Sale 2023" {...field} />
                      </FormControl>
                      <FormDescription>
                        A descriptive name for your campaign
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
                      <FormLabel>Campaign Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the goals and strategy of your campaign" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a detailed description of your campaign
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="target_audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select target audience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="young_adults">Young Adults (18-25)</SelectItem>
                          <SelectItem value="professionals">Professionals (26-40)</SelectItem>
                          <SelectItem value="middle_aged">Middle Aged (41-55)</SelectItem>
                          <SelectItem value="seniors">Seniors (56+)</SelectItem>
                          <SelectItem value="parents">Parents</SelectItem>
                          <SelectItem value="students">Students</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The primary audience for this campaign
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Budget</FormLabel>
                      <FormControl>
                        <Input placeholder="$5,000" {...field} />
                      </FormControl>
                      <FormDescription>
                        The budget allocated for this campaign
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="marketing_channel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marketing Channel</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select marketing channel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="social_media">Social Media</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="search_ads">Search Ads</SelectItem>
                          <SelectItem value="display_ads">Display Ads</SelectItem>
                          <SelectItem value="tv">Television</SelectItem>
                          <SelectItem value="radio">Radio</SelectItem>
                          <SelectItem value="print">Print</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The primary channel for this campaign
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message_type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Message Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="informational" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Informational
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="promotional" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Promotional
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="emotional" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Emotional
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        The type of message you want to convey
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter the actual content or message" 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        The actual content that will be shown to agents
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Campaign"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 