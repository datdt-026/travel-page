'use client';

/**
 * Journey Summary Component
 *
 * An elegant, editorial overview of the journey that provides
 * soft schedule orientation without rigid timelines.
 *
 * DESIGN PRINCIPLES:
 * ─────────────────────────────────────────────────────────────────
 * • Subtle, refined presentation
 * • Quick-glance journey essence
 * • No technical schedules
 * • Maintains luxury editorial aesthetic
 * • Provides context, not a checklist
 */

interface City {
  id?: string;
  name: string;
  slug?: string;
}

interface JourneySummaryProps {
  duration: number;
  cities?: (City | string)[];
  difficulty?: 'easy' | 'moderate' | 'challenging';
  chapterCount?: number;
  className?: string;
}

// Pace descriptions - evocative, not technical
const paceDescriptions: Record<string, { label: string; description: string; icon: string }> = {
  easy: {
    label: 'Unhurried',
    description: 'Leisurely mornings, time to wander',
    icon: '◦',
  },
  moderate: {
    label: 'Balanced',
    description: 'Full days with breathing room',
    icon: '◦◦',
  },
  challenging: {
    label: 'Immersive',
    description: 'Deep exploration, active discovery',
    icon: '◦◦◦',
  },
};

export default function JourneySummary({
  duration,
  cities,
  difficulty,
  chapterCount,
  className = '',
}: JourneySummaryProps) {
  // Extract city names
  const cityNames = cities?.map((city) =>
    typeof city === 'string' ? city : city.name
  ).filter(Boolean) || [];

  const pace = difficulty ? paceDescriptions[difficulty] : null;

  // Format duration text elegantly
  const getDurationText = () => {
    if (duration === 1) return '1 Day';
    if (duration <= 3) return `${duration} Days`;
    if (duration <= 7) return `${duration} Days · One Week`;
    if (duration <= 14) return `${duration} Days · Two Weeks`;
    return `${duration} Days`;
  };

  // Create flowing city text
  const getCityFlow = () => {
    if (cityNames.length === 0) return null;
    if (cityNames.length === 1) return cityNames[0];
    if (cityNames.length === 2) return `${cityNames[0]} to ${cityNames[1]}`;
    
    // For longer journeys, show first, middle indicator, and last
    const first = cityNames[0];
    const last = cityNames[cityNames.length - 1];
    const middleCount = cityNames.length - 2;
    
    if (middleCount === 1) {
      return `${first} → ${cityNames[1]} → ${last}`;
    }
    
    return `${first} → ${middleCount} more → ${last}`;
  };

  const cityFlow = getCityFlow();

  return (
    <div className={`journey-summary ${className}`}>
      {/* Elegant divider line */}
      <div className="flex items-center gap-6 mb-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
        <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-light">
          At a Glance
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      </div>

      {/* Summary Grid - Soft, flowing layout */}
      <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
        {/* Duration */}
        <div className="space-y-2">
          <span className="block text-xs uppercase tracking-[0.2em] text-neutral-400">
            Duration
          </span>
          <span className="block text-2xl md:text-3xl font-light text-neutral-800">
            {getDurationText()}
          </span>
          {chapterCount && chapterCount > 1 && (
            <span className="block text-sm text-neutral-500 font-light">
              {chapterCount} Chapters
            </span>
          )}
        </div>

        {/* Journey Flow */}
        {cityFlow && (
          <div className="space-y-2">
            <span className="block text-xs uppercase tracking-[0.2em] text-neutral-400">
              Journey
            </span>
            <span className="block text-2xl md:text-3xl font-light text-neutral-800">
              {cityNames.length} {cityNames.length === 1 ? 'Destination' : 'Destinations'}
            </span>
            <span className="block text-sm text-neutral-500 font-light">
              {cityFlow}
            </span>
          </div>
        )}

        {/* Pace */}
        {pace && (
          <div className="space-y-2">
            <span className="block text-xs uppercase tracking-[0.2em] text-neutral-400">
              Pace
            </span>
            <span className="block text-2xl md:text-3xl font-light text-neutral-800">
              {pace.label}
            </span>
            <span className="block text-sm text-neutral-500 font-light">
              {pace.description}
            </span>
          </div>
        )}
      </div>

      {/* Subtle closing line */}
      <div className="mt-10 h-px bg-gradient-to-r from-transparent via-neutral-100 to-transparent" />
    </div>
  );
}
