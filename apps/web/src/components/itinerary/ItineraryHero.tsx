'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/api';
import { Media } from '@/types';
import { defaultLocale } from '@/i18n';

/**
 * Itinerary Hero Component
 * 
 * Editorial-style hero for itinerary detail pages.
 * Focuses on atmosphere and sets the tone for the journey.
 * 
 * DESIGN PRINCIPLES:
 * ─────────────────────────────────────────────────────────────────
 * • Full-bleed, immersive imagery
 * • Minimal UI elements
 * • Typography that breathes
 * • Subtle, elegant overlays
 * • No commercial or booking-focused elements in hero
 */

interface ItineraryHeroProps {
  title: string;
  subtitle?: string;
  excerpt?: string;
  featuredImage?: Media | string;
  duration?: number;
  difficulty?: string;
  travelStyles?: string[];
  locale?: string;
  
  // CMS-configurable options (with safe defaults)
  heroHeight?: 'medium' | 'large' | 'full';
  overlayStyle?: 'none' | 'light' | 'medium' | 'gradient';
  showBreadcrumb?: boolean;
  showDuration?: boolean;
  showDifficulty?: boolean;
  contentPosition?: 'bottom-left' | 'bottom-center' | 'center';
  
  className?: string;
}

// Height classes
const heightClasses: Record<string, string> = {
  medium: 'min-h-[60vh] md:min-h-[70vh]',
  large: 'min-h-[75vh] md:min-h-[85vh]',
  full: 'min-h-screen',
};

// Overlay classes
const overlayClasses: Record<string, string> = {
  none: '',
  light: 'bg-black/20',
  medium: 'bg-gradient-to-t from-black/70 via-black/30 to-black/10',
  gradient: 'bg-gradient-to-t from-black/80 via-black/40 to-transparent',
};

// Content position classes
const positionClasses: Record<string, { container: string; text: string }> = {
  'bottom-left': {
    container: 'items-end justify-start pb-16 md:pb-24',
    text: 'text-left',
  },
  'bottom-center': {
    container: 'items-end justify-center pb-16 md:pb-24',
    text: 'text-center',
  },
  'center': {
    container: 'items-center justify-center',
    text: 'text-center',
  },
};

// Difficulty display
const difficultyLabels: Record<string, string> = {
  easy: 'Gentle',
  moderate: 'Moderate',
  challenging: 'Adventurous',
};

export default function ItineraryHero({
  title,
  subtitle,
  excerpt,
  featuredImage,
  duration,
  difficulty,
  travelStyles,
  locale = defaultLocale,
  heroHeight = 'large',
  overlayStyle = 'gradient',
  showBreadcrumb = true,
  showDuration = true,
  showDifficulty = false,
  contentPosition = 'bottom-left',
  className = '',
}: ItineraryHeroProps) {
  const imageUrl = featuredImage && typeof featuredImage === 'object' 
    ? getImageUrl(featuredImage.url) 
    : undefined;
  const imageAlt = featuredImage && typeof featuredImage === 'object'
    ? featuredImage.alt || title
    : title;

  const position = positionClasses[contentPosition];

  return (
    <section className={`relative ${heightClasses[heroHeight]} flex ${position.container} ${className}`}>
      {/* Background Image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      )}
      
      {/* Overlay */}
      {overlayStyle !== 'none' && (
        <div className={`absolute inset-0 ${overlayClasses[overlayStyle]}`} />
      )}

      {/* Content */}
      <div className={`relative z-10 w-full max-w-6xl mx-auto px-6 ${position.text}`}>
        {/* Breadcrumb */}
        {showBreadcrumb && (
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/70">
              <li>
                <Link 
                  href={`/${locale}`} 
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-white/40">/</li>
              <li>
                <Link 
                  href={`/${locale}/itineraries`} 
                  className="hover:text-white transition-colors"
                >
                  Journeys
                </Link>
              </li>
            </ol>
          </nav>
        )}

        {/* Meta Tags (minimal) */}
        <div className={`flex flex-wrap gap-4 mb-6 ${contentPosition === 'bottom-left' ? '' : 'justify-center'}`}>
          {showDuration && duration && (
            <span className="text-sm text-white/80 uppercase tracking-[0.15em] font-light">
              {duration} Days
            </span>
          )}
          {showDuration && duration && showDifficulty && difficulty && (
            <span className="text-white/40">·</span>
          )}
          {showDifficulty && difficulty && (
            <span className="text-sm text-white/80 uppercase tracking-[0.15em] font-light">
              {difficultyLabels[difficulty] || difficulty}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight mb-6">
          {title}
        </h1>

        {/* Subtitle or Excerpt */}
        {(subtitle || excerpt) && (
          <p className={`text-lg md:text-xl text-white/90 font-light leading-relaxed ${
            contentPosition === 'bottom-left' ? 'max-w-2xl' : 'max-w-3xl mx-auto'
          }`}>
            {subtitle || excerpt}
          </p>
        )}

        {/* Travel Styles (subtle, minimal) */}
        {travelStyles && travelStyles.length > 0 && (
          <div className={`mt-8 flex flex-wrap gap-3 ${contentPosition !== 'bottom-left' ? 'justify-center' : ''}`}>
            {travelStyles.slice(0, 3).map((style, index) => (
              <span
                key={index}
                className="text-xs text-white/60 uppercase tracking-[0.2em] font-light"
              >
                {style}
                {index < Math.min(travelStyles.length, 3) - 1 && (
                  <span className="ml-3 text-white/30">·</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Scroll Indicator (optional, subtle) */}
      {heroHeight === 'full' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-white/60" />
        </div>
      )}
    </section>
  );
}
