/**
 * CMS Blocks - Reusable content blocks for page building
 * 
 * These blocks can be used in globals and collections to create
 * flexible, dynamic page layouts.
 */

export { HeroBanner } from './HeroBanner';
export { ContentSection } from './ContentSection';
export { CTABanner, Newsletter, ImageGallery, FeaturedItems, Accordion } from './CommonBlocks';

// Itinerary Editorial Blocks
export { 
  JourneyIntroduction,
  JourneyChapter,
  ExperienceBlock,
  NarrativeInterlude,
  JourneyGallery,
  PracticalEssentials,
  itineraryEditorialBlocks,
} from './itinerary';

// Export all blocks as an array for easy importing
import { HeroBanner } from './HeroBanner';
import { ContentSection } from './ContentSection';
import { CTABanner, Newsletter, ImageGallery, FeaturedItems, Accordion } from './CommonBlocks';
import { itineraryEditorialBlocks } from './itinerary';

export const allBlocks = [
  HeroBanner,
  ContentSection,
  CTABanner,
  Newsletter,
  ImageGallery,
  FeaturedItems,
  Accordion,
  ...itineraryEditorialBlocks,
];
