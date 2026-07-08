'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/api';
import { defaultLocale } from '@/i18n';

/**
 * Featured Case Studies - Editorial Layout
 * 
 * An editorial feature section showcasing 1-3 case studies with:
 * - Large contextual images that anchor each case visually
 * - Destination/region labeling for place-driven narrative
 * - Short delivery summary (how it was executed)
 * - Measurable outcomes (2-3 bullets max)
 * 
 * Design principles:
 * - Vertical or alternating split layout (image | content)
 * - Text-dominant and readable
 * - Generous whitespace
 * - No card grids, masonry, or hover-heavy interactions
 * - Operationally credible, not marketing-driven
 */

interface CaseStudyItem {
  slug?: string;
  image?: { url?: string } | null;
  destination?: string;
  title?: string;
  deliverySummary?: string;
  metrics?: { number?: string; label?: string }[];
  partnerName?: string;
  partnerCountry?: string;
  featured?: boolean;
  featuredOrder?: number;
}

interface FeaturedCaseStudiesProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  caseStudies?: CaseStudyItem[];
  locale?: string;
}

export function FeaturedCaseStudies({
  eyebrow = 'Dự án tiêu biểu',
  title = 'Cách chúng tôi triển khai',
  subtitle,
  caseStudies = [],
  locale = defaultLocale,
}: FeaturedCaseStudiesProps) {
  // Filter and sort featured case studies (max 3)
  const featuredStudies = caseStudies
    .filter(study => study.featured)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99))
    .slice(0, 3);

  // If no featured studies, use first 3 available
  const displayStudies = featuredStudies.length > 0 
    ? featuredStudies 
    : caseStudies.slice(0, 3);

  if (displayStudies.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <header className="max-w-3xl mb-20 md:mb-24">
          {eyebrow && (
            <p className="text-sm tracking-widest uppercase text-foreground-secondary mb-4">
              {eyebrow}
            </p>
          )}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-light leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-6 text-lg text-foreground-secondary max-w-2xl">
              {subtitle}
            </p>
          )}
        </header>

        {/* Case Studies - Vertical Editorial Layout */}
        <div className="space-y-24 md:space-y-32">
          {displayStudies.map((study, index) => (
            <CaseStudyFeature 
              key={index} 
              study={study} 
              reversed={index % 2 === 1}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Individual Case Study Feature
 * Alternating split layout: image | content or content | image
 */
function CaseStudyFeature({ 
  study, 
  reversed = false,
  locale = defaultLocale,
}: { 
  study: CaseStudyItem; 
  reversed?: boolean;
  locale?: string;
}) {
  const imageUrl = study.image?.url ? getImageUrl(study.image.url) : null;
  const hasDetailPage = !!study.slug;
  const detailUrl = hasDetailPage ? `/${locale}/case-studies/${study.slug}` : undefined;

  // Wrapper component - Link if has slug, div otherwise
  const ContentWrapper = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    if (hasDetailPage && detailUrl) {
      return (
        <Link href={detailUrl} className={`${className} group`}>
          {children}
        </Link>
      );
    }
    return <div className={className}>{children}</div>;
  };

  return (
    <article 
      className={`
        grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center
        ${reversed ? 'lg:flex-row-reverse' : ''}
      `}
    >
      {/* Image Section - 7 columns on large screens */}
      <div 
        className={`
          lg:col-span-7
          ${reversed ? 'lg:order-2' : 'lg:order-1'}
        `}
      >
        <ContentWrapper className="block">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-border/10">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={study.title || 'Case study'}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center">
                <svg 
                  className="w-16 h-16 text-foreground/20" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
            )}
          </div>
        </ContentWrapper>
      </div>

      {/* Content Section - 5 columns on large screens */}
      <div 
        className={`
          lg:col-span-5
          ${reversed ? 'lg:order-1' : 'lg:order-2'}
        `}
      >
        <div className="max-w-xl">
          {/* Destination Label */}
          {study.destination && (
            <p className="text-sm tracking-wide uppercase text-accent mb-4">
              {study.destination}
            </p>
          )}

          {/* Case Title - Linked if has slug */}
          {hasDetailPage && detailUrl ? (
            <Link href={detailUrl} className="group">
              <h3 className="font-serif text-2xl md:text-3xl text-foreground font-light leading-snug mb-6 group-hover:text-accent transition-colors">
                {study.title}
              </h3>
            </Link>
          ) : (
            <h3 className="font-serif text-2xl md:text-3xl text-foreground font-light leading-snug mb-6">
              {study.title}
            </h3>
          )}

          {/* Delivery Summary */}
          {study.deliverySummary && (
            <p className="text-foreground-secondary leading-relaxed mb-8">
              {study.deliverySummary}
            </p>
          )}

          {/* Measurable Outcomes */}
          {study.metrics && study.metrics.length > 0 && (
            <div className="border-t border-border pt-6">
              <p className="text-xs tracking-widest uppercase text-foreground-secondary mb-4">
                Outcomes
              </p>
              <ul className="space-y-3">
                {study.metrics.slice(0, 3).map((metric, idx) => (
                  <li key={idx} className="flex items-baseline gap-3">
                    <span className="font-serif text-2xl text-foreground">
                      {metric.number}
                    </span>
                    <span className="text-foreground-secondary">
                      {metric.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Partner Attribution (subtle) */}
          {study.partnerName && (
            <p className="mt-8 text-sm text-foreground-secondary/70">
              {study.partnerName}
              {study.partnerCountry && ` · ${study.partnerCountry}`}
            </p>
          )}

          {/* Read More Link - Only if has detail page */}
          {hasDetailPage && detailUrl && (
            <div className="mt-6">
              <Link 
                href={detailUrl}
                className="inline-flex items-center text-sm text-foreground hover:text-accent transition-colors group"
              >
                <span>Read full case study</span>
                <svg 
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default FeaturedCaseStudies;
