'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getMediaImageUrl } from '@/lib/api';

interface Feature {
  text?: string;
}

interface PartnershipModel {
  image?: { url?: string } | null;
  icon?: string;
  title?: string;
  description?: string;
  features?: Feature[];
  idealFor?: string;
}

interface PartnershipModelsSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  models?: PartnershipModel[];
}

export function PartnershipModelsSectionPremium({
  eyebrow = 'Collaboration Models',
  title = 'Flexible Partnership Structures',
  description,
  models = [],
}: PartnershipModelsSectionProps) {
  const defaultModels: PartnershipModel[] = [
    {
      title: 'Direct Contracting',
      description: 'Full DMC services with dedicated account management. Ideal for tour operators seeking a reliable, long-term partner in Southeast Asia.',
      features: [
        { text: 'Dedicated account manager' },
        { text: 'Preferred pricing tiers' },
        { text: 'Priority booking windows' },
        { text: 'Custom product development' },
      ],
      idealFor: 'Tour Operators & Travel Agencies',
    },
    {
      title: 'White Label Solutions',
      description: 'Seamlessly integrated services under your brand. Complete backend support while you maintain the client relationship.',
      features: [
        { text: 'Branded documentation' },
        { text: 'Invisible operations' },
        { text: 'API integration available' },
        { text: 'Flexible SLA options' },
      ],
      idealFor: 'OTAs & Travel Tech Companies',
    },
    {
      title: 'Ad-Hoc Collaboration',
      description: 'Project-based partnerships for specific programs or destinations. Perfect for testing new markets or seasonal offerings.',
      features: [
        { text: 'No minimum commitments' },
        { text: 'Per-project pricing' },
        { text: 'Quick onboarding' },
        { text: 'Scalable as needed' },
      ],
      idealFor: 'Emerging Partners & Specialists',
    },
  ];

  const displayModels = models.length > 0 ? models : defaultModels;

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-wide">
        {/* Section Header */}
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
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#2C2C2C] mb-6"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-[#7A7A7A] text-lg font-light leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Models Grid - Elegant horizontal layout on desktop */}
        <div className="grid lg:grid-cols-3 gap-px bg-[#E8E8E4]">
          {displayModels.map((model, index) => {
            const modelImageUrl = getMediaImageUrl(model.image);

            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white group hover:bg-[#FAFAF8] transition-colors duration-500 flex flex-col"
            >
              {/* Background Image */}
              {modelImageUrl && (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={modelImageUrl}
                    alt={model.title || ''}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Number indicator on image */}
                  <span className="absolute bottom-4 right-4 text-white/40 text-5xl font-serif font-light">
                    0{index + 1}
                  </span>
                </div>
              )}
              
              <div className="p-8 md:p-10 flex-1 flex flex-col">
                {/* Number indicator - only show if no image */}
                {!modelImageUrl && (
                  <span className="inline-block text-[#C4A35A]/30 text-6xl font-serif font-light mb-6">
                    0{index + 1}
                  </span>
                )}
                
                {/* Title */}
                {model.title && (
                  <h3 className="text-xl font-light text-[#2C2C2C] mb-4 tracking-wide">
                    {model.title}
                  </h3>
                )}
                
                {/* Description */}
                {model.description && (
                  <p className="text-[#7A7A7A] text-sm font-light leading-relaxed mb-8">
                    {model.description}
                  </p>
                )}
                
                {/* Features List - Minimal style */}
                {model.features && model.features.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {model.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-center gap-3 text-sm text-[#4A4A4A] font-light"
                      >
                        <span className="w-4 h-px bg-[#C4A35A]" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {/* Ideal For */}
                {model.idealFor && (
                  <div className="pt-6 mt-auto border-t border-[#E8E8E4]">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0] mb-2">
                      Ideal For
                    </p>
                    <p className="text-sm text-[#2C2C2C] font-light">
                      {model.idealFor}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 md:mt-20 text-center"
        >
          <Link
            href="/partners/inquiry"
            className="inline-flex items-center gap-4 px-10 py-4 bg-[#2C2C2C] text-white text-xs tracking-[0.2em] uppercase font-light hover:bg-[#1C1C1C] transition-colors duration-300"
          >
            Discuss Partnership Options
            <svg 
              className="w-4 h-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
