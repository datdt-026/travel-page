'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
import RichText from '@/components/RichText';
import { Media } from '@/types';

/**
 * Journey Introduction Component
 * 
 * Opening section for an itinerary with editorial-style storytelling.
 * Sets the tone and atmosphere before diving into the journey.
 * 
 * DESIGN PRINCIPLES:
 * - Compelling opening statement
 * - Atmospheric imagery
 * - Journey essence themes
 * - Generous typography
 */

interface JourneyIntroductionProps {
  openingLine?: string;
  narrative?: any; // RichText
  essence?: { theme: string }[];
  featuredImage?: Media | string;
  imageStyle?: 'full-bleed' | 'contained' | 'split';
  className?: string;
}

export default function JourneyIntroduction({
  openingLine,
  narrative,
  essence,
  featuredImage,
  imageStyle = 'full-bleed',
  className = '',
}: JourneyIntroductionProps) {
  const imageUrl = featuredImage && typeof featuredImage === 'object' 
    ? getImageUrl(featuredImage.url) 
    : undefined;
  const imageAlt = featuredImage && typeof featuredImage === 'object'
    ? featuredImage.alt || 'Journey introduction'
    : 'Journey introduction';

  return (
    <section className={`${className}`}>
      {/* Full Bleed Image Style */}
      {imageStyle === 'full-bleed' && imageUrl && (
        <div className="relative aspect-[21/9] mb-16 md:mb-24 overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Split Layout */}
      {imageStyle === 'split' && (
        <div className="flex flex-col md:flex-row min-h-[60vh] mb-16 md:mb-24">
          {/* Image Side */}
          {imageUrl && (
            <div className="md:w-1/2 relative min-h-[40vh] md:min-h-full">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          )}
          
          {/* Content Side */}
          <div className="md:w-1/2 flex items-center bg-neutral-50 p-8 md:p-16">
            <div className="max-w-lg">
              {openingLine && (
                <p className="text-2xl md:text-3xl font-light text-neutral-900 leading-relaxed mb-8 italic">
                  {openingLine}
                </p>
              )}
              
              {narrative && (
                <div className="prose prose-lg prose-neutral max-w-none font-light">
                  <RichText content={narrative} />
                </div>
              )}
              
              {essence && essence.length > 0 && (
                <div className="mt-10 pt-8 border-t border-neutral-200">
                  <div className="flex flex-wrap gap-4">
                    {essence.map((item, index) => (
                      <span
                        key={index}
                        className="text-sm text-neutral-500 uppercase tracking-[0.15em]"
                      >
                        {item.theme}
                        {index < essence.length - 1 && (
                          <span className="ml-4 text-neutral-300">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contained or Default */}
      {(imageStyle === 'contained' || !imageStyle || imageStyle === 'full-bleed') && (
        <div className="max-w-3xl mx-auto px-6">
          {/* Opening Line */}
          {openingLine && (
            <p className="text-3xl md:text-4xl font-light text-neutral-900 leading-relaxed mb-10 md:mb-14">
              {openingLine}
            </p>
          )}

          {/* Contained Image */}
          {imageStyle === 'contained' && imageUrl && (
            <div className="relative aspect-[16/10] mb-12 overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 70vw"
                priority
              />
            </div>
          )}

          {/* Narrative */}
          {narrative && (
            <div className="prose prose-xl prose-neutral max-w-none font-light leading-relaxed mb-12">
              <RichText content={narrative} />
            </div>
          )}

          {/* Journey Essence */}
          {essence && essence.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 py-10 border-t border-b border-neutral-100">
              {essence.map((item, index) => (
                <span
                  key={index}
                  className="text-sm text-neutral-400 uppercase tracking-[0.2em] font-light"
                >
                  {item.theme}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
