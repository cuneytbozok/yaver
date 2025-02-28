'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Agent, Gender, EducationLevel, CommunicationPreference, PurchaseFrequency } from '@/types/agent';
import { createAgent } from '@/services/agentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { InputTag } from '@/components/ui/input-tag';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }).max(100),
  age: z.coerce.number().min(18, {
    message: 'Age must be at least 18.',
  }).max(100),
  gender: z.nativeEnum(Gender),
  income_level: z.coerce.number().min(0).max(1000000),
  education_level: z.nativeEnum(EducationLevel),
  interests: z.array(z.string()).min(1, {
    message: 'At least one interest is required.',
  }),
  purchase_behaviors: z.array(z.string()).min(1, {
    message: 'At least one purchase behavior is required.',
  }),
  purchase_frequency: z.nativeEnum(PurchaseFrequency),
  communication_preferences: z.array(z.nativeEnum(CommunicationPreference)).min(1, {
    message: 'At least one communication preference is required.',
  }),
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
  social_media_usage: z.array(z.string()).optional(),
  brand_loyalty: z.number().min(1).max(10),
  price_sensitivity: z.number().min(1).max(10),
  tech_savviness: z.number().min(1).max(10),
});

const communicationOptions = [
  { id: CommunicationPreference.EMAIL, label: 'Email' },
  { id: CommunicationPreference.SMS, label: 'SMS' },
  { id: CommunicationPreference.PHONE, label: 'Phone' },
  { id: CommunicationPreference.SOCIAL_MEDIA, label: 'Social Media' },
  { id: CommunicationPreference.DIRECT_MAIL, label: 'Direct Mail' },
];

export function AgentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: 30,
      gender: Gender.PREFER_NOT_TO_SAY,
      income_level: 50000,
      education_level: EducationLevel.BACHELORS,
      interests: [],
      purchase_behaviors: [],
      purchase_frequency: PurchaseFrequency.MONTHLY,
      communication_preferences: [],
      location: '',
      social_media_usage: [],
      brand_loyalty: 5,
      price_sensitivity: 5,
      tech_savviness: 5,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const agent = await createAgent(values as Agent);
      toast.success('Agent created successfully!', {
        description: `Agent "${agent.name}" has been created.`,
      });
      form.reset();
    } catch (error) {
      console.error('Error creating agent:', error);
      toast.error('Failed to create agent', {
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create Marketing Agent</CardTitle>
        <CardDescription>
          Create a new agent profile with demographic and psychographic parameters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter agent name" {...field} />
                    </FormControl>
                    <FormDescription>
                      A descriptive name for this agent profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" min={18} max={100} {...field} />
                    </FormControl>
                    <FormDescription>
                      Age of the agent (18-100).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Gender.MALE}>Male</SelectItem>
                        <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                        <SelectItem value={Gender.NON_BINARY}>Non-binary</SelectItem>
                        <SelectItem value={Gender.OTHER}>Other</SelectItem>
                        <SelectItem value={Gender.PREFER_NOT_TO_SAY}>Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="income_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Income Level ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} max={1000000} {...field} />
                    </FormControl>
                    <FormDescription>
                      Annual income in USD.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="education_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Education Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={EducationLevel.HIGH_SCHOOL}>High School</SelectItem>
                        <SelectItem value={EducationLevel.ASSOCIATES}>Associate Degree</SelectItem>
                        <SelectItem value={EducationLevel.BACHELORS}>Bachelor's Degree</SelectItem>
                        <SelectItem value={EducationLevel.MASTERS}>Master's Degree</SelectItem>
                        <SelectItem value={EducationLevel.DOCTORATE}>Doctorate</SelectItem>
                        <SelectItem value={EducationLevel.NONE}>None</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Input placeholder="City, Country" {...field} />
                    </FormControl>
                    <FormDescription>
                      Where the agent is located.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        <SelectItem value={PurchaseFrequency.DAILY}>Daily</SelectItem>
                        <SelectItem value={PurchaseFrequency.WEEKLY}>Weekly</SelectItem>
                        <SelectItem value={PurchaseFrequency.MONTHLY}>Monthly</SelectItem>
                        <SelectItem value={PurchaseFrequency.QUARTERLY}>Quarterly</SelectItem>
                        <SelectItem value={PurchaseFrequency.YEARLY}>Yearly</SelectItem>
                        <SelectItem value={PurchaseFrequency.RARELY}>Rarely</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Interests/Hobbies</FormLabel>
                    <FormControl>
                      <InputTag
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Add an interest and press Enter"
                      />
                    </FormControl>
                    <FormDescription>
                      Add interests or hobbies that define this agent.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purchase_behaviors"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Purchase Behaviors</FormLabel>
                    <FormControl>
                      <InputTag
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Add a purchase behavior and press Enter"
                      />
                    </FormControl>
                    <FormDescription>
                      Add typical purchase behaviors (e.g., "Researches extensively", "Impulse buyer").
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="social_media_usage"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Social Media Usage (Optional)</FormLabel>
                    <FormControl>
                      <InputTag
                        value={field.value || []}
                        onChange={field.onChange}
                        placeholder="Add social media platforms and press Enter"
                      />
                    </FormControl>
                    <FormDescription>
                      Add social media platforms this agent uses.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="communication_preferences"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Communication Preferences</FormLabel>
                    <div className="grid grid-cols-2 gap-4">
                      {communicationOptions.map((option) => (
                        <FormItem
                          key={option.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, option.id]);
                                } else {
                                  field.onChange(
                                    field.value?.filter((value) => value !== option.id)
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand_loyalty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Loyalty (1-10)</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Low</span>
                          <span>Current: {field.value}</span>
                          <span>High</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      How loyal is this agent to brands they trust?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price_sensitivity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Sensitivity (1-10)</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Low</span>
                          <span>Current: {field.value}</span>
                          <span>High</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tech_savviness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tech Savviness (1-10)</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Low</span>
                          <span>Current: {field.value}</span>
                          <span>High</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pt-6">
              <Button type="submit" className="ml-auto" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Agent'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 