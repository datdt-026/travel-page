'use client';

import { ReactNode } from 'react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LISTING GRID - Quiet Luxury Design
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Grid layout for listing cards with generous spacing.
 * 
 * Design Philosophy:
 * - 2-3 columns desktop
 * - 1 column mobile
 * - Khoảng cách lớn giữa card
 * - Generous whitespace
 */

interface ListingGridProps {
  /** Grid items */
  children: ReactNode;
  /** Number of columns at different breakpoints */
  columns?: {
    sm?: 1 | 2;
    md?: 2 | 3;
    lg?: 2 | 3;
    xl?: 2 | 3 | 4;
  };
  /** Gap between items */
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  /** Optional class name */
  className?: string;
}

const gapClasses = {
  sm: 'gap-4 md:gap-6',
  md: 'gap-6 md:gap-8',
  lg: 'gap-8 md:gap-10 lg:gap-12',
  xl: 'gap-10 md:gap-12 lg:gap-16',
};

export function ListingGrid({ 
  children, 
  columns = { sm: 1, md: 2, lg: 2, xl: 3 },
  gap = 'lg',
  className = '',
}: ListingGridProps) {
  const colClasses = [
    columns.sm === 2 ? 'grid-cols-2' : 'grid-cols-1',
    columns.md === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2',
    columns.lg === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2',
    columns.xl === 4 ? 'xl:grid-cols-4' : columns.xl === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-2',
  ].join(' ');

  return (
    <div className={`grid ${colClasses} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EMPTY STATE
// ═══════════════════════════════════════════════════════════════════════════

interface EmptyStateProps {
  /** Main message */
  message?: string;
  /** Secondary message */
  description?: string;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Icon type */
  icon?: 'search' | 'filter' | 'compass';
}

const icons = {
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  filter: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  compass: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
};

export function EmptyState({ 
  message = 'No results found',
  description,
  action,
  icon = 'search',
}: EmptyStateProps) {
  return (
    <div className="py-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 text-content-light">
        {icons[icon]}
      </div>
      <p className="text-heading-sm text-content-secondary mb-2">
        {message}
      </p>
      {description && (
        <p className="text-body-sm text-content-muted mb-6 max-w-md mx-auto">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="text-caption text-content-muted hover:text-content-primary underline underline-offset-4 decoration-border-light hover:decoration-content-muted transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// RESULTS HEADER
// ═══════════════════════════════════════════════════════════════════════════

interface ResultsHeaderProps {
  /** Current showing count */
  showing: number;
  /** Total results */
  total: number;
  /** Optional label (e.g., "destinations", "attractions") */
  label?: string;
  /** Optional sort options */
  sortOptions?: Array<{ value: string; label: string }>;
  /** Current sort value */
  sortValue?: string;
  /** Sort change handler */
  onSortChange?: (value: string) => void;
}

export function ResultsHeader({ 
  showing, 
  total, 
  label = 'results',
  sortOptions,
  sortValue,
  onSortChange,
}: ResultsHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-6 border-b border-border-light">
      <p className="text-caption text-content-muted">
        Showing <span className="text-content-secondary">{showing}</span> of{' '}
        <span className="text-content-secondary">{total}</span> {label}
      </p>
      
      {sortOptions && onSortChange && (
        <div className="flex items-center gap-3">
          <span className="text-caption text-content-light">Sort by</span>
          <select
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-caption text-content-secondary bg-transparent border-none focus:outline-none cursor-pointer appearance-none pr-4"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%237A7A7A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right center',
              backgroundSize: '1rem',
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default ListingGrid;
