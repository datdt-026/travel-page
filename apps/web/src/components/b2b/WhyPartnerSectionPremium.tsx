"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { getMediaImageUrl } from "@/lib/api";

interface Reason {
  icon?: string;
  image?: { url?: string } | null;
  title?: string;
  description?: string;
  details?: string[];
  stat?: string;
  statLabel?: string;
}

interface WhyPartnerSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  reasons?: Reason[];
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

// Enhanced, animated SVG icons
const IconMap: Record<string, React.ReactNode> = {
  expertise: (
    <svg
      className="w-10 h-10"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <circle cx="20" cy="20" r="14" className="opacity-20" />
      <circle cx="20" cy="20" r="10" />
      <path d="M20 12v8l5 3" strokeLinecap="round" />
    </svg>
  ),
  response: (
    <svg
      className="w-10 h-10"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <circle cx="20" cy="20" r="14" className="opacity-20" />
      <path
        d="M12 20h16M22 14l6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  dedicated: (
    <svg
      className="w-10 h-10"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M20 6L6 14v12l14 8 14-8V14L20 6z" className="opacity-20" />
      <path d="M20 10L10 16v8l10 6 10-6v-8L20 10z" />
      <path d="M20 22v8M10 16l10 6 10-6" />
    </svg>
  ),
  pricing: (
    <svg
      className="w-10 h-10"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <rect x="6" y="10" width="28" height="20" rx="2" className="opacity-20" />
      <rect x="8" y="12" width="24" height="16" rx="1" />
      <path d="M8 18h24" />
      <circle cx="26" cy="24" r="3" />
    </svg>
  ),
  quality: (
    <svg
      className="w-10 h-10"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path
        d="M20 4l4 11h11l-9 7 4 11-10-7-10 7 4-11-9-7h11l4-11z"
        className="opacity-20"
      />
      <path d="M20 8l3 8h8l-6.5 5 2.5 8-7-5-7 5 2.5-8L9 16h8l3-8z" />
    </svg>
  ),
  sustainable: (
    <svg
      className="w-10 h-10"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <circle cx="20" cy="20" r="14" className="opacity-20" />
      <circle cx="20" cy="20" r="10" />
      <path d="M16 20c0-5 5-10 10-5s0 10-5 10-5-5-5-5z" />
    </svg>
  ),
  "🌏": (
    <svg
      className="w-10 h-10"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <circle cx="20" cy="20" r="14" />
      <ellipse cx="20" cy="20" rx="6" ry="14" />
      <path d="M6 20h28M8 12h24M8 28h24" strokeLinecap="round" />
    </svg>
  ),
  "🤝": (
    <svg
      className="w-10 h-10"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path
        d="M8 22l6-6 4 4 6-6 6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="24" r="4" />
      <circle cx="28" cy="24" r="4" />
    </svg>
  ),
  "⚡": (
    <svg
      className="w-10 h-10"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M22 6L10 22h10l-2 12 12-16H20l2-12z" />
    </svg>
  ),
  "🌱": (
    <svg
      className="w-10 h-10"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M20 34V20" strokeLinecap="round" />
      <path d="M20 20c0-8 8-14 14-10-2 8-8 14-14 10z" />
      <path d="M20 24c0-6-6-10-10-7 1.5 6 6 10 10 7z" />
    </svg>
  ),
};

export function WhyPartnerSectionPremium({
  eyebrow = "The Voyager Difference",
  title = "Why Partner With Us",
  description,
  reasons = [],
  ctaText = "Begin Partnership Inquiry",
  ctaLink = "/partners/inquiry",
  backgroundImage,
}: WhyPartnerSectionProps) {
  const [activeReason, setActiveReason] = useState<number | null>(null);
  const [hoveredReason, setHoveredReason] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      mouseX.set(x * 30);
      mouseY.set(y * 30);
    }
  };

  const defaultReasons: Reason[] = [
    {
      icon: "expertise",
      title: "Local Expertise Since 2019",
      description:
        "Deep knowledge of Southeast Asia with established supplier relationships and cultural understanding.",
      details: [
        "15+ years combined team experience",
        "Native-speaking local teams",
        "Exclusive supplier relationships",
      ],
      stat: "50+",
      statLabel: "Local Partners",
    },
    {
      icon: "response",
      title: "Rapid Response Times",
      description:
        "Quotes within 24 hours for standard requests, same-day for urgent inquiries.",
      details: [
        "24-hour quote turnaround",
        "Same-day urgent response",
        "Dedicated inquiry portal",
      ],
      stat: "<24h",
      statLabel: "Quote Time",
    },
    {
      icon: "dedicated",
      title: "Dedicated Account Management",
      description:
        "Personal account manager who knows your business and preferences.",
      details: [
        "Single point of contact",
        "Business review meetings",
        "Tailored product development",
      ],
      stat: "1:1",
      statLabel: "Support",
    },
    {
      icon: "pricing",
      title: "Competitive Pricing",
      description:
        "Volume-based rates, no hidden fees, and transparent commission structures.",
      details: [
        "Tiered partner pricing",
        "No hidden charges",
        "Flexible payment terms",
      ],
      stat: "20%",
      statLabel: "Partner Savings",
    },
    {
      icon: "quality",
      title: "Quality Guaranteed",
      description:
        "Rigorous supplier vetting and consistent service standards across all destinations.",
      details: [
        "200+ vetted suppliers",
        "Regular quality audits",
        "Service level agreements",
      ],
      stat: "98%",
      statLabel: "Satisfaction",
    },
    {
      icon: "sustainable",
      title: "Sustainable Practices",
      description:
        "Committed to responsible tourism with certified sustainable operations.",
      details: [
        "Carbon offset programs",
        "Community tourism support",
        "Ethical supplier standards",
      ],
      stat: "15+",
      statLabel: "Communities",
    },
  ];

  // Merge CMS reasons with default details if CMS reasons don't have details
  const displayReasons =
    reasons.length > 0
      ? reasons.map((reason, index) => ({
          ...defaultReasons[index],
          ...reason,
          // Keep default details/stats if CMS reason doesn't have them
          details: reason.details?.length
            ? reason.details
            : defaultReasons[index]?.details,
          stat: reason.stat || defaultReasons[index]?.stat,
          statLabel: reason.statLabel || defaultReasons[index]?.statLabel,
        }))
      : defaultReasons;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-32 bg-[#0F0F0F] text-white overflow-hidden"
    >
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/70" />
        </div>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          style={{ x: smoothMouseX, y: smoothMouseY }}
          className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-[#C4A35A]/5 rounded-full blur-[120px]"
        />
        <motion.div
          style={{
            x: useTransform(smoothMouseX, (v) => -v * 0.7),
            y: useTransform(smoothMouseY, (v) => -v * 0.7),
          }}
          className="absolute bottom-0 right-[10%] w-[500px] h-[500px] bg-[#C4A35A]/3 rounded-full blur-[100px]"
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-wide relative z-10">
        {/* Section Header - Editorial, asymmetric */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-2">
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
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white"
            >
              {title}
            </motion.h2>
          </div>
          {description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="lg:pt-8"
            >
              <p className="text-white/50 text-lg font-light leading-relaxed">
                {description}
              </p>
            </motion.div>
          )}
        </div>

        {/* Bento Box Layout - Creative asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
          {displayReasons.map((reason, index) => {
            const isActive = activeReason === index;
            const isHovered = hoveredReason === index;
            const isHighlighted = isActive || isHovered;

            // Dynamic sizing based on index for bento effect
            const sizeClasses = [
              "lg:col-span-5 lg:row-span-2", // Large
              "lg:col-span-4 lg:row-span-1", // Medium
              "lg:col-span-3 lg:row-span-1", // Small
              "lg:col-span-4 lg:row-span-1", // Medium
              "lg:col-span-5 lg:row-span-1", // Medium-large
              "lg:col-span-3 lg:row-span-1", // Small
            ];

            const isLarge = index === 0;
            const reasonImageUrl = getMediaImageUrl(reason.image);

            const handleClick = (e: React.MouseEvent) => {
              e.stopPropagation();
              setActiveReason(isActive ? null : index);
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08 }}
                onMouseEnter={() => setHoveredReason(index)}
                onMouseLeave={() => setHoveredReason(null)}
                onClick={handleClick}
                className={`relative group cursor-pointer ${sizeClasses[index % 6]}`}
              >
                <motion.div
                  animate={{
                    scale: isHovered ? 1.02 : 1,
                    y: isHovered ? -4 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`relative h-full rounded-2xl overflow-hidden transition-all duration-500
                            ${isActive ? "bg-[#1a1a1a] ring-2 ring-[#C4A35A]" : "bg-[#161616] hover:bg-[#1a1a1a]"}`}
                >
                  {/* Card Background Image */}
                  {reasonImageUrl && (
                    <div
                      className="absolute inset-0 bg-cover bg-center pointer-events-none"
                      style={{ backgroundImage: `url(${reasonImageUrl})` }}
                    >
<div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-300" />
                    </div>
                  )}

                  {/* Accent gradient on hover/active */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHighlighted ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#C4A35A]/10 via-transparent to-transparent pointer-events-none"
                  />

                  {/* Top accent line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHighlighted ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C4A35A] via-[#C4A35A]/50 to-transparent origin-left"
                  />

                  <div
                    className={`relative z-10 p-6 md:p-8 h-full flex flex-col ${isLarge ? "lg:p-10" : ""}`}
                  >
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      {/* Icon with animation */}
                      <motion.div
                        animate={{
                          rotate: isHovered ? [0, 5, -5, 0] : 0,
                          scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                        className={`flex-shrink-0 transition-colors duration-300 ${
                          isHighlighted ? "text-[#C4A35A]" : "text-white/60"
                        }`}
                      >
                        {reason.icon && IconMap[reason.icon] && (
                          <div className={isLarge ? "scale-125" : ""}>
                            {IconMap[reason.icon]}
                          </div>
                        )}
                      </motion.div>

                      {/* Stat badge - always visible */}
                      {reason.stat && (
                        <motion.div
                          animate={{
                            scale: isHighlighted ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                          className="text-right"
                        >
                          <div
                            className={`text-2xl md:text-3xl font-light transition-colors duration-300 ${isHighlighted ? "text-[#C4A35A]" : "text-white/70"}`}
                          >
                            {reason.stat}
                          </div>
                          {reason.statLabel && (
                            <div className="text-xs text-white/40 uppercase tracking-wider">
                              {reason.statLabel}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Title */}
                    {reason.title && (
                      <motion.h3
                        animate={{ x: isHovered ? 4 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`font-light text-white mb-3 transition-colors duration-300 ${
                          isLarge
                            ? "text-2xl md:text-3xl"
                            : "text-lg md:text-xl"
                        }`}
                      >
                        {reason.title}
                      </motion.h3>
                    )}

                    {/* Description */}
                    {reason.description && (
                      <p
                        className={`text-white/60 font-light leading-relaxed ${isLarge ? "text-base" : "text-sm"}`}
                      >
                        {reason.description}
                      </p>
                    )}

                    {/* Expandable Details */}
                    <AnimatePresence mode="wait">
                      {isActive &&
                        reason.details &&
                        reason.details.length > 0 && (
                          <motion.div
                            key={`details-${index}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mt-auto"
                          >
                            <ul className="mt-6 pt-6 border-t border-white/10 space-y-3">
                              {reason.details.map((detail, detailIndex) => (
                                <li
                                  key={detailIndex}
                                  className="flex items-center gap-3 text-sm text-white/60"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4A35A]" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Click indicator - bottom */}
                    <div className="mt-auto pt-4">
                      <motion.div
                        animate={{
                          opacity: isHovered ? 1 : 0.3,
                        }}
                        className="flex items-center gap-2 text-xs text-white/30"
                      >
                        <span>
                          {isActive ? "Click to collapse" : "Click for details"}
                        </span>
                        <motion.svg
                          animate={{ rotate: isActive ? 180 : 0 }}
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </motion.svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA - Refined with animation */}
        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 md:mt-24 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-4 group"
            >
              <span className="text-sm tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors duration-300">
                {ctaText}
              </span>
              <span className="w-12 h-px bg-[#C4A35A] group-hover:w-20 transition-all duration-500" />
              <svg
                className="w-5 h-5 text-[#C4A35A] -translate-x-2 group-hover:translate-x-0 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            {/* Secondary action */}
            <div className="hidden sm:block w-px h-8 bg-white/20" />
            <Link
              href="/case-studies"
              className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300"
            >
              View success stories →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
