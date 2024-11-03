"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Guide, GuideSchema } from '@/lib/db'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface GuideEditorProps {
  selectedGuideId: string | null;
  onSave?: () => void;
}

export function GuideEditor({ selectedGuideId, onSave }: GuideEditorProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<Guide>({
    resolver: zodResolver(GuideSchema),
    defaultValues: {
      title: '',
      description: '',
      steps: [''],
      category: '',
      difficulty: 'Beginner'
    }
  })

  useEffect(() => {
    async function loadGuide() {
      if (selectedGuideId && selectedGuideId !== 'new') {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/guides/${selectedGuideId}`)
          if (!response.ok) throw new Error('Failed to load guide')
          const guide = await response.json()
          form.reset(guide)
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load guide",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      } else {
        form.reset({
          title: '',
          description: '',
          steps: [''],
          category: '',
          difficulty: 'Beginner'
        })
      }
    }
    loadGuide()
  }, [selectedGuideId, form, toast])

  const addStep = () => {
    const currentSteps = form.getValues('steps')
    form.setValue('steps', [...currentSteps, ''])
  }

  const removeStep = (index: number) => {
    const currentSteps = form.getValues('steps')
    form.setValue('steps', currentSteps.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: Guide) => {
    setIsLoading(true)
    try {
      const url = selectedGuideId && selectedGuideId !== 'new' 
        ? `/api/guides/${selectedGuideId}`
        : '/api/guides'
      
      const method = selectedGuideId && selectedGuideId !== 'new' ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to save guide')

      toast({
        title: "Success",
        description: "Guide saved successfully",
      })
      
      if (onSave) onSave()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save guide",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!selectedGuideId) {
    return (
      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
        Select a guide to edit or create a new one
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Guide title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Guide description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Guide category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <Label>Steps</Label>
          {form.watch('steps').map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`steps.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-2">
                      <Textarea
                        {...field}
                        placeholder={`Step ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeStep(index)}
                        disabled={index === 0 && form.watch('steps').length === 1}
                      >
                        ×
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            onClick={addStep}
            variant="outline"
          >
            Add Step
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Guide"}
        </Button>
      </form>
    </Form>
  )
}