'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Media } from '@/types';
import { getMediaImageUrl } from '@/lib/api';

// Simple SVG icon component
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

interface EditorialHeroProps {
  title: string;
  subtitle?: string;
  image?: Media | string;
  videoUrl?: string;
}

function getImageUrl(image: Media | string | undefined): string | undefined {
  return getMediaImageUrl(image, ['hero']);
}

/**
 * Editorial Hero - Magazine cover style
 * Full-screen with serif display typography, gradient fade from bottom
 * Anti-pattern avoided: No centered text with dark overlay
 */
export function EditorialHero({ title, subtitle, image, videoUrl }: EditorialHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageUrl = getImageUrl(image);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0">
        {videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-stone-800 to-stone-900" />
        )}
      </div>

      {/* Gradient Overlay - from bottom only, editorial style */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content - Bottom left placement, editorial magazine style */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="container-luxury pb-20 md:pb-32">
          <div
            className={`max-w-4xl transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Title - Large serif, light weight */}
            <h1 className="font-serif font-light text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] mb-6">
              {title.split(' ').map((word, i) => (
                <span
                  key={i}
                  className={`inline-block mr-4 ${i === 0 ? 'italic' : ''}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-white/70 text-lg md:text-xl font-light tracking-wide max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Scroll Indicator - Subtle animation */}
        <button
          onClick={scrollToContent}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-all duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Scroll to content"
        >
          <ChevronDownIcon className="w-8 h-8 animate-bounce" />
        </button>
      </div>
    </section>
  );
}

export default EditorialHero;
