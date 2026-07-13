'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Itinerary, SectionStyling } from '@/types';
import { defaultLocale } from '@/i18n';
import { getMediaImageUrl } from '@/lib/api';

interface SignatureExperiencesProps {
  experiences: Itinerary[];
  title?: string;
  subtitle?: string;
  locale?: string;
  limit?: number;
  styling?: SectionStyling;
}

function getImageUrl(image: any): string | null {
  return getMediaImageUrl(image, ['large']) || null;
}

export default function SignatureExperiences({
  experiences,
  title = "Trải nghiệm đặc trưng",
  subtitle = "Vượt khỏi những điều quen thuộc",
  locale = defaultLocale,
  limit = 3,
  styling
}: SignatureExperiencesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Take first N experiences (based on limit prop)
  const featuredExperiences = experiences.slice(0, limit);

  if (featuredExperiences.length === 0) return null;

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: styling?.sectionBackground || 'var(--surface-primary)' }}
    >
      {/* Background accent */}
      <div 
        className="absolute right-0 top-1/4 w-1/3 h-1/2 -z-10"
        style={{ backgroundColor: styling?.cardBackground ? `${styling.cardBackground}80` : 'rgba(var(--surface-secondary-rgb), 0.5)' }}
      />

      <div className="container-wide">
        {/* Section Header */}
        <div 
          className={`mb-20 md:mb-28 text-center transition-all duration-1000 ease-elegant ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span 
            className="text-label-md uppercase tracking-luxury text-content-muted mb-6 block"
            style={styling?.subtitleColor ? { color: styling.subtitleColor } : undefined}
          >
            {subtitle}
          </span>
          <h2 
            className="font-serif text-display-md text-content-primary tracking-tight max-w-2xl mx-auto"
            style={styling?.titleColor ? { color: styling.titleColor } : undefined}
          >
            {title}
          </h2>
        </div>

        {/* Editorial Layout - Alternating image/text */}
        <div className="space-y-24 md:space-y-32 lg:space-y-40">
          {featuredExperiences.map((experience, index) => {
            const imageUrl = getImageUrl(experience.featuredImage);
            const experienceTitle =
              experience.title?.trim() || experience.slug || 'Itinerary';
            const isReversed = index % 2 === 1;
            
            // Build card styles
            const cardStyle: React.CSSProperties = {};
            if (styling?.cardBackground) {
              cardStyle.backgroundColor = styling.cardBackground;
            }
            
            return (
              <div 
                key={experience.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-1000 ease-elegant ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-16'
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                {/* Image Column */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : ''}`}>
                  <Link 
                    href={`/${locale}/itineraries/${experience.slug}`}
                    className="group block relative overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] lg:aspect-[3/2]">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={experienceTitle}
                          fill
                          className="object-cover transition-transform duration-1000 ease-elegant group-hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-surface-tertiary" />
                      )}
                    </div>
                    
                    {/* Duration badge - subtle */}
                    {experience.duration && (
                      <div 
                        className="absolute top-6 left-6 px-4 py-2 backdrop-blur-sm"
                        style={{ backgroundColor: styling?.cardBackground ? `${styling.cardBackground}CC` : 'rgba(var(--surface-dark-rgb), 0.8)' }}
                      >
                        <span 
                          className="text-label-sm uppercase tracking-luxury"
                          style={{ color: styling?.cardTextColor || 'var(--content-inverse)' }}
                        >
                          {experience.duration} Days
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                      <h3
                        className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-tight"
                        style={styling?.cardTitleColor ? { color: styling.cardTitleColor } : undefined}
                      >
                        {experienceTitle}
                      </h3>
                    </div>
                  </Link>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1 lg:pr-8' : 'lg:pl-8'}`}>
                  <div className="max-w-md" style={cardStyle}>
                    {/* Index Number - Editorial style */}
                    <span 
                      className="font-serif text-6xl md:text-7xl font-light mb-6 block"
                      style={{ color: styling?.accentColor || 'var(--border-light)' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    
                    <Link 
                      href={`/${locale}/itineraries/${experience.slug}`}
                      className="group"
                    >
                      <h3 
                        className="font-serif text-heading-xl mb-6 transition-colors duration-300"
                        style={{ color: styling?.cardTitleColor || 'var(--content-primary)' }}
                      >
                        {experienceTitle}
                      </h3>
                    </Link>
                    
                    {experience.excerpt && (
                      <p 
                        className="text-body-md leading-relaxed mb-8"
                        style={{ color: styling?.cardTextColor || 'var(--content-secondary)' }}
                      >
                        {experience.excerpt}
                      </p>
                    )}
                    
                    <Link 
                      href={`/${locale}/itineraries/${experience.slug}`}
                      className="group inline-flex items-center gap-3 text-body-sm uppercase tracking-editorial transition-colors duration-300 hover:opacity-80"
                      style={{ color: styling?.accentColor || 'var(--content-muted)' }}
                    >
                      <span>Discover More</span>
                      <svg 
                        className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
