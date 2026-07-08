'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';

interface ListingItem {
  id: string;
  slug: string;
  title?: string;
  name?: string;
  excerpt?: string;
  featuredImage?: { url?: string; alt?: string } | string;
  category?: string;
  duration?: string;
  difficulty?: string;
  country?: { name?: string };
  city?: { name?: string };
  createdAt?: string;
}

interface ListingGridProps {
  items: ListingItem[];
  basePath: string;
  config?: {
    layout?: 'grid' | 'list' | 'cards' | 'magazine';
    columns?: '2' | '3' | '4';
    showFilters?: boolean;
    filterOptions?: {
      showDurationFilter?: boolean;
      showDifficultyFilter?: boolean;
      showDestinationFilter?: boolean;
      showCountryFilter?: boolean;
      showCategoryFilter?: boolean;
    };
    showSearch?: boolean;
    searchPlaceholder?: string;
    sortOptions?: string[];
  };
  emptyState?: {
    title?: string;
    message?: string;
  };
  dict?: Record<string, unknown>;
}

export function ListingGrid({ items, basePath, config, emptyState, dict }: ListingGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState('newest');

  // Extract filter options from items
  const filterValues = {
    category: [...new Set(items.map(i => i.category).filter(Boolean))] as string[],
    duration: [...new Set(items.map(i => i.duration).filter(Boolean))] as string[],
    difficulty: [...new Set(items.map(i => i.difficulty).filter(Boolean))] as string[],
    country: [...new Set(items.map(i => i.country?.name).filter(Boolean))] as string[],
  };

  // Filter and sort items
  const filteredItems = items
    .filter((item) => {
      // Search
      if (searchQuery) {
        const searchText = (item.title || item.name || '').toLowerCase();
        if (!searchText.includes(searchQuery.toLowerCase())) return false;
      }

      // Filters
      for (const [key, value] of Object.entries(activeFilters)) {
        if (!value) continue;
        if (key === 'category' && item.category !== value) return false;
        if (key === 'duration' && item.duration !== value) return false;
        if (key === 'difficulty' && item.difficulty !== value) return false;
        if (key === 'country' && item.country?.name !== value) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      if (sortBy === 'name') {
        return (a.title || a.name || '').localeCompare(b.title || b.name || '');
      }
      return 0;
    });

  const columnClasses = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  const sortLabels: Record<string, string> = {
    newest: 'Newest First',
    popular: 'Most Popular',
    name: 'Alphabetical',
    duration: 'Duration',
    'price-asc': 'Price: Low to High',
    'price-desc': 'Price: High to Low',
  };

  return (
    <div>
      {/* Search and Filters */}
      {(config?.showSearch || config?.showFilters) && (
        <div className="mb-8 space-y-4">
          {/* Search */}
          {config?.showSearch && (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={config.searchPlaceholder || 'Search...'}
                className="w-full px-6 py-4 bg-surface-primary border border-border-light focus:outline-none focus:border-accent transition-colors duration-300 text-content-primary pl-12"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}

          {/* Filters Row */}
          {config?.showFilters && (
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              {config.filterOptions?.showCategoryFilter && filterValues.category.length > 0 && (
                <select
                  value={activeFilters.category || ''}
                  onChange={(e) => setActiveFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="px-4 py-2 bg-surface-primary border border-border-light focus:outline-none focus:border-accent text-body-sm"
                >
                  <option value="">All Categories</option>
                  {filterValues.category.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              )}

              {/* Duration Filter */}
              {config.filterOptions?.showDurationFilter && filterValues.duration.length > 0 && (
                <select
                  value={activeFilters.duration || ''}
                  onChange={(e) => setActiveFilters(prev => ({ ...prev, duration: e.target.value }))}
                  className="px-4 py-2 bg-surface-primary border border-border-light focus:outline-none focus:border-accent text-body-sm"
                >
                  <option value="">All Durations</option>
                  {filterValues.duration.map(dur => (
                    <option key={dur} value={dur}>{dur}</option>
                  ))}
                </select>
              )}

              {/* Difficulty Filter */}
              {config.filterOptions?.showDifficultyFilter && filterValues.difficulty.length > 0 && (
                <select
                  value={activeFilters.difficulty || ''}
                  onChange={(e) => setActiveFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                  className="px-4 py-2 bg-surface-primary border border-border-light focus:outline-none focus:border-accent text-body-sm"
                >
                  <option value="">All Difficulties</option>
                  {filterValues.difficulty.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              )}

              {/* Country Filter */}
              {(config.filterOptions?.showDestinationFilter || config.filterOptions?.showCountryFilter) && filterValues.country.length > 0 && (
                <select
                  value={activeFilters.country || ''}
                  onChange={(e) => setActiveFilters(prev => ({ ...prev, country: e.target.value }))}
                  className="px-4 py-2 bg-surface-primary border border-border-light focus:outline-none focus:border-accent text-body-sm"
                >
                  <option value="">All Destinations</option>
                  {filterValues.country.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}

              {/* Sort */}
              {config?.sortOptions && config.sortOptions.length > 0 && (
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-surface-primary border border-border-light focus:outline-none focus:border-accent text-body-sm ml-auto"
                >
                  {config.sortOptions.map(opt => (
                    <option key={opt} value={opt}>{sortLabels[opt] || opt}</option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
      )}

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <div className={`grid ${columnClasses[config?.columns || '3']} gap-8`}>
          {filteredItems.map((item) => {
            const imageUrl = item.featuredImage && typeof item.featuredImage === 'object'
              ? getImageUrl(item.featuredImage.url)
              : typeof item.featuredImage === 'string'
                ? item.featuredImage
                : null;

            const title = item.title || item.name || '';

            return (
              <Link
                key={item.id}
                href={`${basePath}/${item.slug}`}
                className="group block"
              >
                <div className="aspect-[4/3] bg-surface-tertiary relative overflow-hidden mb-5">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-content-light">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h3 className="font-serif text-heading-md text-content-primary mb-2 group-hover:text-accent transition-colors duration-300">
                  {title}
                </h3>
                
                {item.excerpt && (
                  <p className="text-body-sm text-content-muted line-clamp-2 mb-2">
                    {item.excerpt}
                  </p>
                )}

                {/* Meta info */}
                <div className="flex flex-wrap gap-2 text-label-sm uppercase text-content-light">
                  {item.category && <span>{item.category}</span>}
                  {item.duration && <span>• {item.duration}</span>}
                  {item.country?.name && <span>• {item.country.name}</span>}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="font-serif text-heading-md text-content-primary mb-2">
            {emptyState?.title || 'No items found'}
          </h3>
          <p className="text-body-md text-content-muted">
            {emptyState?.message || 'Try adjusting your search or filters.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default ListingGrid;
