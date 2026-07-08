'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getMediaImageUrl } from '@/lib/api';
import { SectionStyling } from '@/types';

interface ValueHighlight {
  icon?: string;
  title?: string;
  description?: string;
  stat?: string;
  statLabel?: string;
}

interface B2BValuePropositionPremiumProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  highlights?: ValueHighlight[];
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: { url?: string } | string | null;
  styling?: SectionStyling;
}

// Premium SVG icons with travel/luxury feel
const premiumIcons: Record<string, React.ReactNode> = {
  handshake: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <path d="M20 38L32 26L44 38" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
      <ellipse cx="32" cy="44" rx="20" ry="8" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <path d="M16 32C16 32 24 24 32 24C40 24 48 32 48 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" fillOpacity="0.15"/>
      <path d="M28 32L32 36L40 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="32" cy="32" rx="8" ry="20" stroke="currentColor" strokeWidth="1"/>
      <path d="M12 32H52" stroke="currentColor" strokeWidth="1"/>
      <path d="M16 22H48" stroke="currentColor" strokeWidth="0.75" opacity="0.5"/>
      <path d="M16 42H48" stroke="currentColor" strokeWidth="0.75" opacity="0.5"/>
      {/* Plane path */}
      <path d="M14 20L50 44" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4"/>
      <circle cx="50" cy="44" r="2" fill="currentColor" opacity="0.6"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <path d="M32 8L12 16V32C12 44 20 52 32 56C44 52 52 44 52 32V16L32 8Z" 
            stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05"/>
      <path d="M32 12L16 18V32C16 42 22 48 32 52C42 48 48 42 48 32V18L32 12Z" 
            stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <path d="M24 32L30 38L42 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3"/>
      <path d="M32 18V32L42 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="3" fill="currentColor" fillOpacity="0.2"/>
      {/* Hour markers */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <line
          key={i}
          x1={32 + 17 * Math.cos((angle - 90) * Math.PI / 180)}
          y1={32 + 17 * Math.sin((angle - 90) * Math.PI / 180)}
          x2={32 + 20 * Math.cos((angle - 90) * Math.PI / 180)}
          y2={32 + 20 * Math.sin((angle - 90) * Math.PI / 180)}
          stroke="currentColor"
          strokeWidth={i % 3 === 0 ? 2 : 1}
          opacity={i % 3 === 0 ? 0.8 : 0.3}
        />
      ))}
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M32 12L36 32L32 52L28 32L32 12Z" stroke="currentColor" strokeWidth="1"/>
      <path d="M32 12L36 32L32 52" fill="currentColor" fillOpacity="0.15"/>
      <path d="M12 32L32 28L52 32L32 36L12 32Z" stroke="currentColor" strokeWidth="1"/>
      <circle cx="32" cy="32" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <text x="32" y="10" textAnchor="middle" fill="currentColor" fontSize="6" opacity="0.6">N</text>
    </svg>
  ),
};

function getIcon(iconName?: string): React.ReactNode {
  if (!iconName) return premiumIcons.compass;
  return premiumIcons[iconName] || premiumIcons.compass;
}

export function B2BValuePropositionPremium({
  eyebrow = 'Your Partner in Southeast Asia',
  title = 'Trusted DMC for Discerning Travel Partners',
  subtitle = 'We combine deep local expertise with international service standards to deliver exceptional travel experiences across Vietnam, Cambodia, Laos, and Thailand.',
  highlights = [],
  ctaText = 'Explore Partnership',
  ctaLink = '/partners',
  secondaryCtaText = 'View Our Expertise',
  secondaryCtaLink = '/partners/expertise',
  backgroundImage,
  styling,
}: B2BValuePropositionPremiumProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Default highlights with stats
  const defaultHighlights: ValueHighlight[] = [
    {
      icon: 'handshake',
      title: 'White-Label Partnership',
      description: 'Maintain your brand identity with our behind-the-scenes expertise. Seamless integration with your operations.',
      stat: '100%',
      statLabel: 'Brand Confidentiality',
    },
    {
      icon: 'globe',
      title: 'Multi-Destination Expertise',
      description: 'Unified operations across four countries with consistent quality standards and local knowledge.',
      stat: '4',
      statLabel: 'Countries Covered',
    },
    {
      icon: 'shield',
      title: 'Risk-Free Operations',
      description: 'Comprehensive insurance, 24/7 emergency support, and rigorous supplier vetting for peace of mind.',
      stat: '0',
      statLabel: 'Major Incidents',
    },
    {
      icon: 'clock',
      title: 'Rapid Response Time',
      description: 'Quotes within 24 hours, dedicated account managers, and real-time availability confirmation.',
      stat: '24h',
      statLabel: 'Quote Turnaround',
    },
  ];

  const displayHighlights = highlights.length > 0 ? highlights : defaultHighlights;
  const bgImageUrl = getMediaImageUrl(backgroundImage);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
      style={styling?.sectionBackground ? { backgroundColor: styling.sectionBackground } : undefined}
    >
      {/* Cinematic Background */}
      <motion.div style={{ y: backgroundY, opacity }} className="absolute inset-0 z-0">
        {bgImageUrl ? (
          <Image
            src={bgImageUrl}
            alt=""
            fill
            className="object-cover"
            priority
          />
        ) : !styling?.sectionBackground && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]" />
        )}
        {/* Sophisticated overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      </motion.div>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] z-[1]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.05, scale: 1 } : {}}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 border border-white/20 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 0.03, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute inset-12 border border-white/10 rounded-full"
        />
      </div>

      <div className="container-wide relative z-10">
        {/* Two-column asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-5">
            {/* Eyebrow with line */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span 
                className="w-12 h-px" 
                style={{ backgroundColor: styling?.accentColor || '#C4A35A' }}
              />
              <span 
                className="text-xs tracking-[0.3em] uppercase font-light"
                style={{ color: styling?.accentColor || '#C4A35A' }}
              >
                {eyebrow}
              </span>
            </motion.div>

            {/* Title with refined typography */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-8"
              style={{ color: styling?.titleColor || '#FFFFFF' }}
            >
              {title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg font-light leading-relaxed mb-10 max-w-lg"
              style={{ color: styling?.subtitleColor || 'rgba(255,255,255,0.6)' }}
            >
              {subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href={ctaLink}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 
                         text-xs tracking-[0.2em] uppercase font-light transition-all duration-500
                         hover:shadow-xl"
                style={{
                  backgroundColor: styling?.buttonBackground || '#C4A35A',
                  color: styling?.buttonTextColor || '#FFFFFF',
                }}
              >
                {ctaText}
                <svg 
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              {secondaryCtaText && (
                <Link
                  href={secondaryCtaLink || '#'}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 
                           border border-white/20 text-xs tracking-[0.2em] uppercase font-light
                           transition-all duration-500 hover:border-white/60 hover:bg-white/5"
                  style={{ color: styling?.textColor || '#FFFFFF' }}
                >
                  {secondaryCtaText}
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right: Value highlights in premium cards */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {displayHighlights.map((highlight, index) => {
                const accentColor = styling?.accentColor || '#C4A35A';
                const cardBg = styling?.cardBackground;
                const cardBorder = styling?.cardBorderColor;
                
                return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`group relative p-6 md:p-8 cursor-default transition-all duration-500
                            backdrop-blur-sm border rounded-sm
                            ${index === 0 ? 'sm:-translate-y-4' : ''}
                            ${index === 3 ? 'sm:translate-y-4' : ''}`}
                  style={{
                    backgroundColor: activeIndex === index 
                      ? (cardBg || 'rgba(255,255,255,0.1)') 
                      : (cardBg ? `${cardBg}80` : 'rgba(255,255,255,0.05)'),
                    borderColor: activeIndex === index 
                      ? `${accentColor}80` 
                      : (cardBorder || 'rgba(255,255,255,0.1)'),
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    animate={{ 
                      color: activeIndex === index ? accentColor : (styling?.cardTextColor || '#ffffff'),
                    }}
                    className="w-12 h-12 md:w-14 md:h-14 mb-6 transition-colors duration-500"
                  >
                    {getIcon(highlight.icon)}
                  </motion.div>

                  {/* Stat badge */}
                  {highlight.stat && (
                    <div className="absolute top-6 right-6 text-right">
                      <span 
                        className="block text-2xl md:text-3xl font-serif font-light transition-colors duration-500"
                        style={{ color: activeIndex === index ? accentColor : 'rgba(255,255,255,0.4)' }}
                      >
                        {highlight.stat}
                      </span>
                      {highlight.statLabel && (
                        <span 
                          className="block text-[10px] tracking-wider uppercase mt-1"
                          style={{ color: styling?.cardTextColor || 'rgba(255,255,255,0.3)' }}
                        >
                          {highlight.statLabel}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Title */}
                  <h3 
                    className="font-serif text-xl md:text-2xl mb-3 transition-colors duration-500"
                    style={{ color: styling?.cardTitleColor || (activeIndex === index ? '#FFFFFF' : 'rgba(255,255,255,0.9)') }}
                  >
                    {highlight.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="text-sm font-light leading-relaxed"
                    style={{ color: styling?.cardTextColor || 'rgba(255,255,255,0.5)' }}
                  >
                    {highlight.description}
                  </p>

                  {/* Hover accent line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-px origin-left"
                    style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
                  />
                </motion.div>
              )})}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[2]" />
    </section>
  );
}
