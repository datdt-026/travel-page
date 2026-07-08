'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Itinerary } from '@/types';
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
 * JOURNEY COLLECTION - Clean Editorial Grid
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Thiết kế mới:
 * - Grid đều đặn, không offset/stagger lung tung
 * - Card thống nhất với image + text below
 * - Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
 * - Hierarchy qua typography, không qua position tricks
 * 
 * TRÁNH:
 * - Offset margins (mt-8, mt-32)
 * - Different aspect ratios trong cùng grid
 * - Complex pattern layouts
 */

// Filter options
const durationOptions = [
  { value: 'short', label: 'Short' },
  { value: 'week', label: 'A Week' },
  { value: 'extended', label: 'Extended' },
];

const styleOptions = [
  { value: 'cultural', label: 'Cultural' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'relaxation', label: 'Relaxation' },
  { value: 'foodie', label: 'Culinary' },
  { value: 'romantic', label: 'Romantic' },
];

interface JourneyCollectionProps {
  itineraries: Itinerary[];
  locale: string;
  filterConfig?: {
    showFilters?: boolean;
    showSearch?: boolean;
    searchPlaceholder?: string;
  };
  dict?: {
    itineraries?: {
      filterByDuration?: string;
      filterByStyle?: string;
      searchPlaceholder?: string;
      allJourneys?: string;
      journeys?: string;
      clearFilters?: string;
    };
  };
}

interface JourneyCardProps {
  itinerary: Itinerary;
  locale: string;
  priority?: boolean;
}

/**
 * Journey Card - Clean, Consistent Design
 * 
 * Image (aspect 4:3) + Text below
 * No overlays, clean typography
 */
function JourneyCard({ itinerary, locale, priority = false }: JourneyCardProps) {
  const imageUrl = itinerary.featuredImage && typeof itinerary.featuredImage === 'object'
    ? getImageUrl(itinerary.featuredImage.url)
    : undefined;

  const href = `/${locale}/itineraries/${itinerary.slug}`;
  
  // Duration text
  const durationText = itinerary.duration 
    ? `${itinerary.duration} ${itinerary.duration === 1 ? 'day' : 'days'}`
    : null;

  return (
    <Link href={href} className="group block">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={itinerary.title}
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
        {/* Duration label */}
        {durationText && (
          <span className="block text-[11px] font-medium tracking-[0.15em] uppercase text-stone-400">
            {durationText}
          </span>
        )}
        
        {/* Title */}
        <h3 className="font-serif text-xl md:text-2xl text-stone-900 font-normal leading-tight group-hover:text-stone-600 transition-colors duration-300">
          {itinerary.title}
        </h3>
        
        {/* Excerpt */}
        {itinerary.excerpt && (
          <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
            {itinerary.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

/**
 * Main Collection Component - Clean Grid Layout
 */
export default function JourneyCollection({ 
  itineraries, 
  locale,
  filterConfig,
  dict,
}: JourneyCollectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const showFilters = filterConfig?.showFilters !== false;
  const showSearch = filterConfig?.showSearch !== false;
  const searchPlaceholder = filterConfig?.searchPlaceholder || dict?.itineraries?.searchPlaceholder || 'Search journeys...';
  
  // Duration filter logic
  const getDurationMatch = (duration: number, filter: string): boolean => {
    switch (filter) {
      case 'short': return duration <= 3;
      case 'week': return duration >= 4 && duration <= 7;
      case 'extended': return duration >= 8;
      default: return true;
    }
  };

  // Filter itineraries
  const filteredItineraries = useMemo(() => {
    return itineraries.filter((itinerary) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          itinerary.title?.toLowerCase().includes(query) ||
          itinerary.excerpt?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (selectedDuration && !getDurationMatch(itinerary.duration, selectedDuration)) {
        return false;
      }

      if (selectedStyle && !itinerary.travelStyle?.includes(selectedStyle as any)) {
        return false;
      }

      return true;
    });
  }, [itineraries, searchQuery, selectedDuration, selectedStyle]);

  const ITEMS_PER_PAGE = 9;
  const visibleItineraries = showAll ? filteredItineraries : filteredItineraries.slice(0, ITEMS_PER_PAGE);
  const hasMore = filteredItineraries.length > ITEMS_PER_PAGE;

  const hasActiveFilters = Boolean(searchQuery || selectedDuration || selectedStyle);
  const activeFilterCount = [searchQuery, selectedDuration, selectedStyle].filter(Boolean).length;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDuration('');
    setSelectedStyle('');
    setShowAll(false);
  };

  // Empty state
  if (itineraries.length === 0) {
    return (
      <section className="py-16 md:py-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="text-center py-20">
            <p className="font-serif text-xl text-stone-400 italic">
              New journeys coming soon
            </p>
          </div>
        </div>
      </section>
    );
  }

  // No results after filtering
  if (filteredItineraries.length === 0 && hasActiveFilters) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="flex gap-12 lg:gap-16">
            {/* Sidebar Filter */}
            {showFilters && (
              <EditorialFilterSidebar
                showClear={hasActiveFilters}
                onClear={clearFilters}
                clearLabel={dict?.itineraries?.clearFilters || 'Clear all'}
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
                  label={dict?.itineraries?.filterByDuration || 'Duration'}
                  options={durationOptions}
                  value={selectedDuration}
                  onChange={setSelectedDuration}
                  allLabel={dict?.itineraries?.allJourneys || 'All'}
                />
                <EditorialFilterGroup
                  label={dict?.itineraries?.filterByStyle || 'Style'}
                  options={styleOptions}
                  value={selectedStyle}
                  onChange={setSelectedStyle}
                  allLabel={dict?.itineraries?.allJourneys || 'All'}
                />
              </EditorialFilterSidebar>
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="py-20 text-center">
                <p className="font-serif text-xl text-stone-400 italic mb-4">
                  No journeys match your selection
                </p>
                <button
                  onClick={clearFilters}
                  className="text-[12px] uppercase tracking-[0.15em] text-stone-500 hover:text-stone-700 border-b border-stone-300 hover:border-stone-500 pb-0.5 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        <div className="flex gap-12 lg:gap-16">
          {/* Sidebar Filter - Desktop */}
          {showFilters && (
            <EditorialFilterSidebar
              showClear={hasActiveFilters}
              onClear={clearFilters}
              clearLabel={dict?.itineraries?.clearFilters || 'Clear all'}
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
                label={dict?.itineraries?.filterByDuration || 'Duration'}
                options={durationOptions}
                value={selectedDuration}
                onChange={setSelectedDuration}
                allLabel={dict?.itineraries?.allJourneys || 'All'}
              />
              <EditorialFilterGroup
                label={dict?.itineraries?.filterByStyle || 'Style'}
                options={styleOptions}
                value={selectedStyle}
                onChange={setSelectedStyle}
                allLabel={dict?.itineraries?.allJourneys || 'All'}
              />
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
                      label={dict?.itineraries?.filterByDuration || 'Duration'}
                      options={durationOptions}
                      value={selectedDuration}
                      onChange={setSelectedDuration}
                      allLabel={dict?.itineraries?.allJourneys || 'All'}
                    />
                    <EditorialFilterGroup
                      label={dict?.itineraries?.filterByStyle || 'Style'}
                      options={styleOptions}
                      value={selectedStyle}
                      onChange={setSelectedStyle}
                      allLabel={dict?.itineraries?.allJourneys || 'All'}
                    />
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-[11px] uppercase tracking-[0.15em] text-stone-400 hover:text-stone-600 transition-colors"
                      >
                        {dict?.itineraries?.clearFilters || 'Clear all'}
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
                  showing={visibleItineraries.length}
                  total={filteredItineraries.length}
                  label={dict?.itineraries?.journeys || 'journeys'}
                />
              </div>
            )}

            {/* Clean Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
              {visibleItineraries.map((itinerary, index) => (
                <JourneyCard
                  key={itinerary.id}
                  itinerary={itinerary}
                  locale={locale}
                  priority={index < 3}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && !showAll && (
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
                  View all journeys
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Collection Header Component
 * With dark hero image for transparent header visibility
 */
export function JourneyCollectionHeader({
  title,
  subtitle,
  eyebrow,
  backgroundImage,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  backgroundImage?: string;
}) {
  return (
    <header className="relative min-h-[50vh] md:min-h-[60vh] flex items-end bg-stone-900">
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover opacity-60"
          priority
        />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      
      {/* Content */}
      <div className="relative z-10 w-full pb-12 md:pb-16 pt-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-4">
                {eyebrow}
              </p>
            )}
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
              {title}
            </h1>
            
            {subtitle && (
              <p className="mt-5 text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export { JourneyCard };
