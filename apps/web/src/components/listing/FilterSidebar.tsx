'use client';

import { ReactNode } from 'react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FILTER SIDEBAR - Quiet Luxury Design
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Elegant filter components for the listing sidebar.
 * 
 * Design Philosophy:
 * - Filter phải tinh tế, không gây cảm giác thao tác nặng
 * - Giống chọn tiêu chí khi đọc tạp chí, không giống form tìm kiếm
 * - Typography nhỏ, gọn
 * - Không border nặng
 * - Divider rất mảnh
 */

// ═══════════════════════════════════════════════════════════════════════════
// FILTER SECTION
// ═══════════════════════════════════════════════════════════════════════════

interface FilterSectionProps {
  /** Section label */
  label: string;
  /** Section content */
  children: ReactNode;
  /** Show divider below */
  showDivider?: boolean;
}

export function FilterSection({ 
  label, 
  children, 
  showDivider = true 
}: FilterSectionProps) {
  return (
    <div className="mb-8">
      <span className="block text-label-sm uppercase text-content-muted tracking-widest mb-4">
        {label}
      </span>
      {children}
      {showDivider && (
        <div className="h-px bg-border-light mt-8" />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FILTER CHIP GROUP (Radio-style selection)
// ═══════════════════════════════════════════════════════════════════════════

interface FilterOption {
  value: string;
  label: string;
}

interface FilterChipGroupProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  /** Optional: Show count after label */
  showCounts?: Record<string, number>;
}

export function FilterChipGroup({ 
  options, 
  value, 
  onChange,
  showCounts,
}: FilterChipGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(value === option.value ? '' : option.value)}
          className={`
            px-3.5 py-2 text-caption transition-all duration-200
            ${value === option.value
              ? 'bg-content-primary text-content-inverse'
              : 'text-content-secondary hover:text-content-primary border border-border-light hover:border-content-muted'
            }
          `}
        >
          {option.label}
          {showCounts && showCounts[option.value] !== undefined && (
            <span className="ml-1.5 opacity-60">({showCounts[option.value]})</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FILTER LIST (Checkbox-style, vertical list)
// ═══════════════════════════════════════════════════════════════════════════

interface FilterListProps {
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
  /** Maximum items to show before "Show more" */
  maxVisible?: number;
}

export function FilterList({ 
  options, 
  selected, 
  onChange,
  maxVisible = 6,
}: FilterListProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleOptions = expanded ? options : options.slice(0, maxVisible);
  const hasMore = options.length > maxVisible;

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-0.5">
      {visibleOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => toggleOption(option.value)}
          className={`
            w-full text-left py-2 text-body-sm transition-colors duration-150
            ${selected.includes(option.value)
              ? 'text-content-primary font-normal'
              : 'text-content-muted hover:text-content-secondary'
            }
          `}
        >
          <span className="flex items-center gap-3">
            <span 
              className={`
                w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center transition-colors
                ${selected.includes(option.value)
                  ? 'border-content-primary bg-content-primary'
                  : 'border-border'
                }
              `}
            >
              {selected.includes(option.value) && (
                <svg 
                  className="w-2.5 h-2.5 text-content-inverse" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            {option.label}
          </span>
        </button>
      ))}
      
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-caption text-content-muted hover:text-content-secondary pt-2 transition-colors"
        >
          {expanded ? '— Show less' : `+ ${options.length - maxVisible} more`}
        </button>
      )}
    </div>
  );
}

// Need useState import
import { useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// FILTER RANGE (e.g., Duration slider)
// ═══════════════════════════════════════════════════════════════════════════

interface FilterRangeProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  /** Label formatter */
  formatLabel?: (value: number) => string;
  /** Step size */
  step?: number;
}

export function FilterRange({ 
  min, 
  max, 
  value, 
  onChange, 
  formatLabel = (v) => String(v),
  step = 1,
}: FilterRangeProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-caption text-content-muted">
        <span>{formatLabel(value[0])}</span>
        <span>{formatLabel(value[1])}</span>
      </div>
      <div className="relative h-1 bg-border-light rounded-full">
        <div 
          className="absolute h-full bg-content-primary/30 rounded-full"
          style={{
            left: `${((value[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((value[1] - min) / (max - min)) * 100}%`,
          }}
        />
      </div>
      <div className="flex gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => onChange([Math.min(Number(e.target.value), value[1] - step), value[1]])}
          className="flex-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-content-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => onChange([value[0], Math.max(Number(e.target.value), value[0] + step)])}
          className="flex-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-content-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CLEAR FILTERS BUTTON
// ═══════════════════════════════════════════════════════════════════════════

interface ClearFiltersProps {
  onClick: () => void;
  label?: string;
  visible?: boolean;
}

export function ClearFilters({ 
  onClick, 
  label = 'Clear all',
  visible = true,
}: ClearFiltersProps) {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className="text-caption text-content-muted hover:text-content-primary transition-colors duration-200 underline underline-offset-4 decoration-border-light hover:decoration-content-muted"
    >
      {label}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SEARCH INPUT
// ═══════════════════════════════════════════════════════════════════════════

interface FilterSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function FilterSearch({ 
  value, 
  onChange,
  placeholder = 'Search...',
}: FilterSearchProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-3 pr-10 text-body-sm text-content-primary placeholder:text-content-light bg-transparent border-b border-border-light focus:border-content-muted focus:outline-none transition-colors"
      />
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-content-light" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export default {
  FilterSection,
  FilterChipGroup,
  FilterList,
  FilterRange,
  ClearFilters,
  FilterSearch,
};
