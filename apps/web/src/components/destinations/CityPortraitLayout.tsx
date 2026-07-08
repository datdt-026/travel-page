'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Country, City, Attraction, Itinerary, Media } from '@/types';
import RichText from '@/components/RichText';
import { getMediaImageUrl } from '@/lib/api';

// Simple SVG icon components
function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ThermometerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function getImageUrl(image: Media | string | undefined): string | undefined {
  return getMediaImageUrl(image, ['hero', 'card']);
}

interface CityPortraitLayoutProps {
  city: City;
  country: Country;
  attractions: Attraction[];
  itineraries: Itinerary[];
  locale: string;
  dict: Record<string, any>;
}

/**
 * City Hero - Atmospheric shot with bottom-left title
 * "In action" style - street scenes, skyline at dusk
 */
function CityHero({ city, country }: { city: City; country: Country }) {
  const imageUrl = getImageUrl(city.featuredImage);

  return (
    <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={city.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-stone-700 to-stone-900" />
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Content - Bottom left placement */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="container-luxury pb-16 md:pb-24">
          {/* Breadcrumb link */}
          <Link
            href={`/${country.slug ? country.slug : ''}`}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 text-sm tracking-wide mb-4 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>{country.name}</span>
          </Link>
          
          <h1 className="font-serif text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light">
            {city.name}
          </h1>
        </div>
      </div>
    </section>
  );
}

/**
 * Quick Facts Strip - Weather, time, etc.
 * Subtle horizontal strip, not prominent
 */
function QuickFactsStrip({ city }: { city: City }) {
  const facts = [
    city.bestTimeToVisit && { icon: ThermometerIcon, label: 'Best Time', value: city.bestTimeToVisit },
    city.coordinates && { icon: MapPinIcon, label: 'Location', value: `${city.coordinates.latitude?.toFixed(2)}°N` },
  ].filter(Boolean) as { icon: any; label: string; value: string }[];

  if (facts.length === 0) return null;

  return (
    <div className="bg-surface-secondary border-b border-border-light">
      <div className="container-luxury py-4">
        <div className="flex items-center justify-center gap-8 md:gap-16">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-center gap-2 text-sm text-content-muted">
              <fact.icon className="w-4 h-4" />
              <span>{fact.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Horizontal Scroll Attractions - Carousel style
 * NOT a vertical list (anti-pattern removed)
 */
interface AttractionsCarouselProps {
  attractions: Attraction[];
  locale: string;
  title?: string;
}

function AttractionsCarousel({ attractions, locale, title = 'Unmissable' }: AttractionsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (attractions.length === 0) return null;

  const localePath = (path: string) => `/${locale}${path}`;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
              Discover
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-content-primary mt-3">
              {title}
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 border border-border hover:border-content-primary transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 border border-border hover:border-content-primary transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 md:px-12 lg:px-16 pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {attractions.map((attraction) => {
          const imageUrl = getImageUrl(attraction.featuredImage);
          
          return (
            <Link
              key={attraction.id}
              href={localePath(`/attractions/${attraction.slug}`)}
              className="flex-shrink-0 w-[280px] md:w-[320px] group"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Portrait Card */}
              <div className="relative aspect-[3/4] overflow-hidden mb-4">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={attraction.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="320px"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300" />
                )}
                
                {/* Category Badge */}
                {attraction.category && (
                  <span className="absolute top-4 left-4 text-xs tracking-[0.1em] uppercase bg-white/90 px-3 py-1.5">
                    {attraction.category}
                  </span>
                )}
              </div>
              
              <h3 className="font-serif text-xl font-light text-content-primary group-hover:text-accent transition-colors">
                {attraction.name}
              </h3>
              
              {attraction.excerpt && (
                <p className="text-sm text-content-muted mt-2 line-clamp-2">
                  {attraction.excerpt}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Curated Journeys - Recipe card style for itineraries
 * "Ways to see [City]" approach
 */
interface CuratedJourneysProps {
  itineraries: Itinerary[];
  cityName: string;
  locale: string;
  citySlug: string;
}

function CuratedJourneys({ itineraries, cityName, locale, citySlug }: CuratedJourneysProps) {
  if (itineraries.length === 0) return null;

  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <section className="py-16 md:py-24 bg-surface-secondary">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
              Curated Journeys
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-content-primary mt-3">
              Ways to see {cityName}
            </h2>
          </div>
          
          <Link
            href={localePath(`/itineraries?city=${citySlug}`)}
            className="text-sm tracking-[0.1em] uppercase text-content-secondary hover:text-content-primary transition-colors"
          >
            View All →
          </Link>
        </div>

        {/* Wide Cards */}
        <div className="space-y-6">
          {itineraries.map((itinerary) => {
            const imageUrl = getImageUrl(itinerary.featuredImage);
            
            return (
              <Link
                key={itinerary.id}
                href={localePath(`/itineraries/${itinerary.slug}`)}
                className="group block bg-surface-primary border border-border-light hover:border-accent transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                  {/* Image */}
                  <div className="relative aspect-video md:aspect-auto md:h-full">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={itinerary.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-stone-200 to-stone-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      {/* Duration */}
                      <span className="inline-flex items-center gap-2 text-sm text-accent">
                        <ClockIcon className="w-4 h-4" />
                        {itinerary.duration} Days
                      </span>
                      
                      {/* Travel Styles */}
                      {itinerary.travelStyle?.slice(0, 2).map((style) => (
                        <span
                          key={style}
                          className="text-xs tracking-[0.1em] uppercase text-content-muted bg-surface-secondary px-2 py-1"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-content-primary group-hover:text-accent transition-colors mb-3">
                      {itinerary.title}
                    </h3>
                    
                    {itinerary.excerpt && (
                      <p className="text-content-secondary line-clamp-2 max-w-2xl">
                        {itinerary.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * City Description - Editorial style
 */
function CityDescription({ city }: { city: City }) {
  if (!city.description) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-luxury mx-auto">
            <RichText content={city.description} />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Highlights Grid - Icon + text style, NOT bullet points
 */
function HighlightsGrid({ city }: { city: City }) {
  if (!city.highlights || city.highlights.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-surface-secondary">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
            Highlights
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-content-primary mt-3">
            What Makes It Special
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {city.highlights.map((highlight, index) => (
            <div key={index} className="text-center p-6">
              {/* Icon placeholder - could be customized per highlight */}
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center text-accent">
                <span className="text-3xl font-serif">{index + 1}</span>
              </div>
              
              <h3 className="font-serif text-xl font-light text-content-primary mb-3">
                {highlight.title}
              </h3>
              
              {highlight.description && (
                <p className="text-sm text-content-muted leading-relaxed">
                  {highlight.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Back to Country Bar
 */
function BackToCountryBar({ country, locale }: { country: Country; locale: string }) {
  return (
    <div className="bg-surface-dark text-white py-4">
      <div className="container-luxury">
        <Link
          href={`/${locale}/destinations/${country.slug}`}
          className="inline-flex items-center gap-2 text-sm tracking-wide text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <span>Back to {country.name}</span>
        </Link>
      </div>
    </div>
  );
}

/**
 * City Portrait Layout
 * 
 * Full redesign according to design spec:
 * - Atmospheric hero with bottom-left title
 * - Quick facts strip (not prominent sidebar)
 * - Horizontal scroll attractions carousel
 * - Recipe card itineraries
 * - No maps at top, no bullet points
 */
export function CityPortraitLayout({
  city,
  country,
  attractions,
  itineraries,
  locale,
  dict,
}: CityPortraitLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Atmospheric Hero */}
      <CityHero city={city} country={country} />

      {/* Quick Facts Strip */}
      <QuickFactsStrip city={city} />

      {/* City Description */}
      <CityDescription city={city} />

      {/* Highlights Grid */}
      <HighlightsGrid city={city} />

      {/* Attractions Carousel */}
      <AttractionsCarousel
        attractions={attractions}
        locale={locale}
        title={dict.attractions?.title || 'Unmissable'}
      />

      {/* Curated Journeys */}
      <CuratedJourneys
        itineraries={itineraries}
        cityName={city.name}
        locale={locale}
        citySlug={city.slug}
      />

      {/* Back to Country */}
      <BackToCountryBar country={country} locale={locale} />
    </div>
  );
}

export default CityPortraitLayout;
