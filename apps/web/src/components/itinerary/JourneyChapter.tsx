'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
import RichText from '@/components/RichText';
import { Media } from '@/types';
import ChapterDayIndicator from './ChapterDayIndicator';

/**
 * Journey Chapter Component
 * 
 * Presents a day or segment of the journey as a narrative "chapter"
 * with an evocative title, atmospheric imagery, and story-like content.
 * 
 * DESIGN PRINCIPLES:
 * - Editorial, magazine-quality presentation
 * - Image-led storytelling
 * - Generous white space
 * - Typography hierarchy for luxury feel
 * - Soft schedule orientation (day markers, not timelines)
 */

interface JourneyMoment {
  time?: string;
  moment?: string;
}

interface ChapterLocation {
  city?: { name: string; slug: string } | string;
  customLocation?: string;
}

interface JourneyChapterProps {
  chapterTitle: string;
  chapterSubtitle?: string;
  chapterNumber?: number;
  chapterLabel?: string;
  // Soft schedule layer - subtle day indicators
  dayNumber?: number;
  dayRange?: { start: number; end: number };
  timeHint?: string; // e.g., "Morning arrival", "Full day exploration"
  showDayIndicator?: boolean;
  image?: Media | string;
  imagePosition?: 'full-width' | 'left' | 'right' | 'background';
  imageAspectRatio?: 'ratio_21_9' | 'ratio_16_9' | 'ratio_4_3' | 'ratio_1_1' | 'ratio_3_4';
  narrative?: any; // RichText content
  pullQuote?: string;
  moments?: JourneyMoment[];
  location?: ChapterLocation;
  className?: string;
}

// Aspect ratio classes
const aspectRatioClasses: Record<string, string> = {
  'ratio_21_9': 'aspect-[21/9]',
  'ratio_16_9': 'aspect-video',
  'ratio_4_3': 'aspect-[4/3]',
  'ratio_1_1': 'aspect-square',
  'ratio_3_4': 'aspect-[3/4]',
};

// Time of day icons (subtle, editorial)
const timeOfDayLabels: Record<string, string> = {
  dawn: 'Dawn',
  morning: 'Morning',
  midday: 'Midday',
  afternoon: 'Afternoon',
  dusk: 'Dusk',
  evening: 'Evening',
  night: 'Night',
};

export default function JourneyChapter({
  chapterTitle,
  chapterSubtitle,
  chapterNumber,
  chapterLabel,
  dayNumber,
  dayRange,
  timeHint,
  showDayIndicator = true,
  image,
  imagePosition = 'full-width',
  imageAspectRatio = 'ratio_16_9',
  narrative,
  pullQuote,
  moments,
  location,
  className = '',
}: JourneyChapterProps) {
  const imageUrl = image && typeof image === 'object' ? getImageUrl(image.url) : undefined;
  const imageAlt = image && typeof image === 'object' ? image.alt || chapterTitle : chapterTitle;
  
  // Get location display - ensure it's always a string
  const locationName: string | undefined = location?.customLocation || 
    (location?.city && typeof location.city === 'object' ? location.city.name : 
      typeof location?.city === 'string' ? location.city : undefined);

  // Chapter label logic
  const displayLabel = chapterLabel || (chapterNumber ? `Chapter ${chapterNumber}` : null);

  // Determine if we should show the day indicator
  const hasDayInfo = dayNumber || (dayRange && dayRange.start);

  return (
    <article className={`relative ${className}`}>
      {/* Subtle Day Indicator - Soft Schedule Layer */}
      {showDayIndicator && hasDayInfo && (
        <div className="max-w-3xl mx-auto px-6 mb-6">
          <ChapterDayIndicator
            dayNumber={dayNumber}
            dayRange={dayRange}
            location={locationName}
            timeHint={timeHint}
            variant="subtle"
          />
        </div>
      )}

      {/* Full Width Image Layout */}
      {imagePosition === 'full-width' && imageUrl && (
        <div className="mb-12 md:mb-16">
          <div className={`relative w-full ${aspectRatioClasses[imageAspectRatio]} overflow-hidden`}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      {/* Background Image Layout */}
      {imagePosition === 'background' && imageUrl && (
        <div className="relative min-h-[70vh] flex items-end mb-12 md:mb-16">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 text-white">
            {displayLabel && (
              <span className="block text-sm tracking-[0.2em] uppercase text-white/60 mb-4 font-light">
                {displayLabel}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4">
              {chapterTitle}
            </h2>
            {chapterSubtitle && (
              <p className="text-lg text-white/80 font-light">{chapterSubtitle}</p>
            )}
          </div>
        </div>
      )}

      {/* Text Content Container */}
      <div className="max-w-3xl mx-auto px-6">
        {/* Header (for non-background layouts) */}
        {imagePosition !== 'background' && (
          <header className="mb-10 md:mb-14">
            {displayLabel && (
              <span className="block text-sm tracking-[0.2em] uppercase text-neutral-400 mb-4 font-light">
                {displayLabel}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 leading-tight mb-4">
              {chapterTitle}
            </h2>
            {chapterSubtitle && (
              <p className="text-lg text-neutral-500 font-light">{chapterSubtitle}</p>
            )}
            {locationName && (
              <p className="text-sm text-neutral-400 mt-3 tracking-wide">
                {locationName}
              </p>
            )}
          </header>
        )}

        {/* Left/Right Image Layout */}
        {(imagePosition === 'left' || imagePosition === 'right') && imageUrl && (
          <div className={`flex flex-col md:flex-row gap-8 md:gap-12 mb-10 ${
            imagePosition === 'right' ? 'md:flex-row-reverse' : ''
          }`}>
            <div className="md:w-1/2">
              <div className={`relative ${aspectRatioClasses[imageAspectRatio]} overflow-hidden`}>
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              {narrative && (
                <div className="prose prose-lg prose-neutral max-w-none font-light leading-relaxed">
                  <RichText content={narrative} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Narrative (for full-width or background) */}
        {(imagePosition === 'full-width' || imagePosition === 'background') && narrative && (
          <div className="prose prose-lg prose-neutral max-w-none font-light leading-relaxed mb-10">
            <RichText content={narrative} />
          </div>
        )}

        {/* Pull Quote */}
        {pullQuote && (
          <blockquote className="my-12 md:my-16 py-8 border-t border-b border-neutral-200">
            <p className="text-2xl md:text-3xl font-light text-neutral-700 italic leading-relaxed text-center">
              "{pullQuote}"
            </p>
          </blockquote>
        )}

        {/* Journey Moments (soft time indicators) */}
        {moments && moments.length > 0 && (
          <div className="mt-10 pt-8 border-t border-neutral-100">
            <ul className="space-y-4">
              {moments.map((moment, index) => (
                <li key={index} className="flex items-baseline gap-4">
                  {moment.time && (
                    <span className="text-sm text-neutral-400 uppercase tracking-wide min-w-[80px]">
                      {timeOfDayLabels[moment.time] || moment.time}
                    </span>
                  )}
                  <span className="text-neutral-600 font-light">{moment.moment}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
