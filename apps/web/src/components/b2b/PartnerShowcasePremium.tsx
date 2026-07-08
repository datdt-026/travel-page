"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl, getMediaImageUrl } from "@/lib/api";
import { SectionStyling } from "@/types";

interface Partner {
  logo?: { url?: string } | null;
  name?: string;
  country?: string;
  url?: string;
  testimonial?: string;
  representative?: string;
}

interface PartnerShowcasePremiumProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  partners?: Partner[];
  ctaText?: string;
  ctaLink?: string;
  variant?: "marquee" | "grid" | "featured";
  backgroundImage?: { url?: string } | string | null;
  styling?: SectionStyling;
}

export function PartnerShowcasePremium({
  eyebrow = "Trusted Worldwide",
  title = "Our Global Partners",
  description = "Collaborating with leading travel agencies and tour operators across the globe.",
  partners = [],
  ctaText = "Become a Partner",
  ctaLink = "/partners/inquiry",
  variant = "marquee",
  backgroundImage,
  styling,
}: PartnerShowcasePremiumProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Default partners with countries (for display purposes)
  const defaultPartners: Partner[] = [
    { name: "European Travel Group", country: "Germany" },
    { name: "Asia Pacific Tours", country: "Australia" },
    { name: "Nordic Explorers", country: "Sweden" },
    { name: "American Adventures", country: "USA" },
    { name: "British Heritage", country: "UK" },
    { name: "French Voyages", country: "France" },
    { name: "Dutch Discovery", country: "Netherlands" },
    { name: "Swiss Journeys", country: "Switzerland" },
    { name: "Canadian Trails", country: "Canada" },
    { name: "Japanese Horizons", country: "Japan" },
  ];

  const displayPartners = partners.length > 0 ? partners : defaultPartners;
  const bgImageUrl = getMediaImageUrl(backgroundImage);

  // Marquee variant - infinite scroll with elegant styling
  if (variant === "marquee") {
    // Calculate how many times to duplicate partners for seamless infinite scroll
    // For infinite scroll to work smoothly, we need at least 2 complete sets of items
    // The animation scrolls through exactly half the total width (-50%), then resets
    const singleSetCount = Math.max(1, displayPartners.length);

    // Ensure we have enough items to fill the viewport even with just 1 partner
    // At ~200px per item, we need ~10 items to fill a 2000px wide viewport
    const minVisibleItems = 10;
    const multiplier = Math.max(
      2,
      Math.ceil((minVisibleItems * 2) / singleSetCount)
    );

    // Create duplicated array - we always use exactly 2 sets for the -50% animation
    const marqueePartners = [...displayPartners, ...displayPartners];
    // If we have very few partners, duplicate more for visual fullness
    const finalMarqueePartners =
      singleSetCount < minVisibleItems
        ? Array(multiplier).fill(displayPartners).flat()
        : marqueePartners;

    // Animation duration: slower for fewer unique items so they're visible longer
    // Base rate: each partner should be visible for ~3 seconds
    const animationDuration = Math.max(20, singleSetCount * 4);

    // Calculate scroll percentage - always 50% of the duplicated content
    const scrollPercentage =
      singleSetCount < minVisibleItems ? 100 / multiplier : 50;

    return (
      <section
        ref={sectionRef}
        className="relative py-12 md:py-16 overflow-hidden"
        style={{ backgroundColor: styling?.sectionBackground || '#FAFAF8' }}
      >
        {/* Background - either from CMS or default */}
        {bgImageUrl ? (
          <>
            <Image
              src={bgImageUrl}
              alt=""
              fill
              className="object-cover"
            />
            <div 
              className="absolute inset-0" 
              style={{ backgroundColor: styling?.sectionBackground ? `${styling.sectionBackground}F2` : 'rgba(250,250,248,0.95)' }}
            />
          </>
        ) : !styling?.sectionBackground && (
          <div className="absolute inset-0 bg-[#FAFAF8]" />
        )}

        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231C1C1C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container-wide relative z-10 mb-12 md:mb-16">
          {/* Header - centered for marquee */}
          <div className="text-center max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="inline-block text-xs tracking-[0.3em] uppercase font-light mb-6"
              style={{ color: styling?.accentColor || '#C4A35A' }}
            >
              {eyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl font-light mb-6"
              style={{ color: styling?.titleColor || '#1C1C1C' }}
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-lg font-light"
              style={{ color: styling?.subtitleColor || '#6B6B6B' }}
            >
              {description}
            </motion.p>
          </div>
        </div>

        {/* Marquee container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fade edges */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-20 md:w-64 z-10" 
            style={{ background: `linear-gradient(to right, ${styling?.sectionBackground || '#FAFAF8'}, transparent)` }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-20 md:w-64 z-10" 
            style={{ background: `linear-gradient(to left, ${styling?.sectionBackground || '#FAFAF8'}, transparent)` }}
          />

          {/* Scrolling track */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: isPaused ? undefined : `-${scrollPercentage}%` }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: animationDuration,
                ease: "linear",
              },
            }}
            className="flex gap-6 md:gap-8 py-6 md:py-8"
          >
            {finalMarqueePartners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 group"
              >
                {/* MOBILE */}
                <div className="md:hidden flex items-center justify-center w-40 h-20 px-4">
                  {partner.logo?.url ? (
                    <div className="relative w-full h-16 grayscale group-hover:grayscale-0 transition-all duration-500">
                      <Image
                        src={getImageUrl(partner.logo.url) || ""}
                        alt={partner.name || ""}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span 
                      className="text-sm font-medium text-center"
                      style={{ color: styling?.cardTitleColor || '#4A4A4A' }}
                    >
                      {partner.name}
                    </span>
                  )}
                </div>

                {/* DESKTOP */}
                <div
                  className="hidden md:flex relative flex-col items-center justify-center gap-2
                     w-52 h-28 md:w-64 md:h-32
                     rounded-sm
                     transition-all duration-300
                     hover:shadow-xl hover:shadow-black/5
                     cursor-default px-4"
                  style={{ backgroundColor: styling?.cardBackground || '#FAFAF8' }}
                >
                  {partner.logo?.url ? (
                    <div className="relative w-full h-24 md:h-28 grayscale group-hover:grayscale-0 transition-all duration-500">
                      <Image
                        src={getImageUrl(partner.logo.url) || ""}
                        alt={partner.name || ""}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span 
                      className="font-medium text-center text-base md:text-lg"
                      style={{ color: styling?.cardTitleColor || '#4A4A4A' }}
                    >
                      {partner.name}
                    </span>
                  )}

                  {partner.country && (
                    <span 
                      className="text-[10px] tracking-wider uppercase"
                      style={{ color: styling?.cardTextColor || '#AAAAAA' }}
                    >
                      {partner.country}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        {/* <div className="text-center mt-12 md:mt-16">
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#1C1C1C] text-white
                     text-xs tracking-[0.2em] uppercase font-light transition-all duration-500
                     hover:bg-[#2C2C2C] hover:shadow-xl"
          >
            {ctaText}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div> */}
      </section>
    );
  }

  // Grid variant - elegant masonry-style
  if (variant === "grid") {
    return (
      <section
        ref={sectionRef}
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: styling?.sectionBackground || '#FFFFFF' }}
      >
        {/* Background - either from CMS or default */}
        {bgImageUrl ? (
          <>
            <Image
              src={bgImageUrl}
              alt=""
              fill
              className="object-cover"
            />
            <div 
              className="absolute inset-0" 
              style={{ backgroundColor: styling?.sectionBackground ? `${styling.sectionBackground}F2` : 'rgba(255,255,255,0.95)' }}
            />
          </>
        ) : !styling?.sectionBackground && (
          <div className="absolute inset-0 bg-white" />
        )}

        <div className="container-wide relative z-10">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-20">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                className="flex items-center gap-4 mb-6"
              >
                <span className="w-12 h-px" style={{ backgroundColor: styling?.accentColor || '#C4A35A' }} />
                <span 
                  className="text-xs tracking-[0.3em] uppercase font-light"
                  style={{ color: styling?.accentColor || '#C4A35A' }}
                >
                  {eyebrow}
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl font-light"
                style={{ color: styling?.titleColor || '#1C1C1C' }}
              >
                {title}
              </motion.h2>
            </div>
            <div className="flex items-end">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-lg font-light leading-relaxed max-w-md"
                style={{ color: styling?.subtitleColor || '#6B6B6B' }}
              >
                {description}
              </motion.p>
            </div>
          </div>

          {/* Partners grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {displayPartners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative aspect-[3/2] ${index % 3 === 1 ? "md:-translate-y-4" : ""}`}
              >
                <div
                  className={`absolute inset-0 border rounded-sm
                              flex flex-col items-center justify-center p-6
                              transition-all duration-500 cursor-default`}
                  style={{
                    backgroundColor: hoveredIndex === index 
                      ? (styling?.cardBackground || '#FFFFFF') 
                      : (styling?.cardBackground || '#F8F8F6'),
                    borderColor: hoveredIndex === index 
                      ? (styling?.accentColor ? `${styling.accentColor}80` : 'rgba(196,163,90,0.5)') 
                      : (styling?.cardBorderColor || '#E8E8E6'),
                    boxShadow: hoveredIndex === index ? '0 10px 15px -3px rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  {partner.logo?.url ? (
                    <div
                      className={`relative w-full h-12 transition-all duration-500
                                  ${hoveredIndex === index ? "grayscale-0" : "grayscale opacity-60"}`}
                    >
                      <Image
                        src={getImageUrl(partner.logo.url) || ""}
                        alt={partner.name || ""}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span
                      className="font-medium text-center text-sm leading-tight transition-colors duration-300"
                      style={{ 
                        color: hoveredIndex === index 
                          ? (styling?.accentColor || '#C4A35A') 
                          : (styling?.cardTitleColor || '#6B6B6B')
                      }}
                    >
                      {partner.name}
                    </span>
                  )}
                  {partner.country && (
                    <span
                      className="mt-2 text-[10px] tracking-wider uppercase transition-colors duration-300"
                      style={{ 
                        color: hoveredIndex === index 
                          ? (styling?.cardTextColor || '#8A8A8A') 
                          : (styling?.cardTextColor ? `${styling.cardTextColor}80` : '#BBBBBB')
                      }}
                    >
                      {partner.country}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link
              href={ctaLink}
              className="group inline-flex items-center gap-3 text-[#C4A35A] text-sm 
                       tracking-[0.15em] uppercase font-light hover:gap-4 transition-all"
            >
              {ctaText}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div> */}
        </div>
      </section>
    );
  }

  // Featured variant - with testimonials
  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: styling?.sectionBackground || '#1C1C1C' }}
    >
      {/* Background */}
      {bgImageUrl ? (
        <>
          <Image
            src={bgImageUrl}
            alt=""
            fill
            className="object-cover"
          />
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: styling?.sectionBackground ? `${styling.sectionBackground}E6` : 'rgba(28,28,28,0.9)' }}
          />
        </>
      ) : !styling?.sectionBackground && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C1C] via-[#2C2C2C] to-[#1C1C1C]" />
      )}

      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-xs tracking-[0.3em] uppercase font-light mb-6"
            style={{ color: styling?.accentColor || '#C4A35A' }}
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6"
            style={{ color: styling?.titleColor || '#FFFFFF' }}
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg font-light"
            style={{ color: styling?.subtitleColor || 'rgba(255,255,255,0.6)' }}
          >
            {description}
          </motion.p>
        </div>

        {/* Featured partners with testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {displayPartners.slice(0, 3).map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
              className={`group relative p-8 md:p-10 backdrop-blur-sm border
                        rounded-sm transition-all duration-500 hover:border-white/20
                        ${index === 1 ? "lg:-translate-y-8" : ""}`}
              style={{ 
                backgroundColor: styling?.cardBackground ? `${styling.cardBackground}0D` : 'rgba(255,255,255,0.05)',
                borderColor: styling?.cardBorderColor ? `${styling.cardBorderColor}1A` : 'rgba(255,255,255,0.1)'
              }}
            >
              {/* Quote mark */}
              <div 
                className="absolute top-6 right-6 text-6xl font-serif leading-none"
                style={{ color: styling?.accentColor ? `${styling.accentColor}33` : 'rgba(196,163,90,0.2)' }}
              >
                "
              </div>

              {/* Logo */}
              <div className="mb-6">
                {partner.logo?.url ? (
                  <div className="relative w-24 h-12">
                    <Image
                      src={getImageUrl(partner.logo.url) || ""}
                      alt={partner.name || ""}
                      fill
                      className="object-contain object-left brightness-0 invert opacity-80 
                               group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ) : (
                  <span 
                    className="font-medium text-lg"
                    style={{ color: styling?.cardTitleColor || 'rgba(255,255,255,0.8)' }}
                  >
                    {partner.name}
                  </span>
                )}
              </div>

              {/* Testimonial */}
              {partner.testimonial ? (
                <p 
                  className="font-light leading-relaxed mb-6 italic"
                  style={{ color: styling?.cardTextColor || 'rgba(255,255,255,0.7)' }}
                >
                  "{partner.testimonial}"
                </p>
              ) : (
                <p 
                  className="font-light leading-relaxed mb-6 italic"
                  style={{ color: styling?.cardTextColor || 'rgba(255,255,255,0.7)' }}
                >
                  "Outstanding partnership that has elevated our Southeast Asia
                  offerings. Exceptional local knowledge and flawless
                  execution."
                </p>
              )}

              {/* Representative */}
              <div className="flex items-center justify-between">
                <div>
                  <span 
                    className="block text-sm font-medium"
                    style={{ color: styling?.cardTitleColor || '#FFFFFF' }}
                  >
                    {partner.representative || "Partnership Manager"}
                  </span>
                  <span 
                    className="text-xs"
                    style={{ color: styling?.cardTextColor || 'rgba(255,255,255,0.5)' }}
                  >
                    {partner.country || "International Partner"}
                  </span>
                </div>

                {/* Rating stars */}
                <div className="flex gap-1" style={{ color: styling?.accentColor || '#C4A35A' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Bottom accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#C4A35A]/50 via-[#C4A35A] to-[#C4A35A]/50 origin-left"
              />
            </motion.div>
          ))}
        </div>

        {/* Smaller logos row */}
        {displayPartners.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center flex-wrap gap-8 md:gap-12 py-8 border-t border-white/10"
          >
            {displayPartners.slice(3).map((partner, index) => (
              <div
                key={index}
                className="opacity-40 hover:opacity-80 transition-opacity cursor-default"
              >
                {partner.logo?.url ? (
                  <div className="relative w-20 h-10">
                    <Image
                      src={getImageUrl(partner.logo.url) || ""}
                      alt={partner.name || ""}
                      fill
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                ) : (
                  <span className="text-white text-sm font-light">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#C4A35A] text-white
                     text-xs tracking-[0.2em] uppercase font-light transition-all duration-500
                     hover:bg-[#D4B36A] hover:shadow-xl hover:shadow-[#C4A35A]/20"
          >
            {ctaText}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div> */}
      </div>
    </section>
  );
}
