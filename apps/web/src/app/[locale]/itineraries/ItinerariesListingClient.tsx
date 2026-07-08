'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Itinerary } from '@/types';
import { getImageUrl } from '@/lib/api';
import {
  ListingLayout,
  ListingGrid,
  ItineraryCard,
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

// Duration options
const durationOptions = [
  { value: '1-3', label: '1-3 days' },
  { value: '4-7', label: '4-7 days' },
  { value: '8-14', label: '8-14 days' },
  { value: '15+', label: '15+ days' },
];

// Pace options
const paceOptions = [
  { value: 'easy', label: 'Relaxed' },
  { value: 'moderate', label: 'Balanced' },
  { value: 'challenging', label: 'Active' },
];

// Theme options (travel styles)
const themeOptions = [
  { value: 'cultural', label: 'Cultural' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'relaxation', label: 'Relaxation' },
  { value: 'foodie', label: 'Culinary' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'family', label: 'Family' },
];

const themeLabels: Record<string, string> = {
  'adventure': 'Adventure',
  'cultural': 'Cultural',
  'relaxation': 'Relaxation',
  'foodie': 'Culinary',
  'family': 'Family',
  'romantic': 'Romantic',
  'budget': 'Budget',
  'luxury': 'Luxury',
  'solo': 'Solo',
  'backpacking': 'Backpacking',
};

const paceLabels: Record<string, string> = {
  'easy': 'Relaxed',
  'moderate': 'Balanced',
  'challenging': 'Active',
};

interface ItinerariesListingClientProps {
  initialItineraries: Itinerary[];
  locale: string;
  dict: {
    itineraries?: {
      title?: string;
      noResults?: string;
      budget?: string;
    };
    common?: {
      search?: string;
      noResults?: string;
      loading?: string;
      days?: string;
    };
    listing?: {
      filters?: string;
      clearFilters?: string;
      loadMore?: string;
      duration?: string;
      pace?: string;
      theme?: string;
    };
  };
  listingConfig?: {
    itemsPerPage?: number;
    layout?: 'grid' | 'list' | 'cards';
    columns?: '2' | '3' | '4';
    showFilters?: boolean;
    showSearch?: boolean;
    searchPlaceholder?: string;
    filterOptions?: {
      showDurationFilter?: boolean;
      showDifficultyFilter?: boolean;
      showStyleFilter?: boolean;
      showCountryFilter?: boolean;
    };
  };
  featuredConfig?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    displayMode?: 'auto' | 'manual';
    manualItems?: Itinerary[] | string[];
    limit?: number;
  };
  emptyStateConfig?: {
    title?: string;
    message?: string;
  };
}

const ITEMS_PER_PAGE = 9;

export default function ItinerariesListingClient({
  initialItineraries,
  locale,
  dict,
  listingConfig,
  featuredConfig,
  emptyStateConfig,
}: ItinerariesListingClientProps) {
  // CMS config with defaults
  const itemsPerPage = listingConfig?.itemsPerPage || ITEMS_PER_PAGE;
  const showSearch = listingConfig?.showSearch !== false;
  const showFilters = listingConfig?.showFilters !== false;
  const showDurationFilter = listingConfig?.filterOptions?.showDurationFilter !== false;
  const showDifficultyFilter = listingConfig?.filterOptions?.showDifficultyFilter !== false;
  const showStyleFilter = listingConfig?.filterOptions?.showStyleFilter !== false;
  const searchPlaceholder = listingConfig?.searchPlaceholder || 'Search itineraries...';

  // Get featured itineraries
  const getFeaturedItineraries = (): Itinerary[] => {
    if (!featuredConfig?.enabled) return [];
    
    if (featuredConfig.displayMode === 'manual' && featuredConfig.manualItems) {
      const manualIds = featuredConfig.manualItems.map((item: Itinerary | string) => 
        typeof item === 'object' ? item.id : item
      );
      return initialItineraries.filter(i => manualIds.includes(i.id));
    }
    
    // Auto mode: return first N items
    const limit = featuredConfig.limit || 3;
    return initialItineraries.slice(0, limit);
  };

  const featuredItineraries = getFeaturedItineraries();

  // Filter states
  const [searchInput, setSearchInput] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedPace, setSelectedPace] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [displayCount, setDisplayCount] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search
  const searchQuery = useDebounce(searchInput, 300);

  const localePath = (path: string) => `/${locale}${path}`;

  // Parse duration range
  const getDurationRange = (value: string): [number, number] => {
    switch (value) {
      case '1-3': return [1, 3];
      case '4-7': return [4, 7];
      case '8-14': return [8, 14];
      case '15+': return [15, 999];
      default: return [0, 999];
    }
  };

  // Filter itineraries
  const filteredItineraries = useMemo(() => {
    return initialItineraries.filter((itinerary) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          itinerary.title?.toLowerCase().includes(query) ||
          itinerary.excerpt?.toLowerCase().includes(query) ||
          itinerary.travelStyle?.some(s => s.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Duration filter
      if (selectedDuration) {
        const [min, max] = getDurationRange(selectedDuration);
        if (itinerary.duration < min || itinerary.duration > max) return false;
      }

      // Pace filter
      if (selectedPace && itinerary.difficulty !== selectedPace) {
        return false;
      }

      // Theme filter
      if (selectedTheme && !itinerary.travelStyle?.includes(selectedTheme as any)) {
        return false;
      }

      return true;
    });
  }, [initialItineraries, searchQuery, selectedDuration, selectedPace, selectedTheme]);

  // Display items
  const displayedItineraries = filteredItineraries.slice(0, displayCount);
  const hasMore = displayCount < filteredItineraries.length;
  const remainingCount = filteredItineraries.length - displayCount;

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(itemsPerPage);
  }, [searchQuery, selectedDuration, selectedPace, selectedTheme, itemsPerPage]);

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
    setSelectedDuration('');
    setSelectedPace('');
    setSelectedTheme('');
    setDisplayCount(itemsPerPage);
  }, [itemsPerPage]);

  const hasActiveFilters = Boolean(searchInput || selectedDuration || selectedPace || selectedTheme);
  const activeFilterCount = [searchInput, selectedDuration, selectedPace, selectedTheme].filter(Boolean).length;

  // Sidebar content
  const sidebar = (
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

      {/* Duration */}
      {showDurationFilter && (
        <FilterSection label={dict.listing?.duration || 'Duration'} showDivider={true}>
          <FilterChipGroup
            options={durationOptions}
            value={selectedDuration}
            onChange={setSelectedDuration}
          />
        </FilterSection>
      )}

      {/* Pace */}
      {showDifficultyFilter && (
        <FilterSection label={dict.listing?.pace || 'Pace'} showDivider={true}>
          <FilterChipGroup
            options={paceOptions}
            value={selectedPace}
            onChange={setSelectedPace}
          />
        </FilterSection>
      )}

      {/* Theme */}
      {showStyleFilter && (
        <FilterSection label={dict.listing?.theme || 'Theme'} showDivider={false}>
          <FilterChipGroup
            options={themeOptions}
            value={selectedTheme}
            onChange={setSelectedTheme}
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
  );

  // Header
  const header = (
    <ResultsHeader
      showing={displayedItineraries.length}
      total={filteredItineraries.length}
      label={dict.itineraries?.title?.toLowerCase() || 'itineraries'}
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
          {displayedItineraries.length > 0 ? (
            <>
              <ListingGrid columns={{ sm: 1, md: 2, lg: 2, xl: 3 }} gap="lg">
                {displayedItineraries.map((itinerary) => {
                  const imageUrl = itinerary.featuredImage && typeof itinerary.featuredImage === 'object'
                    ? getImageUrl(itinerary.featuredImage.url)
                    : undefined;

                  // Get primary theme
                  const primaryTheme = itinerary.travelStyle?.[0];
                  const themeLabel = primaryTheme ? themeLabels[primaryTheme] || primaryTheme : undefined;

                  return (
                    <ItineraryCard
                      key={itinerary.id}
                      href={localePath(`/itineraries/${itinerary.slug}`)}
                      image={imageUrl}
                      title={itinerary.title}
                      subtitle={itinerary.excerpt}
                      duration={itinerary.duration}
                      daysLabel={dict.common?.days || 'days'}
                      theme={themeLabel}
                      pace={itinerary.difficulty ? paceLabels[itinerary.difficulty] : undefined}
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
              message={emptyStateConfig?.title || dict.itineraries?.noResults || 'No itineraries found'}
              description={emptyStateConfig?.message || "Try adjusting your filters to find the perfect journey."}
              action={hasActiveFilters ? { label: 'Clear filters', onClick: clearFilters } : undefined}
              icon="compass"
            />
          )}
        </ListingLayout>
      </div>
    </section>
  );
}
