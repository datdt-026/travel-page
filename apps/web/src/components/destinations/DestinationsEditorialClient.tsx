'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Country, City, Media } from '@/types';
import { EditorialHero } from './EditorialHero';
import { MasonryCountryGrid, FeaturedCountries } from './MasonryCountryGrid';
import { getMediaImageUrl } from '@/lib/api';

// Simple SVG icons
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// Filter bar component
interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  continentValue: string;
  onContinentChange: (value: string) => void;
  continentOptions: { value: string; label: string }[];
  showSearch?: boolean;
  showContinentFilter?: boolean;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
  resultsCount?: number;
}

function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  continentValue,
  onContinentChange,
  continentOptions,
  showSearch = true,
  showContinentFilter = true,
  hasActiveFilters = false,
  onClearFilters,
  resultsCount,
}: FilterBarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12 md:mb-16 pb-8 border-b border-border-light">
      {/* Region Filter */}
      {showContinentFilter && (
        <div className="flex items-center gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {continentOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onContinentChange(option.value)}
              className={`whitespace-nowrap text-sm tracking-wide transition-all duration-300 ${
                continentValue === option.value
                  ? 'text-content-primary font-medium border-b-2 border-accent pb-1'
                  : 'text-content-muted hover:text-content-primary'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Search + Results */}
      <div className="flex items-center gap-6">
        {typeof resultsCount === 'number' && (
          <span className="text-sm text-content-muted hidden md:block">
            {resultsCount} {resultsCount === 1 ? 'destination' : 'destinations'}
          </span>
        )}

        {showSearch && (
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-64' : 'w-48'}`}>
            <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder={searchPlaceholder}
              className="w-full pl-6 pr-8 py-2 text-sm bg-transparent border-b border-border-light focus:border-content-primary outline-none text-content-primary placeholder:text-content-muted transition-colors"
            />
            {searchValue && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {hasActiveFilters && onClearFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs tracking-[0.1em] uppercase text-accent hover:text-accent-dark transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

// Types for CMS config
interface ListingConfig {
  itemsPerPage?: number;
  showFilters?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  filterOptions?: {
    showContinentFilter?: boolean;
    showTravelStyleFilter?: boolean;
  };
}

interface FeaturedConfig {
  enabled?: boolean;
  title?: string;
  subtitle?: string;
  displayMode?: 'auto' | 'manual';
  manualItems?: Country[] | string[];
  limit?: number;
}

interface EmptyStateConfig {
  title?: string;
  message?: string;
}

interface HeroConfig {
  title?: string;
  subtitle?: string;
  backgroundImage?: Media | { url: string } | null;
}

interface DestinationsEditorialClientProps {
  initialCountries: Country[];
  initialCities: City[];
  locale: string;
  dict: {
    destinations?: {
      title?: string;
      description?: string;
      countries?: string;
      cities?: string;
      noResults?: string;
    };
    common?: {
      search?: string;
      noResults?: string;
      viewAll?: string;
    };
    listing?: {
      filters?: string;
      clearFilters?: string;
      loadMore?: string;
      region?: string;
      travelStyle?: string;
    };
  };
  heroConfig?: HeroConfig;
  listingConfig?: ListingConfig;
  featuredConfig?: FeaturedConfig;
  emptyStateConfig?: EmptyStateConfig;
}

function getImageUrl(image: Media | string | undefined): string | undefined {
  return getMediaImageUrl(image, ['card', 'hero']);
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Continent options
const continentOptions = [
  { value: '', label: 'All Regions' },
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'africa', label: 'Africa' },
  { value: 'north-america', label: 'Americas' },
  { value: 'oceania', label: 'Oceania' },
];

/**
 * Destinations Editorial Client
 * 
 * Redesigned according to design spec:
 * - Magazine cover-style hero (not standard centered text)
 * - Editor's picks featured section
 * - Asymmetrical masonry grid (not uniform cards)
 * - Minimal transparent filter bar
 * - No sidebars, no shadows, no large rounded corners
 */
export function DestinationsEditorialClient({
  initialCountries,
  initialCities,
  locale,
  dict,
  heroConfig,
  listingConfig,
  featuredConfig,
  emptyStateConfig,
}: DestinationsEditorialClientProps) {
  const ITEMS_PER_PAGE = listingConfig?.itemsPerPage || 12;
  
  // Filter states
  const [searchInput, setSearchInput] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // Debounce search
  const searchQuery = useDebounce(searchInput, 300);

  // Calculate city counts per country
  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialCities.forEach((city) => {
      const countryId = typeof city.country === 'object' ? city.country.id : city.country;
      if (countryId) {
        counts[countryId] = (counts[countryId] || 0) + 1;
      }
    });
    return counts;
  }, [initialCities]);

  // Filter countries
  const filteredCountries = useMemo(() => {
    return initialCountries.filter((country) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          country.name?.toLowerCase().includes(query) ||
          country.excerpt?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Continent filter
      if (selectedContinent && country.continent !== selectedContinent) {
        return false;
      }

      return true;
    });
  }, [initialCountries, searchQuery, selectedContinent]);

  // Featured countries (first 3 or from CMS config)
  const featuredCountries = useMemo(() => {
    if (featuredConfig?.enabled === false) return [];
    const limit = featuredConfig?.limit || 3;
    
    if (featuredConfig?.displayMode === 'manual' && featuredConfig.manualItems) {
      // TODO: Handle manual selection from CMS
      return initialCountries.slice(0, limit);
    }
    
    // Auto mode: just use the first items
    return initialCountries.slice(0, limit);
  }, [initialCountries, featuredConfig]);

  // Non-featured countries for main grid
  const gridCountries = useMemo(() => {
    const featuredIds = new Set(featuredCountries.map(c => c.id));
    return filteredCountries.filter(c => !featuredIds.has(c.id));
  }, [filteredCountries, featuredCountries]);

  // Display items
  const displayedCountries = gridCountries.slice(0, displayCount);
  const hasMore = displayCount < gridCountries.length;

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedContinent, ITEMS_PER_PAGE]);

  // Load more handler
  const loadMore = useCallback(() => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  }, [ITEMS_PER_PAGE]);

  // Clear filters
  const clearFilters = useCallback(() => {
    setSearchInput('');
    setSelectedContinent('');
    setDisplayCount(ITEMS_PER_PAGE);
  }, [ITEMS_PER_PAGE]);

  const hasActiveFilters = Boolean(searchInput || selectedContinent);

  // Hero image - get from config or first country
  const heroImage = heroConfig?.backgroundImage 
    ? (typeof heroConfig.backgroundImage === 'object' && 'url' in heroConfig.backgroundImage 
      ? heroConfig.backgroundImage as Media 
      : heroConfig.backgroundImage)
    : (initialCountries[0]?.featuredImage as Media | undefined);

  return (
    <div className="min-h-screen">
      {/* Editorial Hero - Magazine cover style */}
      <EditorialHero
        title={heroConfig?.title || dict.destinations?.title || 'The World Awaits'}
        subtitle={heroConfig?.subtitle || dict.destinations?.description}
        image={heroImage}
      />

      {/* Featured Section - Editor's Picks */}
      {featuredConfig?.enabled !== false && featuredCountries.length > 0 && !hasActiveFilters && (
        <FeaturedCountries
          title={featuredConfig?.title || "Editor's Selection"}
          subtitle={featuredConfig?.subtitle}
          countries={featuredCountries}
          locale={locale}
        />
      )}

      {/* Main Collection Section */}
      <section className="py-20 md:py-32 bg-surface-primary">
        <div className="container-luxury">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
              Explore
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-content-primary mt-4">
              The Collection
            </h2>
          </div>

          {/* Minimal Filter Bar */}
          {listingConfig?.showFilters !== false && (
            <FilterBar
              searchValue={searchInput}
              onSearchChange={setSearchInput}
              searchPlaceholder={listingConfig?.searchPlaceholder || 'Search destinations...'}
              continentValue={selectedContinent}
              onContinentChange={setSelectedContinent}
              continentOptions={continentOptions}
              showSearch={listingConfig?.showSearch !== false}
              showContinentFilter={listingConfig?.filterOptions?.showContinentFilter !== false}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
              resultsCount={filteredCountries.length}
            />
          )}

          {/* Country Grid - Masonry Style */}
          {displayedCountries.length > 0 ? (
            <>
              <MasonryCountryGrid
                countries={displayedCountries}
                locale={locale}
                cityCounts={cityCounts}
              />

              {/* Load More - Minimal style */}
              {hasMore && (
                <div className="text-center mt-16 md:mt-24">
                  <button
                    onClick={loadMore}
                    className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.15em] uppercase text-content-secondary hover:text-content-primary border border-border hover:border-content-primary transition-all duration-300"
                  >
                    <span>Load More</span>
                    <span className="text-content-muted">
                      ({gridCountries.length - displayCount} remaining)
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <h3 className="font-serif text-2xl text-content-primary mb-4">
                {emptyStateConfig?.title || dict.destinations?.noResults || 'No destinations found'}
              </h3>
              <p className="text-content-muted mb-8">
                {emptyStateConfig?.message || 'Try adjusting your filters to find what you\'re looking for.'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-accent hover:text-accent-dark underline underline-offset-4"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default DestinationsEditorialClient;
