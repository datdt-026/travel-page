'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/api';
import { toTitleCase } from '@/i18n/utils';
import { mockImages } from '@/assets/mockImages';

/**
 * Hero Section Configuration from CMS
 */
export interface HeroConfig {
  backgroundImage?: { url?: string } | null;
  backgroundVideo?: { url?: string } | null;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  height?: 'small' | 'medium' | 'large' | 'full' | 'auto';
  overlayStyle?: 'none' | 'light' | 'medium' | 'heavy' | 'gradient-bottom' | 'gradient-left';
  contentPosition?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  textAlignment?: 'auto' | 'left' | 'center' | 'right';
  contentMaxWidth?: 'small' | 'medium' | 'large' | 'full';
  showAccentLine?: boolean;
  showBreadcrumb?: boolean;
  breadcrumbLabel?: string;
  enableAnimation?: boolean;
  ctas?: {
    text?: string;
    link?: string;
    style?: 'primary' | 'secondary' | 'ghost';
    openInNewTab?: boolean;
  }[];
}

interface DynamicHeroSectionProps {
  config?: HeroConfig | null;
  fallback?: {
    title: string;
    subtitle?: string;
  };
  breadcrumb?: {
    homeLabel: string;
    currentLabel: string;
  };
  className?: string;
}

/**
 * Height class mapping
 */
const heightClasses: Record<string, string> = {
  small: 'min-h-[40vh] md:min-h-[50vh]',
  medium: 'min-h-[60vh] md:min-h-[70vh]',
  large: 'min-h-[70vh] md:min-h-[90vh]',
  full: 'min-h-screen',
  auto: 'min-h-[50vh]',
};

/**
 * Overlay style class mapping
 */
const overlayClasses: Record<string, string> = {
  none: '',
  light: 'bg-black/20',
  medium: 'hero-overlay-medium',
  heavy: 'bg-black/60',
  'gradient-bottom': 'bg-gradient-to-t from-black/80 via-black/40 to-transparent',
  'gradient-left': 'bg-gradient-to-r from-black/70 to-transparent',
};

/**
 * Content max width class mapping
 */
const maxWidthClasses: Record<string, string> = {
  small: 'max-w-xl',
  medium: 'max-w-2xl',
  large: 'max-w-4xl',
  full: 'max-w-full',
};

/**
 * Get vertical alignment class for section
 */
function getVerticalAlignment(position: string): string {
  if (position.startsWith('top')) return 'items-start';
  if (position.startsWith('center')) return 'items-center';
  return 'items-end'; // bottom
}

/**
 * Get content wrapper classes based on position
 */
function getContentWrapperClasses(position: string): string {
  // Vertical positioning via padding
  if (position.startsWith('top')) {
    return 'pt-32 md:pt-40';
  }
  if (position.startsWith('center')) {
    return 'py-16';
  }
  // bottom (default like destinations page)
  return 'pb-16 md:pb-20 pt-32';
}

/**
 * Get text alignment class
 */
function getTextAlignClass(position: string, textAlignment: string): string {
  if (textAlignment !== 'auto') {
    return `text-${textAlignment}`;
  }
  // Auto: derive from position
  if (position.endsWith('center') || position === 'center') return 'text-center';
  if (position.endsWith('right')) return 'text-right';
  return 'text-left';
}

/**
 * Get horizontal content position class
 */
function getHorizontalPositionClass(position: string): string {
  if (position.endsWith('right')) return 'ml-auto';
  if (position.endsWith('center') || position === 'center') return 'mx-auto';
  return ''; // left - no class needed, natural flow
}

/**
 * Dynamic Hero Section Component
 * 
 * Renders a hero/banner section based on CMS configuration.
 * Follows the same structure as destinations page for proper alignment.
 */
export default function DynamicHeroSection({
  config,
  fallback,
  breadcrumb,
  className = '',
}: DynamicHeroSectionProps) {
  // Merge config with fallbacks
  const title = config?.title || fallback?.title || '';
  const subtitle = config?.subtitle || fallback?.subtitle || '';
  const eyebrow = config?.eyebrow || '';
  const height = config?.height || 'large';
  const overlayStyle = config?.overlayStyle || 'medium';
  const contentPosition = config?.contentPosition || 'bottom-left';
  const contentMaxWidth = config?.contentMaxWidth || 'medium';
  const textAlignment = config?.textAlignment || 'auto';
  const showAccentLine = config?.showAccentLine !== false;
  const showBreadcrumb = config?.showBreadcrumb !== false && breadcrumb;
  const enableAnimation = config?.enableAnimation !== false;
  const ctas = config?.ctas || [];

  // Get background image URL
  const backgroundImageUrl = config?.backgroundImage?.url
    ? getImageUrl(config.backgroundImage.url)
    : mockImages.hero.src;

  // Animation classes
  const animationBase = enableAnimation ? 'opacity-0' : '';
  const fadeIn = enableAnimation ? 'animate-fade-in' : '';
  const fadeInUp = enableAnimation ? 'animate-fade-in-up' : '';

  // Derived classes
  const verticalAlign = getVerticalAlignment(contentPosition);
  const contentWrapperClasses = getContentWrapperClasses(contentPosition);
  const textAlignClass = getTextAlignClass(contentPosition, textAlignment);
  const horizontalPosClass = getHorizontalPositionClass(contentPosition);

  return (
    <section
      className={`relative w-full flex ${verticalAlign} -mt-20 md:-mt-24 ${heightClasses[height]} ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundImageUrl ? (
          <Image
            src={backgroundImageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
        ) : (
          <div className="w-full h-full bg-surface-dark">
            {/* Ambient decoration when no image */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/3 rounded-full blur-3xl animate-float-delayed" />
          </div>
        )}
        
        {/* Overlay */}
        {overlayStyle !== 'none' && (
          <div className={`absolute inset-0 ${overlayClasses[overlayStyle]}`} />
        )}
      </div>

      {/* Content - Same structure as destinations page */}
      <div className="relative z-10 w-full">
        <div className={`container-wide ${contentWrapperClasses}`}>
          {/* Content box with max-width and horizontal positioning */}
          <div className={`${maxWidthClasses[contentMaxWidth]} ${horizontalPosClass} ${textAlignClass}`}>
            {/* Accent Line */}
            {showAccentLine && (
              <div 
                className={`w-16 h-px bg-accent mb-8 ${animationBase} ${fadeIn} ${
                  horizontalPosClass === 'ml-auto' ? 'ml-auto' : 
                  horizontalPosClass === 'mx-auto' ? 'mx-auto' : ''
                }`} 
              />
            )}

            {/* Eyebrow */}
            {eyebrow && (
              <span
                className={`text-label-md uppercase text-accent mb-6 block ${animationBase} ${fadeInUp}`}
              >
                {eyebrow}
              </span>
            )}

            {/* Title */}
            <h1
              className={`font-serif font-semibold text-display-lg text-content-inverse mb-6 ${animationBase} ${fadeInUp}`}
            >
              {toTitleCase(title)}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p
                className={`text-body-lg text-content-inverse/80 mb-6 ${animationBase} ${fadeInUp} animation-delay-100`}
              >
                {subtitle}
              </p>
            )}

            {/* Breadcrumb */}
            {showBreadcrumb && breadcrumb && (
              <div
                className={`text-label-md uppercase text-content-inverse/60 tracking-wider ${animationBase} ${fadeInUp} animation-delay-200`}
              >
                <Link
                  href="/"
                  className="hover:text-content-inverse cursor-pointer transition-colors duration-300"
                >
                  {breadcrumb.homeLabel}
                </Link>
                <span className="mx-3">—</span>
                <span className="text-accent">
                  {config?.breadcrumbLabel || breadcrumb.currentLabel}
                </span>
              </div>
            )}

            {/* CTA Buttons */}
            {ctas.length > 0 && (
              <div 
                className={`flex flex-wrap gap-4 mt-8 ${animationBase} ${fadeInUp} animation-delay-300 ${
                  horizontalPosClass === 'ml-auto' ? 'justify-end' : 
                  horizontalPosClass === 'mx-auto' ? 'justify-center' : ''
                }`}
              >
                {ctas.map((cta, index) => {
                  if (!cta.text || !cta.link) return null;
                  
                  const buttonStyle = cta.style || 'primary';
                  const buttonClasses = {
                    primary: 'btn-primary',
                    secondary: 'btn-secondary border border-white/30',
                    ghost: 'text-content-inverse hover:text-accent transition-colors',
                  };

                  return (
                    <Link
                      key={index}
                      href={cta.link}
                      target={cta.openInNewTab ? '_blank' : undefined}
                      rel={cta.openInNewTab ? 'noopener noreferrer' : undefined}
                      className={buttonClasses[buttonStyle]}
                    >
                      {cta.text}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
