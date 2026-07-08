'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Attraction, City } from '@/types';
import { getImageUrl } from '@/lib/api';

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
interface AttractionsClientProps {
  initialAttractions: Attraction[];
  totalDocs: number;
  locale: string;
  dict: {
    attractions?: {
      title?: string;
      search?: string;
      filters?: string;
      category?: string;
      city?: string;
      rating?: string;
      allCategories?: string;
      allCities?: string;
      allRatings?: string;
      loadMore?: string;
      showing?: string;
      of?: string;
      noResults?: string;
      clearFilters?: string;
    };
    common?: {
      search?: string;
      noResults?: string;
      loading?: string;
    };
  };
  cities: City[];
}

const ITEMS_PER_PAGE = 9;

const categoryNames: Record<string, string> = {
  'landmark': 'Landmarks',
  'museum': 'Museums',
  'park': 'Parks',
  'beach': 'Beaches',
  'religious-site': 'Religious Sites',
  'entertainment': 'Entertainment',
  'shopping': 'Shopping',
  'restaurant': 'Restaurants',
  'nature': 'Nature',
  'historical': 'Historical Sites',
  'adventure': 'Adventure',
  'other': 'Other',
};

const categories = Object.keys(categoryNames);

const ratingOptions = [
  { value: '', label: 'All Ratings' },
  { value: '4.5', label: '4.5+ ★' },
  { value: '4', label: '4+ ★' },
  { value: '3.5', label: '3.5+ ★' },
  { value: '3', label: '3+ ★' },
];

export default function AttractionsClient({
  initialAttractions,
  totalDocs,
  locale,
  dict,
  cities,
}: AttractionsClientProps) {
  const [attractions] = useState<Attraction[]>(initialAttractions);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // Debounce search query to prevent lag
  const searchQuery = useDebounce(searchInput, 300);

  const localePath = (path: string) => `/${locale}${path}`;

  // Filter attractions client-side
  const filteredAttractions = useMemo(() => {
    return attractions.filter((attraction) => {
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

      // Rating filter
      if (selectedRating) {
        const minRating = parseFloat(selectedRating);
        if (!attraction.rating || attraction.rating < minRating) return false;
      }

      return true;
    });
  }, [attractions, searchQuery, selectedCategory, selectedCity, selectedRating]);

  // Display only items up to displayCount
  const displayedAttractions = filteredAttractions.slice(0, displayCount);
  const hasMore = displayCount < filteredAttractions.length;

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedCategory, selectedCity, selectedRating]);

  const loadMore = useCallback(() => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchInput('');
    setSelectedCategory('');
    setSelectedCity('');
    setSelectedRating('');
    setDisplayCount(ITEMS_PER_PAGE);
  }, []);

  const hasActiveFilters = searchInput || selectedCategory || selectedCity || selectedRating;

  const activeFilterCount = [searchInput, selectedCategory, selectedCity, selectedRating].filter(Boolean).length;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-surface-secondary border border-border-light rounded-sm text-content-secondary hover:text-content-primary transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="font-medium">{dict.attractions?.filters || 'Filters'}</span>
        {activeFilterCount > 0 && (
          <span className="flex items-center justify-center w-5 h-5 bg-accent text-content-inverse text-xs rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Sidebar Filters */}
      <aside className={`
        lg:w-72 xl:w-80 flex-shrink-0
        ${isSidebarOpen ? 'block' : 'hidden'} lg:block
        fixed lg:relative inset-0 z-50 lg:z-auto
        bg-surface-primary lg:bg-transparent
        overflow-y-auto lg:overflow-visible
        p-6 lg:p-0
      `}>
        {/* Mobile Overlay */}
        <div
          className="lg:hidden fixed inset-0 bg-black/50 -z-10"
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Filter Panel */}
        <div className="bg-surface-secondary border border-border-light rounded-sm p-6 lg:sticky lg:top-32">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between lg:hidden mb-6">
            <h3 className="font-serif text-heading-sm text-content-primary">
              {dict.attractions?.filters || 'Filters'}
            </h3>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-surface-tertiary rounded-sm transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-label-sm uppercase text-content-muted mb-3 tracking-wider">
              {dict.common?.search || 'Search'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={dict.attractions?.search || 'Search attractions...'}
                className="w-full px-4 py-3 pr-10 bg-surface-primary border border-border-light rounded-sm text-body-md text-content-primary placeholder:text-content-light focus:outline-none focus:border-accent transition-colors"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-content-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border-light mb-6" />

          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-label-sm uppercase text-content-muted mb-3 tracking-wider">
              {dict.attractions?.category || 'Category'}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-surface-primary border border-border-light rounded-sm text-body-md text-content-primary focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237A7A7A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
            >
              <option value="">{dict.attractions?.allCategories || 'All Categories'}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{categoryNames[cat]}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div className="mb-6">
            <label className="block text-label-sm uppercase text-content-muted mb-3 tracking-wider">
              {dict.attractions?.city || 'City'}
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 bg-surface-primary border border-border-light rounded-sm text-body-md text-content-primary focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237A7A7A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
            >
              <option value="">{dict.attractions?.allCities || 'All Cities'}</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <label className="block text-label-sm uppercase text-content-muted mb-3 tracking-wider">
              {dict.attractions?.rating || 'Rating'}
            </label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full px-4 py-3 bg-surface-primary border border-border-light rounded-sm text-body-md text-content-primary focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237A7A7A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
            >
              {ratingOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full px-4 py-3 border border-accent text-accent hover:bg-accent hover:text-content-inverse rounded-sm text-label-md uppercase tracking-wider transition-colors duration-300"
            >
              {dict.attractions?.clearFilters || 'Clear All Filters'}
            </button>
          )}

          {/* Mobile Apply Button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden w-full mt-4 px-4 py-3 bg-accent text-content-inverse rounded-sm text-label-md uppercase tracking-wider transition-colors duration-300 hover:bg-accent/90"
          >
            {`${dict.attractions?.showing || 'Show'} ${filteredAttractions.length} ${dict.attractions?.of || 'Results'}`}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-body-md text-content-muted">
            {dict.attractions?.showing || 'Showing'}{' '}
            <span className="text-content-primary font-medium">{displayedAttractions.length}</span>{' '}
            {dict.attractions?.of || 'of'}{' '}
            <span className="text-content-primary font-medium">{filteredAttractions.length}</span>{' '}
            {dict.attractions?.title?.toLowerCase() || 'attractions'}
          </p>
        </div>

        {/* Attractions Grid */}
        {displayedAttractions.length > 0 ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {displayedAttractions.map((attraction) => {
              const city = attraction.city as City;
              return (
                <Link
                  key={attraction.id}
                  href={localePath(`/attractions/${attraction.slug}`)}
                  className="group block"
                >
                  <div className="aspect-[4/3] bg-surface-tertiary relative overflow-hidden mb-5">
                    {attraction.featuredImage &&
                      typeof attraction.featuredImage === 'object' && (
                        <div
                          className="w-full h-full bg-cover bg-center img-zoom"
                          style={{
                            backgroundImage: `url(${getImageUrl(attraction.featuredImage.url)})`,
                          }}
                        />
                      )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute top-4 right-4 px-3 py-1.5 bg-surface-primary/90 backdrop-blur-sm text-label-sm uppercase text-content-secondary">
                      {categoryNames[attraction.category] || attraction.category}
                    </span>
                  </div>
                  <h2 className="font-serif text-heading-md text-content-primary mb-2 group-hover:text-accent transition-colors duration-300">
                    {attraction.name}
                  </h2>
                  <p className="text-body-sm text-content-muted line-clamp-2 mb-3">{attraction.excerpt}</p>
                  <div className="flex items-center justify-between">
                    {city && (
                      <span className="text-label-sm uppercase text-content-light">
                        {city.name}
                      </span>
                    )}
                    {attraction.rating && (
                      <div className="flex items-center text-body-sm text-content-muted">
                        <span className="text-accent">★</span>
                        <span className="ml-1">{attraction.rating}</span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-8 bg-surface-secondary rounded-sm">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-surface-tertiary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-content-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-content-muted text-body-lg mb-2">
              {dict.attractions?.noResults || dict.common?.noResults || 'No attractions found'}
            </p>
            <p className="text-content-light text-body-md mb-6">
              Try adjusting your filters or search criteria
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-content-inverse rounded-sm text-label-md uppercase tracking-wider transition-colors duration-300 hover:bg-accent/90"
              >
                {dict.attractions?.clearFilters || 'Clear All Filters'}
              </button>
            )}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="inline-flex items-center gap-3 px-8 py-4 border border-content-primary text-content-primary hover:bg-content-primary hover:text-content-inverse rounded-sm text-label-md uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{dict.common?.loading || 'Loading...'}</span>
                </>
              ) : (
                <>
                  <span>{dict.attractions?.loadMore || 'Load More'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
            <p className="mt-4 text-body-sm text-content-light">
              {filteredAttractions.length - displayCount} more to show
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
