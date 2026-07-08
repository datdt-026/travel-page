'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/api';
import RichText from '@/components/RichText';
import { Media } from '@/types';
import { defaultLocale } from '@/i18n';

/**
 * Experience Block Component
 * 
 * Groups content by experience type rather than time.
 * Focuses on feeling, atmosphere, and depth of experience.
 * 
 * DESIGN PRINCIPLES:
 * - Experience-first, not schedule-first
 * - Atmospheric presentation
 * - Editorial photography layout
 * - Understated luxury aesthetic
 */

interface Experience {
  title: string;
  description?: any; // RichText
  image?: Media | string;
  atmosphere?: string;
  location?: string;
  attraction?: { slug: string; name: string } | string;
}

interface ExperienceBlockProps {
  experienceType: string;
  title?: string;
  introduction?: string;
  experiences: Experience[];
  layout?: 'stacked' | 'editorial-grid' | 'masonry' | 'featured-list';
  showDivider?: boolean;
  locale?: string;
  className?: string;
}

// Experience type configurations
const experienceTypeConfig: Record<string, { label: string; icon: string; accentColor: string }> = {
  'culture-heritage': { 
    label: 'Culture & Heritage', 
    icon: '◆',
    accentColor: 'text-amber-700',
  },
  'nature-landscape': { 
    label: 'Nature & Landscape', 
    icon: '◇',
    accentColor: 'text-emerald-700',
  },
  'culinary': { 
    label: 'Culinary Moments', 
    icon: '○',
    accentColor: 'text-rose-700',
  },
  'local-encounters': { 
    label: 'Local Encounters', 
    icon: '◈',
    accentColor: 'text-indigo-700',
  },
  'wellness': { 
    label: 'Wellness & Retreat', 
    icon: '◎',
    accentColor: 'text-teal-700',
  },
  'adventure': { 
    label: 'Adventure & Discovery', 
    icon: '▲',
    accentColor: 'text-orange-700',
  },
  'art-architecture': { 
    label: 'Art & Architecture', 
    icon: '□',
    accentColor: 'text-slate-700',
  },
  'slow-travel': { 
    label: 'Slow Travel', 
    icon: '◌',
    accentColor: 'text-stone-600',
  },
  'hidden-gems': { 
    label: 'Hidden Gems', 
    icon: '✦',
    accentColor: 'text-violet-700',
  },
};

function ExperienceCard({ 
  experience, 
  index, 
  layout,
  locale = defaultLocale,
}: { 
  experience: Experience; 
  index: number;
  layout: string;
  locale?: string;
}) {
  const imageUrl = experience.image && typeof experience.image === 'object' 
    ? getImageUrl(experience.image.url) 
    : undefined;
  const imageAlt = experience.image && typeof experience.image === 'object' 
    ? experience.image.alt || experience.title 
    : experience.title;

  const attractionLink = experience.attraction && typeof experience.attraction === 'object'
    ? `/${locale}/attractions/${experience.attraction.slug}`
    : null;

  if (layout === 'stacked') {
    return (
      <article className="group">
        {/* Image */}
        {imageUrl && (
          <div className="relative aspect-[16/10] mb-8 overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-light text-neutral-900 mb-4">
            {attractionLink ? (
              <Link href={attractionLink} className="hover:text-neutral-600 transition-colors">
                {experience.title}
              </Link>
            ) : (
              experience.title
            )}
          </h3>
          
          {experience.atmosphere && (
            <p className="text-sm text-neutral-400 uppercase tracking-wide mb-4">
              {experience.atmosphere}
            </p>
          )}
          
          {experience.description && (
            <div className="prose prose-neutral max-w-none font-light leading-relaxed">
              <RichText content={experience.description} />
            </div>
          )}
          
          {experience.location && (
            <p className="mt-6 text-sm text-neutral-500">
              <span className="inline-block w-4 h-px bg-neutral-300 mr-3 align-middle" />
              {experience.location}
            </p>
          )}
        </div>
      </article>
    );
  }

  // Editorial Grid Layout
  if (layout === 'editorial-grid') {
    const isLarge = index === 0 || index === 3;
    
    return (
      <article className={`group ${isLarge ? 'md:col-span-2' : ''}`}>
        {imageUrl && (
          <div className={`relative ${isLarge ? 'aspect-[16/9]' : 'aspect-[4/5]'} mb-5 overflow-hidden`}>
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes={isLarge ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          </div>
        )}
        
        <h3 className="text-xl font-light text-neutral-900 mb-2">
          {attractionLink ? (
            <Link href={attractionLink} className="hover:text-neutral-600 transition-colors">
              {experience.title}
            </Link>
          ) : (
            experience.title
          )}
        </h3>
        
        {experience.atmosphere && (
          <p className="text-sm text-neutral-400">{experience.atmosphere}</p>
        )}
      </article>
    );
  }

  // Featured + List Layout
  if (layout === 'featured-list' && index === 0) {
    return (
      <article className="group md:col-span-2">
        <div className="flex flex-col md:flex-row gap-8">
          {imageUrl && (
            <div className="md:w-1/2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          )}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-light text-neutral-900 mb-4">
              {experience.title}
            </h3>
            {experience.description && (
              <div className="prose prose-neutral max-w-none font-light">
                <RichText content={experience.description} />
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }

  // List item (for featured-list, non-featured items)
  return (
    <article className="group flex gap-4 py-4 border-b border-neutral-100 last:border-0">
      {imageUrl && (
        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}
      <div>
        <h4 className="text-lg font-light text-neutral-900 mb-1">
          {experience.title}
        </h4>
        {experience.atmosphere && (
          <p className="text-sm text-neutral-400">{experience.atmosphere}</p>
        )}
      </div>
    </article>
  );
}

export default function ExperienceBlock({
  experienceType,
  title,
  introduction,
  experiences,
  layout = 'stacked',
  showDivider = true,
  locale = defaultLocale,
  className = '',
}: ExperienceBlockProps) {
  const typeConfig = experienceTypeConfig[experienceType] || {
    label: experienceType,
    icon: '•',
    accentColor: 'text-neutral-700',
  };

  const displayTitle = title || typeConfig.label;

  return (
    <section className={`${className}`}>
      {/* Section Header */}
      <header className="max-w-3xl mx-auto px-6 mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-lg ${typeConfig.accentColor}`}>{typeConfig.icon}</span>
          <span className="text-sm text-neutral-400 uppercase tracking-[0.15em]">
            {typeConfig.label}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-light text-neutral-900 mb-4">
          {displayTitle}
        </h2>
        {introduction && (
          <p className="text-lg text-neutral-500 font-light leading-relaxed">
            {introduction}
          </p>
        )}
      </header>

      {/* Experiences */}
      <div className="max-w-5xl mx-auto px-6">
        {layout === 'stacked' ? (
          <div className="space-y-16 md:space-y-24">
            {experiences.map((experience, index) => (
              <div key={index}>
                {showDivider && index > 0 && (
                  <div className="flex justify-center mb-16 md:mb-24">
                    <div className="w-12 h-px bg-neutral-200" />
                  </div>
                )}
                <ExperienceCard 
                  experience={experience} 
                  index={index} 
                  layout={layout}
                  locale={locale}
                />
              </div>
            ))}
          </div>
        ) : layout === 'editorial-grid' ? (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {experiences.map((experience, index) => (
              <ExperienceCard 
                key={index}
                experience={experience} 
                index={index} 
                layout={layout}
                locale={locale}
              />
            ))}
          </div>
        ) : layout === 'featured-list' ? (
          <div className="grid md:grid-cols-2 gap-8">
            {experiences.map((experience, index) => (
              <ExperienceCard 
                key={index}
                experience={experience} 
                index={index} 
                layout={layout}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {experiences.map((experience, index) => (
              <div key={index} className="break-inside-avoid">
                <ExperienceCard 
                  experience={experience} 
                  index={index} 
                  layout="stacked"
                  locale={locale}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
