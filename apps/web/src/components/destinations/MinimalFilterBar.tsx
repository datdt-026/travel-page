'use client';

import { useState } from 'react';

// Simple SVG icon components
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

interface FilterOption {
  value: string;
  label: string;
}

interface MinimalFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  continentValue: string;
  onContinentChange: (value: string) => void;
  continentOptions: FilterOption[];
  showSearch?: boolean;
  showContinentFilter?: boolean;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
  resultsCount?: number;
}

/**
 * Minimal Filter Bar - Editorial style
 * 
 * Design requirements:
 * - Transparent background
 * - Minimalist design
 * - No prominent dropdowns or heavy styling
 * - Inline with editorial aesthetic
 */
export function MinimalFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  continentValue,
  onContinentChange,
  continentOptions,
  showSearch = true,
  showContinentFilter = true,
  hasActiveFilters = false,
  onClearFilters,
  resultsCount,
}: MinimalFilterBarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12 md:mb-16 pb-8 border-b border-border-light">
      {/* Left: Region Filter */}
      {showContinentFilter && (
        <div className="flex items-center gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {continentOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onContinentChange(option.value)}
              className={`whitespace-nowrap text-sm tracking-wide transition-all duration-300 ${
                continentValue === option.value
                  ? 'text-content-primary font-medium border-b-2 border-accent pb-1'
                  : 'text-content-muted hover:text-content-primary'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Right: Search + Results */}
      <div className="flex items-center gap-6">
        {/* Results count */}
        {typeof resultsCount === 'number' && (
          <span className="text-sm text-content-muted hidden md:block">
            {resultsCount} {resultsCount === 1 ? 'destination' : 'destinations'}
          </span>
        )}

        {/* Search */}
        {showSearch && (
          <div
            className={`relative transition-all duration-300 ${
              isSearchFocused ? 'w-64' : 'w-48'
            }`}
          >
            <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder={searchPlaceholder}
              className="w-full pl-6 pr-8 py-2 text-sm bg-transparent border-b border-border-light focus:border-content-primary outline-none text-content-primary placeholder:text-content-muted transition-colors"
            />
            {searchValue && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Clear filters */}
        {hasActiveFilters && onClearFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs tracking-[0.1em] uppercase text-accent hover:text-accent-dark transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Dropdown Filter - Minimal style (alternative)
 */
interface DropdownFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  label?: string;
}

export function DropdownFilter({ value, onChange, options, label }: DropdownFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-content-secondary hover:text-content-primary transition-colors"
      >
        {label && <span className="text-content-muted">{label}:</span>}
        <span>{selectedOption?.label || 'All'}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 left-0 bg-white shadow-lg border border-border-light py-2 min-w-[160px] z-20">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  value === option.value
                    ? 'text-accent bg-surface-secondary'
                    : 'text-content-secondary hover:text-content-primary hover:bg-surface-secondary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MinimalFilterBar;
