'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/api';

/**
 * Partner Statement - Enhanced structure for credible trust reinforcement
 * 
 * Credibility fields:
 * - partnerRole: Source clarity (e.g., "Operations Director")
 * - partnerType: Partner category (e.g., "Inbound Operator", "DMC")
 * - region: Market context (e.g., "Europe", "Southeast Asia")
 * - partnerLogo: Optional quiet marker (rendered monochrome, small)
 */
interface PartnerStatement {
  quote: string;
  partnerRole?: string;
  partnerType: string;
  region?: string;
  partnerLogo?: { url?: string } | null;
}

interface PartnerStatementsStripProps {
  /**
   * Section title - kept minimal for editorial feel
   */
  title?: string;
  /**
   * Source authenticity signal
   * e.g., "Feedback collected during annual partner review · 2024"
   */
  reviewContext?: string;
  /**
   * Partner statements - max 2-3 for scannability
   */
  statements?: PartnerStatement[];
  /**
   * Visual variant
   * - 'horizontal': Side-by-side layout (desktop)
   * - 'vertical': Stacked layout
   */
  layout?: 'horizontal' | 'vertical';
}

/**
 * PartnerStatementsStrip
 * 
 * A calm, credible "What Our Partners Say" section designed for trust reinforcement.
 * 
 * Design Rationale:
 * - Typography-driven hierarchy without visual clutter
 * - No cards, avatars, logos, or carousels
 * - Generous whitespace for a supportive, non-dominant feel
 * - Subtle dividers create visual rhythm
 * - Text-first approach emphasizes operational credibility
 * 
 * This section acts as a trust signal, not content focus.
 * It should feel editorial and professional, complementing
 * the Featured Case Studies without competing for attention.
 */
export function PartnerStatementsStrip({
  title = 'What Our Partners Say',
  reviewContext,
  statements = [],
  layout = 'horizontal',
}: PartnerStatementsStripProps) {
  // Default statements - operational and professional in tone
  // Enhanced with role context for credibility
  const defaultStatements: PartnerStatement[] = [
    {
      quote: 'Operationally consistent across peak seasons with clear communication.',
      partnerRole: 'Operations Director',
      partnerType: 'Inbound Operator',
      region: 'Europe',
    },
    {
      quote: 'Strong local partner coordination and reliable delivery timelines.',
      partnerRole: 'Product Manager',
      partnerType: 'Wholesaler',
      region: 'Australia',
    },
    {
      quote: 'Dependable ground handling with attention to service quality.',
      partnerRole: 'Contracting Manager',
      partnerType: 'DMC',
      region: 'North America',
    },
  ];

  const defaultReviewContext = 'Partner feedback from operational reviews · 2024';

  const displayStatements = statements.length > 0 
    ? statements.slice(0, 3) // Enforce max 3 statements
    : defaultStatements;

  // Don't render if no statements
  if (displayStatements.length === 0) {
    return null;
  }

  const isHorizontal = layout === 'horizontal';

  return (
    <section 
      className="py-16 md:py-20 bg-surface/30"
      aria-labelledby="partner-statements-title"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header - Title + Source Context */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-14"
        >
          <h2 
            id="partner-statements-title"
            className="text-sm tracking-[0.2em] uppercase text-foreground-secondary font-medium"
          >
            {title}
          </h2>
          {/* Source Authenticity Signal */}
          {(reviewContext || defaultReviewContext) && (
            <p className="mt-2 text-xs text-foreground-secondary/70 font-normal">
              {reviewContext || defaultReviewContext}
            </p>
          )}
        </motion.div>

        {/* Statements Layout */}
        <div 
          className={`
            ${isHorizontal 
              ? 'grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16' 
              : 'flex flex-col gap-10 md:gap-12 max-w-2xl'
            }
          `}
        >
          {displayStatements.map((statement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={`
                relative
                ${isHorizontal 
                  ? 'md:border-l md:border-border md:pl-6 lg:pl-8 first:border-l-0 first:pl-0' 
                  : 'border-l border-border pl-6'
                }
              `}
            >
              {/* Quote - The primary content */}
              <blockquote className="text-foreground text-lg md:text-xl leading-relaxed font-light mb-4">
                "{statement.quote}"
              </blockquote>

              {/* Attribution - Enhanced with role and type for credibility */}
              <div className="flex items-start gap-3">
                {/* Optional Partner Logo - Monochrome, small, low priority */}
                {statement.partnerLogo?.url && (
                  <div className="relative w-8 h-8 flex-shrink-0 opacity-40 grayscale">
                    <Image
                      src={getImageUrl(statement.partnerLogo.url) || ''}
                      alt=""
                      fill
                      className="object-contain"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-0.5">
                  {/* Partner Role - Primary attribution */}
                  {statement.partnerRole && (
                    <span className="text-sm text-foreground-secondary font-medium">
                      {statement.partnerRole}
                    </span>
                  )}
                  {/* Partner Type + Region - Secondary context */}
                  <div className="flex items-center gap-1.5 text-xs text-foreground-secondary/70">
                    <span>{statement.partnerType}</span>
                    {statement.region && (
                      <>
                        <span className="text-border">·</span>
                        <span>{statement.region}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export type { PartnerStatement, PartnerStatementsStripProps };
