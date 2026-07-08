'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * ResponsiblePracticesSection
 * 
 * A typography-driven, editorial component for displaying responsible tourism
 * practices as operational disciplines. Designed to feel like a craft handbook
 * or internal operating standard—not marketing material.
 * 
 * Design principles:
 * - No cards, icons, or green clichés
 * - Generous whitespace
 * - Vertical stacked layout
 * - Subtle dividers only where necessary
 * - Typography-driven hierarchy
 * - Minimal interaction
 * - Optional context image for atmospheric depth (not content)
 */

export interface ResponsiblePractice {
  title: string;
  description: string;
  details: { text: string }[];
  order: number;
  status: 'active' | 'inactive';
}

interface ResponsiblePracticesSectionProps {
  eyebrow?: string;
  title?: string;
  introduction?: string;
  practices: ResponsiblePractice[];
  contextImage?: string; // Optional single context image URL
}

// Animation variants for staggered reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const, // Custom easing for smooth reveal
    },
  },
};

// Single practice item component
function PracticeItem({
  practice,
  index,
  isLast,
}: {
  practice: ResponsiblePractice;
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.article
      variants={itemVariants}
      className="group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Practice Number - Subtle reference marker */}
        <div className="lg:col-span-1">
          <span className="text-sm font-mono text-foreground-tertiary tracking-wider">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-5">
          {/* Title - Editorial, authoritative */}
          <h3 className="font-serif text-2xl md:text-3xl text-foreground font-normal leading-tight mb-4 tracking-tight">
            {practice.title}
          </h3>

          {/* Description - Editorial body copy */}
          <p className="text-foreground-secondary text-base md:text-lg leading-relaxed max-w-prose">
            {practice.description}
          </p>
        </div>

        {/* In Practice - Operational details */}
        <div className="lg:col-span-6">
          <div className="lg:pl-8 lg:border-l border-border/50">
            <span className="text-xs font-medium tracking-widest uppercase text-foreground-tertiary mb-4 block">
              In Practice
            </span>
            <ul className="space-y-3">
              {practice.details.map((detail, detailIndex) => (
                <li
                  key={detailIndex}
                  className="flex items-start gap-3 text-foreground-secondary"
                >
                  {/* Minimal bullet - just a dash, no icons */}
                  <span className="text-foreground-tertiary mt-1.5 select-none" aria-hidden="true">
                    —
                  </span>
                  <span className="text-base leading-relaxed">
                    {detail.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider - subtle, only between items */}
      {!isLast && (
        <div className="mt-16 lg:mt-20">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      )}
    </motion.article>
  );
}

export function ResponsiblePracticesSection({
  eyebrow = 'Operating Standards',
  title = 'Responsible Tourism Practices',
  introduction,
  practices,
  contextImage,
}: ResponsiblePracticesSectionProps) {
  // Filter and sort practices
  const activePractices = practices
    .filter((p) => p.status === 'active')
    .sort((a, b) => a.order - b.order);

  if (activePractices.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-surface-primary">
      {/* 
        Layout: Desktop uses side-by-side (image left, content right)
        Mobile: Image above section title
      */}
      <div className="container-luxury">
        <div className={`${contextImage ? 'lg:grid lg:grid-cols-12 lg:gap-16 xl:gap-24' : ''}`}>
          
          {/* Context Image — Atmospheric, not content */}
          {contextImage && (
            <motion.aside
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="lg:col-span-4 xl:col-span-3 mb-12 lg:mb-0"
            >
              {/* Mobile: horizontal aspect, Desktop: tall/sticky */}
              <div className="lg:sticky lg:top-32">
                <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden">
                  <Image
                    src={contextImage}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover grayscale-[20%] contrast-[0.95] brightness-[1.02]"
                    loading="lazy"
                  />
                  {/* Subtle grain overlay for editorial texture */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                {/* Subtle caption line — optional geographic context */}
                <div className="mt-4 pt-4 border-t border-border/20">
                  <p className="text-xs text-foreground-tertiary tracking-wide">
                    Field operations
                  </p>
                </div>
              </div>
            </motion.aside>
          )}

          {/* Main Content Column */}
          <div className={contextImage ? 'lg:col-span-8 xl:col-span-9' : ''}>
            {/* Section Header - Editorial, left-aligned */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-20 lg:mb-28 max-w-4xl"
            >
              {/* Eyebrow - Subtle, professional */}
              {eyebrow && (
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-foreground-tertiary mb-6 block">
                  {eyebrow}
                </span>
              )}

              {/* Title - Large, editorial serif */}
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light leading-[1.1] tracking-tight mb-8">
                {title}
              </h2>

              {/* Optional Introduction */}
              {introduction && (
                <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-2xl">
                  {introduction}
                </p>
              )}
            </motion.header>

            {/* Practices List - Vertical stacked layout */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-16 lg:space-y-20"
            >
              {activePractices.map((practice, index) => (
                <PracticeItem
                  key={practice.title}
                  practice={practice}
                  index={index}
                  isLast={index === activePractices.length - 1}
                />
              ))}
            </motion.div>

            {/* Section Footer - Subtle editorial closing */}
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-24 lg:mt-32 pt-12 border-t border-border/30"
            >
              <p className="text-sm text-foreground-tertiary max-w-2xl leading-relaxed">
                These practices are reviewed annually and integrated into our partner onboarding, 
                guide training, and supplier evaluation processes. For detailed documentation, 
                contact our operations team.
              </p>
            </motion.footer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResponsiblePracticesSection;
