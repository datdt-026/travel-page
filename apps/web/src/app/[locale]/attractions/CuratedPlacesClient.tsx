'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Attraction, City } from '@/types';
import { getImageUrl } from '@/lib/api';
import {
  EditorialFilterGroup,
  EditorialSearch,
  EditorialFilterSidebar,
  MobileFilterToggle,
  FilterPanel,
  EditorialResultCount,
} from '@/components/editorial';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CURATED PLACES - Clean Editorial Grid
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Thiết kế mới:
 * - Grid đều đặn, không offset/stagger lung tung
 * - Card thống nhất với image + text below  
 * - Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
 * - Hierarchy qua typography, không qua position tricks
 * 
 * TRÁNH:
 * - Complex layout patterns (featured-left, featured-right, dual, single-wide)
 * - Offset margins
 * - Different aspect ratios trong cùng grid
 */

// Filter options
const categoryOptions = [
  { value: 'nature', label: 'Nature' },
  { value: 'historical', label: 'Historical' },
  { value: 'religious-site', label: 'Spiritual' },
  { value: 'landmark', label: 'Landmark' },
  { value: 'museum', label: 'Museum' },
];

interface CuratedPlacesClientProps {
  attractions: Attraction[];
  cities: City[];
  locale: string;
  config?: {
    pageTitle?: string;
    pageContext?: string;
    pageNote?: string;
    maxItems?: number;
    showFilters?: boolean;
    showSearch?: boolean;
    searchPlaceholder?: string;
    heroImage?: string;
  };
  dict: {
    attractions?: {
      title?: string;
      curatedNote?: string;
      curatedContext?: string;
      viewMore?: string;
      filterByType?: string;
      filterByCity?: string;
      allPlaces?: string;
      places?: string;
      clearFilters?: string;
      searchPlaceholder?: string;
      noResults?: string;
    };
    common?: {
      [key: string]: string;
    };
  };
}

interface PlaceCardProps {
  attraction: Attraction;
  locale: string;
  priority?: boolean;
}

/**
 * Place Card - Clean, Consistent Design
 * 
 * Image (aspect 4:3) + Text below
 * No overlays, clean typography
 */
function PlaceCard({ attraction, locale, priority = false }: PlaceCardProps) {
  const imageUrl = attraction.featuredImage && typeof attraction.featuredImage === 'object'
    ? getImageUrl(attraction.featuredImage.url)
    : undefined;

  const href = `/${locale}/attractions/${attraction.slug}`;
  
  // Get city name
  const city = attraction.city as City | undefined;
  const locationText = city?.name;

  return (
    <Link href={href} className="group block">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={attraction.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300" />
        )}
      </div>

      {/* Content */}
      <div className="pt-5 space-y-2">
        {/* Location label */}
        {locationText && (
          <span className="block text-[11px] font-medium tracking-[0.15em] uppercase text-stone-400">
            {locationText}
          </span>
        )}
        
        {/* Title */}
        <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-normal leading-tight group-hover:text-stone-600 transition-colors duration-300">
          {attraction.name}
        </h3>
        
        {/* Excerpt */}
        {attraction.excerpt && (
          <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
            {attraction.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function CuratedPlacesClient({
  attractions,
  cities,
  locale,
  config,
  dict,
}: CuratedPlacesClientProps) {
  const localePath = (path: string) => `/${locale}${path}`;
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const maxItems = config?.maxItems || 12;
  const [showAll, setShowAll] = useState(false);
  
  const showFilters = config?.showFilters !== false;
  const showSearch = config?.showSearch !== false;
  const searchPlaceholder = config?.searchPlaceholder || dict?.attractions?.searchPlaceholder || 'Search places...';
  
  // City options for filter
  const cityOptions = useMemo(() => {
    const cityIds = new Set(attractions.map(a => {
      const city = a.city as City | undefined;
      return city?.id;
    }).filter(Boolean));
    
    return cities
      .filter(city => cityIds.has(city.id))
      .map(city => ({ value: city.id, label: city.name }));
  }, [attractions, cities]);

  // Filter attractions
  const filteredAttractions = useMemo(() => {
    return attractions.filter((attraction) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          attraction.name?.toLowerCase().includes(query) ||
          attraction.excerpt?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (selectedCategory && attraction.category !== selectedCategory) {
        return false;
      }

      if (selectedCity) {
        const cityId = typeof attraction.city === 'object' ? attraction.city.id : attraction.city;
        if (cityId !== selectedCity) return false;
      }

      return true;
    });
  }, [attractions, searchQuery, selectedCategory, selectedCity]);
  
  const displayedAttractions = useMemo(() => {
    return showAll ? filteredAttractions : filteredAttractions.slice(0, maxItems);
  }, [filteredAttractions, showAll, maxItems]);

  const hasActiveFilters = Boolean(searchQuery || selectedCategory || selectedCity);
  const activeFilterCount = [searchQuery, selectedCategory, selectedCity].filter(Boolean).length;
  const hasMore = filteredAttractions.length > maxItems && !showAll;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCity('');
    setShowAll(false);
  };

  // Empty state when filtering returns no results
  if (filteredAttractions.length === 0 && hasActiveFilters) {
    return (
      <section className="curated-places-section">
        {/* Hero Section */}
        <header className="relative min-h-[50vh] md:min-h-[60vh] flex items-end -mt-20 md:-mt-24 bg-stone-900">
          {config?.heroImage && (
            <div className="absolute inset-0">
              <Image
                src={config.heroImage}
                alt=""
                fill
                className="object-cover opacity-60"
                priority
                sizes="100vw"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
          <div className="relative z-10 w-full pb-12 md:pb-16 pt-32">
            <div className="max-w-screen-xl mx-auto px-6 md:px-8">
              <div className="max-w-2xl">
                <span className="block text-sm uppercase tracking-[0.2em] text-white/60 mb-4">
                  {config?.pageNote || dict.attractions?.curatedNote || 'The Collection'}
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
                  {config?.pageTitle || dict.attractions?.title || 'Curated Places'}
                </h1>
                <p className="mt-5 text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                  {config?.pageContext || dict.attractions?.curatedContext || 
                    'A considered selection of places worth understanding, not just visiting.'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content with Sidebar */}
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <div className="flex gap-12 lg:gap-16">
            {showFilters && (
              <EditorialFilterSidebar
                showClear={hasActiveFilters}
                onClear={clearFilters}
                clearLabel={dict?.attractions?.clearFilters || 'Clear all'}
              >
                {showSearch && (
                  <div className="pb-6 border-b border-stone-100">
                    <EditorialSearch
                      value={searchQuery}
                      onChange={setSearchQuery}
                      placeholder={searchPlaceholder}
                    />
                  </div>
                )}
                <EditorialFilterGroup
                  label={dict?.attractions?.filterByType || 'Type'}
                  options={categoryOptions}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  allLabel={dict?.attractions?.allPlaces || 'All'}
                />
                {cityOptions.length > 1 && (
                  <EditorialFilterGroup
                    label={dict?.attractions?.filterByCity || 'Location'}
                    options={cityOptions}
                    value={selectedCity}
                    onChange={setSelectedCity}
                    allLabel={dict?.attractions?.allPlaces || 'All'}
                  />
                )}
              </EditorialFilterSidebar>
            )}

            <div className="flex-1 min-w-0">
              <div className="py-20 text-center">
                <p className="font-serif text-xl text-stone-400 italic mb-4">
                  {dict?.attractions?.noResults || 'No places match your selection'}
                </p>
                <button
                  onClick={clearFilters}
                  className="text-[12px] uppercase tracking-[0.15em] text-stone-500 hover:text-stone-700 border-b border-stone-300 hover:border-stone-500 pb-0.5 transition-colors"
                >
                  {dict?.attractions?.clearFilters || 'Clear filters'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="curated-places-section">
      {/* Hero Section */}
      <header className="relative min-h-[50vh] md:min-h-[60vh] flex items-end -mt-20 md:-mt-24 bg-stone-900">
        {config?.heroImage && (
          <div className="absolute inset-0">
            <Image
              src={config.heroImage}
              alt=""
              fill
              className="object-cover opacity-60"
              priority
              sizes="100vw"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="relative z-10 w-full pb-12 md:pb-16 pt-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8">
            <div className="max-w-2xl">
              <span className="block text-sm uppercase tracking-[0.2em] text-white/60 mb-4">
                {config?.pageNote || dict.attractions?.curatedNote || 'The Collection'}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
                {config?.pageTitle || dict.attractions?.title || 'Curated Places'}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                {config?.pageContext || dict.attractions?.curatedContext || 
                  'A considered selection of places worth understanding, not just visiting.'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Curated Gallery with Sidebar */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="flex gap-12 lg:gap-16">
          {/* Sidebar Filter - Desktop */}
          {showFilters && (
            <EditorialFilterSidebar
              showClear={hasActiveFilters}
              onClear={clearFilters}
              clearLabel={dict?.attractions?.clearFilters || 'Clear all'}
            >
              {showSearch && (
                <div className="pb-6 border-b border-stone-100">
                  <EditorialSearch
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder={searchPlaceholder}
                  />
                </div>
              )}
              <EditorialFilterGroup
                label={dict?.attractions?.filterByType || 'Type'}
                options={categoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
                allLabel={dict?.attractions?.allPlaces || 'All'}
              />
              {cityOptions.length > 1 && (
                <EditorialFilterGroup
                  label={dict?.attractions?.filterByCity || 'Location'}
                  options={cityOptions}
                  value={selectedCity}
                  onChange={setSelectedCity}
                  allLabel={dict?.attractions?.allPlaces || 'All'}
                />
              )}
            </EditorialFilterSidebar>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Toggle */}
            {showFilters && (
              <div className="lg:hidden mb-8 pb-6 border-b border-stone-100">
                <MobileFilterToggle
                  isOpen={mobileFiltersOpen}
                  onToggle={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  activeCount={activeFilterCount}
                />
                <FilterPanel isOpen={mobileFiltersOpen}>
                  <div className="space-y-6 pt-4">
                    {showSearch && (
                      <EditorialSearch
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder={searchPlaceholder}
                      />
                    )}
                    <EditorialFilterGroup
                      label={dict?.attractions?.filterByType || 'Type'}
                      options={categoryOptions}
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                      allLabel={dict?.attractions?.allPlaces || 'All'}
                    />
                    {cityOptions.length > 1 && (
                      <EditorialFilterGroup
                        label={dict?.attractions?.filterByCity || 'Location'}
                        options={cityOptions}
                        value={selectedCity}
                        onChange={setSelectedCity}
                        allLabel={dict?.attractions?.allPlaces || 'All'}
                      />
                    )}
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-[11px] uppercase tracking-[0.15em] text-stone-400 hover:text-stone-600 transition-colors"
                      >
                        {dict?.attractions?.clearFilters || 'Clear all'}
                      </button>
                    )}
                  </div>
                </FilterPanel>
              </div>
            )}

            {/* Results count - only show when filtered */}
            {hasActiveFilters && (
              <div className="pb-6 mb-8 border-b border-stone-100">
                <EditorialResultCount
                  showing={displayedAttractions.length}
                  total={filteredAttractions.length}
                  label={dict?.attractions?.places || 'places'}
                />
              </div>
            )}

            {/* Clean Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
              {displayedAttractions.map((attraction, index) => (
                <PlaceCard
                  key={attraction.id}
                  attraction={attraction}
                  locale={locale}
                  priority={index < 3}
                />
              ))}
            </div>

            {/* View More */}
            {hasMore && (
              <div className="mt-12 md:mt-16 text-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="
                    inline-block px-6 py-3
                    text-sm uppercase tracking-widest
                    text-stone-600 
                    border-b border-stone-300
                    hover:text-stone-900 hover:border-stone-900
                    transition-colors duration-300
                  "
                >
                  {dict.attractions?.viewMore || 'View the full collection'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}