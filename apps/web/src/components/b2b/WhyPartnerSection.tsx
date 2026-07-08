'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Reason {
  icon?: string;
  title?: string;
  description?: string;
}

interface WhyPartnerSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  reasons?: Reason[];
  ctaText?: string;
  ctaLink?: string;
}

export function WhyPartnerSection({
  eyebrow = 'The Voyager Difference',
  title = 'Why Partner With Us?',
  description,
  reasons = [],
  ctaText = 'Start Partnership Inquiry',
  ctaLink = '/partners/inquiry',
}: WhyPartnerSectionProps) {
  // Default reasons
  const defaultReasons: Reason[] = [
    {
      icon: '🏆',
      title: 'Local Expertise Since 2019',
      description: 'Deep knowledge of Southeast Asia with established supplier relationships and cultural understanding.',
    },
    {
      icon: '⚡',
      title: 'Rapid Response Times',
      description: 'Quotes within 24 hours for standard requests, same-day for urgent inquiries.',
    },
    {
      icon: '🤝',
      title: 'Dedicated Account Management',
      description: 'Personal account manager who knows your business and preferences.',
    },
    {
      icon: '💰',
      title: 'Competitive Pricing',
      description: 'Volume-based rates, no hidden fees, and transparent commission structures.',
    },
    {
      icon: '✅',
      title: 'Quality Guaranteed',
      description: 'Rigorous supplier vetting and consistent service standards across all destinations.',
    },
    {
      icon: '🌿',
      title: 'Sustainable Practices',
      description: 'Committed to responsible tourism with certified sustainable operations.',
    },
  ];

  const displayReasons = reasons.length > 0 ? reasons : defaultReasons;

  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
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
            className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-background/80"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {displayReasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background/5 backdrop-blur-sm rounded-xl p-6 border border-background/10"
            >
              {reason.icon && (
                <div className="text-3xl mb-4">{reason.icon}</div>
              )}
              {reason.title && (
                <h3 className="font-serif text-xl mb-2">{reason.title}</h3>
              )}
              {reason.description && (
                <p className="text-background/70 text-sm leading-relaxed">
                  {reason.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent-hover transition-colors"
            >
              {ctaText}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
