'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
import { SectionStyling } from '@/types';

interface Service {
  icon?: string;
  title?: string;
  description?: string;
  features?: string[];
  link?: string;
  image?: { url?: string } | string | null;
  stats?: {
    value: string;
    label: string;
  };
}

interface B2BServicesOverviewPremiumProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  services?: Service[];
  variant?: 'cards' | 'masonry' | 'horizontal';
  styling?: SectionStyling;
}

// Premium travel-inspired icons
const serviceIcons: Record<string, React.ReactNode> = {
  fit: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Compass rose */}
      <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1.5"/>
      {/* Person silhouette */}
      <circle cx="40" cy="30" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 36V50M32 58L40 50L48 58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Path dots */}
      <circle cx="24" cy="52" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="56" cy="52" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="40" cy="64" r="2" fill="currentColor" opacity="0.6"/>
    </svg>
  ),
  series: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Multiple travelers */}
      <circle cx="28" cy="28" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M28 33V42" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="40" cy="24" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 29V42" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="52" cy="28" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M52 33V42" stroke="currentColor" strokeWidth="1.5"/>
      {/* Connection line */}
      <path d="M20 50H60" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
      {/* Bus/vehicle */}
      <rect x="22" y="50" width="36" height="16" rx="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="30" cy="66" r="3" stroke="currentColor" strokeWidth="1"/>
      <circle cx="50" cy="66" r="3" stroke="currentColor" strokeWidth="1"/>
      <path d="M26 54H34M46 54H54" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  mice: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Conference building */}
      <path d="M40 12L16 28V68H64V28L40 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      {/* Windows */}
      <rect x="24" y="34" width="8" height="10" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <rect x="36" y="34" width="8" height="10" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <rect x="48" y="34" width="8" height="10" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      {/* Door */}
      <rect x="34" y="52" width="12" height="16" stroke="currentColor" strokeWidth="1.5"/>
      {/* Podium/stage indicator */}
      <circle cx="40" cy="24" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M36 24H44" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  luxury: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Diamond shape */}
      <path d="M40 12L60 32L40 68L20 32L40 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 32H60" stroke="currentColor" strokeWidth="1"/>
      <path d="M32 32L40 12L48 32" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <path d="M32 32L40 68L48 32" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      {/* Crown accent */}
      <path d="M28 18L32 14L36 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <path d="M44 18L48 14L52 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
  adventure: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Mountains */}
      <path d="M10 60L30 28L42 44L50 32L70 60" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M30 28L36 36" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      {/* Sun */}
      <circle cx="58" cy="22" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M58 10V14M58 30V34M46 22H50M66 22H70M50 14L52 16M64 28L66 30M50 30L52 28M64 14L66 16" 
            stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      {/* Flag */}
      <path d="M30 28V16M30 16L38 20L30 24" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1"/>
    </svg>
  ),
  wellness: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Lotus flower */}
      <ellipse cx="40" cy="50" rx="20" ry="8" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <path d="M40 20C40 20 28 30 28 42C28 54 40 58 40 58C40 58 52 54 52 42C52 30 40 20 40 20Z" 
            stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 20C40 20 48 28 48 36C48 44 40 48 40 48" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <path d="M40 20C40 20 32 28 32 36C32 44 40 48 40 48" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      {/* Side petals */}
      <path d="M24 40C24 40 30 36 34 40C38 44 36 52 36 52" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <path d="M56 40C56 40 50 36 46 40C42 44 44 52 44 52" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    </svg>
  ),
};

function getServiceIcon(iconName?: string): React.ReactNode {
  if (!iconName) return serviceIcons.fit;
  const key = iconName.toLowerCase();
  if (key.includes('fit') || key.includes('individual') || key.includes('tailor')) return serviceIcons.fit;
  if (key.includes('series') || key.includes('group')) return serviceIcons.series;
  if (key.includes('mice') || key.includes('corporate') || key.includes('event') || key.includes('incentive')) return serviceIcons.mice;
  if (key.includes('luxury') || key.includes('premium') || key.includes('private')) return serviceIcons.luxury;
  if (key.includes('adventure') || key.includes('active')) return serviceIcons.adventure;
  if (key.includes('wellness') || key.includes('spa') || key.includes('retreat')) return serviceIcons.wellness;
  return serviceIcons[key] || serviceIcons.fit;
}

export function B2BServicesOverviewPremium({
  eyebrow = 'Our Expertise',
  title = 'Comprehensive DMC Solutions',
  description = 'From intimate journeys to large-scale events, we deliver end-to-end travel solutions with meticulous attention to detail.',
  services = [],
  variant = 'cards',
  styling,
}: B2BServicesOverviewPremiumProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Drag to scroll handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Default services with images
  const defaultServices: Service[] = [
    {
      icon: 'fit',
      title: 'FIT & Tailor-Made',
      description: 'Bespoke journeys crafted for individual travelers and small groups. Every detail personalized to create unforgettable experiences.',
      features: ['24-48h quote turnaround', 'Real-time availability', 'Personal concierge', 'Flexible modifications'],
      link: '/partners/expertise#fit',
      stats: { value: '24h', label: 'Response Time' },
    },
    {
      icon: 'series',
      title: 'Series & Group Tours',
      description: 'Reliable departures and group operations with consistent quality standards and competitive volume pricing.',
      features: ['Guaranteed departures', 'Volume pricing', 'Quality assurance', 'Dedicated guides'],
      link: '/partners/expertise#series',
      stats: { value: '500+', label: 'Groups Annually' },
    },
    {
      icon: 'mice',
      title: 'MICE & Incentives',
      description: 'Full-service event management from intimate board meetings to grand gala dinners and incentive programs.',
      features: ['Venue sourcing', 'Team building', 'Gala production', 'Transport logistics'],
      link: '/partners/expertise#mice',
      stats: { value: '50+', label: 'Events Yearly' },
    },
    {
      icon: 'luxury',
      title: 'Luxury & Private',
      description: 'Exclusive access to extraordinary experiences, private villas, and VIP services for the most discerning travelers.',
      features: ['Private access', 'Celebrity chefs', 'Helicopter transfers', 'Yacht charters'],
      link: '/partners/expertise#luxury',
      stats: { value: '★★★★★', label: 'Exclusively' },
    },
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  // Cards variant - premium staggered layout
  if (variant === 'cards') {
    return (
      <section
        ref={sectionRef}
        className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
        style={{ 
          background: styling?.sectionBackground 
            ? styling.sectionBackground 
            : 'linear-gradient(to bottom, #F8F8F6, #FFFFFF)' 
        }}
      >
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03]">
          <svg viewBox="0 0 600 600" fill="none" className="w-full h-full">
            <circle cx="300" cy="300" r="250" stroke={styling?.accentColor || '#C4A35A'} strokeWidth="1"/>
            <circle cx="300" cy="300" r="200" stroke={styling?.accentColor || '#C4A35A'} strokeWidth="0.5"/>
            <circle cx="300" cy="300" r="150" stroke={styling?.accentColor || '#C4A35A'} strokeWidth="0.5"/>
          </svg>
        </div>

        <div className="container-wide relative z-10">
          {/* Header with asymmetric layout */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-24">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 mb-6"
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

            <div className="lg:col-span-7 flex items-end">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl font-light leading-relaxed max-w-xl"
                style={{ color: styling?.subtitleColor || '#6B6B6B' }}
              >
                {description}
              </motion.p>
            </div>
          </div>

          {/* Services grid - asymmetric */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {displayServices.map((service, index) => {
              const isExpanded = activeIndex === index;
              const isHovered = hoveredIndex === index;
              const imageUrl = typeof service.image === 'string' ? service.image : service.image?.url;
              const accentColor = styling?.accentColor || '#C4A35A';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActiveIndex(isExpanded ? null : index)}
                  className={`group relative cursor-pointer
                            ${index === 0 || index === 3 ? 'md:translate-y-8' : ''}
                            ${index === 1 ? 'md:-translate-y-4' : ''}`}
                >
                  <div 
                    className="relative border transition-all duration-500 overflow-hidden"
                    style={{
                      backgroundColor: styling?.cardBackground || '#FFFFFF',
                      borderColor: isHovered || isExpanded 
                        ? `${accentColor}66` 
                        : (styling?.cardBorderColor || '#E8E8E6'),
                      boxShadow: isHovered || isExpanded 
                        ? '0 25px 50px -12px rgba(0,0,0,0.1)' 
                        : '0 10px 40px -15px rgba(0,0,0,0.05)',
                    }}
                  >
                    {/* Top section with icon and stats */}
                    <div className="relative p-8 md:p-10">
                      <div className="flex items-start justify-between mb-6">
                        {/* Icon */}
                        <motion.div
                          animate={{ 
                            scale: isHovered ? 1.05 : 1,
                            color: isHovered || isExpanded ? accentColor : (styling?.cardTitleColor || '#1C1C1C')
                          }}
                          transition={{ duration: 0.4 }}
                          className="w-16 h-16 md:w-20 md:h-20"
                        >
                          {getServiceIcon(service.icon || service.title)}
                        </motion.div>

                        {/* Stats badge */}
                        {service.stats && (
                          <div className="text-right">
                            <span 
                              className="block font-serif text-2xl md:text-3xl font-light transition-colors duration-500"
                              style={{ color: isHovered || isExpanded ? accentColor : (styling?.cardTitleColor || '#1C1C1C') }}
                            >
                              {service.stats.value}
                            </span>
                            <span 
                              className="text-xs tracking-wider uppercase"
                              style={{ color: styling?.cardTextColor || '#8A8A8A' }}
                            >
                              {service.stats.label}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 
                        className="font-serif text-2xl md:text-3xl mb-4 transition-colors duration-500"
                        style={{ color: styling?.cardTitleColor || (isHovered || isExpanded ? '#1C1C1C' : '#2C2C2C') }}
                      >
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p 
                        className="font-light leading-relaxed mb-6"
                        style={{ color: styling?.cardTextColor || '#6B6B6B' }}
                      >
                        {service.description}
                      </p>

                      {/* Features - expandable */}
                      <AnimatePresence>
                        {isExpanded && service.features && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden"
                          >
                            <div 
                              className="pt-6 border-t"
                              style={{ borderColor: styling?.cardBorderColor || '#E8E8E6' }}
                            >
                              <div className="grid grid-cols-2 gap-3">
                                {service.features.map((feature, featureIndex) => (
                                  <motion.div
                                    key={featureIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: featureIndex * 0.05 }}
                                    className="flex items-center gap-2"
                                  >
                                    <svg 
                                      className="w-4 h-4 flex-shrink-0" 
                                      style={{ color: accentColor }}
                                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span 
                                      className="text-sm"
                                      style={{ color: styling?.cardTextColor || '#4A4A4A' }}
                                    >{feature}</span>
                                  </motion.div>
                                ))}
                              </div>

                              {service.link && (
                                <Link
                                  href={service.link}
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-2 mt-6 text-sm 
                                           font-medium hover:gap-3 transition-all"
                                  style={{ color: accentColor }}
                                >
                                  Learn more
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </Link>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Expand indicator */}
                      <div className="absolute bottom-4 right-4">
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                          style={{ backgroundColor: isExpanded ? accentColor : '#F5F5F3' }}
                        >
                          <svg 
                            className="w-4 h-4 transition-colors duration-300" 
                            style={{ color: isExpanded ? '#FFFFFF' : '#8A8A8A' }}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isHovered || isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                      className="h-1 origin-left"
                      style={{ background: `linear-gradient(to right, ${accentColor}, ${accentColor}dd)` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16 md:mt-20"
          >
            <Link
              href="/partners/expertise"
              className="group inline-flex items-center gap-3 text-[#C4A35A] text-sm tracking-[0.15em] uppercase 
                       font-light hover:gap-4 transition-all duration-300"
            >
              <span>Explore all our capabilities</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  // Horizontal variant - scrolling showcase
  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: styling?.sectionBackground || '#1C1C1C' }}
    >
      <div className="container-wide relative z-10 mb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="inline-block text-xs tracking-[0.3em] uppercase font-light mb-4"
              style={{ color: styling?.accentColor || '#C4A35A' }}
            >
              {eyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl font-light"
              style={{ color: styling?.titleColor || '#FFFFFF' }}
            >
              {title}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-light max-w-md"
            style={{ color: styling?.subtitleColor || 'rgba(255,255,255,0.6)' }}
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div 
        ref={scrollContainerRef}
        className={`overflow-x-auto scrollbar-hide pb-8 ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`flex gap-6 px-4 md:px-8 lg:px-16 min-w-max ${isDragging ? 'pointer-events-none' : ''}`}>
          {displayServices.map((service, index) => {
            const imageUrl = typeof service.image === 'string' ? service.image : service.image?.url;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] flex-shrink-0"
              >
                {/* Image background */}
                <div className="relative aspect-[3/4] md:aspect-[4/5] mb-4 md:mb-6 overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={getImageUrl(imageUrl) || ''}
                      alt={service.title || ''}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2C2C2C] to-[#1C1C1C]">
                      <div className="absolute inset-0 flex items-center justify-center text-white/10">
                        <div className="w-32 h-32">
                          {getServiceIcon(service.icon)}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Icon overlay */}
                  <div className="absolute top-6 left-6 w-12 h-12 text-white/80">
                    {getServiceIcon(service.icon)}
                  </div>

                  {/* Stats badge */}
                  {service.stats && (
                    <div className="absolute top-6 right-6 text-right">
                      <span 
                        className="block font-serif text-2xl font-light"
                        style={{ color: styling?.accentColor || '#C4A35A' }}
                      >
                        {service.stats.value}
                      </span>
                      <span 
                        className="text-xs uppercase tracking-wider"
                        style={{ color: styling?.cardTextColor || 'rgba(255,255,255,0.5)' }}
                      >
                        {service.stats.label}
                      </span>
                    </div>
                  )}

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 
                      className="font-serif text-2xl mb-2"
                      style={{ color: styling?.cardTitleColor || '#FFFFFF' }}
                    >
                      {service.title}
                    </h3>
                    <p 
                      className="text-sm font-light line-clamp-2"
                      style={{ color: styling?.cardTextColor || 'rgba(255,255,255,0.6)' }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Link */}
                {service.link && (
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 text-sm font-light
                             group-hover:gap-3 transition-all"
                    style={{ color: styling?.accentColor || '#C4A35A' }}
                  >
                    Explore {service.title}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
