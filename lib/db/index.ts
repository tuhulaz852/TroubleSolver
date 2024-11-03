/**
 * Database interface layer
 * This file exports the database implementation and types
 * 
 * To switch database implementations:
 * 1. Create a new implementation following the same interface
 * 2. Update the store import to use the new implementation
 * 3. The rest of the application will continue to work without changes
 */

export { store } from './store';
export { GuideSchema, type Guide, type GuideWithId } from './types';