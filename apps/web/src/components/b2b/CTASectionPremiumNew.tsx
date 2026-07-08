'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getMediaImageUrl } from '@/lib/api';

interface CTASectionPremiumNewProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: { url?: string } | string | null;
  variant?: 'cinematic' | 'split' | 'minimal';
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

export function CTASectionPremiumNew({
  eyebrow = 'Start Your Partnership',
  title = 'Ready to Create Extraordinary Journeys Together?',
  description = 'Join our network of trusted partners and discover how we can elevate your Southeast Asia offerings with authentic local expertise and exceptional service.',
  primaryButtonText = 'Begin the Conversation',
  primaryButtonLink = '/partners/inquiry',
  secondaryButtonText = 'Download Credentials',
  secondaryButtonLink = '/partners/credentials',
  backgroundImage,
  variant = 'cinematic',
  stats,
}: CTASectionPremiumNewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  const bgImageUrl = getMediaImageUrl(backgroundImage);

  // Default stats
  const defaultStats = [
    { value: '24h', label: 'Response Time' },
    { value: '15+', label: 'Years Experience' },
    { value: '500+', label: 'Partner Agencies' },
  ];

  const displayStats = stats || defaultStats;

  // Cinematic variant - full-screen with parallax
  if (variant === 'cinematic') {
    return (
      <section
        ref={sectionRef}
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div 
          style={{ y: backgroundY, opacity }} 
          className="absolute inset-0 z-0"
        >
          {bgImageUrl ? (
            <Image
              src={bgImageUrl}
              alt=""
              fill
              className="object-cover"
              priority
            />
          ) : (
            // Gradient background with travel imagery pattern
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a1a] via-[#1C1C1C] to-[#1a1a2a]" />
              {/* Decorative travel elements */}
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Plane path */}
                  <path d="M100 600 Q 400 200, 800 400 T 1100 200" stroke="white" strokeWidth="1" fill="none" strokeDasharray="10 20"/>
                  {/* Compass rose */}
                  <g transform="translate(200, 150)">
                    <circle cx="0" cy="0" r="60" stroke="white" strokeWidth="0.5"/>
                    <circle cx="0" cy="0" r="50" stroke="white" strokeWidth="0.5"/>
                    <path d="M0 -60 L5 0 L0 60 L-5 0 Z" fill="white" fillOpacity="0.3"/>
                    <path d="M-60 0 L0 5 L60 0 L0 -5 Z" fill="white" fillOpacity="0.2"/>
                  </g>
                  {/* Globe */}
                  <g transform="translate(1000, 600)">
                    <circle cx="0" cy="0" r="80" stroke="white" strokeWidth="0.5"/>
                    <ellipse cx="0" cy="0" rx="30" ry="80" stroke="white" strokeWidth="0.5"/>
                    <path d="M-80 0 H80" stroke="white" strokeWidth="0.5"/>
                  </g>
                </svg>
              </div>
            </div>
          )}
          
          {/* Sophisticated overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </motion.div>

        {/* Texture */}
        <div className="absolute inset-0 z-[1] opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        {/* Content */}
        <div className="container-wide relative z-10 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow with decorative lines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-6 mb-8"
            >
              <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#C4A35A]" />
              <span className="text-[#C4A35A] text-xs tracking-[0.3em] uppercase font-light">
                {eyebrow}
              </span>
              <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#C4A35A]" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-light leading-[1.1] tracking-tight mb-8"
            >
              {title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12"
            >
              {description}
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center gap-8 md:gap-16 mb-12 py-8 border-y border-white/10"
            >
              {displayStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <span className="block text-[#C4A35A] font-serif text-3xl md:text-4xl font-light">
                    {stat.value}
                  </span>
                  <span className="text-white/40 text-xs tracking-wider uppercase mt-1 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href={primaryButtonLink}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5
                         bg-[#C4A35A] text-white text-xs tracking-[0.2em] uppercase font-light 
                         transition-all duration-500 hover:bg-[#D4B36A] hover:shadow-2xl hover:shadow-[#C4A35A]/30
                         overflow-hidden"
              >
                <span className="relative z-10">{primaryButtonText}</span>
                <svg 
                  className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:translate-x-2" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                {/* Shine effect */}
                <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent
                               transition-all duration-700 group-hover:left-full" />
              </Link>
              
              {secondaryButtonText && (
                <Link
                  href={secondaryButtonLink || '#'}
                  className="inline-flex items-center gap-3 px-10 py-5 border border-white/20 text-white
                           text-xs tracking-[0.2em] uppercase font-light transition-all duration-500
                           hover:border-white/60 hover:bg-white/5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {secondaryButtonText}
                </Link>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4A35A]/30 to-transparent" />
      </section>
    );
  }

  // Split variant - image on one side
  if (variant === 'split') {
    return (
      <section
        ref={sectionRef}
        className="relative overflow-hidden"
      >
        <div className="grid lg:grid-cols-2 min-h-[450px] lg:min-h-[500px]">
          {/* Left - Content */}
          <div className="relative bg-[#1C1C1C] py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-16 flex items-center">
            {/* Texture */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }} />

            <div className="relative z-10 max-w-lg">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                className="flex items-center gap-4 mb-8"
              >
                <span className="w-12 h-px bg-[#C4A35A]" />
                <span className="text-[#C4A35A] text-xs tracking-[0.3em] uppercase font-light">
                  {eyebrow}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl text-white font-light leading-[1.1] mb-6"
              >
                {title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-white/60 font-light leading-relaxed mb-10"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href={primaryButtonLink}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C4A35A] text-white
                           text-xs tracking-[0.2em] uppercase font-light transition-all duration-500
                           hover:bg-[#D4B36A]"
                >
                  {primaryButtonText}
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                {secondaryButtonText && (
                  <Link
                    href={secondaryButtonLink || '#'}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white
                             text-xs tracking-[0.2em] uppercase font-light transition-all duration-300
                             hover:border-white/50"
                  >
                    {secondaryButtonText}
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 hidden lg:block">
              <svg viewBox="0 0 128 128" fill="none" className="w-full h-full text-[#C4A35A]/10">
                <path d="M128 0V128H0" stroke="currentColor" strokeWidth="1"/>
                <path d="M128 32V128H32" stroke="currentColor" strokeWidth="0.5"/>
              </svg>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative min-h-[300px] lg:min-h-full">
            {bgImageUrl ? (
              <Image
                src={bgImageUrl}
                alt=""
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#C4A35A]/20 via-[#8B7355]/30 to-[#1C1C1C]">
                {/* Travel imagery placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-white/10">
                  <svg viewBox="0 0 200 200" fill="none" className="w-48 h-48">
                    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1"/>
                    <ellipse cx="100" cy="100" rx="30" ry="80" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M20 100H180" stroke="currentColor" strokeWidth="0.5"/>
                    <path d="M30 60H170" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
                    <path d="M30 140H170" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
                  </svg>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#1C1C1C]/30 lg:hidden" />
          </div>
        </div>
      </section>
    );
  }

  // Minimal variant - clean and simple
  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#FAFAF8] overflow-hidden"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #1C1C1C 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-[#C4A35A] text-xs tracking-[0.3em] uppercase font-light mb-6"
          >
            {eyebrow}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C] font-light leading-[1.1] mb-6"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-[#6B6B6B] text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={primaryButtonLink}
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#1C1C1C] text-white
                       text-xs tracking-[0.2em] uppercase font-light transition-all duration-500
                       hover:bg-[#2C2C2C] hover:shadow-xl"
            >
              {primaryButtonText}
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            {secondaryButtonText && (
              <Link
                href={secondaryButtonLink || '#'}
                className="inline-flex items-center gap-2 px-10 py-4 border border-[#D4D4CC] text-[#4A4A4A]
                         text-xs tracking-[0.2em] uppercase font-light transition-all duration-300
                         hover:border-[#1C1C1C] hover:text-[#1C1C1C]"
              >
                {secondaryButtonText}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
