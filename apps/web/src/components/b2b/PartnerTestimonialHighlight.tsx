'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/api';

interface PartnerTestimonialHighlightProps {
  quote?: string;
  authorName?: string;
  authorRole?: string;
  companyName?: string;
  companyLogo?: { url?: string } | null;
  linkText?: string;
  linkUrl?: string;
}

export function PartnerTestimonialHighlight({
  quote = "Working with Voyager has transformed our Southeast Asia product. Their attention to detail and local expertise is unmatched.",
  authorName = "Sarah Mitchell",
  authorRole = "Product Director",
  companyName = "Premium Travel Group",
  companyLogo,
  linkText = "Read case study",
  linkUrl = "/case-studies",
}: PartnerTestimonialHighlightProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Quote Mark */}
          <div className="mb-8">
            <svg
              className="w-12 h-12 md:w-16 md:h-16 text-accent mx-auto opacity-50"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Quote */}
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed mb-8">
            "{quote}"
          </blockquote>

          {/* Author Info */}
          <div className="flex flex-col items-center gap-4">
            {companyLogo?.url ? (
              <div className="relative w-24 h-12 opacity-60">
                <Image
                  src={getImageUrl(companyLogo.url) || ''}
                  alt={companyName || 'Partner company'}
                  fill
                  className="object-contain"
                />
              </div>
            ) : null}

            <div>
              {authorName && (
                <p className="font-medium text-foreground">
                  {authorName}
                </p>
              )}
              <p className="text-sm text-foreground-secondary">
                {authorRole && authorRole}
                {authorRole && companyName && ' at '}
                {companyName && companyName}
              </p>
            </div>

            {linkUrl && linkText && (
              <Link
                href={linkUrl}
                className="inline-flex items-center gap-2 mt-4 text-accent text-sm font-medium hover:underline"
              >
                {linkText}
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
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
