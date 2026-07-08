'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getMockImage } from '@/assets/mockImages';
import { getMediaImageUrl } from '@/lib/api';

interface PartnershipType {
  icon?: string;
  title?: string;
  description?: string;
  image?: { url?: string } | null;
}

interface PartnershipTypesSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  types?: PartnershipType[];
}

export function PartnershipTypesSection({
  eyebrow = 'Partnership',
  title = 'Ways to Partner',
  description,
  types = [],
}: PartnershipTypesSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const defaultTypes: PartnershipType[] = [
    {
      title: 'Tour Operators',
      description: 'Ground handling, dedicated support, seamless operations.',
      image: { url: '/images/partners/tour-operator-logo.png' },
    },
    {
      title: 'Travel Agencies',
      description: 'Local expertise, competitive rates, reliable bookings.',
    },
    {
      title: 'Corporate & MICE',
      description: 'Events, incentives, business travel solutions.',
    },
    {
      title: 'OTAs & Platforms',
      description: 'API integration, real-time inventory, tech-first.',
    },
    {
      title: 'White Label',
      description: 'Your brand, our infrastructure, full flexibility.',
    },
    {
      title: 'DMC Network',
      description: 'Cross-promotion, shared resources, mutual growth.',
    },
  ];

  const displayTypes = types.length > 0 ? types : defaultTypes;

  return (
    <section className="bg-foreground text-background">
      {/* Hero title area */}
      <div className="container mx-auto px-6 md:px-8 pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-20">
        <div className="max-w-5xl">
          {eyebrow && (
            <span className="text-background/40 text-xs tracking-[0.25em] uppercase block mb-6">
              {eyebrow}
            </span>
          )}
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-background leading-[0.95] tracking-tight">
            {title}
          </h2>
        </div>
      </div>

      {/* Partnership list - Full width stacked */}
      <div className="border-t border-background/10">
        {displayTypes.map((type, index) => {
          const imageSrc = getMediaImageUrl(type.image) || getMockImage(index);

          return (
            <div
              key={type.title || index}
              className="border-b border-background/10 group cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
            <div className="container mx-auto px-6 md:px-8">
              <div className="py-8 md:py-10 flex items-center justify-between gap-8">
                {/* Left - Number + Logo + Title */}
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="text-background/20 text-sm tabular-nums font-light">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Partner visual */}
                  <div 
                    className={`relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0 overflow-hidden rounded-full transition-all duration-500
                      ${activeIndex === index ? 'opacity-100 grayscale-0' : 'opacity-50 grayscale'}`}
                  >
                    <Image
                      src={imageSrc}
                      alt={type.title || 'Đối tác'}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <h3 
                    className={`text-2xl md:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-500 ease-out
                      ${activeIndex === index ? 'text-background translate-x-2 md:translate-x-4' : 'text-background/70'}`}
                  >
                    {type.title}
                  </h3>
                </div>

                {/* Right - Description (visible on hover) */}
                <div 
                  className={`hidden md:block max-w-sm text-right transition-all duration-500 ease-out
                    ${activeIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                >
                  <p className="text-background/60 text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>

                {/* Arrow */}
                <div 
                  className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0
                    transition-all duration-500 ease-out
                    ${activeIndex === index 
                      ? 'border-background/40 bg-background/10' 
                      : 'border-background/10 bg-transparent'}`}
                >
                  <svg 
                    className={`w-4 h-4 transition-all duration-500
                      ${activeIndex === index ? 'text-background rotate-0' : 'text-background/30 -rotate-45'}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </div>
              </div>

              {/* Mobile description */}
              <div 
                className={`md:hidden overflow-hidden transition-all duration-500 ease-out
                  ${activeIndex === index ? 'max-h-24 opacity-100 pb-8' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-background/50 text-sm leading-relaxed pl-10">
                  {type.description}
                </p>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="container mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="text-background/40 text-sm max-w-xs leading-relaxed">
            Ready to build something together?
          </p>
          <a
            href="/partners/inquiry"
            className="group inline-flex items-center gap-4"
          >
            <span className="text-background text-lg md:text-xl font-light">
              Start a conversation
            </span>
            <span className="w-12 h-12 rounded-full border border-background/20 flex items-center justify-center
                          group-hover:bg-background group-hover:border-background transition-all duration-300">
              <svg 
                className="w-5 h-5 text-background group-hover:text-foreground transition-colors duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
