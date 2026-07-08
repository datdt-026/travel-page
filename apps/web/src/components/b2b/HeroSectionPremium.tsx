'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionPremiumProps {
  backgroundImage?: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  height?: 'small' | 'medium' | 'large' | 'full';
  overlayOpacity?: 'light' | 'medium' | 'heavy';
  alignment?: 'left' | 'center';
  showScrollIndicator?: boolean;
}

export function HeroSectionPremium({
  backgroundImage,
  title,
  subtitle,
  eyebrow,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  height = 'large',
  overlayOpacity = 'medium',
  alignment = 'left',
  showScrollIndicator = true,
}: HeroSectionPremiumProps) {
  const heightClasses = {
    small: 'min-h-[50vh]',
    medium: 'min-h-[70vh]',
    large: 'min-h-[85vh]',
    full: 'min-h-screen',
  };

  const overlayClasses = {
    light: 'bg-gradient-to-r from-black/40 via-black/20 to-transparent',
    medium: 'bg-gradient-to-r from-black/60 via-black/40 to-black/20',
    heavy: 'bg-gradient-to-r from-black/80 via-black/60 to-black/40',
  };

  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
  };

  return (
    <section className={`relative ${heightClasses[height]} flex items-center overflow-hidden`}>
      {/* Background Image */}
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C2C2C] via-[#1C1C1C] to-[#0C0C0C]" />
      )}
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClasses[overlayOpacity]}`} />
      
      {/* Subtle pattern overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Content */}
      <div className="container-wide relative z-10 py-24 md:py-32">
        <div className={`flex flex-col ${alignmentClasses[alignment]} max-w-3xl ${alignment === 'center' ? 'mx-auto' : ''}`}>
          {/* Eyebrow */}
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block text-[#C4A35A] text-xs tracking-[0.3em] uppercase font-light mb-6"
            >
              {eyebrow}
            </motion.span>
          )}
          
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white leading-[1.1] mb-6"
          >
            {title}
          </motion.h1>
          
          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}
          
          {/* CTA Buttons */}
          {(ctaText || secondaryCtaText) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {ctaText && ctaLink && (
                <Link
                  href={ctaLink}
                  className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#1C1C1C] text-xs tracking-[0.2em] uppercase font-light hover:bg-[#F5F5F3] transition-colors duration-300"
                >
                  {ctaText}
                </Link>
              )}
              
              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="inline-flex items-center justify-center px-10 py-4 border border-white/30 text-white text-xs tracking-[0.2em] uppercase font-light hover:border-white hover:bg-white/10 transition-all duration-300"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      )}
    </section>
  );
}
