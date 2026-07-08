'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { City, Country, CONTINENT_LABELS } from '@/types';
import { getImageUrl } from '@/lib/api';
import {
  ListingLayout,
  ListingGrid,
  EmptyState,
  ResultsHeader,
  FilterSection,
  FilterChipGroup,
  FilterSearch,
  ClearFilters,
  LoadMore,
} from '@/components/listing';

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

interface CitiesListingClientProps {
  initialCities: City[];
  countries: Country[];
  locale: string;
  dict: {
    cities?: {
      title?: string;
      search?: string;
      filters?: string;
      country?: string;
      noResults?: string;
      clearFilters?: string;
      loadMore?: string;
    };
    common?: {
      search?: string;
      noResults?: string;
      loading?: string;
    };
    listing?: {
      filters?: string;
      clearFilters?: string;
      loadMore?: string;
      type?: string;
      location?: string;
    };
  };
  listingConfig?: {
    itemsPerPage?: number;
    layout?: 'grid' | 'list' | 'map';
    columns?: '2' | '3' | '4';
    showFilters?: boolean;
    showSearch?: boolean;
    searchPlaceholder?: string;
    filterOptions?: {
      showCountryFilter?: boolean;
      showRegionFilter?: boolean;
    };
  };
  featuredConfig?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    displayMode?: 'auto' | 'manual';
    manualItems?: (City | string)[];
    limit?: number;
  };
  emptyStateConfig?: {
    title?: string;
    message?: string;
  };
}

const ITEMS_PER_PAGE = 12;

export default function CitiesListingClient({
  initialCities,
  countries,
  locale,
  dict,
  listingConfig,
  featuredConfig,
  emptyStateConfig,
}: CitiesListingClientProps) {
  // CMS config with defaults
  const itemsPerPage = listingConfig?.itemsPerPage || ITEMS_PER_PAGE;
  const showSearch = listingConfig?.showSearch !== false;
  const showFilters = listingConfig?.showFilters !== false;
  const showCountryFilter = listingConfig?.filterOptions?.showCountryFilter !== false;
  const showRegionFilter = listingConfig?.filterOptions?.showRegionFilter !== false;
  const gridColumns = listingConfig?.columns || '3';
  const searchPlaceholder = listingConfig?.searchPlaceholder || 'Search cities...';

  // Get featured cities
  const getFeaturedCities = (): City[] => {
    if (!featuredConfig?.enabled) return [];
    
    if (featuredConfig.displayMode === 'manual' && featuredConfig.manualItems) {
      const manualIds = featuredConfig.manualItems.map((item: City | string) => 
        typeof item === 'object' ? item.id : item
      );
      return initialCities.filter(c => manualIds.includes(c.id));
    }
    
    // Auto mode: return first N items
    const limit = featuredConfig.limit || 4;
    return initialCities.slice(0, limit);
  };

  const featuredCities = getFeaturedCities();

  // Filter states
  const [searchInput, setSearchInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [displayCount, setDisplayCount] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search
  const searchQuery = useDebounce(searchInput, 300);

  const localePath = (path: string) => `/${locale}${path}`;

  // Country options for filter
  const countryOptions = useMemo(() => 
    countries.map(country => ({ value: country.id, label: country.name })),
    [countries]
  );

  // Continent options for filter
  const continentOptions = useMemo(() => {
    const uniqueContinents = [...new Set(countries.map(c => c.continent))];
    return uniqueContinents.map(continent => ({
      value: continent,
      label: CONTINENT_LABELS[continent] || continent,
    }));
  }, [countries]);

  // Filter cities
  const filteredCities = useMemo(() => {
    return initialCities.filter((city) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const country = city.country as Country;
        const matchesSearch =
          city.name?.toLowerCase().includes(query) ||
          city.excerpt?.toLowerCase().includes(query) ||
          country?.name?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Country filter
      if (selectedCountry) {
        const countryId = typeof city.country === 'object' ? city.country.id : city.country;
        if (countryId !== selectedCountry) return false;
      }

      // Continent filter
      if (selectedContinent) {
        const country = city.country as Country;
        if (country?.continent !== selectedContinent) return false;
      }

      return true;
    });
  }, [initialCities, searchQuery, selectedCountry, selectedContinent]);

  // Displayed cities (paginated)
  const displayedCities = filteredCities.slice(0, displayCount);
  const hasMore = displayCount < filteredCities.length;

  // Load more handler
  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + itemsPerPage);
      setIsLoading(false);
    }, 300);
  }, [itemsPerPage]);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setSearchInput('');
    setSelectedCountry('');
    setSelectedContinent('');
    setDisplayCount(itemsPerPage);
  }, [itemsPerPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setDisplayCount(itemsPerPage);
  }, [searchQuery, selectedCountry, selectedContinent, itemsPerPage]);

  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedCountry || selectedContinent;

  return (
    <section className="section-lg bg-surface-primary">
      <div className="container-wide">

        {/* Featured Cities Section */}
        {featuredConfig?.enabled && featuredCities.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-serif text-heading-lg text-content-primary mb-4">
                {featuredConfig.title || 'Featured Cities'}
              </h2>
              {featuredConfig.subtitle && (
                <p className="text-body-lg text-content-secondary max-w-2xl mx-auto">
                  {featuredConfig.subtitle}
                </p>
              )}
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {featuredCities.map((city) => {
                const country = city.country as Country;
                return (
                  <Link
                    key={city.id}
                    href={localePath(`/cities/${city.slug}`)}
                    className="group block"
                  >
                    <div className="aspect-[4/3] bg-surface-tertiary relative overflow-hidden mb-4">
                      {city.featuredImage && typeof city.featuredImage === 'object' && (
                        <div
                          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                          style={{ backgroundImage: `url(${getImageUrl(city.featuredImage.url)})` }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-serif text-heading-md text-white mb-1">
                          {city.name}
                        </h3>
                        {country && (
                          <span className="text-label-sm text-white/70">
                            {country.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Search & Filters */}
        {(showSearch || showFilters) && (
          <div className="mb-12">
            {showSearch && (
              <FilterSearch
                value={searchInput}
                onChange={setSearchInput}
                placeholder={searchPlaceholder}
              />
            )}

            {showFilters && (
              <div className="mt-6 flex flex-wrap gap-4 items-center">
                {showCountryFilter && countryOptions.length > 0 && (
                  <FilterSection label={dict.listing?.location || 'Country'} showDivider={false}>
                    <FilterChipGroup
                      options={countryOptions}
                      value={selectedCountry}
                      onChange={setSelectedCountry}
                    />
                  </FilterSection>
                )}
                
                {showRegionFilter && continentOptions.length > 0 && (
                  <FilterSection label="Region" showDivider={false}>
                    <FilterChipGroup
                      options={continentOptions}
                      value={selectedContinent}
                      onChange={setSelectedContinent}
                    />
                  </FilterSection>
                )}

                {hasActiveFilters && (
                  <ClearFilters onClick={handleClearFilters} />
                )}
              </div>
            )}
          </div>
        )}

        {/* Results Header */}
        <ResultsHeader
          showing={displayedCities.length}
          total={filteredCities.length}
          label={filteredCities.length === 1 ? 'city' : 'cities'}
        />

        {/* Cities Grid */}
        {displayedCities.length > 0 ? (
          <>
            <div className={`grid gap-8 ${
              gridColumns === '4' 
                ? 'md:grid-cols-2 lg:grid-cols-4' 
                : gridColumns === '2'
                  ? 'md:grid-cols-2'
                  : 'md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {displayedCities.map((city) => {
                const country = city.country as Country;
                return (
                  <Link
                    key={city.id}
                    href={localePath(`/cities/${city.slug}`)}
                    className="group block"
                  >
                    <div className="aspect-video bg-surface-tertiary relative overflow-hidden mb-5">
                      {city.featuredImage && typeof city.featuredImage === 'object' && (
                        <div
                          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                          style={{ backgroundImage: `url(${getImageUrl(city.featuredImage.url)})` }}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <h3 className="font-serif text-heading-md text-content-primary mb-2 group-hover:text-accent transition-colors duration-300">
                      {city.name}
                    </h3>
                    <p className="text-body-sm text-content-muted line-clamp-2 mb-2">
                      {city.excerpt}
                    </p>
                    {country && (
                      <span className="text-label-sm uppercase text-accent">
                        {country.name}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Load More */}
            <LoadMore 
              onClick={handleLoadMore} 
              isLoading={isLoading}
              hasMore={hasMore}
              remainingCount={filteredCities.length - displayedCities.length}
              label={dict.cities?.loadMore || dict.listing?.loadMore || 'Load More'}
            />
          </>
        ) : (
          <EmptyState
            message={emptyStateConfig?.title || dict.cities?.noResults || 'No Cities Found'}
            description={emptyStateConfig?.message || dict.common?.noResults || 'Try adjusting your filters or search terms.'}
            icon="filter"
            action={hasActiveFilters ? {
              label: dict.listing?.clearFilters || 'Clear filters',
              onClick: handleClearFilters
            } : undefined}
          />
        )}
      </div>
    </section>
  );
}
