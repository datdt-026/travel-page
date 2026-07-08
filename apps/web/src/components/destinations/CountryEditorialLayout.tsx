'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Country, City, Itinerary, Media } from '@/types';
import RichText from '@/components/RichText';
import { getMediaImageUrl } from '@/lib/api';

function getImageUrl(image: Media | string | undefined): string | undefined {
  return getMediaImageUrl(image, ['hero', 'card']);
}

interface CountryEditorialLayoutProps {
  country: Country;
  cities: City[];
  itineraries: Itinerary[];
  locale: string;
  dict: Record<string, any>;
}

/**
 * Country Hero - Full-width immersive
 * Cinematic aspect ratio on desktop
 */
function CountryHero({ country }: { country: Country }) {
  const imageUrl = getImageUrl(country.featuredImage);

  return (
    <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={country.name}
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

      {/* Content - Centered title, editorial spacing */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="font-serif text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.15em] uppercase">
            {country.name}
          </h1>
        </div>
      </div>
    </section>
  );
}

/**
 * Editorial Introduction - Large serif typography
 * Single column, centered, generous margins
 */
function EditorialIntro({ country }: { country: Country }) {
  if (!country.description) return null;

  return (
    <section className="py-20 md:py-32">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto">
          {/* Drop cap effect for first paragraph */}
          <div className="prose prose-lg md:prose-xl prose-luxury mx-auto">
            <div className="text-xl md:text-2xl font-light leading-relaxed text-content-secondary first-letter:text-6xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-accent">
              <RichText content={country.description} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Cities Checkerboard Layout
 * Alternating: Image Left / Text Right, then Text Left / Image Right
 */
interface CitiesCheckerboardProps {
  cities: City[];
  country: Country;
  locale: string;
  title?: string;
}

function CitiesCheckerboard({ cities, country, locale, title = 'Destinations' }: CitiesCheckerboardProps) {
  if (cities.length === 0) return null;

  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <section className="py-20 md:py-32 bg-surface-primary">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
            Explore
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-content-primary mt-4">
            {title}
          </h2>
        </div>

        {/* Checkerboard Grid */}
        <div className="space-y-16 md:space-y-24">
          {cities.map((city, index) => {
            const imageUrl = getImageUrl(city.featuredImage);
            const isEven = index % 2 === 0;
            const href = localePath(`/destinations/${country.slug}/${city.slug}`);

            return (
              <div
                key={city.id}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                  !isEven ? 'md:[direction:rtl]' : ''
                }`}
              >
                {/* Image */}
                <Link 
                  href={href} 
                  className={`relative aspect-[4/3] overflow-hidden group ${!isEven ? 'md:[direction:ltr]' : ''}`}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={city.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300" />
                  )}
                </Link>

                {/* Content */}
                <div className={`space-y-6 ${!isEven ? 'md:[direction:ltr]' : ''}`}>
                  <span className="text-xs tracking-[0.2em] uppercase text-content-muted">
                    {country.name}
                  </span>
                  
                  <h3 className="font-serif text-3xl md:text-4xl font-light text-content-primary">
                    {city.name}
                  </h3>
                  
                  {city.excerpt && (
                    <p className="text-content-secondary leading-relaxed max-w-md">
                      {city.excerpt}
                    </p>
                  )}
                  
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase text-content-primary hover:text-accent transition-colors group"
                  >
                    <span>Explore</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Itineraries Section - Recipe card style
 */
interface ItinerariesSectionProps {
  itineraries: Itinerary[];
  locale: string;
  countrySlug: string;
  title?: string;
}

function ItinerariesSection({ itineraries, locale, countrySlug, title = 'Curated Journeys' }: ItinerariesSectionProps) {
  if (itineraries.length === 0) return null;

  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <section className="py-20 md:py-32 bg-surface-secondary">
      <div className="container-luxury">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
              Journeys
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-content-primary mt-4">
              {title}
            </h2>
          </div>
          
          <Link
            href={localePath(`/itineraries?country=${countrySlug}`)}
            className="text-sm tracking-[0.1em] uppercase text-content-secondary hover:text-content-primary transition-colors"
          >
            View All →
          </Link>
        </div>

        {/* Recipe Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {itineraries.map((itinerary) => {
            const imageUrl = getImageUrl(itinerary.featuredImage);
            
            return (
              <Link
                key={itinerary.id}
                href={localePath(`/itineraries/${itinerary.slug}`)}
                className="group bg-surface-primary border border-border-light hover:border-accent transition-colors"
              >
                <div className="grid grid-cols-3">
                  {/* Image */}
                  <div className="relative aspect-square col-span-1">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={itinerary.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 20vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="col-span-2 p-6 flex flex-col justify-center">
                    {/* Duration Badge */}
                    <span className="inline-block w-fit text-xs tracking-[0.15em] uppercase bg-accent/10 text-accent px-3 py-1 mb-4">
                      {itinerary.duration} Days
                    </span>
                    
                    <h3 className="font-serif text-xl md:text-2xl font-light text-content-primary group-hover:text-accent transition-colors mb-2">
                      {itinerary.title}
                    </h3>
                    
                    {itinerary.excerpt && (
                      <p className="text-sm text-content-muted line-clamp-2">
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
 * Traveler's Notebook - Quick facts in subtle footer strip
 * Not a prominent table at top (anti-pattern removed)
 */
function TravelersNotebook({ country }: { country: Country }) {
  const facts = [
    { label: 'Language', value: country.language },
    { label: 'Currency', value: country.currency },
    { label: 'Best Time', value: country.bestTimeToVisit },
    { label: 'Timezone', value: country.timezone },
  ].filter(f => f.value);

  if (facts.length === 0) return null;

  return (
    <section className="py-12 border-t border-border-light">
      <div className="container-luxury">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <span className="text-xs tracking-[0.2em] uppercase text-content-muted">
            Traveler's Notes
          </span>
          {facts.map((fact) => (
            <div key={fact.label} className="text-center">
              <dt className="text-xs tracking-[0.1em] uppercase text-content-muted mb-1">
                {fact.label}
              </dt>
              <dd className="text-sm text-content-primary font-light">
                {fact.value}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Country Editorial Layout
 * 
 * Full redesign according to design spec:
 * - Full-width hero (no sidebars)
 * - Editorial intro with drop cap
 * - Checkerboard cities layout
 * - Recipe card itineraries
 * - Subtle traveler's notebook footer
 */
export function CountryEditorialLayout({
  country,
  cities,
  itineraries,
  locale,
  dict,
}: CountryEditorialLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Full-width Hero */}
      <CountryHero country={country} />

      {/* Editorial Introduction */}
      <EditorialIntro country={country} />

      {/* Cities - Checkerboard Layout */}
      <CitiesCheckerboard
        cities={cities}
        country={country}
        locale={locale}
        title={dict.destinations?.cities || 'Destinations'}
      />

      {/* Itineraries - Recipe Cards */}
      <ItinerariesSection
        itineraries={itineraries}
        locale={locale}
        countrySlug={country.slug}
        title={dict.itineraries?.title || 'Curated Journeys'}
      />

      {/* Traveler's Notebook - Subtle footer */}
      <TravelersNotebook country={country} />
    </div>
  );
}

export default CountryEditorialLayout;
