'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/api';

interface Initiative {
  image?: { url?: string } | null;
  title?: string;
  description?: string;
  impact?: string;
  link?: string;
  category?: string;
  // Extended details for modal
  details?: string;
  goals?: string[];
  partners?: string[];
  startYear?: string;
  ongoing?: boolean;
}

interface InitiativesSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  initiatives?: Initiative[];
}

// Category badge colors
const categoryColors: Record<string, { bg: string; text: string }> = {
  community: { bg: 'bg-blue-100', text: 'text-blue-700' },
  environment: { bg: 'bg-green-100', text: 'text-green-700' },
  conservation: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  education: { bg: 'bg-purple-100', text: 'text-purple-700' },
  carbon: { bg: 'bg-slate-100', text: 'text-slate-700' },
  waste: { bg: 'bg-orange-100', text: 'text-orange-700' },
};

// Initiative Detail Modal - Luxury Travel Design
function InitiativeModal({
  initiative,
  isOpen,
  onClose,
}: {
  initiative: Initiative | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!initiative) return null;

  const colors = categoryColors[initiative.category || 'community'] || categoryColors.community;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999]"
        >
          {/* Backdrop with luxury blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-black/90 backdrop-blur-2xl"
          />
          
          {/* Modal Container - Luxury Design */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
            >
              {/* Hero Image Header */}
              <div className="relative h-56 md:h-72 flex-shrink-0">
                {initiative.image?.url ? (
                  <Image
                    src={getImageUrl(initiative.image.url) || ''}
                    alt={initiative.title || 'Initiative'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-accent/20 to-transparent" />
                )}
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 to-transparent" />
                
                {/* Decorative gradient orb */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full 
                           flex items-center justify-center text-white hover:bg-accent hover:scale-110 transition-all z-10 group"
                >
                  <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Category Badge & Status */}
                <div className="absolute top-4 left-4 flex items-center gap-3">
                  {initiative.category && (
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${colors.bg} ${colors.text} border border-white/10`}
                    >
                      {initiative.category.charAt(0).toUpperCase() + initiative.category.slice(1)}
                    </motion.span>
                  )}
                  {initiative.ongoing && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30"
                    >
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-sm font-medium">Active</span>
                    </motion.div>
                  )}
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-serif text-3xl md:text-4xl text-white mb-2"
                  >
                    {initiative.title}
                  </motion.h3>
                  {initiative.startYear && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-white/60 text-sm"
                    >
                      Since {initiative.startYear}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {/* Impact Highlight Card */}
                {initiative.impact && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 p-6 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent rounded-2xl border border-accent/30 flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-accent/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-accent font-medium uppercase tracking-wider mb-1">Measurable Impact</p>
                      <p className="text-2xl font-serif text-white">{initiative.impact}</p>
                    </div>
                  </motion.div>
                )}

                {/* Description */}
                {(initiative.description || initiative.details) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mb-8"
                  >
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {initiative.details || initiative.description}
                    </p>
                  </motion.div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Goals */}
                  {initiative.goals && initiative.goals.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-5 bg-white/5 rounded-2xl border border-white/10"
                    >
                      <h4 className="text-sm uppercase tracking-wider text-accent mb-4 font-medium flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Our Goals
                      </h4>
                      <ul className="space-y-3">
                        {initiative.goals.map((goal, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 + index * 0.05 }}
                            className="flex items-start gap-3 text-sm text-gray-300"
                          >
                            <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {goal}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Partners */}
                  {initiative.partners && initiative.partners.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                      className="p-5 bg-white/5 rounded-2xl border border-white/10"
                    >
                      <h4 className="text-sm uppercase tracking-wider text-accent mb-4 font-medium flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Key Partners
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {initiative.partners.map((partner, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                            className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm text-white"
                          >
                            {partner}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Footer CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex-shrink-0 p-6 bg-black/30 border-t border-white/10"
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <p className="text-gray-400 text-sm">
                    Join us in making a positive impact
                  </p>
                  <a
                    href="/partners/inquiry"
                    className="inline-flex items-center gap-3 px-8 py-3 bg-accent text-white rounded-full 
                             hover:bg-accent/90 transition-all duration-300 font-medium group"
                  >
                    <span>Support This Initiative</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function InitiativesSection({
  eyebrow = 'Our Initiatives',
  title = 'Making a Difference',
  description,
  initiatives = [],
}: InitiativesSectionProps) {
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCardClick = useCallback((initiative: Initiative) => {
    setSelectedInitiative(initiative);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedInitiative(null), 300);
  }, []);

  // Default initiatives with extended details
  const defaultInitiatives: Initiative[] = [
    {
      title: 'Community Tourism Program',
      category: 'community',
      description: 'Partnering with local villages to develop authentic homestay experiences that directly benefit rural communities.',
      details: 'Our Community Tourism Program connects travelers with rural Vietnamese communities, creating economic opportunities while preserving cultural heritage. We work with local families to develop sustainable tourism offerings that showcase authentic village life.',
      impact: '15+ communities supported',
      ongoing: true,
      startYear: '2020',
      goals: ['Support 30+ communities by 2026', 'Generate $100K+ annual income for local families', 'Preserve traditional crafts and practices'],
      partners: ['Local Villages', 'Tourism Board', 'NGO Partners'],
    },
    {
      title: 'Carbon Offset Initiative',
      category: 'carbon',
      description: 'Partnering with verified offset programs to neutralize travel-related carbon emissions.',
      details: 'Through our partnership with Gold Standard certified projects, we offset all carbon emissions from ground transportation and accommodations used in our tours. Travelers can also opt to offset their flights.',
      impact: '500+ tons offset annually',
      ongoing: true,
      startYear: '2021',
      goals: ['Carbon neutral operations by 2027', '1000+ tons offset annually', 'Integrate offset into all packages'],
      partners: ['Gold Standard', 'Climate Impact Partners'],
    },
    {
      title: 'Plastic-Free Travel',
      category: 'waste',
      description: 'Eliminating single-use plastics from our tours and encouraging partners to do the same.',
      details: 'We provide all travelers with reusable water bottles and work with hotels and restaurants to eliminate single-use plastics. Our guides carry water filtration systems for refills throughout the journey.',
      impact: '80% plastic reduction',
      ongoing: true,
      startYear: '2019',
      goals: ['100% plastic-free by 2025', 'All partner hotels certified plastic-free', 'Beach cleanup events monthly'],
      partners: ['Ocean Conservancy', 'Local Hotels'],
    },
    {
      title: 'Cultural Preservation',
      category: 'education',
      description: 'Working with local artisans and traditional craftspeople to preserve cultural heritage.',
      details: 'We connect travelers with master artisans in pottery, weaving, and traditional cooking. Revenue from these experiences funds apprenticeship programs for young people to learn endangered crafts.',
      impact: '200+ artisans supported',
      ongoing: true,
      startYear: '2018',
      goals: ['Document 50+ traditional crafts', 'Train 100+ young apprentices', 'Create sustainable artisan cooperatives'],
      partners: ['UNESCO', 'Local Craft Guilds', 'Cultural Foundations'],
    },
  ];

  const displayInitiatives = initiatives.length > 0 ? initiatives : defaultInitiatives;

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-green-500/10 to-transparent rounded-full blur-[100px] translate-y-1/2" />
        
        {/* Connecting line decoration */}
        <div className="hidden lg:block absolute left-1/2 top-64 bottom-32 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header - Centered with decorative elements */}
        <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-4 text-accent text-xs tracking-[0.3em] uppercase font-medium mb-6"
            >
              <span className="w-12 h-px bg-accent/50" />
              {eyebrow}
              <span className="w-12 h-px bg-accent/50" />
            </motion.span>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light mb-6"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-foreground-secondary text-lg"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Initiatives - Timeline/Alternating Layout */}
        <div className="relative space-y-8 lg:space-y-0">
          {displayInitiatives.map((initiative, index) => {
            const colors = categoryColors[initiative.category || 'community'] || categoryColors.community;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative lg:w-1/2 ${isEven ? 'lg:pr-16 lg:ml-0' : 'lg:pl-16 lg:ml-auto'}`}
              >
                {/* Timeline dot - desktop only */}
                <div className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 items-center
                              ${isEven ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                    className="w-5 h-5 rounded-full bg-accent shadow-lg shadow-accent/30 flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </motion.div>
                </div>

                {/* Card */}
                <motion.article
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => handleCardClick(initiative)}
                  whileHover={{ y: -8 }}
                  className="group relative bg-gradient-to-br from-surface to-background rounded-3xl overflow-hidden 
                           border border-border hover:border-accent/50 cursor-pointer
                           transition-shadow duration-500 hover:shadow-2xl hover:shadow-accent/10"
                >
                  {/* Card inner layout */}
                  <div className="flex flex-col md:flex-row">
                    {/* Image section */}
                    <div className="relative md:w-2/5 aspect-video md:aspect-auto md:min-h-[240px] overflow-hidden">
                      {initiative.image?.url ? (
                        <Image
                          src={getImageUrl(initiative.image.url) || ''}
                          alt={initiative.title || 'Initiative'}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                          <motion.svg
                            animate={{ 
                              scale: hoveredIndex === index ? 1.2 : 1,
                              rotate: hoveredIndex === index ? 10 : 0 
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-20 h-20 text-accent/30"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </motion.svg>
                        </div>
                      )}

                      {/* Category Badge */}
                      {initiative.category && (
                        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${colors.bg} ${colors.text}`}>
                          {initiative.category.charAt(0).toUpperCase() + initiative.category.slice(1)}
                        </div>
                      )}

                      {/* Ongoing indicator */}
                      {initiative.ongoing && (
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-full">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs font-medium text-foreground">Active</span>
                        </div>
                      )}

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/50 md:block hidden" />
                    </div>

                    {/* Content section */}
                    <div className="md:w-3/5 p-6 md:p-8 flex flex-col">
                      {/* Title */}
                      {initiative.title && (
                        <motion.h3 
                          animate={{ x: hoveredIndex === index ? 8 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="font-serif text-2xl text-foreground mb-3 group-hover:text-accent transition-colors"
                        >
                          {initiative.title}
                        </motion.h3>
                      )}
                      
                      {/* Description */}
                      {initiative.description && (
                        <p className="text-foreground-secondary text-sm mb-6 flex-1 line-clamp-3">
                          {initiative.description}
                        </p>
                      )}
                      
                      {/* Footer */}
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                        {/* Impact Badge */}
                        {initiative.impact && (
                          <div className="flex items-center gap-3">
                            <motion.div 
                              animate={{ scale: hoveredIndex === index ? 1.2 : 1 }}
                              className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"
                            >
                              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </motion.div>
                            <div>
                              <p className="text-xs text-foreground-secondary uppercase tracking-wider">Impact</p>
                              <p className="text-sm font-medium text-accent">{initiative.impact}</p>
                            </div>
                          </div>
                        )}

                        {/* View Details */}
                        <motion.div
                          animate={{ x: hoveredIndex === index ? 4 : 0 }}
                          className="flex items-center gap-2 text-accent"
                        >
                          <span className="text-sm font-medium">Explore</span>
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <a
            href="/partners/inquiry"
            className="inline-flex items-center gap-4 px-8 py-4 bg-accent text-white rounded-full 
                     hover:bg-accent/90 transition-all duration-300 font-medium group"
          >
            <span>Support Our Initiatives</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Initiative Detail Modal */}
      <InitiativeModal
        initiative={selectedInitiative}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
