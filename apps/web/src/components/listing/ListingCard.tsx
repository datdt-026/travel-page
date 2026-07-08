'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LISTING CARD - Quiet Luxury Design
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Card styles for listing pages.
 * 
 * Design Philosophy:
 * - Card lớn, thoáng
 * - Ưu tiên ảnh
 * - Text tối giản
 * - Không hiển thị giá
 * - Không icon dư thừa
 * - Hover rất nhẹ (opacity / underline)
 * - Không zoom mạnh, không shadow đậm
 */

// ═══════════════════════════════════════════════════════════════════════════
// BASE LISTING CARD
// ═══════════════════════════════════════════════════════════════════════════

interface ListingCardProps {
  /** Link destination */
  href: string;
  /** Card image URL */
  image?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Card title */
  title: string;
  /** Subtitle or short description */
  subtitle?: string;
  /** Optional meta tags (displayed above image) */
  tags?: string[];
  /** Optional meta info (displayed below title) */
  meta?: ReactNode;
  /** Image aspect ratio */
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'editorial';
  /** Card size variant */
  size?: 'default' | 'large';
}

const aspectClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/10]',
  editorial: 'aspect-[2/3]',
};

export function ListingCard({
  href,
  image,
  imageAlt,
  title,
  subtitle,
  tags,
  meta,
  aspectRatio = 'landscape',
  size = 'default',
}: ListingCardProps) {
  return (
    <Link href={href} className="group block">
      {/* Image Container */}
      <div className={`relative ${aspectClasses[aspectRatio]} bg-surface-tertiary overflow-hidden mb-5`}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover transition-opacity duration-500 group-hover:opacity-90"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-content-light">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Tags Overlay */}
        {tags && tags.length > 0 && (
          <div className="absolute top-0 left-0 right-0 p-4 flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span 
                key={i}
                className="px-3 py-1.5 bg-surface-primary/90 backdrop-blur-sm text-label-sm uppercase text-content-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className={`
          font-serif text-content-primary transition-colors duration-300
          group-hover:text-content-secondary
          ${size === 'large' ? 'text-heading-lg' : 'text-heading-md'}
        `}>
          {title}
        </h3>
        
        {subtitle && (
          <p className="text-body-sm text-content-muted line-clamp-2">
            {subtitle}
          </p>
        )}
        
        {meta && (
          <div className="pt-1">
            {meta}
          </div>
        )}
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DESTINATION CARD (Countries/Cities)
// ═══════════════════════════════════════════════════════════════════════════

interface DestinationCardProps {
  href: string;
  image?: string;
  title: string;
  subtitle?: string;
  /** Location label (e.g., continent, country) */
  location?: string;
}

export function DestinationCard({
  href,
  image,
  title,
  subtitle,
  location,
}: DestinationCardProps) {
  return (
    <ListingCard
      href={href}
      image={image}
      title={title}
      subtitle={subtitle}
      aspectRatio="landscape"
      meta={location && (
        <span className="text-label-sm uppercase text-content-light tracking-wider">
          {location}
        </span>
      )}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ATTRACTION CARD
// ═══════════════════════════════════════════════════════════════════════════

interface AttractionCardProps {
  href: string;
  image?: string;
  title: string;
  subtitle?: string;
  /** Category tag */
  category?: string;
  /** Location */
  location?: string;
}

export function AttractionCard({
  href,
  image,
  title,
  subtitle,
  category,
  location,
}: AttractionCardProps) {
  return (
    <ListingCard
      href={href}
      image={image}
      title={title}
      subtitle={subtitle}
      tags={category ? [category] : undefined}
      aspectRatio="landscape"
      meta={location && (
        <span className="text-label-sm uppercase text-content-light tracking-wider">
          {location}
        </span>
      )}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ITINERARY CARD
// ═══════════════════════════════════════════════════════════════════════════

interface ItineraryCardProps {
  href: string;
  image?: string;
  title: string;
  subtitle?: string;
  /** Duration in days */
  duration?: number;
  /** Travel theme/style */
  theme?: string;
  /** Difficulty/pace */
  pace?: string;
  /** Duration label text */
  daysLabel?: string;
}

export function ItineraryCard({
  href,
  image,
  title,
  subtitle,
  duration,
  theme,
  pace,
  daysLabel = 'days',
}: ItineraryCardProps) {
  return (
    <Link href={href} className="group block">
      {/* Image Container - Editorial portrait ratio */}
      <div className="relative aspect-[4/5] bg-surface-tertiary overflow-hidden mb-5">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-opacity duration-500 group-hover:opacity-90"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-content-light">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Duration Badge */}
        {duration && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-surface-primary/90 backdrop-blur-sm">
            <span className="text-label-sm uppercase text-content-secondary">
              {duration} {daysLabel}
            </span>
          </div>
        )}
        
        {/* Pace Badge */}
        {pace && (
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-content-primary/80 backdrop-blur-sm">
            <span className="text-label-sm uppercase text-content-inverse">
              {pace}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-serif text-heading-md text-content-primary transition-colors duration-300 group-hover:text-content-secondary">
          {title}
        </h3>
        
        {subtitle && (
          <p className="text-body-sm text-content-muted line-clamp-2">
            {subtitle}
          </p>
        )}
        
        {theme && (
          <span className="inline-block text-label-sm uppercase text-content-light tracking-wider">
            {theme}
          </span>
        )}
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export default {
  ListingCard,
  DestinationCard,
  AttractionCard,
  ItineraryCard,
};
