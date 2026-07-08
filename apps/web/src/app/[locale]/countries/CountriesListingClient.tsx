'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Country, CONTINENT_LABELS } from '@/types';
import { getImageUrl } from '@/lib/api';
import {
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

interface CountriesListingClientProps {
  initialCountries: Country[];
  locale: string;
  dict: {
    countries?: {
      title?: string;
      search?: string;
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
    };
  };
  listingConfig?: {
    layout?: 'grid' | 'cards' | 'map';
    columns?: '2' | '3' | '4';
    showSearch?: boolean;
    searchPlaceholder?: string;
    showRegionFilter?: boolean;
    showCityCount?: boolean;
    showFlags?: boolean;
  };
  featuredConfig?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    displayMode?: 'auto' | 'manual';
    manualItems?: (Country | string)[];
    limit?: number;
    layout?: 'grid' | 'cards' | 'carousel';
  };
  regionsOverviewConfig?: {
    enabled?: boolean;
    title?: string;
    displayStyle?: 'cards' | 'map' | 'links';
    items?: {
      regionId: string;
      name: string;
      description?: string;
      image?: { url?: string };
    }[];
  };
  emptyStateConfig?: {
    title?: string;
    message?: string;
  };
}

const ITEMS_PER_PAGE = 12;

export default function CountriesListingClient({
  initialCountries,
  locale,
  dict,
  listingConfig,
  featuredConfig,
  regionsOverviewConfig,
  emptyStateConfig,
}: CountriesListingClientProps) {
  // CMS config with defaults
  const showSearch = listingConfig?.showSearch !== false;
  const showRegionFilter = listingConfig?.showRegionFilter !== false;
  const gridColumns = listingConfig?.columns || '3';
  const searchPlaceholder = listingConfig?.searchPlaceholder || 'Search countries...';

  // Get featured countries
  const getFeaturedCountries = (): Country[] => {
    if (!featuredConfig?.enabled) return [];
    
    if (featuredConfig.displayMode === 'manual' && featuredConfig.manualItems) {
      const manualIds = featuredConfig.manualItems.map((item: Country | string) => 
        typeof item === 'object' ? item.id : item
      );
      return initialCountries.filter(c => manualIds.includes(c.id));
    }
    
    // Auto mode
    const limit = featuredConfig.limit || 6;
    return initialCountries.slice(0, limit);
  };

  const featuredCountries = getFeaturedCountries();

  // Filter states
  const [searchInput, setSearchInput] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search
  const searchQuery = useDebounce(searchInput, 300);

  const localePath = (path: string) => `/${locale}${path}`;

  // Continent options for filter
  const continentOptions = useMemo(() => {
    const uniqueContinents = [...new Set(initialCountries.map(c => c.continent))];
    return uniqueContinents.map(continent => ({
      value: continent,
      label: CONTINENT_LABELS[continent] || continent,
    }));
  }, [initialCountries]);

  // Filter countries
  const filteredCountries = useMemo(() => {
    return initialCountries.filter((country) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          country.name?.toLowerCase().includes(query) ||
          country.excerpt?.toLowerCase().includes(query) ||
          CONTINENT_LABELS[country.continent]?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Continent filter
      if (selectedContinent && country.continent !== selectedContinent) {
        return false;
      }

      return true;
    });
  }, [initialCountries, searchQuery, selectedContinent]);

  // Group countries by continent
  const countriesByContinent = useMemo(() => {
    return filteredCountries.reduce((acc, country) => {
      const continent = country.continent || 'other';
      if (!acc[continent]) {
        acc[continent] = [];
      }
      acc[continent].push(country);
      return acc;
    }, {} as Record<string, Country[]>);
  }, [filteredCountries]);

  // Displayed countries (paginated)
  const displayedCountries = filteredCountries.slice(0, displayCount);
  const hasMore = displayCount < filteredCountries.length;

  // Load more handler
  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + ITEMS_PER_PAGE);
      setIsLoading(false);
    }, 300);
  }, []);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setSearchInput('');
    setSelectedContinent('');
    setDisplayCount(ITEMS_PER_PAGE);
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedContinent]);

  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedContinent;

  return (
    <section className="section-lg bg-surface-primary">
      <div className="container-wide">

        {/* Featured Countries Section */}
        {featuredConfig?.enabled && featuredCountries.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-serif text-heading-lg text-content-primary mb-4">
                {featuredConfig.title || 'Top Destinations'}
              </h2>
              {featuredConfig.subtitle && (
                <p className="text-body-lg text-content-secondary max-w-2xl mx-auto">
                  {featuredConfig.subtitle}
                </p>
              )}
            </div>
            <div className={`grid gap-8 ${
              featuredConfig.layout === 'carousel' 
                ? 'md:grid-cols-2 lg:grid-cols-4' 
                : featuredConfig.layout === 'cards'
                  ? 'md:grid-cols-2 lg:grid-cols-3'
                  : 'md:grid-cols-3 lg:grid-cols-4'
            }`}>
              {featuredCountries.map((country) => (
                <Link
                  key={country.id}
                  href={localePath(`/countries/${country.slug}`)}
                  className="group block"
                >
                  <div className={`bg-surface-tertiary relative overflow-hidden mb-4 ${
                    featuredConfig.layout === 'cards' ? 'aspect-[4/3]' : 'aspect-video'
                  }`}>
                    {country.featuredImage && typeof country.featuredImage === 'object' && (
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: `url(${getImageUrl(country.featuredImage.url)})` }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-heading-md text-white mb-1">
                        {country.name}
                      </h3>
                      <span className="text-label-sm text-white/70">
                        {CONTINENT_LABELS[country.continent] || country.continent}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regions Overview Section */}
        {regionsOverviewConfig?.enabled && regionsOverviewConfig.items && regionsOverviewConfig.items.length > 0 && (
          <div className="mb-20">
            <h2 className="font-serif text-heading-lg text-content-primary mb-8 text-center">
              {regionsOverviewConfig.title || 'Explore by Region'}
            </h2>
            {regionsOverviewConfig.displayStyle === 'cards' && (
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                {regionsOverviewConfig.items.map((region) => (
                  <button
                    key={region.regionId}
                    onClick={() => setSelectedContinent(region.regionId)}
                    className={`group cursor-pointer text-left ${
                      selectedContinent === region.regionId ? 'ring-2 ring-accent' : ''
                    }`}
                  >
                    <div className="aspect-square bg-surface-tertiary relative overflow-hidden mb-3">
                      {region.image?.url && (
                        <div
                          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                          style={{ backgroundImage: `url(${getImageUrl(region.image.url)})` }}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-heading-sm text-white text-center">
                          {region.name}
                        </span>
                      </div>
                    </div>
                    {region.description && (
                      <p className="text-body-sm text-content-muted text-center line-clamp-2">
                        {region.description}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            )}
            {regionsOverviewConfig.displayStyle === 'links' && (
              <div className="flex flex-wrap justify-center gap-4">
                {regionsOverviewConfig.items.map((region) => (
                  <button
                    key={region.regionId}
                    onClick={() => setSelectedContinent(region.regionId)}
                    className={`px-6 py-3 border transition-colors text-body-md ${
                      selectedContinent === region.regionId
                        ? 'border-accent text-accent bg-accent/5'
                        : 'border-border-light hover:border-accent hover:text-accent'
                    }`}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search & Filters */}
        {(showSearch || showRegionFilter) && (
          <div className="mb-12">
            {showSearch && (
              <FilterSearch
                value={searchInput}
                onChange={setSearchInput}
                placeholder={searchPlaceholder}
              />
            )}

            {showRegionFilter && continentOptions.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4 items-center">
                <FilterSection label="Region" showDivider={false}>
                  <FilterChipGroup
                    options={continentOptions}
                    value={selectedContinent}
                    onChange={setSelectedContinent}
                  />
                </FilterSection>

                {hasActiveFilters && (
                  <ClearFilters onClick={handleClearFilters} />
                )}
              </div>
            )}
          </div>
        )}

        {/* Results Header */}
        <ResultsHeader
          showing={displayedCountries.length}
          total={filteredCountries.length}
          label={filteredCountries.length === 1 ? 'country' : 'countries'}
        />

        {/* Countries Grid */}
        {displayedCountries.length > 0 ? (
          <>
            <div className={`grid gap-8 mb-12 ${
              gridColumns === '4' 
                ? 'md:grid-cols-2 lg:grid-cols-4' 
                : gridColumns === '2'
                  ? 'md:grid-cols-2'
                  : 'md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {displayedCountries.map((country) => (
                <Link
                  key={country.id}
                  href={localePath(`/countries/${country.slug}`)}
                  className="group block"
                >
                  <div className="aspect-video bg-surface-tertiary relative overflow-hidden mb-5">
                    {country.featuredImage && typeof country.featuredImage === 'object' && (
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: `url(${getImageUrl(country.featuredImage.url)})` }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="font-serif text-heading-md text-content-primary mb-2 group-hover:text-accent transition-colors duration-300">
                    {country.name}
                  </h3>
                  <p className="text-body-sm text-content-muted line-clamp-2 mb-2">
                    {country.excerpt}
                  </p>
                  <span className="text-label-sm uppercase text-accent">
                    {CONTINENT_LABELS[country.continent] || country.continent}
                  </span>
                </Link>
              ))}
            </div>

            {/* Countries by Continent */}
            {!selectedContinent && Object.entries(countriesByContinent).map(([continent, countries]) => (
              <section key={continent} className="mb-16 last:mb-0">
                <h2 className="font-serif text-heading-lg text-content-primary mb-8 pb-4 border-b border-border-light">
                  {CONTINENT_LABELS[continent as Country['continent']] || continent}
                </h2>
                <div className={`grid gap-4 ${
                  gridColumns === '4' 
                    ? 'md:grid-cols-4' 
                    : gridColumns === '2'
                      ? 'md:grid-cols-2'
                      : 'md:grid-cols-4'
                }`}>
                  {countries.map((country) => (
                    <Link
                      key={country.id}
                      href={localePath(`/countries/${country.slug}`)}
                      className="p-4 bg-surface-secondary border border-border-light hover:border-accent hover:bg-surface-tertiary transition-all duration-300 flex items-center gap-3"
                    >
                      <span className="text-body-md text-content-primary hover:text-accent transition-colors duration-300">
                        {country.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}

            {/* Load More */}
            <LoadMore 
              onClick={handleLoadMore} 
              isLoading={isLoading}
              hasMore={hasMore}
              remainingCount={filteredCountries.length - displayedCountries.length}
              label={dict.countries?.loadMore || dict.listing?.loadMore || 'Load More'}
            />
          </>
        ) : (
          <EmptyState
            message={emptyStateConfig?.title || dict.countries?.noResults || 'No Countries Found'}
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
