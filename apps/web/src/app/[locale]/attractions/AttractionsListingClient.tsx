'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Attraction, City } from '@/types';
import { getImageUrl } from '@/lib/api';
import {
  ListingLayout,
  ListingGrid,
  AttractionCard,
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

// Category options
const categoryOptions = [
  { value: 'nature', label: 'Nature' },
  { value: 'landmark', label: 'Landmark' },
  { value: 'museum', label: 'Museum' },
  { value: 'historical', label: 'Historical' },
  { value: 'religious-site', label: 'Spiritual' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'entertainment', label: 'Experience' },
];

const categoryNames: Record<string, string> = {
  'landmark': 'Landmark',
  'museum': 'Museum',
  'park': 'Park',
  'beach': 'Beach',
  'religious-site': 'Spiritual',
  'entertainment': 'Experience',
  'shopping': 'Shopping',
  'restaurant': 'Dining',
  'nature': 'Nature',
  'historical': 'Historical',
  'adventure': 'Adventure',
  'other': 'Other',
};

interface AttractionsListingClientProps {
  initialAttractions: Attraction[];
  cities: City[];
  locale: string;
  dict: {
    attractions?: {
      title?: string;
      search?: string;
      filters?: string;
      category?: string;
      city?: string;
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
    layout?: 'grid' | 'list' | 'masonry';
    columns?: '2' | '3' | '4';
    showFilters?: boolean;
    showSearch?: boolean;
    searchPlaceholder?: string;
    filterOptions?: {
      showCityFilter?: boolean;
      showCategoryFilter?: boolean;
      showRatingFilter?: boolean;
      showPriceFilter?: boolean;
    };
  };
  featuredConfig?: {
    enabled?: boolean;
    title?: string;
    displayMode?: 'auto' | 'manual';
    manualItems?: Attraction[] | string[];
    limit?: number;
  };
  emptyStateConfig?: {
    title?: string;
    message?: string;
  };
}

const ITEMS_PER_PAGE = 9;

export default function AttractionsListingClient({
  initialAttractions,
  cities,
  locale,
  dict,
  listingConfig,
  featuredConfig,
  emptyStateConfig,
}: AttractionsListingClientProps) {
  // CMS config with defaults
  const itemsPerPage = listingConfig?.itemsPerPage || ITEMS_PER_PAGE;
  const showSearch = listingConfig?.showSearch !== false;
  const showFilters = listingConfig?.showFilters !== false;
  const showCityFilter = listingConfig?.filterOptions?.showCityFilter !== false;
  const showCategoryFilter = listingConfig?.filterOptions?.showCategoryFilter !== false;
  const gridColumns = listingConfig?.columns || '3';
  const searchPlaceholder = listingConfig?.searchPlaceholder || 'Search attractions...';

  // Get featured attractions
  const getFeaturedAttractions = (): Attraction[] => {
    if (!featuredConfig?.enabled) return [];
    
    if (featuredConfig.displayMode === 'manual' && featuredConfig.manualItems) {
      const manualIds = featuredConfig.manualItems.map((item: Attraction | string) => 
        typeof item === 'object' ? item.id : item
      );
      return initialAttractions.filter(a => manualIds.includes(a.id));
    }
    
    // Auto mode: just take first N items (ideally sorted by rating)
    const limit = featuredConfig.limit || 4;
    return initialAttractions.slice(0, limit);
  };

  const featuredAttractions = getFeaturedAttractions();

  // Filter states
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [displayCount, setDisplayCount] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search
  const searchQuery = useDebounce(searchInput, 300);

  const localePath = (path: string) => `/${locale}${path}`;

  // City options for filter
  const cityOptions = useMemo(() => 
    cities.map(city => ({ value: city.id, label: city.name })),
    [cities]
  );

  // Filter attractions
  const filteredAttractions = useMemo(() => {
    return initialAttractions.filter((attraction) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          attraction.name?.toLowerCase().includes(query) ||
          attraction.excerpt?.toLowerCase().includes(query) ||
          categoryNames[attraction.category]?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory && attraction.category !== selectedCategory) {
        return false;
      }

      // City filter
      if (selectedCity) {
        const cityId = typeof attraction.city === 'object' ? attraction.city.id : attraction.city;
        if (cityId !== selectedCity) return false;
      }

      return true;
    });
  }, [initialAttractions, searchQuery, selectedCategory, selectedCity]);

  // Display items
  const displayedAttractions = filteredAttractions.slice(0, displayCount);
  const hasMore = displayCount < filteredAttractions.length;
  const remainingCount = filteredAttractions.length - displayCount;

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(itemsPerPage);
  }, [searchQuery, selectedCategory, selectedCity, itemsPerPage]);

  // Load more handler
  const loadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + itemsPerPage);
      setIsLoading(false);
    }, 300);
  }, [itemsPerPage]);

  // Clear filters
  const clearFilters = useCallback(() => {
    setSearchInput('');
    setSelectedCategory('');
    setSelectedCity('');
    setDisplayCount(itemsPerPage);
  }, [itemsPerPage]);

  const hasActiveFilters = Boolean(searchInput || selectedCategory || selectedCity);
  const activeFilterCount = [searchInput, selectedCategory, selectedCity].filter(Boolean).length;

  // Sidebar content
  const sidebar = showFilters ? (
    <>
      {/* Search */}
      {showSearch && (
      <FilterSection label={dict.common?.search || 'Search'} showDivider={true}>
        <FilterSearch
          value={searchInput}
          onChange={setSearchInput}
          placeholder={searchPlaceholder}
        />
      </FilterSection>
      )}

      {/* Type / Category */}
      {showCategoryFilter && (
      <FilterSection label={dict.listing?.type || 'Type'} showDivider={true}>
        <FilterChipGroup
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </FilterSection>
      )}

      {/* Location / City */}
      {showCityFilter && (
      <FilterSection label={dict.listing?.location || 'Location'} showDivider={false}>
        <FilterChipGroup
          options={cityOptions.slice(0, 8)}
          value={selectedCity}
          onChange={setSelectedCity}
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

  // Grid columns based on CMS config
  const gridColumnConfig: { sm: 1 | 2; md: 2 | 3; lg: 2 | 3; xl: 2 | 3 | 4 } = {
    sm: 1,
    md: 2,
    lg: gridColumns === '2' ? 2 : 2,
    xl: gridColumns === '4' ? 4 : gridColumns === '2' ? 2 : 3,
  };

  // Header
  const header = (
    <ResultsHeader
      showing={displayedAttractions.length}
      total={filteredAttractions.length}
      label={dict.attractions?.title?.toLowerCase() || 'attractions'}
    />
  );

  return (
    <section className="section-lg bg-surface-primary">
      <div className="container-wide">
        {/* Featured Attractions Section */}
        {featuredConfig?.enabled && featuredAttractions.length > 0 && (
          <div className="mb-16">
            <h2 className="font-serif text-heading-lg text-content-primary mb-8">
              {featuredConfig.title || 'Featured Attractions'}
            </h2>
            <ListingGrid columns={{ sm: 1, md: 2, lg: 2, xl: 4 }} gap="lg">
              {featuredAttractions.map((attraction) => {
                const city = attraction.city as City;
                const imageUrl = attraction.featuredImage && typeof attraction.featuredImage === 'object'
                  ? getImageUrl(attraction.featuredImage.url)
                  : undefined;

                return (
                  <AttractionCard
                    key={attraction.id}
                    href={localePath(`/attractions/${attraction.slug}`)}
                    image={imageUrl}
                    title={attraction.name}
                    subtitle={attraction.excerpt}
                    category={categoryNames[attraction.category] || attraction.category}
                    location={city?.name}
                  />
                );
              })}
            </ListingGrid>
          </div>
        )}

        <ListingLayout
          sidebar={sidebar}
          header={header}
          filterButtonText={dict.listing?.filters || 'Filters'}
          activeFilterCount={activeFilterCount}
        >
          {displayedAttractions.length > 0 ? (
            <>
              <ListingGrid columns={gridColumnConfig} gap="lg">
                {displayedAttractions.map((attraction) => {
                  const city = attraction.city as City;
                  const imageUrl = attraction.featuredImage && typeof attraction.featuredImage === 'object'
                    ? getImageUrl(attraction.featuredImage.url)
                    : undefined;

                  return (
                    <AttractionCard
                      key={attraction.id}
                      href={localePath(`/attractions/${attraction.slug}`)}
                      image={imageUrl}
                      title={attraction.name}
                      subtitle={attraction.excerpt}
                      category={categoryNames[attraction.category] || attraction.category}
                      location={city?.name}
                    />
                  );
                })}
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
              message={emptyStateConfig?.title || dict.attractions?.noResults || 'No attractions found'}
              description={emptyStateConfig?.message || 'Try adjusting your filters to discover something new.'}
              action={hasActiveFilters ? { label: 'Clear filters', onClick: clearFilters } : undefined}
              icon="search"
            />
          )}
        </ListingLayout>
      </div>
    </section>
  );
}
