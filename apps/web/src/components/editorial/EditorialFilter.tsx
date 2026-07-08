'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * EDITORIAL FILTER - Vertical Sidebar Style
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Design Philosophy:
 * - Filter sidebar dọc bên trái, sticky
 * - Typography nhỏ, uppercase, tracking rộng
 * - Subtle, không overwhelm content
 * - Vertical stacking cho nhiều options
 * 
 * Visual Language:
 * - Text-based options
 * - Active state = text đậm + underline nhẹ
 * - Muted colors, high whitespace
 */

export interface FilterOption {
  value: string;
  label: string;
}

interface EditorialFilterProps {
  label?: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  allLabel?: string;
}

/**
 * Single Filter Group - Vertical Editorial Style
 */
export function EditorialFilterGroup({
  label,
  options,
  value,
  onChange,
  allLabel = 'All',
}: EditorialFilterProps) {
  return (
    <div className="space-y-3">
      {label && (
        <span className="block text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-4">
          {label}
        </span>
      )}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onChange('')}
          className={`
            text-left text-[12px] uppercase tracking-[0.12em] transition-colors duration-300
            ${!value 
              ? 'text-stone-900 font-medium' 
              : 'text-stone-400 hover:text-stone-600'
            }
          `}
        >
          {allLabel}
        </button>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value === value ? '' : option.value)}
            className={`
              text-left text-[12px] uppercase tracking-[0.12em] transition-colors duration-300
              ${value === option.value 
                ? 'text-stone-900 font-medium' 
                : 'text-stone-400 hover:text-stone-600'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Search Input - Editorial Style
 */
interface EditorialSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function EditorialSearch({
  value,
  onChange,
  placeholder = 'Search...',
}: EditorialSearchProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`
          w-full py-2.5 bg-transparent
          text-[12px] tracking-wide
          placeholder:text-stone-300 placeholder:normal-case
          text-stone-600 
          border-b transition-colors duration-300
          focus:outline-none
          ${isFocused || value 
            ? 'border-stone-400' 
            : 'border-stone-200'
          }
        `}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
          aria-label="Clear search"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

/**
 * Editorial Filter Sidebar - Vertical sticky sidebar
 */
interface EditorialFilterSidebarProps {
  children: React.ReactNode;
  showClear?: boolean;
  onClear?: () => void;
  clearLabel?: string;
}

export function EditorialFilterSidebar({
  children,
  showClear = false,
  onClear,
  clearLabel = 'Clear all',
}: EditorialFilterSidebarProps) {
  return (
    <aside className="hidden lg:block w-52 flex-shrink-0">
      <div className="sticky top-32 space-y-8">
        {children}
        
        {showClear && (
          <div className="pt-4 border-t border-stone-100">
            <button
              onClick={onClear}
              className="text-[11px] uppercase tracking-[0.15em] text-stone-400 hover:text-stone-600 transition-colors"
            >
              {clearLabel}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

/**
 * Editorial Filter Bar - Horizontal (kept for compatibility)
 */
interface EditorialFilterBarProps {
  children: React.ReactNode;
  showClear?: boolean;
  onClear?: () => void;
  clearLabel?: string;
}

export function EditorialFilterBar({
  children,
  showClear = false,
  onClear,
  clearLabel = 'Clear',
}: EditorialFilterBarProps) {
  return (
    <div className="py-6 border-b border-stone-100 lg:hidden">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          {children}
        </div>
        {showClear && (
          <button
            onClick={onClear}
            className="text-[11px] uppercase tracking-[0.15em] text-stone-400 hover:text-stone-600 transition-colors"
          >
            {clearLabel}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Mobile Filter Toggle
 */
interface MobileFilterToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  label?: string;
  activeCount?: number;
}

export function MobileFilterToggle({
  isOpen,
  onToggle,
  label = 'Filter',
  activeCount = 0,
}: MobileFilterToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="md:hidden flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] text-stone-500"
    >
      <span>{label}</span>
      {activeCount > 0 && (
        <span className="text-stone-900">({activeCount})</span>
      )}
      <svg 
        className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

/**
 * Collapsible Filter Panel for Mobile
 */
interface FilterPanelProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export function FilterPanel({ isOpen, children }: FilterPanelProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div 
      style={{ height: `${height}px` }}
      className="overflow-hidden transition-all duration-300 ease-out"
    >
      <div ref={contentRef} className="py-4 space-y-6">
        {children}
      </div>
    </div>
  );
}

/**
 * Result Count - Editorial Style
 */
interface ResultCountProps {
  showing: number;
  total: number;
  label?: string;
}

export function EditorialResultCount({ showing, total, label = 'items' }: ResultCountProps) {
  return (
    <p className="text-[11px] uppercase tracking-[0.15em] text-stone-400">
      {showing === total ? (
        <>{total} {label}</>
      ) : (
        <>{showing} of {total} {label}</>
      )}
    </p>
  );
}
