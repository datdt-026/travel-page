import { ReactNode } from 'react';

/**
 * Section Component
 * 
 * A flexible container for page sections following the quiet luxury design system.
 * Provides consistent spacing, optional backgrounds, and header styling.
 */

interface SectionProps {
  children: ReactNode;
  className?: string;
  
  // Spacing
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  // Background variants
  background?: 'primary' | 'secondary' | 'tertiary' | 'dark';
  
  // Container width
  container?: 'default' | 'narrow' | 'wide' | 'full';
  
  // Section header
  label?: string;
  title?: string;
  subtitle?: string;
  
  // Header alignment
  headerAlign?: 'left' | 'center';
  
  // Optional right-side content for header (e.g., "View All" link)
  headerAction?: ReactNode;
  
  // HTML element
  as?: 'section' | 'div' | 'article' | 'aside';
  
  // ID for anchor links
  id?: string;
}

const sizeClasses = {
  sm: 'py-16 md:py-20',
  md: 'py-20 md:py-28',
  lg: 'py-24 md:py-32',
  xl: 'py-32 md:py-40',
};

const backgroundClasses = {
  primary: 'bg-surface-primary',
  secondary: 'bg-surface-secondary',
  tertiary: 'bg-surface-tertiary',
  dark: 'bg-surface-dark',
};

const containerClasses = {
  default: 'container-narrow',
  narrow: 'max-w-prose mx-auto px-6',
  wide: 'container-luxury',
  full: 'w-full',
};

export default function Section({
  children,
  className = '',
  size = 'lg',
  background = 'primary',
  container = 'wide',
  label,
  title,
  subtitle,
  headerAlign = 'left',
  headerAction,
  as: Component = 'section',
  id,
}: SectionProps) {
  const isDark = background === 'dark';
  
  const hasHeader = label || title || subtitle;

  return (
    <Component
      id={id}
      className={`
        ${sizeClasses[size]}
        ${backgroundClasses[background]}
        ${className}
      `}
    >
      <div className={containerClasses[container]}>
        {/* Section Header */}
        {hasHeader && (
          <div 
            className={`
              mb-16 md:mb-20
              ${headerAlign === 'center' ? 'text-center' : ''}
              ${headerAction ? 'flex flex-col md:flex-row md:items-end md:justify-between gap-6' : ''}
            `}
          >
            <div className={headerAlign === 'center' ? 'mx-auto' : ''}>
              {/* Label */}
              {label && (
                <span 
                  className={`
                    text-label-md uppercase tracking-luxury mb-4 block
                    ${isDark ? 'text-content-inverse/50' : 'text-content-muted'}
                  `}
                >
                  {label}
                </span>
              )}
              
              {/* Title */}
              {title && (
                <h2 
                  className={`
                    font-serif text-heading-xl font-normal
                    ${isDark ? 'text-content-inverse' : 'text-content-primary'}
                  `}
                >
                  {title}
                </h2>
              )}
              
              {/* Subtitle */}
              {subtitle && (
                <p 
                  className={`
                    text-body-lg font-light mt-4 max-w-2xl
                    ${isDark ? 'text-content-inverse/60' : 'text-content-muted'}
                    ${headerAlign === 'center' ? 'mx-auto' : ''}
                  `}
                >
                  {subtitle}
                </p>
              )}
            </div>
            
            {/* Header Action (e.g., View All link) */}
            {headerAction && (
              <div className="flex-shrink-0">
                {headerAction}
              </div>
            )}
          </div>
        )}
        
        {/* Section Content */}
        {children}
      </div>
    </Component>
  );
}

/**
 * SectionDivider Component
 * 
 * A subtle divider between sections
 */
interface SectionDividerProps {
  variant?: 'default' | 'accent' | 'full';
  className?: string;
}

export function SectionDivider({ 
  variant = 'default', 
  className = '' 
}: SectionDividerProps) {
  const variantClasses = {
    default: 'w-16 h-px bg-border mx-auto',
    accent: 'w-16 h-px bg-accent mx-auto',
    full: 'w-full h-px bg-border-light',
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`} />
  );
}

/**
 * SectionGrid Component
 * 
 * Responsive grid layout for section content
 */
interface SectionGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const gridColumnClasses = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

const gridGapClasses = {
  sm: 'gap-4 md:gap-6',
  md: 'gap-6 md:gap-8',
  lg: 'gap-8 md:gap-12',
  xl: 'gap-12 md:gap-16',
};

export function SectionGrid({
  children,
  columns = 3,
  gap = 'lg',
  className = '',
}: SectionGridProps) {
  return (
    <div 
      className={`
        grid
        ${gridColumnClasses[columns]}
        ${gridGapClasses[gap]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
