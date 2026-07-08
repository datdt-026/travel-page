'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Country, City, Media } from '@/types';
import {
  ListingLayout,
  ListingGrid,
  DestinationCard,
  EmptyState,
  ResultsHeader,
  FilterSection,
  FilterChipGroup,
  FilterSearch,
  ClearFilters,
  LoadMore,
} from '@/components/listing';
import { getMediaImageUrl } from '@/lib/api';

// Type for listing config from CMS (synced with ItinerariesPage/AttractionsPage)
interface ListingConfig {
  itemsPerPage?: number;
  layout?: 'grid' | 'list' | 'cards';
  columns?: '2' | '3' | '4';
  showFilters?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  filterOptions?: {
    showContinentFilter?: boolean;
    showTravelStyleFilter?: boolean;
    showSeasonFilter?: boolean;
  };
}

// Type for featured config from CMS
interface FeaturedConfig {
  enabled?: boolean;
  title?: string;
  subtitle?: string;
  displayMode?: 'auto' | 'manual';
  manualItems?: Country[] | string[];
  limit?: number;
}

// Type for empty state config from CMS
interface EmptyStateConfig {
  title?: string;
  message?: string;
}

/**
 * Get image URL from Media object or string
 */
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

// Filter options
const continentOptions = [
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'africa', label: 'Africa' },
  { value: 'north-america', label: 'North America' },
  { value: 'south-america', label: 'South America' },
  { value: 'oceania', label: 'Oceania' },
];

const travelStyleOptions = [
  { value: 'culture', label: 'Culture' },
  { value: 'nature', label: 'Nature' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'slow-travel', label: 'Slow Travel' },
  { value: 'adventure', label: 'Adventure' },
];

const seasonOptions = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'winter', label: 'Winter' },
];

interface DestinationsListingClientProps {
  initialCountries: Country[];
  initialCities: City[];
  locale: string;
  dict: {
    destinations?: {
      title?: string;
      countries?: string;
      cities?: string;
      noResults?: string;
    };
    common?: {
      search?: string;
      noResults?: string;
      loading?: string;
      continent?: string;
      viewAll?: string;
    };
    listing?: {
      filters?: string;
      clearFilters?: string;
      loadMore?: string;
      region?: string;
      travelStyle?: string;
      season?: string;
    };
  };
  // CMS config props (synced with ItinerariesPage/AttractionsPage)
  listingConfig?: ListingConfig;
  featuredConfig?: FeaturedConfig;
  emptyStateConfig?: EmptyStateConfig;
}

export default function DestinationsListingClient({
  initialCountries,
  initialCities,
  locale,
  dict,
  listingConfig,
  featuredConfig,
  emptyStateConfig,
}: DestinationsListingClientProps) {
  // Get items per page from CMS config or default
  const ITEMS_PER_PAGE = listingConfig?.itemsPerPage || 9;
  
  // Filter states
  const [searchInput, setSearchInput] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search
  const searchQuery = useDebounce(searchInput, 300);

  const localePath = (path: string) => `/${locale}${path}`;

  // Check filter visibility from CMS config
  const showFilters = listingConfig?.showFilters !== false;
  const showSearch = listingConfig?.showSearch !== false;
  const showContinentFilter = listingConfig?.filterOptions?.showContinentFilter !== false;
  const showTravelStyleFilter = listingConfig?.filterOptions?.showTravelStyleFilter !== false;
  const showSeasonFilter = listingConfig?.filterOptions?.showSeasonFilter !== false;

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

  // Display items
  const displayedCountries = filteredCountries.slice(0, displayCount);
  const hasMore = displayCount < filteredCountries.length;
  const remainingCount = filteredCountries.length - displayCount;

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedContinent, selectedStyle, ITEMS_PER_PAGE]);

  // Load more handler
  const loadMore = useCallback(() => {
    setIsLoading(true);
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
      setIsLoading(false);
    }, 300);
  }, [ITEMS_PER_PAGE]);

  // Clear filters
  const clearFilters = useCallback(() => {
    setSearchInput('');
    setSelectedContinent('');
    setSelectedStyle('');
    setDisplayCount(ITEMS_PER_PAGE);
  }, [ITEMS_PER_PAGE]);

  const hasActiveFilters = Boolean(searchInput || selectedContinent || selectedStyle);
  const activeFilterCount = [searchInput, selectedContinent, selectedStyle].filter(Boolean).length;

  // Sidebar content - conditionally rendered based on CMS config
  const sidebar = showFilters ? (
    <>
      {/* Search */}
      {showSearch && (
        <FilterSection label={dict.common?.search || 'Search'} showDivider={true}>
          <FilterSearch
            value={searchInput}
            onChange={setSearchInput}
            placeholder={listingConfig?.searchPlaceholder || 'Search destinations...'}
          />
        </FilterSection>
      )}

      {/* Region / Continent */}
      {showContinentFilter && (
        <FilterSection label={dict.listing?.region || 'Region'} showDivider={true}>
          <FilterChipGroup
            options={continentOptions}
            value={selectedContinent}
            onChange={setSelectedContinent}
          />
        </FilterSection>
      )}

      {/* Travel Style */}
      {showTravelStyleFilter && (
        <FilterSection label={dict.listing?.travelStyle || 'Travel Style'} showDivider={true}>
          <FilterChipGroup
            options={travelStyleOptions}
            value={selectedStyle}
            onChange={setSelectedStyle}
          />
        </FilterSection>
      )}

      {/* Season */}
      {showSeasonFilter && (
        <FilterSection label={dict.listing?.season || 'Season'} showDivider={false}>
          <FilterChipGroup
            options={seasonOptions}
            value=""
            onChange={() => {}}
          />
        </FilterSection>
      )}

      {/* Clear Filters */}
      <div className="mt-8">
        <ClearFilters
          onClick={clearFilters}
          label={dict.listing?.clearFilters || 'Clear all'}
          visible={hasActiveFilters}
        />
      </div>
    </>
  ) : null;

  // Header
  const header = (
    <ResultsHeader
      showing={displayedCountries.length}
      total={filteredCountries.length}
      label={dict.destinations?.countries?.toLowerCase() || 'destinations'}
    />
  );

  return (
    <section className="section-lg bg-surface-primary">
      <div className="container-wide">
        <ListingLayout
          sidebar={sidebar}
          header={header}
          filterButtonText={dict.listing?.filters || 'Filters'}
          activeFilterCount={activeFilterCount}
        >
          {displayedCountries.length > 0 ? (
            <>
              <ListingGrid columns={{ sm: 1, md: 2, lg: 2, xl: 3 }} gap="lg">
                {displayedCountries.map((country) => (
                  <DestinationCard
                    key={country.id}
                    href={localePath(`/destinations/${country.slug}`)}
                    image={getImageUrl(country.featuredImage)}
                    title={country.name}
                    subtitle={country.excerpt}
                    location={continentOptions.find(c => c.value === country.continent)?.label}
                  />
                ))}
              </ListingGrid>

              <LoadMore
                onClick={loadMore}
                isLoading={isLoading}
                hasMore={hasMore}
                remainingCount={remainingCount}
                label={dict.listing?.loadMore || 'Load more'}
              />
            </>
          ) : (
            <EmptyState
              message={emptyStateConfig?.title || dict.destinations?.noResults || 'No destinations found'}
              description={emptyStateConfig?.message || 'Try adjusting your filters to find what you\'re looking for.'}
              action={hasActiveFilters ? { label: 'Clear filters', onClick: clearFilters } : undefined}
              icon="compass"
            />
          )}
        </ListingLayout>
      </div>
    </section>
  );
}
