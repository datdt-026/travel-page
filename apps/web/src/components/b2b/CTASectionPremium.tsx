'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CTASectionPremiumProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  variant?: 'dark' | 'light' | 'accent';
  backgroundImage?: string;
}

export function CTASectionPremium({
  eyebrow,
  title = 'Ready to Explore Partnership?',
  description = 'Let\'s discuss how we can support your business and create exceptional travel experiences together.',
  primaryButtonText = 'Start a Conversation',
  primaryButtonLink = '/partners/inquiry',
  secondaryButtonText,
  secondaryButtonLink,
  variant = 'dark',
  backgroundImage,
}: CTASectionPremiumProps) {
  const isDark = variant === 'dark';
  const isAccent = variant === 'accent';

  const bgClass = isDark 
    ? 'bg-[#1C1C1C]' 
    : isAccent 
      ? 'bg-[#C4A35A]' 
      : 'bg-[#FAFAF8]';
  
  const textClass = isDark || isAccent ? 'text-white' : 'text-[#2C2C2C]';
  const mutedClass = isDark ? 'text-white/60' : isAccent ? 'text-white/80' : 'text-[#7A7A7A]';
  const accentClass = isDark ? 'text-[#C4A35A]' : isAccent ? 'text-white' : 'text-[#C4A35A]';
  
  const primaryBtnClass = isDark 
    ? 'bg-white text-[#1C1C1C] hover:bg-[#F5F5F3]'
    : isAccent
      ? 'bg-[#1C1C1C] text-white hover:bg-black'
      : 'bg-[#2C2C2C] text-white hover:bg-[#1C1C1C]';
  
  const secondaryBtnClass = isDark
    ? 'border-white/30 text-white hover:border-white hover:bg-white/10'
    : isAccent
      ? 'border-white/50 text-white hover:border-white hover:bg-white/10'
      : 'border-[#D4D4CC] text-[#4A4A4A] hover:border-[#2C2C2C] hover:bg-[#F5F5F3]';

  return (
    <section className={`relative py-24 md:py-32 ${bgClass} overflow-hidden`}>
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className={`absolute inset-0 ${
            isDark ? 'bg-[#1C1C1C]/80' : isAccent ? 'bg-[#C4A35A]/80' : 'bg-[#FAFAF8]/85'
          }`} />
        </div>
      )}

      {/* Subtle decorative element */}
      {isDark && (
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }} />
      )}
      
      <div className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-block ${accentClass} text-xs tracking-[0.3em] uppercase font-light mb-6`}
            >
              {eyebrow}
            </motion.span>
          )}
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight ${textClass} mb-6`}
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${mutedClass} text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10`}
          >
            {description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={primaryButtonLink}
              className={`px-10 py-4 text-xs tracking-[0.2em] uppercase font-light transition-all duration-300 ${primaryBtnClass}`}
            >
              {primaryButtonText}
            </Link>
            
            {secondaryButtonText && secondaryButtonLink && (
              <Link
                href={secondaryButtonLink}
                className={`px-10 py-4 text-xs tracking-[0.2em] uppercase font-light border transition-all duration-300 ${secondaryBtnClass}`}
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
