'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getMediaImageUrl } from '@/lib/api';

interface Step {
  number?: string;
  title?: string;
  description?: string;
}

interface OnboardingProcessSectionProps {
  eyebrow?: string;
  title?: string;
  sectionImage?: { url?: string } | null;
  steps?: Step[];
}

export function OnboardingProcessSection({
  eyebrow = 'Getting Started',
  title = 'How We Start Working Together',
  sectionImage,
  steps = [],
}: OnboardingProcessSectionProps) {
  const sectionImageUrl = getMediaImageUrl(sectionImage);

  return (
    <section className="py-20 md:py-32 bg-[#FAFAF8] relative overflow-hidden">
      {/* Background Image */}
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
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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

        {/* Timeline Process - Zigzag Layout */}
        <div className="max-w-5xl mx-auto relative">
          {/* Central Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-[#7A3B69]/20 hidden md:block" />

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const isOdd = index % 2 === 0; // 0, 2, 4 = left side content
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative md:flex md:items-start"
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden flex gap-4">
                    {/* Circle */}
                    <div className="flex-shrink-0 w-14 h-14 bg-[#7A3B69] text-white rounded-full flex items-center justify-center font-light text-lg z-10">
                      {step.number || `0${index + 1}`}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pt-2">
                      {step.title && (
                        <h3 className="font-serif text-xl text-[#2C2C2C] mb-2 font-medium">
                          {step.title}
                        </h3>
                      )}
                      {step.description && (
                        <p className="text-[#7A7A7A] text-sm leading-relaxed">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Desktop Layout - Zigzag */}
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 w-full md:py-8">
                    {/* Left Content (odd steps) */}
                    <div className={`flex flex-col ${isOdd ? 'items-end text-right' : 'items-start opacity-0 pointer-events-none'}`}>
                      {isOdd && (
                        <>
                          {step.title && (
                            <h3 className="font-serif text-xl lg:text-2xl text-[#2C2C2C] mb-3 font-medium">
                              {step.title}
                            </h3>
                          )}
                          {step.description && (
                            <p className="text-[#7A7A7A] text-sm lg:text-base leading-relaxed max-w-sm">
                              {step.description}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    {/* Center Circle with connecting lines */}
                    <div className="flex flex-col items-center">
                      {/* Top connector line */}
                      {index > 0 && (
                        <div className="w-px h-8 bg-[#7A3B69]/30" />
                      )}
                      
                      {/* Circle */}
                      <div className="w-16 h-16 bg-[#7A3B69] text-white rounded-full flex items-center justify-center font-light text-xl z-10 shadow-lg">
                        {step.number || `0${index + 1}`}
                      </div>
                      
                      {/* Bottom connector line */}
                      {index < steps.length - 1 && (
                        <div className="w-px h-8 bg-[#7A3B69]/30" />
                      )}
                    </div>

                    {/* Right Content (even steps) */}
                    <div className={`flex flex-col ${!isOdd ? 'items-start text-left' : 'items-start opacity-0 pointer-events-none'}`}>
                      {!isOdd && (
                        <>
                          {step.title && (
                            <h3 className="font-serif text-xl lg:text-2xl text-[#2C2C2C] mb-3 font-medium">
                              {step.title}
                            </h3>
                          )}
                          {step.description && (
                            <p className="text-[#7A7A7A] text-sm lg:text-base leading-relaxed max-w-sm">
                              {step.description}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
