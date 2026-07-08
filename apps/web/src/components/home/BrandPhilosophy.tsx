'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
import { SectionStyling } from '@/types';

interface BrandPhilosophyProps {
  tagline?: string;
  statement?: string;
  signature?: string;
  image?: string; // CMS image URL
  styling?: SectionStyling;
}

export default function BrandPhilosophy({
  tagline = "Our Philosophy",
  statement = "We believe travel is not about destinations, but about the moments that transform us. Every journey we craft is a quiet invitation to rediscover the world—and yourself.",
  signature = "— The Art of Slow Travel",
  image,
  styling
}: BrandPhilosophyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const imageUrl = image ? getImageUrl(image) : undefined;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Build inline styles from styling prop
  const sectionStyle: React.CSSProperties = {};
  if (styling?.sectionBackground) {
    sectionStyle.backgroundColor = styling.sectionBackground;
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-48 lg:py-56 bg-surface-primary overflow-hidden"
      style={sectionStyle}
    >
      {/* Background image if provided */}
      {imageUrl && (
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover opacity-10"
            sizes="100vw"
          />
        </div>
      )}

      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-border-light to-transparent" />
      </div>

      <div className="container-narrow">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tagline */}
          <div 
            className={`transition-all duration-1000 ease-elegant ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span 
              className="inline-block text-label-md uppercase tracking-luxury text-content-muted mb-10"
              style={styling?.subtitleColor ? { color: styling.subtitleColor } : undefined}
            >
              {tagline}
            </span>
          </div>

          {/* Main Statement */}
          <div 
            className={`transition-all duration-1000 delay-200 ease-elegant ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p 
              className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-content-primary leading-relaxed tracking-tight"
              style={styling?.titleColor ? { color: styling.titleColor } : undefined}
            >
              {statement}
            </p>
          </div>

          {/* Signature */}
          <div 
            className={`mt-12 transition-all duration-1000 delay-500 ease-elegant ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span 
              className="text-body-md text-accent font-light italic tracking-wide"
              style={styling?.accentColor ? { color: styling.accentColor } : undefined}
            >
              {signature}
            </span>
          </div>

          {/* Decorative line */}
          <div 
            className={`mt-16 flex justify-center transition-all duration-1000 delay-700 ease-elegant ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          >
            <div 
              className="w-16 h-px bg-accent/40"
              style={styling?.accentColor ? { backgroundColor: styling.accentColor } : undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
