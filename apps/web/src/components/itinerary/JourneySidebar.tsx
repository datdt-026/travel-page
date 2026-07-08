'use client';

import Link from 'next/link';
import ShareButton from '@/components/ShareButton';
import { defaultLocale } from '@/i18n';

/**
 * Journey Sidebar Component
 * 
 * Minimal, elegant sidebar for itinerary details.
 * Provides essential information without overwhelming the editorial experience.
 * 
 * DESIGN PRINCIPLES:
 * ─────────────────────────────────────────────────────────────────
 * • Understated and supportive, not prominent
 * • Only essential trip information
 * • No heavy UI elements
 * • Sticky but unobtrusive
 */

interface Country {
  id?: string;
  name: string;
  slug: string;
}

interface City {
  id?: string;
  name: string;
  slug?: string;
}

interface JourneySidebarProps {
  duration?: number;
  difficulty?: string;
  estimatedBudget?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  countries?: (Country | string)[];
  cities?: (City | string)[];
  travelStyles?: string[];
  title: string;
  locale?: string;
  
  // CMS-configurable visibility
  showTripDetails?: boolean;
  showCountries?: boolean;
  showCities?: boolean;
  showShareButton?: boolean;
  showContactCTA?: boolean;
  contactCtaText?: string;
  contactCtaLink?: string;
  
  className?: string;
}

// Difficulty labels
const difficultyLabels: Record<string, { label: string; description: string }> = {
  easy: { 
    label: 'Gentle', 
    description: 'Relaxed pace, suitable for all' 
  },
  moderate: { 
    label: 'Moderate', 
    description: 'Some activity, comfortable pace' 
  },
  challenging: { 
    label: 'Adventurous', 
    description: 'Active exploration, good fitness' 
  },
};

// Travel style icons (minimal, typographic)
const travelStyleLabels: Record<string, string> = {
  adventure: 'Adventure',
  cultural: 'Cultural',
  relaxation: 'Relaxation',
  foodie: 'Culinary',
  family: 'Family',
  romantic: 'Romance',
  budget: 'Mindful',
  luxury: 'Luxury',
  solo: 'Solo',
  backpacking: 'Explorer',
};

export default function JourneySidebar({
  duration,
  difficulty,
  estimatedBudget,
  countries,
  cities,
  travelStyles,
  title,
  locale = defaultLocale,
  showTripDetails = true,
  showCountries = true,
  showCities = true,
  showShareButton = true,
  showContactCTA = false,
  contactCtaText = 'Liên hệ tư vấn',
  contactCtaLink = '/contact',
  className = '',
}: JourneySidebarProps) {
  const hasDetails = showTripDetails && (duration || difficulty || estimatedBudget?.min);
  const hasCountries = showCountries && countries && countries.length > 0;
  const hasCities = showCities && cities && cities.length > 0;
  const hasStyles = travelStyles && travelStyles.length > 0;

  return (
    <aside className={`space-y-10 ${className}`}>
      {/* Trip Essence */}
      {hasDetails && (
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-5">
            Journey Details
          </h3>
          <dl className="space-y-5">
            {duration && (
              <div>
                <dt className="text-sm text-neutral-400 mb-1">Duration</dt>
                <dd className="text-lg font-light text-neutral-900">
                  {duration} {duration === 1 ? 'Day' : 'Days'}
                </dd>
              </div>
            )}
            
            {difficulty && difficultyLabels[difficulty] && (
              <div>
                <dt className="text-sm text-neutral-400 mb-1">Pace</dt>
                <dd className="text-lg font-light text-neutral-900">
                  {difficultyLabels[difficulty].label}
                </dd>
                <dd className="text-sm text-neutral-500 mt-0.5">
                  {difficultyLabels[difficulty].description}
                </dd>
              </div>
            )}
            
            {estimatedBudget?.min && estimatedBudget?.max && (
              <div>
                <dt className="text-sm text-neutral-400 mb-1">Investment</dt>
                <dd className="text-lg font-light text-neutral-900">
                  {estimatedBudget.currency || 'USD'} {estimatedBudget.min.toLocaleString()} – {estimatedBudget.max.toLocaleString()}
                </dd>
                <dd className="text-sm text-neutral-500 mt-0.5">
                  Per person
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {/* Destinations */}
      {(hasCountries || hasCities) && (
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-5">
            Destinations
          </h3>
          
          {hasCountries && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {countries!.map((country, index) => {
                  const name = typeof country === 'string' ? country : country.name;
                  const slug = typeof country === 'string' ? null : country.slug;
                  
                  return slug ? (
                    <Link
                      key={index}
                      href={`/${locale}/destinations/${slug}`}
                      className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
                    >
                      {name}
                      {index < countries!.length - 1 && (
                        <span className="ml-2 text-neutral-300">·</span>
                      )}
                    </Link>
                  ) : (
                    <span key={index} className="text-sm text-neutral-700">
                      {name}
                      {index < countries!.length - 1 && (
                        <span className="ml-2 text-neutral-300">·</span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          
          {hasCities && (
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {cities!.map((city, index) => {
                const name = typeof city === 'string' ? city : city.name;
                return (
                  <span key={index} className="text-sm text-neutral-500">
                    {name}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Experience Types */}
      {hasStyles && (
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-5">
            Experience
          </h3>
          <div className="flex flex-wrap gap-2">
            {travelStyles!.map((style, index) => (
              <span
                key={index}
                className="text-sm text-neutral-600 font-light"
              >
                {travelStyleLabels[style] || style}
                {index < travelStyles!.length - 1 && (
                  <span className="ml-2 text-neutral-300">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      {showShareButton && (
        <div className="pt-6 border-t border-neutral-100">
          <ShareButton title={title} />
        </div>
      )}

      {/* Contact CTA (subtle) */}
      {showContactCTA && contactCtaLink && (
        <div className="pt-6">
          <Link
            href={contactCtaLink}
            className="block w-full py-3 text-center text-sm uppercase tracking-[0.15em] border border-neutral-200 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 transition-colors"
          >
            {contactCtaText}
          </Link>
        </div>
      )}
    </aside>
  );
}
