/**
 * Itinerary Editorial Components
 * 
 * These components transform the traditional day-by-day itinerary
 * into an editorial, experience-first presentation.
 * 
 * DESIGN PHILOSOPHY:
 * ─────────────────────────────────────────────────────────────────
 * • Story-driven, not schedule-driven
 * • Emotion and atmosphere over logistics
 * • Editorial magazine aesthetic
 * • Luxury, understated, curated feeling
 * • Generous white space
 * • Image-led storytelling
 * • Soft schedule orientation (not rigid timelines)
 * 
 * COMPONENT OVERVIEW:
 * ─────────────────────────────────────────────────────────────────
 * 
 * JourneyIntroduction
 *   Opening narrative for the journey. Sets tone and atmosphere.
 *   Use at the start of the itinerary to draw readers in.
 * 
 * JourneyChapter
 *   Replaces "Day 1" with narrative chapters. Features evocative
 *   titles, atmospheric images, and subtle day markers.
 * 
 * JourneySummary
 *   Elegant at-a-glance overview: duration, destinations, pace.
 *   Provides soft schedule orientation without technical details.
 * 
 * ChapterDayIndicator
 *   Subtle day markers that whisper schedule context.
 *   Supports, never dominates the editorial flow.
 * 
 * ExperienceBlock
 *   Groups content by experience type (Culture, Nature, Culinary).
 *   Focus on depth and feeling rather than scheduling.
 * 
 * NarrativeInterlude
 *   Breathing space between sections. Pull quotes, atmospheric
 *   images, and reflective moments.
 * 
 * JourneyGallery
 *   Editorial image gallery with magazine-quality layouts.
 *   Visual storytelling support.
 * 
 * PracticalEssentials
 *   Minimal, elegant practical information. Helpful but unobtrusive.
 * 
 * ItinerarySectionRenderer
 *   Dynamic renderer that maps CMS blocks to components.
 *   Ensures CMS controls WHAT is shown, frontend controls HOW.
 * 
 * USAGE:
 * ─────────────────────────────────────────────────────────────────
 * Import components individually or use ItinerarySectionRenderer
 * for CMS-driven content.
 * 
 * ```tsx
 * import { ItinerarySectionRenderer } from '@/components/itinerary';
 * 
 * <ItinerarySectionRenderer sections={itinerary.sections} locale={locale} />
 * ```
 */

export { default as JourneyIntroduction } from './JourneyIntroduction';
export { default as JourneyChapter } from './JourneyChapter';
export { default as ExperienceBlock } from './ExperienceBlock';
export { default as NarrativeInterlude } from './NarrativeInterlude';
export { default as JourneyGallery } from './JourneyGallery';
export { default as PracticalEssentials } from './PracticalEssentials';
export { default as ItinerarySectionRenderer } from './ItinerarySectionRenderer';
export { default as ItineraryHero } from './ItineraryHero';
export { default as JourneySidebar } from './JourneySidebar';
export { default as ItineraryDetailTabs } from './ItineraryDetailTabs';

// Schedule orientation components (soft, editorial)
export { default as JourneySummary } from './JourneySummary';
export { default as ChapterDayIndicator, ChapterProgress, JourneyTimelineStrip } from './ChapterDayIndicator';

// Journey Collection - Clean Editorial Grid for /itineraries
export { 
  default as JourneyCollection, 
  JourneyCollectionHeader,
  JourneyCard,
} from './JourneyCollection';
