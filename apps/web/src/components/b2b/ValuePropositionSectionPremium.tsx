'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getMediaImageUrl } from '@/lib/api';

interface Benefit {
  image?: { url?: string } | null;
  icon?: string;
  title?: string;
  description?: string;
}

interface ValuePropositionSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  sectionImage?: { url?: string } | null;
  benefits?: Benefit[];
}

// Sophisticated minimal icons
const IconMap: Record<string, React.ReactNode> = {
  local: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.75">
      <circle cx="20" cy="20" r="16" />
      <ellipse cx="20" cy="20" rx="8" ry="16" />
      <path d="M4 20h32" />
    </svg>
  ),
  quality: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.75">
      <path d="M20 4l4 12h12l-10 7 4 12-10-7-10 7 4-12-10-7h12l4-12z" />
    </svg>
  ),
  responsive: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.75">
      <path d="M8 20h24M26 14l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  sustainable: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.75">
      <path d="M20 36c0-12 8-16 8-24a8 8 0 10-16 0c0 8 8 12 8 24z" />
      <circle cx="20" cy="12" r="3" />
    </svg>
  ),
  transparent: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.75">
      <rect x="6" y="6" width="28" height="28" rx="2" />
      <path d="M6 14h28M14 14v20" />
    </svg>
  ),
  dedicated: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.75">
      <circle cx="20" cy="14" r="8" />
      <path d="M8 36c0-8 5.5-12 12-12s12 4 12 12" />
    </svg>
  ),
};

export function ValuePropositionSectionPremium({
  eyebrow = 'Why Partner With Us',
  title = 'Your Success Is Our Mission',
  description,
  sectionImage,
  benefits = [],
}: ValuePropositionSectionProps) {
  const defaultBenefits: Benefit[] = [
    {
      icon: 'local',
      title: 'Local Market Intelligence',
      description: 'Deep understanding of Southeast Asian markets, cultures, and travel trends that only comes from years of on-ground experience.',
    },
    {
      icon: 'quality',
      title: 'Uncompromising Quality',
      description: 'Every supplier, guide, and experience is vetted to our exacting standards. Your reputation is protected.',
    },
    {
      icon: 'responsive',
      title: 'Agile & Responsive',
      description: 'Quick turnaround on quotes, flexible amendments, and proactive communication. We move at your pace.',
    },
    {
      icon: 'sustainable',
      title: 'Sustainable by Design',
      description: 'Responsible tourism practices integrated into every itinerary. Meet your clients\' expectations for ethical travel.',
    },
    {
      icon: 'transparent',
      title: 'Transparent Operations',
      description: 'Clear pricing structures, detailed documentation, and no hidden fees. Complete visibility at every stage.',
    },
    {
      icon: 'dedicated',
      title: 'Dedicated Partnership',
      description: 'A single point of contact who understands your business, preferences, and clientele.',
    },
  ];

  const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits;
  const sectionImageUrl = getMediaImageUrl(sectionImage);

  return (
    <section className="py-24 md:py-32 bg-[#FAFAF8] relative overflow-hidden">
      {/* Section Background Image */}
      {sectionImageUrl && (
        <div className="absolute inset-0 opacity-5">
          <Image
            src={sectionImageUrl}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="container-wide relative z-10">
        {/* Section Header - Editorial style */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-16 md:mb-24">
          <div>
            {eyebrow && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block text-[#C4A35A] text-xs tracking-[0.3em] uppercase font-light mb-6"
              >
                {eyebrow}
              </motion.span>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#2C2C2C]"
            >
              {title}
            </motion.h2>
          </div>
          <div className="flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#7A7A7A] text-lg font-light leading-relaxed"
            >
              {description || 'We believe in building long-term partnerships based on trust, transparency, and mutual growth. When you partner with us, you gain more than a supplier—you gain a dedicated ally in Southeast Asian travel.'}
            </motion.p>
          </div>
        </div>

        {/* Benefits Grid - Clean, professional layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {displayBenefits.map((benefit, index) => {
            const benefitImageUrl = getMediaImageUrl(benefit.image);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-xl"
              >
                {/* Background Image or Solid Background */}
                {benefitImageUrl ? (
                  <>
                    {/* Image Background */}
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={benefitImageUrl}
                        alt={benefit.title || ''}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* Content overlay on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        {benefit.title && (
                          <h3 className="text-lg font-light text-white mb-2 tracking-wide">
                            {benefit.title}
                          </h3>
                        )}
                        {benefit.description && (
                          <p className="text-white/80 text-sm font-light leading-relaxed line-clamp-3">
                            {benefit.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  /* No Image - Original card style */
                  <div className="p-6 bg-white border border-gray-100 rounded-xl hover:shadow-lg transition-shadow duration-500">
                    {/* Minimal line accent */}
                    <div className="w-12 h-px bg-[#C4A35A]/40 group-hover:w-20 group-hover:bg-[#C4A35A] transition-all duration-500 mb-6" />
                    
                    {/* Icon */}
                    <div className="text-[#2C2C2C] mb-4 opacity-40 group-hover:opacity-70 transition-opacity duration-500">
                      {benefit.icon && IconMap[benefit.icon] ? (
                        IconMap[benefit.icon]
                      ) : (
                        <span className="text-3xl">{benefit.icon || '✦'}</span>
                      )}
                    </div>
                    
                    {/* Title */}
                    {benefit.title && (
                      <h3 className="text-lg font-light text-[#2C2C2C] mb-3 tracking-wide">
                        {benefit.title}
                      </h3>
                    )}
                    
                    {/* Description */}
                    {benefit.description && (
                      <p className="text-[#7A7A7A] text-sm font-light leading-relaxed">
                        {benefit.description}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
