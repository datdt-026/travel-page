'use client';

import JourneyIntroduction from './JourneyIntroduction';
import JourneyChapter from './JourneyChapter';
import ExperienceBlock from './ExperienceBlock';
import NarrativeInterlude from './NarrativeInterlude';
import JourneyGallery from './JourneyGallery';
import PracticalEssentials from './PracticalEssentials';
import { defaultLocale } from '@/i18n';

/**
 * Itinerary Section Renderer
 * 
 * Dynamic renderer that maps CMS blocks to frontend components.
 * 
 * KEY PRINCIPLE:
 * ─────────────────────────────────────────────────────────────────
 * The CMS decides WHAT is shown (sections, order, content)
 * The frontend decides HOW it looks (styling, layout, animations)
 * 
 * ARCHITECTURE:
 * ─────────────────────────────────────────────────────────────────
 * 1. CMS provides array of section blocks
 * 2. Renderer maps blockType to component
 * 3. Each component receives data and renders with consistent styling
 * 4. Frontend enforces design system (typography, spacing, colors)
 * 5. CMS cannot override core design decisions
 * 
 * GUARDRAILS:
 * ─────────────────────────────────────────────────────────────────
 * • CMS cannot change colors freely (preset options only)
 * • CMS cannot break typography hierarchy
 * • CMS cannot introduce non-editorial layouts
 * • All options are curated and safe
 */

// Section block types from CMS
interface SectionBlock {
  blockType: string;
  enabled?: boolean;
  [key: string]: any;
}

interface ItinerarySectionRendererProps {
  sections: SectionBlock[];
  locale?: string;
  className?: string;
}

// Block type to component mapping (using shortened slugs to avoid PostgreSQL identifier limits)
const blockComponents: Record<string, React.ComponentType<any>> = {
  'intro': JourneyIntroduction,
  'chapter': JourneyChapter,
  'experience': ExperienceBlock,
  'interlude': NarrativeInterlude,
  'gallery': JourneyGallery,
  'essentials': PracticalEssentials,
};

// Spacing between sections based on block type
const getSectionSpacing = (blockType: string, nextBlockType?: string): string => {
  // Large spacing after intro
  if (blockType === 'intro') {
    return 'mb-20 md:mb-32';
  }
  
  // Interludes have their own padding
  if (blockType === 'interlude') {
    return 'mb-12 md:mb-20';
  }
  
  // Chapters need breathing room
  if (blockType === 'chapter') {
    return 'mb-24 md:mb-36';
  }
  
  // Experience blocks
  if (blockType === 'experience') {
    return 'mb-20 md:mb-32';
  }
  
  // Gallery spacing
  if (blockType === 'gallery') {
    return 'mb-16 md:mb-24';
  }
  
  // Practical essentials (usually at end)
  if (blockType === 'essentials') {
    return 'mb-0';
  }
  
  // Default spacing
  return 'mb-16 md:mb-24';
};

export default function ItinerarySectionRenderer({
  sections,
  locale = defaultLocale,
  className = '',
}: ItinerarySectionRendererProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  // Filter enabled sections
  const enabledSections = sections.filter(section => section.enabled !== false);

  return (
    <div className={`itinerary-sections ${className}`}>
      {enabledSections.map((section, index) => {
        const Component = blockComponents[section.blockType];
        
        if (!Component) {
          // Unknown block type - skip in production, log in development
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Unknown itinerary block type: ${section.blockType}`);
          }
          return null;
        }

        const nextSection = enabledSections[index + 1];
        const spacing = getSectionSpacing(section.blockType, nextSection?.blockType);

        // Extract props from section data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { blockType, enabled, id, dayRangeStart, dayRangeEnd, ...componentProps } = section;

        // Transform dayRange fields for JourneyChapter
        const additionalProps: Record<string, any> = {};
        if (blockType === 'chapter' && (dayRangeStart || dayRangeEnd)) {
          additionalProps.dayRange = {
            start: dayRangeStart || dayRangeEnd,
            end: dayRangeEnd || dayRangeStart,
          };
        }

        return (
          <div key={id || index} className={spacing}>
            <Component {...componentProps} {...additionalProps} locale={locale} />
          </div>
        );
      })}
    </div>
  );
}
