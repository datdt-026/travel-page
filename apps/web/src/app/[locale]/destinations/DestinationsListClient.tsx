'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Country, City, Media } from '@/types';
import { getMediaImageUrl } from '@/lib/api';

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

/**
 * Get image URL from Media object or string
 */
function getImageUrl(image: Media | string | undefined): string | undefined {
  return getMediaImageUrl(image, ['card', 'hero']);
}

// Continent names mapping
const continentNames: Record<string, string> = {
  'africa': 'Africa',
  'asia': 'Asia',
  'europe': 'Europe',
  'north-america': 'North America',
  'oceania': 'Oceania',
  'south-america': 'South America',
};

const continents = Object.keys(continentNames);

interface DestinationsListClientProps {
  initialCountries: Country[];
  initialCities: City[];
  totalCountries: number;
  totalCities: number;
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
  };
}

const ITEMS_PER_PAGE = 12;

export default function DestinationsListClient({
  initialCountries,
  initialCities,
  totalCountries,
  totalCities,
  locale,
  dict,
}: DestinationsListClientProps) {
  const [countries] = useState<Country[]>(initialCountries);
  const [cities] = useState<City[]>(initialCities);
  const [searchInput, setSearchInput] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [activeTab, setActiveTab] = useState<'countries' | 'cities'>('countries');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // Debounce search query
  const searchQuery = useDebounce(searchInput, 300);

  const localePath = (path: string) => `/${locale}${path}`;

  // Filter countries client-side
  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
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
  }, [countries, searchQuery, selectedContinent]);

  // Filter cities client-side
  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          city.name?.toLowerCase().includes(query) ||
          city.excerpt?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Continent filter (via country)
      if (selectedContinent) {
        const country = city.country as Country;
        if (country && country.continent !== selectedContinent) {
          return false;
        }
      }

      return true;
    });
  }, [cities, searchQuery, selectedContinent]);

  // Get current items based on active tab
  const currentItems = activeTab === 'countries' ? filteredCountries : filteredCities;
  const displayedItems = currentItems.slice(0, displayCount);
  const hasMore = displayCount < currentItems.length;

  // Reset display count when filters/tab change
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedContinent, activeTab]);

  const loadMore = useCallback(() => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchInput('');
    setSelectedContinent('');
    setDisplayCount(ITEMS_PER_PAGE);
  }, []);

  const hasActiveFilters = searchInput || selectedContinent;
  const activeFilterCount = [searchInput, selectedContinent].filter(Boolean).length;

  return (
    <section className="py-16 md:py-24 bg-surface-secondary">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-heading-xl text-content-primary mb-4">
            {dict.common?.viewAll || 'Browse All'} {dict.destinations?.title || 'Destinations'}
          </h2>
          <p className="text-body-lg text-content-muted max-w-2xl mx-auto">
            Explore our complete collection of destinations with filters and search
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-surface-primary border border-border-light rounded-sm p-1">
            <button
              onClick={() => setActiveTab('countries')}
              className={`px-6 py-3 text-label-md uppercase tracking-wider transition-all duration-300 rounded-sm ${
                activeTab === 'countries'
                  ? 'bg-content-primary text-content-inverse'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
            >
              {dict.destinations?.countries || 'Countries'} ({filteredCountries.length})
            </button>
            <button
              onClick={() => setActiveTab('cities')}
              className={`px-6 py-3 text-label-md uppercase tracking-wider transition-all duration-300 rounded-sm ${
                activeTab === 'cities'
                  ? 'bg-content-primary text-content-inverse'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
            >
              {dict.destinations?.cities || 'Cities'} ({filteredCities.length})
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-surface-primary border border-border-light rounded-sm text-content-secondary hover:text-content-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="font-medium">Filters</span>
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
            <div className="bg-surface-primary border border-border-light rounded-sm p-6 lg:sticky lg:top-32">
              {/* Mobile Close Button */}
              <div className="flex items-center justify-between lg:hidden mb-6">
                <h3 className="font-serif text-heading-sm text-content-primary">
                  Filters
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
                    placeholder={`Search ${activeTab}...`}
                    className="w-full px-4 py-3 pr-10 bg-surface-secondary border border-border-light rounded-sm text-body-md text-content-primary placeholder:text-content-light focus:outline-none focus:border-accent transition-colors"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-content-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border-light mb-6" />

              {/* Continent Filter */}
              <div className="mb-6">
                <label className="block text-label-sm uppercase text-content-muted mb-3 tracking-wider">
                  {dict.common?.continent || 'Continent'}
                </label>
                <select
                  value={selectedContinent}
                  onChange={(e) => setSelectedContinent(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-secondary border border-border-light rounded-sm text-body-md text-content-primary focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237A7A7A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25rem' }}
                >
                  <option value="">All Continents</option>
                  {continents.map((continent) => (
                    <option key={continent} value={continent}>{continentNames[continent]}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-3 border border-accent text-accent hover:bg-accent hover:text-content-inverse rounded-sm text-label-md uppercase tracking-wider transition-colors duration-300"
                >
                  Clear All Filters
                </button>
              )}

              {/* Mobile Apply Button */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden w-full mt-4 px-4 py-3 bg-accent text-content-inverse rounded-sm text-label-md uppercase tracking-wider transition-colors duration-300 hover:bg-accent/90"
              >
                Show {currentItems.length} Results
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-body-md text-content-muted">
                Showing{' '}
                <span className="text-content-primary font-medium">{displayedItems.length}</span>{' '}
                of{' '}
                <span className="text-content-primary font-medium">{currentItems.length}</span>{' '}
                {activeTab}
              </p>
            </div>

            {/* Items Grid */}
            {displayedItems.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {activeTab === 'countries' ? (
                  // Countries Grid
                  (displayedItems as Country[]).map((country) => {
                    const imageUrl = getImageUrl(country.featuredImage);
                    
                    return (
                      <Link
                        key={country.id}
                        href={localePath(`/destinations/${country.slug}`)}
                        className="group block"
                      >
                        <div className="aspect-[4/3] bg-surface-tertiary relative overflow-hidden mb-5 rounded-sm">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={country.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-6xl">🌍</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <span className="absolute top-4 right-4 px-3 py-1.5 bg-surface-primary/90 backdrop-blur-sm text-label-sm uppercase text-content-secondary rounded-sm">
                            {continentNames[country.continent] || country.continent}
                          </span>
                        </div>
                        <h3 className="font-serif text-heading-md text-content-primary mb-2 group-hover:text-accent transition-colors duration-300">
                          {country.name}
                        </h3>
                        {country.excerpt && (
                          <p className="text-body-sm text-content-muted line-clamp-2">
                            {country.excerpt}
                          </p>
                        )}
                      </Link>
                    );
                  })
                ) : (
                  // Cities Grid
                  (displayedItems as City[]).map((city) => {
                    const imageUrl = getImageUrl(city.featuredImage);
                    const country = city.country as Country;
                    
                    return (
                      <Link
                        key={city.id}
                        href={localePath(`/cities/${city.slug}`)}
                        className="group block"
                      >
                        <div className="aspect-[4/3] bg-surface-tertiary relative overflow-hidden mb-5 rounded-sm">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={city.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-6xl">🏙️</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          {country && (
                            <span className="absolute top-4 right-4 px-3 py-1.5 bg-surface-primary/90 backdrop-blur-sm text-label-sm uppercase text-content-secondary rounded-sm">
                              {country.name}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-heading-md text-content-primary mb-2 group-hover:text-accent transition-colors duration-300">
                          {city.name}
                        </h3>
                        {city.excerpt && (
                          <p className="text-body-sm text-content-muted line-clamp-2">
                            {city.excerpt}
                          </p>
                        )}
                      </Link>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="text-center py-16 px-8 bg-surface-primary rounded-sm">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-surface-tertiary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-content-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-content-muted text-body-lg mb-2">
                  {dict.destinations?.noResults || dict.common?.noResults || 'No destinations found'}
                </p>
                <p className="text-content-light text-body-md mb-6">
                  Try adjusting your filters or search criteria
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-content-inverse rounded-sm text-label-md uppercase tracking-wider transition-colors duration-300 hover:bg-accent/90"
                  >
                    Clear All Filters
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
                      <span>Load More</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="mt-4 text-body-sm text-content-light">
                  {currentItems.length - displayCount} more to show
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
