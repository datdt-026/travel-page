'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
import RichText from '@/components/RichText';
import { Media } from '@/types';

/**
 * Narrative Interlude Component
 * 
 * A breathing space between chapters or experiences.
 * Adds editorial rhythm to the storytelling.
 * 
 * DESIGN PRINCIPLES:
 * - Visual breathing room
 * - Pull quotes for emphasis
 * - Atmospheric transitions
 * - Minimal, elegant
 */

interface NarrativeInterludeProps {
  interludeType: 'quote' | 'image' | 'image-caption' | 'reflection' | 'transition';
  quote?: string;
  quoteAttribution?: string;
  image?: Media | string;
  imageHeight?: 'small' | 'medium' | 'large' | 'full';
  reflection?: any; // RichText
  transitionText?: string;
  className?: string;
}

const imageHeightClasses: Record<string, string> = {
  small: 'h-[30vh] min-h-[250px]',
  medium: 'h-[50vh] min-h-[400px]',
  large: 'h-[70vh] min-h-[500px]',
  full: 'h-screen',
};

export default function NarrativeInterlude({
  interludeType,
  quote,
  quoteAttribution,
  image,
  imageHeight = 'medium',
  reflection,
  transitionText,
  className = '',
}: NarrativeInterludeProps) {
  const imageUrl = image && typeof image === 'object' ? getImageUrl(image.url) : undefined;
  const imageAlt = image && typeof image === 'object' ? image.alt || 'Journey moment' : 'Journey moment';

  // Pull Quote
  if (interludeType === 'quote') {
    return (
      <section className={`py-20 md:py-32 ${className}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <blockquote>
            <p className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-800 leading-relaxed italic">
              "{quote}"
            </p>
            {quoteAttribution && (
              <footer className="mt-8">
                <span className="text-sm text-neutral-400 uppercase tracking-[0.2em]">
                  — {quoteAttribution}
                </span>
              </footer>
            )}
          </blockquote>
        </div>
      </section>
    );
  }

  // Full Image
  if (interludeType === 'image' && imageUrl) {
    return (
      <section className={`relative ${imageHeightClasses[imageHeight]} ${className}`}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </section>
    );
  }

  // Image with Caption
  if (interludeType === 'image-caption' && imageUrl) {
    return (
      <section className={`${className}`}>
        <div className={`relative ${imageHeightClasses[imageHeight]}`}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {quote && (
          <div className="max-w-3xl mx-auto px-6 py-6 text-center">
            <p className="text-lg text-neutral-500 italic font-light">{quote}</p>
          </div>
        )}
      </section>
    );
  }

  // Reflective Text
  if (interludeType === 'reflection' && reflection) {
    return (
      <section className={`py-16 md:py-24 bg-neutral-50 ${className}`}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="prose prose-lg prose-neutral max-w-none font-light text-center italic">
            <RichText content={reflection} />
          </div>
        </div>
      </section>
    );
  }

  // Location Transition
  if (interludeType === 'transition' && transitionText) {
    return (
      <section className={`py-16 md:py-24 ${className}`}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6">
            <div className="w-16 h-px bg-neutral-300" />
            <p className="text-lg text-neutral-500 font-light tracking-wide">
              {transitionText}
            </p>
            <div className="w-16 h-px bg-neutral-300" />
          </div>
        </div>
      </section>
    );
  }

  return null;
}
