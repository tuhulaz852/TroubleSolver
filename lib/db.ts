import { z } from 'zod';

// Validation schemas
export const GuideSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required").max(2000),
  steps: z.array(z.string().min(1, "Step content is required").max(5000))
    .min(1, "At least one step is required")
});

export type Guide = z.infer<typeof GuideSchema>;

// In-memory storage for development
// In production, this should be replaced with a proper database
const guides = new Map<string, Guide & { id: string }>();

export function saveGuide(guide: Guide) {
  const guideId = crypto.randomUUID();
  guides.set(guideId, { ...guide, id: guideId });
  return { success: true, guideId };
}

export function getGuide(id: string) {
  return guides.get(id) || null;
}

export function getAllGuides() {
  return Array.from(guides.values());
}

export function updateGuide(id: string, guide: Guide) {
  if (!guides.has(id)) {
    throw new Error('Guide not found');
  }
  
  guides.set(id, { ...guide, id });
  return { success: true };
}