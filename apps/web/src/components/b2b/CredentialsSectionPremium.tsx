'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
import { SectionStyling } from '@/types';

interface Credential {
  type?: 'stat' | 'certification' | 'award' | 'membership';
  value?: string;
  label?: string;
  description?: string;
  logo?: { url?: string } | null;
  year?: string;
}

interface CredentialsSectionPremiumProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  credentials?: Credential[];
  variant?: 'floating' | 'timeline' | 'showcase';
  styling?: SectionStyling;
}

// Animated number counter
function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const increment = numericValue / (duration * 60);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, numericValue, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function CredentialsSectionPremium({
  eyebrow = 'Our Credentials',
  title = 'Trusted Excellence',
  subtitle = 'Years of dedication to exceptional travel experiences, backed by industry recognition.',
  credentials = [],
  variant = 'floating',
  styling,
}: CredentialsSectionPremiumProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Default credentials
  const defaultCredentials: Credential[] = [
    {
      type: 'stat',
      value: '15+',
      label: 'Years of Excellence',
      description: 'Established presence in Southeast Asian tourism since 2010',
    },
    {
      type: 'stat',
      value: '500+',
      label: 'Partner Agencies',
      description: 'Trusted by travel agencies worldwide',
    },
    {
      type: 'certification',
      value: 'Travelife',
      label: 'Sustainability Partner',
      description: 'Certified sustainable tourism practices',
      year: '2023',
    },
    {
      type: 'membership',
      value: 'PATA',
      label: 'Pacific Asia Travel Association',
      description: 'Active member since 2012',
    },
    {
      type: 'stat',
      value: '50K+',
      label: 'Travelers Served',
      description: 'Successfully hosted travelers from 80+ countries',
    },
    {
      type: 'award',
      value: 'Top DMC',
      label: 'Southeast Asia 2024',
      description: 'Recognized by Travel Weekly Asia',
      year: '2024',
    },
  ];

  const displayCredentials = credentials.length > 0 ? credentials : defaultCredentials;

  // Split into stats and certifications
  const stats = displayCredentials.filter(c => c.type === 'stat');
  const certifications = displayCredentials.filter(c => c.type !== 'stat');

  if (variant === 'floating') {
    return (
      <section
        ref={sectionRef}
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: styling?.sectionBackground || '#FAFAF8' }}
      >
        {/* Subtle pattern background */}
        {!styling?.sectionBackground && (
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1C1C1C 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        )}

        <div className="container-wide relative z-10">
          {/* Header - asymmetric */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 mb-16 md:mb-24">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 mb-6"
              >
                <span className="w-12 h-px" style={{ backgroundColor: styling?.accentColor || '#C4A35A' }} />
                <span 
                  className="text-xs tracking-[0.3em] uppercase font-light"
                  style={{ color: styling?.accentColor || '#C4A35A' }}
                >
                  {eyebrow}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1]"
                style={{ color: styling?.titleColor || '#1C1C1C' }}
              >
                {title}
              </motion.h2>
            </div>

            <div className="flex items-end">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg font-light leading-relaxed max-w-md"
                style={{ color: styling?.subtitleColor || '#6B6B6B' }}
              >
                {subtitle}
              </motion.p>
            </div>
          </div>

          {/* Stats - large floating cards */}
          <div className="grid sm:grid-cols-3 gap-6 md:gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative p-8 md:p-10 rounded-sm border 
                          transition-all duration-500 cursor-default
                          hover:shadow-xl hover:shadow-black/5
                          ${index === 1 ? 'sm:-translate-y-6' : ''}`}
                style={{
                  backgroundColor: styling?.cardBackground || '#FFFFFF',
                  borderColor: styling?.cardBorderColor || '#E8E8E6',
                }}
              >
                {/* Large stat number */}
                <div className="mb-4">
                  <span 
                    className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight transition-colors duration-500"
                    style={{ color: hoveredIndex === index ? (styling?.accentColor || '#C4A35A') : (styling?.cardTitleColor || '#1C1C1C') }}
                  >
                    <AnimatedCounter value={stat.value || '0'} />
                  </span>
                </div>

                {/* Label */}
                <h3 
                  className="text-lg font-medium mb-2"
                  style={{ color: styling?.cardTitleColor || '#1C1C1C' }}
                >
                  {stat.label}
                </h3>

                {/* Description */}
                <p 
                  className="text-sm font-light leading-relaxed"
                  style={{ color: styling?.cardTextColor || '#8A8A8A' }}
                >
                  {stat.description}
                </p>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-12 h-12 transition-opacity duration-500
                              ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                    <path d="M48 0V48H0" stroke={styling?.accentColor || '#C4A35A'} strokeWidth="1"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications - horizontal scroll on mobile, grid on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <div className="flex items-center gap-4 mb-8">
              <span 
                className="text-sm tracking-[0.2em] uppercase font-medium"
                style={{ color: styling?.textColor || '#1C1C1C' }}
              >
                Certifications & Memberships
              </span>
              <span 
                className="flex-1 h-px" 
                style={{ backgroundColor: styling?.cardBorderColor || '#E8E8E6' }}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="group relative flex items-center gap-5 p-6 backdrop-blur-sm
                           border rounded-sm transition-all duration-300
                           hover:shadow-lg hover:shadow-black/5"
                  style={{
                    backgroundColor: styling?.cardBackground ? styling.cardBackground : 'rgba(255,255,255,0.5)',
                    borderColor: styling?.cardBorderColor || '#E8E8E6',
                  }}
                >
                  {/* Logo or icon */}
                  <div 
                    className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center
                                overflow-hidden transition-all duration-300"
                    style={{ backgroundColor: styling?.cardBackground || '#F5F5F3' }}
                  >
                    {cert.logo?.url ? (
                      <Image
                        src={getImageUrl(cert.logo.url) || ''}
                        alt={cert.label || ''}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    ) : (
                      <span 
                        className="font-serif text-lg"
                        style={{ color: styling?.accentColor || '#C4A35A' }}
                      >
                        {cert.value?.charAt(0) || '★'}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: styling?.accentColor || '#C4A35A' }}
                      >
                        {cert.value}
                      </span>
                      {cert.year && (
                        <span 
                          className="text-xs"
                          style={{ color: styling?.cardTextColor || '#AAAAAA' }}
                        >
                          {cert.year}
                        </span>
                      )}
                    </div>
                    <h4 
                      className="text-sm font-medium truncate"
                      style={{ color: styling?.cardTitleColor || '#1C1C1C' }}
                    >
                      {cert.label}
                    </h4>
                    {cert.description && (
                      <p 
                        className="text-xs mt-1 line-clamp-2"
                        style={{ color: styling?.cardTextColor || '#8A8A8A' }}
                      >
                        {cert.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Timeline variant
  if (variant === 'timeline') {
    // Timeline card styles from CMS or defaults for dark theme
    const timelineCardBg = styling?.cardBackground || 'rgba(255, 255, 255, 0.05)';
    const timelineCardBorder = styling?.cardBorderColor || 'rgba(255, 255, 255, 0.1)';
    const timelineCardHoverBg = styling?.cardBackground 
      ? `color-mix(in srgb, ${styling.cardBackground} 80%, white 20%)` 
      : 'rgba(255, 255, 255, 0.1)';
    const timelineAccentColor = styling?.accentColor || '#C4A35A';
    const timelineTitleColor = styling?.titleColor || '#FFFFFF';
    const timelineCardTitleColor = styling?.cardTitleColor || '#FFFFFF';
    const timelineCardTextColor = styling?.cardTextColor || 'rgba(255, 255, 255, 0.5)';
    const timelineSubtitleColor = styling?.subtitleColor || 'rgba(255, 255, 255, 0.4)';
    
    return (
      <section
        ref={sectionRef}
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: styling?.sectionBackground || '#1C1C1C' }}
      >
        {/* Background texture */}
        {!styling?.sectionBackground && (
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />
        )}

        <div className="container-wide relative z-10">
          {/* Header */}
          <div className="text-center mb-16 md:mb-24">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="inline-block text-xs tracking-[0.3em] uppercase font-light mb-6"
              style={{ color: timelineAccentColor }}
            >
              {eyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light"
              style={{ color: timelineTitleColor }}
            >
              {title}
            </motion.h2>
          </div>

          {/* Timeline grid */}
          <div className="relative">
            {/* Center line */}
            <div 
              className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block" 
              style={{ 
                background: `linear-gradient(to bottom, transparent, ${timelineAccentColor}30, transparent)` 
              }}
            />

            <div className="space-y-8 lg:space-y-0">
              {displayCredentials.map((cred, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                  className={`relative lg:w-1/2 p-6 md:p-8
                            ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16 lg:ml-auto'}`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute top-8 hidden lg:block
                                ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}>
                    <div 
                      className="w-4 h-4 rounded-full shadow-lg"
                      style={{ 
                        backgroundColor: timelineAccentColor,
                        boxShadow: `0 10px 15px -3px ${timelineAccentColor}30`
                      }}
                    />
                  </div>

                  <div 
                    className="backdrop-blur-sm p-6 md:p-8 rounded-sm transition-all duration-300 group"
                    style={{
                      backgroundColor: timelineCardBg,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: timelineCardBorder,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = timelineCardHoverBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = timelineCardBg;
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span 
                          className="text-4xl md:text-5xl font-serif font-light"
                          style={{ color: timelineAccentColor }}
                        >
                          {cred.value}
                        </span>
                        {cred.year && (
                          <span 
                            className="block text-sm mt-1"
                            style={{ color: timelineSubtitleColor }}
                          >
                            {cred.year}
                          </span>
                        )}
                      </div>
                      {cred.logo?.url && (
                        <div 
                          className="w-12 h-12 rounded-full p-2"
                          style={{ backgroundColor: timelineCardBg }}
                        >
                          <Image
                            src={getImageUrl(cred.logo.url) || ''}
                            alt=""
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <h3 
                      className="text-lg font-medium mb-2"
                      style={{ color: timelineCardTitleColor }}
                    >
                      {cred.label}
                    </h3>
                    <p 
                      className="text-sm font-light"
                      style={{ color: timelineCardTextColor }}
                    >
                      {cred.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Showcase variant - full width cards
  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ 
        background: styling?.sectionBackground 
          ? styling.sectionBackground 
          : 'linear-gradient(to bottom, #F5F5F3, #FFFFFF)' 
      }}
    >
      <div className="container-wide relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-xs tracking-[0.3em] uppercase font-light mb-6"
            style={{ color: styling?.accentColor || '#C4A35A' }}
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-light mb-4"
            style={{ color: styling?.titleColor || '#1C1C1C' }}
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg font-light max-w-2xl mx-auto"
            style={{ color: styling?.subtitleColor || '#6B6B6B' }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 min-w-max md:min-w-0">
            {displayCredentials.map((cred, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="flex-shrink-0 w-48 md:w-auto group relative aspect-square 
                          border rounded-sm p-6
                          flex flex-col items-center justify-center text-center
                          hover:shadow-xl hover:shadow-black/5
                          transition-all duration-300 cursor-default"
                style={{
                  backgroundColor: styling?.cardBackground || '#FFFFFF',
                  borderColor: styling?.cardBorderColor || '#E8E8E6',
                }}
              >
                {/* Value */}
                <span 
                  className="font-serif text-3xl md:text-4xl font-light mb-2
                              group-hover:scale-110 transition-transform duration-300"
                  style={{ color: styling?.accentColor || '#C4A35A' }}
                >
                  {cred.type === 'stat' ? (
                    <AnimatedCounter value={cred.value || ''} />
                  ) : (
                    cred.value
                  )}
                </span>
                {/* Label */}
                <span 
                  className="text-sm font-medium mb-1"
                  style={{ color: styling?.cardTitleColor || '#1C1C1C' }}
                >
                  {cred.label}
                </span>
                {/* Year badge */}
                {cred.year && (
                  <span 
                    className="text-xs"
                    style={{ color: styling?.cardTextColor || '#AAAAAA' }}
                  >{cred.year}</span>
                )}

                {/* Hover tooltip */}
                <AnimatePresence>
                  {hoveredIndex === index && cred.description && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                                bg-[#1C1C1C] text-white text-xs p-3 rounded shadow-lg
                                w-48 text-center z-10"
                    >
                      {cred.description}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full
                                    border-4 border-transparent border-t-[#1C1C1C]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
