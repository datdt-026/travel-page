'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';

interface Partner {
  logo?: { url?: string } | null;
  name?: string;
  url?: string;
}

interface PartnerLogosSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  partners?: Partner[];
}

export function PartnerLogosSection({
  eyebrow = 'Trusted By',
  title = 'Our Partners',
  description,
  partners = [],
}: PartnerLogosSectionProps) {
  // Default placeholder partners if none provided
  const displayPartners = partners.length > 0 ? partners : [
    { name: 'Partner 1', logo: null },
    { name: 'Partner 2', logo: null },
    { name: 'Partner 3', logo: null },
    { name: 'Partner 4', logo: null },
    { name: 'Partner 5', logo: null },
    { name: 'Partner 6', logo: null },
  ];

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent text-sm uppercase tracking-widest font-medium mb-4 block"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-foreground-secondary"
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
          {displayPartners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative w-32 h-16 grayscale hover:grayscale-0 transition-all duration-300"
            >
              {partner.logo?.url ? (
                partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Image
                      src={getImageUrl(partner.logo.url) || ''}
                      alt={partner.name || 'Partner logo'}
                      fill
                      className="object-contain"
                    />
                  </a>
                ) : (
                  <Image
                    src={getImageUrl(partner.logo.url) || ''}
                    alt={partner.name || 'Partner logo'}
                    fill
                    className="object-contain"
                  />
                )
              ) : (
                <div className="w-full h-full bg-border/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-foreground-secondary text-center px-2">
                    {partner.name}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
