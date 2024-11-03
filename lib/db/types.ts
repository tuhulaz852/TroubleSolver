import { z } from 'zod';

/**
 * Validation schema for guide data
 * This schema ensures all required fields are present and properly formatted
 */
export const GuideSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  description: z.string()
    .min(1, "Description is required")
    .max(2000, "Description must be less than 2000 characters"),
  steps: z.array(
    z.string()
      .min(1, "Step content is required")
      .max(5000, "Step must be less than 5000 characters")
  ).min(1, "At least one step is required"),
  category: z.string().min(1, "Category is required"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  lastUpdated: z.date().optional(),
  version: z.string().optional(),
});

export type Guide = z.infer<typeof GuideSchema>;

export interface GuideWithId extends Guide {
  id: string;
}