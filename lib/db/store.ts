import { Guide, GuideWithId } from './types';

/**
 * In-memory database implementation
 * This is a temporary solution for development
 * Replace this with your preferred database implementation
 * 
 * To migrate to a different database:
 * 1. Implement the same interface
 * 2. Update the implementation to use your database of choice
 * 3. Update the exports in lib/db/index.ts
 */
class InMemoryStore {
  private guides: Map<string, GuideWithId>;

  constructor() {
    this.guides = new Map();
  }

  /**
   * Save a new guide
   * @param guide Guide data to save
   * @returns Object containing success status and guide ID
   */
  async save(guide: Guide): Promise<{ success: boolean; guideId: string }> {
    const guideId = crypto.randomUUID();
    const guideWithId: GuideWithId = {
      ...guide,
      id: guideId,
      lastUpdated: new Date(),
      version: '1.0.0',
    };
    
    this.guides.set(guideId, guideWithId);
    return { success: true, guideId };
  }

  /**
   * Retrieve a guide by ID
   * @param id Guide ID
   * @returns Guide data or null if not found
   */
  async get(id: string): Promise<GuideWithId | null> {
    return this.guides.get(id) || null;
  }

  /**
   * Get all guides
   * @returns Array of all guides
   */
  async getAll(): Promise<GuideWithId[]> {
    return Array.from(this.guides.values());
  }

  /**
   * Update an existing guide
   * @param id Guide ID
   * @param guide Updated guide data
   * @returns Object containing success status
   */
  async update(id: string, guide: Guide): Promise<{ success: boolean }> {
    const existing = this.guides.get(id);
    if (!existing) {
      throw new Error('Guide not found');
    }

    const updatedGuide: GuideWithId = {
      ...guide,
      id,
      lastUpdated: new Date(),
      version: existing.version,
    };
    
    this.guides.set(id, updatedGuide);
    return { success: true };
  }

  /**
   * Delete a guide
   * @param id Guide ID
   * @returns Object containing success status
   */
  async delete(id: string): Promise<{ success: boolean }> {
    const deleted = this.guides.delete(id);
    return { success: deleted };
  }
}

export const store = new InMemoryStore();