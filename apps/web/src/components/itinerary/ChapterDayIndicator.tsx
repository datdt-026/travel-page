'use client';

/**
 * Chapter Day Indicator Component
 *
 * A subtle, editorial day marker that provides soft schedule orientation
 * without introducing rigid timelines or technical schedules.
 *
 * DESIGN PRINCIPLES:
 * ─────────────────────────────────────────────────────────────────
 * • Whisper, don't shout
 * • Elegant typography over icons
 * • Contextual, not mechanical
 * • Part of the narrative flow
 * • Supports, never dominates
 */

interface ChapterDayIndicatorProps {
  dayNumber?: number;
  dayRange?: { start: number; end: number };
  location?: string;
  timeHint?: string; // e.g., "Morning arrival", "Full day", "Departure evening"
  variant?: 'subtle' | 'elegant' | 'minimal';
  position?: 'inline' | 'floating' | 'corner';
  className?: string;
}

export default function ChapterDayIndicator({
  dayNumber,
  dayRange,
  location,
  timeHint,
  variant = 'subtle',
  position = 'inline',
  className = '',
}: ChapterDayIndicatorProps) {
  // Format day display
  const getDayDisplay = () => {
    if (dayRange && dayRange.start !== dayRange.end) {
      return `Days ${dayRange.start}–${dayRange.end}`;
    }
    if (dayNumber) {
      return `Day ${dayNumber}`;
    }
    return null;
  };

  const dayDisplay = getDayDisplay();

  if (!dayDisplay && !location && !timeHint) {
    return null;
  }

  // Position-based styling
  const positionClasses: Record<string, string> = {
    inline: '',
    floating: 'absolute -left-24 top-0 hidden xl:block',
    corner: 'absolute top-0 right-0',
  };

  // Variant-based styling
  const variantStyles: Record<string, { container: string; day: string; meta: string }> = {
    subtle: {
      container: 'flex items-center gap-3 text-neutral-400',
      day: 'text-xs uppercase tracking-[0.25em] font-light',
      meta: 'text-xs font-light',
    },
    elegant: {
      container: 'flex flex-col gap-1',
      day: 'text-sm uppercase tracking-[0.2em] text-neutral-500 font-light',
      meta: 'text-xs text-neutral-400 font-light italic',
    },
    minimal: {
      container: 'inline-flex items-center gap-2 text-neutral-300',
      day: 'text-[10px] uppercase tracking-[0.3em]',
      meta: 'text-[10px] font-light',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`chapter-day-indicator ${positionClasses[position]} ${className}`}>
      <div className={styles.container}>
        {/* Day indicator with decorative element */}
        {dayDisplay && (
          <span className={styles.day}>
            <span className="inline-block w-4 h-px bg-current mr-3 align-middle opacity-50" />
            {dayDisplay}
          </span>
        )}
        
        {/* Location context */}
        {location && variant === 'elegant' && (
          <span className={styles.meta}>{location}</span>
        )}
        
        {/* Time hint - very subtle */}
        {timeHint && variant !== 'minimal' && (
          <span className={`${styles.meta} opacity-70`}>
            {variant === 'subtle' && '·'} {timeHint}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Chapter Progress Indicator
 *
 * A minimal visual representation of journey progress,
 * shown as a soft sequence of markers.
 */
interface ChapterProgressProps {
  currentChapter: number;
  totalChapters: number;
  showLabels?: boolean;
  className?: string;
}

export function ChapterProgress({
  currentChapter,
  totalChapters,
  showLabels = false,
  className = '',
}: ChapterProgressProps) {
  return (
    <div className={`chapter-progress flex items-center gap-2 ${className}`}>
      {Array.from({ length: totalChapters }).map((_, index) => {
        const isActive = index + 1 === currentChapter;
        const isPast = index + 1 < currentChapter;
        
        return (
          <div
            key={index}
            className={`
              transition-all duration-300
              ${isActive 
                ? 'w-8 h-1 bg-neutral-400' 
                : isPast 
                  ? 'w-4 h-0.5 bg-neutral-300' 
                  : 'w-4 h-0.5 bg-neutral-200'
              }
            `}
            title={showLabels ? `Chapter ${index + 1}` : undefined}
          />
        );
      })}
      
      {showLabels && (
        <span className="ml-2 text-xs text-neutral-400 font-light">
          {currentChapter} of {totalChapters}
        </span>
      )}
    </div>
  );
}

/**
 * Journey Timeline Strip
 *
 * A minimal horizontal representation of the entire journey,
 * showing the flow without rigid structure.
 */
interface TimelineStripProps {
  days: { dayNumber: number; location?: string; isHighlight?: boolean }[];
  className?: string;
}

export function JourneyTimelineStrip({
  days,
  className = '',
}: TimelineStripProps) {
  if (!days || days.length === 0) return null;

  return (
    <div className={`journey-timeline-strip ${className}`}>
      <div className="flex items-center justify-center gap-0.5 py-6">
        {days.map((day, index) => (
          <div key={index} className="relative group">
            {/* Day marker */}
            <div
              className={`
                w-2 h-2 rounded-full transition-all duration-200
                ${day.isHighlight 
                  ? 'bg-neutral-500 scale-125' 
                  : 'bg-neutral-200 group-hover:bg-neutral-300'
                }
              `}
            />
            
            {/* Connecting line */}
            {index < days.length - 1 && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 w-4 h-px bg-neutral-200" />
            )}
            
            {/* Tooltip on hover */}
            {day.location && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-neutral-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Day {day.dayNumber}: {day.location}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
