'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Country, Media } from '@/types';
import { getMediaImageUrl } from '@/lib/api';

function getImageUrl(image: Media | string | undefined): string | undefined {
  return getMediaImageUrl(image, ['card', 'hero']);
}

interface MasonryCountryGridProps {
  countries: Country[];
  locale: string;
  cityCounts?: Record<string, number>;
  itineraryCounts?: Record<string, number>;
}

interface CountryCardProps {
  country: Country;
  locale: string;
  variant?: 'default' | 'featured';
  cityCount?: number;
  itineraryCount?: number;
}

const continentLabels: Record<string, string> = {
  'asia': 'Asia',
  'europe': 'Europe',
  'africa': 'Africa',
  'north-america': 'North America',
  'south-america': 'South America',
  'oceania': 'Oceania',
};

/**
 * Country Card - Clean Editorial Design
 * 
 * Thiết kế: Image + Text below
 * Không overlay text trên image (dễ đọc hơn)
 * Sharp corners, subtle hover
 */
function CountryCard({
  country,
  locale,
  variant = 'default',
  cityCount = 0,
  itineraryCount = 0,
}: CountryCardProps) {
  const imageUrl = getImageUrl(country.featuredImage);
  const href = `/${locale}/destinations/${country.slug}`;
  const isFeatured = variant === 'featured';

  const statText = cityCount > 0 
    ? `${cityCount} ${cityCount === 1 ? 'city' : 'cities'}` 
    : itineraryCount > 0 
      ? `${itineraryCount} ${itineraryCount === 1 ? 'itinerary' : 'itineraries'}`
      : null;

  return (
    <Link href={href} className="group block">
      {/* Image Container - Clean, no overlay */}
      <div className={`
        relative overflow-hidden bg-stone-100
        ${isFeatured ? 'aspect-[4/3]' : 'aspect-[3/4]'}
      `}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={country.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes={isFeatured 
              ? '(max-width: 768px) 100vw, 66vw' 
              : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300" />
        )}
      </div>
      
      {/* Content - Below image, clean hierarchy */}
      <div className="pt-5 space-y-2">
        {/* Continent label */}
        {country.continent && (
          <span className="block text-[11px] font-medium tracking-[0.15em] uppercase text-stone-400">
            {continentLabels[country.continent] || country.continent}
          </span>
        )}
        
        {/* Title */}
        <h3 className={`
          font-serif text-stone-900 font-normal leading-tight
          group-hover:text-stone-600 transition-colors duration-300
          ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}
        `}>
          {country.name}
        </h3>
        
        {/* Stats */}
        {statText && (
          <p className="text-[11px] tracking-[0.1em] uppercase text-stone-400">
            {statText}
          </p>
        )}
      </div>
    </Link>
  );
}

/**
 * Country Grid - Clean, Consistent Layout
 * 
 * Thiết kế mới:
 * - Mobile: 1 column, full width
 * - Tablet: 2 columns đều nhau  
 * - Desktop: 3 columns đều nhau
 * - Gap đều, không offset/stagger
 * - Tất cả card cùng style, hierarchy qua content
 */
export function MasonryCountryGrid({
  countries,
  locale,
  cityCounts = {},
  itineraryCounts = {},
}: MasonryCountryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
      {countries.map((country) => (
        <CountryCard
          key={country.id}
          country={country}
          locale={locale}
          variant="default"
          cityCount={cityCounts[country.id]}
          itineraryCount={itineraryCounts[country.id]}
        />
      ))}
    </div>
  );
}

/**
 * Featured Countries - "Editor's Pick" style section
 * 
 * Thiết kế mới: Featured row với 1 item lớn + 2 items nhỏ
 * Mobile: Stack vertically
 * Desktop: 1 large (2/3 width) + 2 stacked (1/3 width)
 */
interface FeaturedCountriesProps {
  title?: string;
  subtitle?: string;
  countries: Country[];
  locale: string;
  cityCounts?: Record<string, number>;
}

export function FeaturedCountries({
  title = "Editor's Selection",
  subtitle = "Curated destinations for the discerning traveler",
  countries,
  locale,
  cityCounts = {},
}: FeaturedCountriesProps) {
  if (countries.length === 0) return null;

  const featured = countries[0];
  const secondary = countries.slice(1, 3);
  const featuredImageUrl = getImageUrl(featured?.featuredImage);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[11px] tracking-[0.2em] uppercase text-stone-400 font-medium">
            Featured
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-stone-900 mt-3 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-stone-500 text-base md:text-lg max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Featured Grid: Large + 2 Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Large Featured Item */}
          {featured && (
            <Link 
              href={`/${locale}/destinations/${featured.slug}`}
              className="lg:col-span-2 group block"
            >
              <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden bg-stone-100">
                {featuredImageUrl ? (
                  <Image
                    src={featuredImageUrl}
                    alt={featured.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300" />
                )}
              </div>
              <div className="pt-5 space-y-2">
                {featured.continent && (
                  <span className="block text-[11px] font-medium tracking-[0.15em] uppercase text-stone-400">
                    {continentLabels[featured.continent] || featured.continent}
                  </span>
                )}
                <h3 className="font-serif text-2xl md:text-3xl text-stone-900 font-normal leading-tight group-hover:text-stone-600 transition-colors duration-300">
                  {featured.name}
                </h3>
                {cityCounts[featured.id] > 0 && (
                  <p className="text-[11px] tracking-[0.1em] uppercase text-stone-400">
                    {cityCounts[featured.id]} {cityCounts[featured.id] === 1 ? 'city' : 'cities'}
                  </p>
                )}
              </div>
            </Link>
          )}

          {/* Secondary Items - Stacked */}
          <div className="flex flex-col gap-6 md:gap-8">
            {secondary.map((country) => {
              const imageUrl = getImageUrl(country.featuredImage);
              return (
                <Link 
                  key={country.id}
                  href={`/${locale}/destinations/${country.slug}`}
                  className="group block flex-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={country.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300" />
                    )}
                  </div>
                  <div className="pt-4 space-y-1">
                    {country.continent && (
                      <span className="block text-[10px] font-medium tracking-[0.15em] uppercase text-stone-400">
                        {continentLabels[country.continent] || country.continent}
                      </span>
                    )}
                    <h3 className="font-serif text-lg md:text-xl text-stone-900 font-normal leading-tight group-hover:text-stone-600 transition-colors duration-300">
                      {country.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MasonryCountryGrid;
