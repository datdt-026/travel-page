/**
 * Itinerary Editorial Blocks
 * 
 * These blocks transform the traditional day-by-day itinerary
 * into an editorial, experience-first presentation.
 * 
 * DESIGN PHILOSOPHY:
 * - Story-driven, not schedule-driven
 * - Emotion and atmosphere over logistics
 * - Editorial magazine aesthetic
 * - Luxury, understated, curated feeling
 * 
 * BLOCK TYPES:
 * 
 * 1. JourneyIntroduction
 *    - Opening narrative for the journey
 *    - Sets tone and atmosphere
 * 
 * 2. JourneyChapter
 *    - Replaces "Day 1" with narrative chapters
 *    - Evocative titles, atmospheric images
 *    - Optional soft time indicators
 * 
 * 3. ExperienceBlock
 *    - Groups content by experience type
 *    - Culture, Nature, Culinary, Local Encounters
 *    - Focus on depth and feeling
 * 
 * 4. NarrativeInterlude
 *    - Breathing space between sections
 *    - Quotes, images, reflections
 * 
 * 5. JourneyGallery
 *    - Editorial image gallery
 *    - Visual storytelling
 * 
 * 6. PracticalEssentials
 *    - Minimal, elegant practical info
 *    - Unobtrusive but helpful
 */

export { JourneyIntroduction } from './JourneyIntroduction';
export { JourneyChapter } from './JourneyChapter';
export { ExperienceBlock } from './ExperienceBlock';
export { NarrativeInterlude } from './NarrativeInterlude';
export { JourneyGallery } from './JourneyGallery';
export { PracticalEssentials } from './PracticalEssentials';

// Re-export as array for easy use in Payload config
import { JourneyIntroduction } from './JourneyIntroduction';
import { JourneyChapter } from './JourneyChapter';
import { ExperienceBlock } from './ExperienceBlock';
import { NarrativeInterlude } from './NarrativeInterlude';
import { JourneyGallery } from './JourneyGallery';
import { PracticalEssentials } from './PracticalEssentials';

export const itineraryEditorialBlocks = [
  JourneyIntroduction,
  JourneyChapter,
  ExperienceBlock,
  NarrativeInterlude,
  JourneyGallery,
  PracticalEssentials,
];
