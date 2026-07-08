'use client';

import { ReactNode, useState } from 'react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LISTING LAYOUT - Quiet Luxury Design
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Layout structure for listing pages following the luxury travel design system.
 * 
 * Features:
 * - Left sidebar filter (sticky)
 * - Right content area
 * - Desktop-first with generous whitespace
 * - Mobile responsive with slide-out filter panel
 */

interface ListingLayoutProps {
  /** Filter sidebar content */
  sidebar: ReactNode;
  /** Main content area */
  children: ReactNode;
  /** Optional header area above the grid (e.g., results count, sorting) */
  header?: ReactNode;
  /** Optional class name for the main container */
  className?: string;
  /** Optional filter toggle button text for mobile */
  filterButtonText?: string;
  /** Active filter count for mobile badge */
  activeFilterCount?: number;
}

export function ListingLayout({
  sidebar,
  children,
  header,
  className = '',
  filterButtonText = 'Filters',
  activeFilterCount = 0,
}: ListingLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`flex flex-col lg:flex-row gap-12 xl:gap-16 ${className}`}>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden flex items-center justify-center gap-3 py-3.5 border-b border-border-light text-content-secondary hover:text-content-primary transition-colors"
        aria-expanded={isSidebarOpen}
        aria-controls="filter-sidebar"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
          />
        </svg>
        <span className="text-label-md uppercase tracking-wider">{filterButtonText}</span>
        {activeFilterCount > 0 && (
          <span className="flex items-center justify-center w-5 h-5 bg-content-primary text-content-inverse text-xs rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Sidebar Filters */}
      <aside
        id="filter-sidebar"
        className={`
          lg:w-64 xl:w-72 flex-shrink-0
          ${isSidebarOpen ? 'block' : 'hidden'} lg:block
          fixed lg:relative inset-0 z-50 lg:z-auto
          bg-surface-primary lg:bg-transparent
          overflow-y-auto lg:overflow-visible
        `}
      >
        {/* Mobile Overlay */}
        <div
          className="lg:hidden fixed inset-0 bg-black/30 -z-10 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />

        {/* Filter Panel - Sticky on desktop */}
        <div className="lg:sticky lg:top-28 p-8 lg:p-0">
          {/* Mobile Header */}
          <div className="flex items-center justify-between lg:hidden mb-8 pb-6 border-b border-border-light">
            <span className="text-label-md uppercase tracking-wider text-content-secondary">
              {filterButtonText}
            </span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 -m-2 text-content-muted hover:text-content-primary transition-colors"
              aria-label="Close filters"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {sidebar}

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden w-full mt-8 py-3.5 text-label-md uppercase tracking-wider text-content-secondary border-t border-border-light"
          >
            View Results
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {header && (
          <div className="mb-10">
            {header}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}

export default ListingLayout;
