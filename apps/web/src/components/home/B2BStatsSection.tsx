'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionStyling } from '@/types';

interface Stat {
  number?: string;
  label?: string;
  description?: string;
}

interface B2BStatsSectionProps {
  eyebrow?: string;
  title?: string;
  stats?: Stat[];
  backgroundImage?: string;
  styling?: SectionStyling;
}

export function B2BStatsSection({
  eyebrow = 'By The Numbers',
  title = 'Our Track Record',
  stats = [],
  backgroundImage,
  styling,
}: B2BStatsSectionProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section 
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: styling?.sectionBackground || '#1C1C1C' }}
    >
      {/* Background */}
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: styling?.sectionBackground ? `${styling.sectionBackground}CC` : 'rgba(28, 28, 28, 0.8)' }}
          />
        </>
      ) : !styling?.sectionBackground && (
        <div className="absolute inset-0" style={{ backgroundColor: '#1C1C1C' }}>
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='none' stroke='%23fff' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }} />
        </div>
      )}

      <div className="container-wide relative z-10">
        {/* Header */}
        {(eyebrow || title) && (
          <div className="text-center mb-16">
            {eyebrow && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block text-xs tracking-[0.3em] uppercase font-light mb-4"
                style={{ color: styling?.accentColor || '#C4A35A' }}
              >
                {eyebrow}
              </motion.span>
            )}
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-3xl md:text-4xl font-light"
                style={{ color: styling?.titleColor || '#FFFFFF' }}
              >
                {title}
              </motion.h2>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
              style={styling?.cardBackground ? { 
                backgroundColor: styling.cardBackground,
                padding: '1.5rem',
                borderRadius: '0.5rem',
                borderColor: styling?.cardBorderColor
              } : undefined}
            >
              <div 
                className="font-serif text-5xl md:text-6xl lg:text-7xl mb-3"
                style={{ color: styling?.accentColor || '#C4A35A' }}
              >
                {stat.number}
              </div>
              <div 
                className="text-lg font-light mb-2"
                style={{ color: styling?.cardTitleColor || 'rgba(255,255,255,0.9)' }}
              >
                {stat.label}
              </div>
              {stat.description && (
                <div 
                  className="text-sm font-light"
                  style={{ color: styling?.cardTextColor || 'rgba(255,255,255,0.5)' }}
                >
                  {stat.description}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default B2BStatsSection;
