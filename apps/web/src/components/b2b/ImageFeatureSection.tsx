'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getMediaImageUrl } from '@/lib/api';

interface FeatureItem {
  image?: { url?: string } | string | null;
  title?: string;
  description?: string;
  link?: string;
  stats?: { number?: string; label?: string }[];
}

interface ImageFeatureSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: FeatureItem[];
  layout?: 'grid' | 'masonry' | 'alternating' | 'cards';
  columns?: 2 | 3 | 4;
  showStats?: boolean;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: 'light' | 'dark' | 'accent';
}

function getImageUrl(image: { url?: string } | string | null | undefined): string | undefined {
  return getMediaImageUrl(image);
}

const bgClasses = {
  light: 'bg-[#FAFAF8]',
  dark: 'bg-[#1C1C1C] text-white',
  accent: 'bg-[#C4A35A]/10',
};

export function ImageFeatureSection({
  eyebrow,
  title,
  description,
  items = [],
  layout = 'grid',
  columns = 3,
  showStats = false,
  ctaText,
  ctaLink,
  backgroundColor = 'light',
}: ImageFeatureSectionProps) {
  const columnClasses = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  };

  const isDark = backgroundColor === 'dark';

  if (layout === 'alternating') {
    return (
      <section className={`py-24 md:py-32 ${bgClasses[backgroundColor]}`}>
        <div className="container-wide">
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-24">
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
              className={`font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight ${isDark ? 'text-white' : 'text-[#2C2C2C]'}`}
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`mt-6 text-lg font-light leading-relaxed ${isDark ? 'text-white/70' : 'text-[#666]'}`}
              >
                {description}
              </motion.p>
            )}
          </div>

          {/* Alternating Items */}
          <div className="space-y-24 md:space-y-32">
            {items.map((item, index) => {
              const imageUrl = getImageUrl(item.image);
              const isReversed = index % 2 === 1;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Image */}
                  <div className={`relative ${isReversed ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.title || ''}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div className={`w-full h-full ${isDark ? 'bg-white/10' : 'bg-[#E5E5E5]'} flex items-center justify-center`}>
                          <span className="text-6xl opacity-30">📷</span>
                        </div>
                      )}
                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    {/* Accent line */}
                    <div className={`absolute -bottom-4 ${isReversed ? '-left-4' : '-right-4'} w-1/2 h-px bg-[#C4A35A]/50`} />
                  </div>

                  {/* Content */}
                  <div className={isReversed ? 'lg:order-1' : ''}>
                    <h3 className={`font-serif text-2xl md:text-3xl font-light mb-6 ${isDark ? 'text-white' : 'text-[#2C2C2C]'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-lg font-light leading-relaxed ${isDark ? 'text-white/70' : 'text-[#666]'}`}>
                      {item.description}
                    </p>

                    {/* Stats */}
                    {showStats && item.stats && item.stats.length > 0 && (
                      <div className="mt-8 grid grid-cols-2 gap-6">
                        {item.stats.map((stat, statIndex) => (
                          <div key={statIndex}>
                            <div className="text-3xl font-serif text-[#C4A35A]">{stat.number}</div>
                            <div className={`text-sm uppercase tracking-wider mt-1 ${isDark ? 'text-white/60' : 'text-[#888]'}`}>
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.link && (
                      <Link
                        href={item.link}
                        className="inline-flex items-center mt-8 text-[#C4A35A] hover:text-[#B39245] transition-colors group"
                      >
                        <span className="text-sm uppercase tracking-wider">Learn More</span>
                        <svg
                          className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Grid/Cards layout
  return (
    <section className={`py-24 md:py-32 ${bgClasses[backgroundColor]}`}>
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
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
            className={`font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight ${isDark ? 'text-white' : 'text-[#2C2C2C]'}`}
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`mt-6 text-lg font-light leading-relaxed ${isDark ? 'text-white/70' : 'text-[#666]'}`}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Grid Items */}
        <div className={`grid md:grid-cols-2 ${columnClasses[columns]} gap-8`}>
          {items.map((item, index) => {
            const imageUrl = getImageUrl(item.image);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={item.title || ''}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes={`(max-width: 768px) 100vw, (max-width: 1024px) 50vw, ${Math.floor(100 / columns)}vw`}
                    />
                  ) : (
                    <div className={`w-full h-full ${isDark ? 'bg-white/10' : 'bg-[#E5E5E5]'} flex items-center justify-center`}>
                      <span className="text-6xl opacity-30">📷</span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className={`font-serif text-xl md:text-2xl font-light mb-3 ${isDark ? 'text-white' : 'text-[#2C2C2C]'}`}>
                  {item.title}
                </h3>
                <p className={`font-light leading-relaxed ${isDark ? 'text-white/70' : 'text-[#666]'}`}>
                  {item.description}
                </p>

                {/* Stats */}
                {showStats && item.stats && item.stats.length > 0 && (
                  <div className="mt-4 flex gap-6">
                    {item.stats.map((stat, statIndex) => (
                      <div key={statIndex}>
                        <div className="text-2xl font-serif text-[#C4A35A]">{stat.number}</div>
                        <div className={`text-xs uppercase tracking-wider ${isDark ? 'text-white/60' : 'text-[#888]'}`}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {item.link && (
                  <Link
                    href={item.link}
                    className="inline-flex items-center mt-4 text-[#C4A35A] hover:text-[#B39245] transition-colors group/link"
                  >
                    <span className="text-sm uppercase tracking-wider">Learn More</span>
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              href={ctaLink}
              className="inline-flex items-center px-8 py-4 bg-[#C4A35A] text-white hover:bg-[#B39245] transition-colors rounded-sm"
            >
              <span>{ctaText}</span>
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default ImageFeatureSection;
