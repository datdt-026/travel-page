'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/api';

interface QualityItem {
  image?: { url?: string } | null;
  title?: string;
  description?: string;
  linkText?: string;
  linkUrl?: string;
}

interface QualityAssuranceSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: QualityItem[];
}

export function QualityAssuranceSection({
  eyebrow = 'Quality Assurance',
  title = 'Our Commitments',
  description,
  items = [],
}: QualityAssuranceSectionProps) {
  // Default quality initiatives
  const defaultItems: QualityItem[] = [
    {
      title: 'Travelife Certification',
      description: 'Travelife, established with the support of the European Commission, is the leading international sustainability certification for the travel sector, providing companies with realistic sustainability goals, tools, and solutions to implement positive change. We are proud to have obtained the Travelife Certified award in each of the destinations where we operate.',
      linkText: 'View this project',
      linkUrl: '/sustainability/travelife',
    },
    {
      title: 'Refill Not Landfill Project',
      description: 'Reducing our use and dependence on plastic is one of the defining challenges of our time, and we are 100% committed to helping solve this problem. While an increase in Southeast Asian tourism definitely provides a positive impact on the livelihoods of many, the growing number of visitors also places a considerably heavy toll on the environment.',
      linkText: 'View this project',
      linkUrl: '/sustainability/refill',
    },
    {
      title: 'Community Partnership',
      description: 'We believe that sustainable tourism should benefit local communities directly. Our community partnership program ensures that a significant portion of tour revenues go back to the communities we visit, supporting local education, healthcare, and infrastructure projects.',
      linkText: 'View this project',
      linkUrl: '/sustainability/community',
    },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block text-accent text-xs tracking-[0.3em] uppercase font-medium mb-6"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light tracking-tight mb-6"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-foreground-secondary text-lg font-light leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Timeline Items - Alternating Layout */}
        <div className="space-y-16 md:space-y-24">
          {displayItems.map((item, index) => {
            const isEven = index % 2 === 0;
            const imageUrl = item.image?.url ? getImageUrl(item.image.url) : null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                {/* Image */}
                <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.title || 'Quality initiative'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center">
                          <svg className="w-12 h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
                  {item.title && (
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-6">
                      {item.title}
                    </h3>
                  )}
                  
                  {item.description && (
                    <p className="text-foreground-secondary text-base md:text-lg leading-relaxed mb-8">
                      {item.description}
                    </p>
                  )}

                  {item.linkText && item.linkUrl && (
                    <Link
                      href={item.linkUrl}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent 
                               rounded-full text-sm font-medium transition-all duration-300
                               hover:bg-accent hover:text-white group"
                    >
                      {item.linkText}
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
