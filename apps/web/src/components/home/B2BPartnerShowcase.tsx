'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getMediaImageUrl } from '@/lib/api';

interface Media {
  url?: string;
  alt?: string;
  sizes?: {
    thumbnail?: { url?: string };
    card?: { url?: string };
  };
}

interface PartnerLogo {
  logo?: Media | string | { url?: string } | null;
  name?: string;
  country?: string;
}

interface B2BPartnerShowcaseProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  logos?: PartnerLogo[];
  ctaText?: string;
  ctaLink?: string;
}

function getImageUrl(logo: Media | string | { url?: string } | null | undefined): string | undefined {
  return getMediaImageUrl(logo);
}

export function B2BPartnerShowcase({
  eyebrow = 'Trusted Partners',
  title = 'Trusted by Industry Leaders',
  description,
  logos = [],
  ctaText,
  ctaLink,
}: B2BPartnerShowcaseProps) {
  if (!logos || logos.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-[#FAFAF8]">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-[#C4A35A] text-xs tracking-[0.3em] uppercase font-light mb-4"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#2C2C2C]"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-lg font-light text-[#666] max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center"
        >
          {logos.map((partner, index) => {
            const logoUrl = getImageUrl(partner.logo);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative w-32 h-16 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                title={`${partner.name}${partner.country ? ` - ${partner.country}` : ''}`}
              >
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={partner.name || 'Partner logo'}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#E5E5E5] rounded">
                    <span className="text-xs text-[#999] uppercase tracking-wider">
                      {partner.name?.slice(0, 2) || 'P'}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href={ctaLink}
              className="inline-flex items-center text-[#C4A35A] hover:text-[#B39245] transition-colors group"
            >
              <span className="text-sm uppercase tracking-wider">{ctaText}</span>
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
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

export default B2BPartnerShowcase;
