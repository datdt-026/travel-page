'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/api';

interface CaseStudy {
  image?: { url?: string } | null;
  partnerName?: string;
  partnerCountry?: string;
  partnerType?: string;
  partnerLogo?: { url?: string } | null;
  title?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  results?: { metric?: string; value?: string }[] | string;
  metrics?: { number?: string; label?: string }[];
  testimonialQuote?: string;
  testimonialAuthor?: string;
  slug?: string;
  featured?: boolean;
}

interface CaseStudiesGridProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  caseStudies?: CaseStudy[];
}

// Partner type badge colors
const partnerTypeColors: Record<string, { bg: string; text: string }> = {
  operator: { bg: 'bg-blue-100', text: 'text-blue-700' },
  agency: { bg: 'bg-purple-100', text: 'text-purple-700' },
  wholesaler: { bg: 'bg-amber-100', text: 'text-amber-700' },
  dmc: { bg: 'bg-green-100', text: 'text-green-700' },
  ota: { bg: 'bg-pink-100', text: 'text-pink-700' },
  corporate: { bg: 'bg-slate-100', text: 'text-slate-700' },
  mice: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
};

// Case Study Detail Modal - Luxury Travel Design
function CaseStudyModal({
  caseStudy,
  isOpen,
  onClose,
}: {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}) {
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

  if (!caseStudy) return null;

  const typeColors = partnerTypeColors[caseStudy.partnerType || 'operator'] || partnerTypeColors.operator;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[9999]">
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
              className="relative w-full max-w-5xl max-h-[90vh] bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800
                       rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
            >
            {/* Hero Header with Image */}
            <div className="relative h-56 md:h-72 flex-shrink-0">
              {caseStudy.image?.url ? (
                <Image
                  src={getImageUrl(caseStudy.image.url) || ''}
                  alt={caseStudy.title || 'Case Study'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-accent/20 to-transparent" />
              )}
              {/* Multi-layer gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent" />
              
              {/* Decorative gradient orb */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-accent/30 to-transparent rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
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

              {/* Partner Info Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-3">
                {caseStudy.partnerType && (
                  <span className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/10 ${typeColors.bg} ${typeColors.text}`}>
                    {caseStudy.partnerType.charAt(0).toUpperCase() + caseStudy.partnerType.slice(1)}
                  </span>
                )}
                {caseStudy.featured && (
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-accent text-white backdrop-blur-sm">
                    Featured
                  </span>
                )}
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 mb-3"
                >
                  <span className="text-white/80 text-sm font-medium">{caseStudy.partnerName}</span>
                  {caseStudy.partnerCountry && (
                    <>
                      <span className="text-white/40">•</span>
                      <span className="text-white/60 text-sm">{caseStudy.partnerCountry}</span>
                    </>
                  )}
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="font-serif text-3xl md:text-4xl text-white"
                >
                  {caseStudy.title}
                </motion.h3>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {/* Metrics Row - Key Results */}
              {((caseStudy.metrics && caseStudy.metrics.length > 0) || (Array.isArray(caseStudy.results) && caseStudy.results.length > 0)) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8 p-6 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent rounded-2xl border border-accent/30"
                >
                  <p className="text-xs text-accent font-medium uppercase tracking-wider mb-4">Key Results</p>
                  <div className="flex flex-wrap gap-10">
                    {caseStudy.metrics && caseStudy.metrics.map((metric, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 + index * 0.05 }}
                      >
                        <p className="text-4xl font-serif text-accent">{metric.number}</p>
                        <p className="text-sm text-gray-400">{metric.label}</p>
                      </motion.div>
                    ))}
                    {!caseStudy.metrics && Array.isArray(caseStudy.results) && caseStudy.results.map((result, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 + index * 0.05 }}
                      >
                        <p className="text-4xl font-serif text-accent">{result.value}</p>
                        <p className="text-sm text-gray-400">{result.metric}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Challenge - Solution - Results Timeline */}
              <div className="space-y-6">
                {/* Challenge */}
                {caseStudy.challenge && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-red-400 before:to-red-400/30 before:rounded-full"
                  >
                    <div className="absolute left-0 top-0 w-1 h-1 -translate-x-[1px]">
                      <div className="w-3 h-3 -translate-x-1 -translate-y-1 rounded-full bg-red-400 shadow-lg shadow-red-400/30" />
                    </div>
                    <h4 className="text-sm uppercase tracking-wider text-red-400 mb-3 font-medium">
                      The Challenge
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-lg">{caseStudy.challenge}</p>
                  </motion.div>
                )}

                {/* Solution */}
                {caseStudy.solution && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-accent before:to-accent/30 before:rounded-full"
                  >
                    <div className="absolute left-0 top-0 w-1 h-1 -translate-x-[1px]">
                      <div className="w-3 h-3 -translate-x-1 -translate-y-1 rounded-full bg-accent shadow-lg shadow-accent/30" />
                    </div>
                    <h4 className="text-sm uppercase tracking-wider text-accent mb-3 font-medium">
                      Our Solution
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-lg">{caseStudy.solution}</p>
                  </motion.div>
                )}

                {/* Results (text format) */}
                {typeof caseStudy.results === 'string' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-green-400 before:to-green-400/30 before:rounded-full"
                  >
                    <div className="absolute left-0 top-0 w-1 h-1 -translate-x-[1px]">
                      <div className="w-3 h-3 -translate-x-1 -translate-y-1 rounded-full bg-green-400 shadow-lg shadow-green-400/30" />
                    </div>
                    <h4 className="text-sm uppercase tracking-wider text-green-400 mb-3 font-medium">
                      The Results
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-lg">{caseStudy.results}</p>
                  </motion.div>
                )}
              </div>

              {/* Testimonial Quote */}
              {caseStudy.testimonialQuote && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 p-8 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden"
                >
                  {/* Large decorative quote mark */}
                  <div className="absolute top-0 left-0 text-[120px] leading-none font-serif text-accent/10 select-none pointer-events-none">
                    "
                  </div>
                  <blockquote className="relative text-white italic text-xl leading-relaxed pl-6 pr-4 font-light">
                    "{caseStudy.testimonialQuote}"
                  </blockquote>
                  {caseStudy.testimonialAuthor && (
                    <p className="mt-6 text-right text-sm text-gray-400 flex items-center justify-end gap-3">
                      <span className="w-8 h-px bg-accent/50" />
                      {caseStudy.testimonialAuthor}
                    </p>
                  )}
                </motion.div>
              )}
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
                  Want to become our next success story?
                </p>
                <div className="flex gap-4">
                  <a
                    href="/contact"
                    className="px-6 py-3 border border-white/20 rounded-full text-white text-sm hover:bg-white/10 transition-all duration-300"
                  >
                    Request References
                  </a>
                  <a
                    href="/partners/inquiry"
                    className="inline-flex items-center gap-3 px-8 py-3 bg-accent text-white rounded-full 
                             hover:bg-accent/90 transition-all duration-300 font-medium group"
                  >
                    Start Partnership
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CaseStudiesGrid({
  eyebrow = 'Success Stories',
  title = 'Partner Case Studies',
  description,
  caseStudies = [],
}: CaseStudiesGridProps) {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCardClick = useCallback((study: CaseStudy) => {
    setSelectedStudy(study);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedStudy(null), 300);
  }, []);

  // Default placeholder case studies with extended fields
  const defaultCaseStudies: CaseStudy[] = [
    {
      partnerName: 'Premium Travel Group',
      partnerCountry: 'Germany',
      partnerType: 'operator',
      title: 'Scaling FIT Operations in Vietnam',
      description: 'How we helped a European luxury travel agency expand their Vietnam product portfolio and improve customer satisfaction.',
      challenge: 'The partner needed reliable ground handling for rapidly growing FIT volume while maintaining consistent quality across diverse itineraries.',
      solution: 'Implemented dedicated account management with standardized service protocols, created 24/7 support channels, and developed a custom booking portal.',
      results: 'Successfully handled 500+ FIT bookings in first year with 98% satisfaction rate.',
      metrics: [
        { number: '500+', label: 'FIT Bookings' },
        { number: '98%', label: 'Satisfaction' },
      ],
      testimonialQuote: 'Voyager has transformed our Vietnam operations. Their attention to detail and responsiveness exceeds our expectations consistently.',
      testimonialAuthor: 'Thomas M., Product Manager',
      featured: true,
    },
    {
      partnerName: 'Adventure Tours Co.',
      partnerCountry: 'Australia',
      partnerType: 'wholesaler',
      title: 'Multi-Country Series Development',
      description: 'Developing a successful Indochina series program for an adventure-focused tour operator.',
      challenge: 'Required seamless coordination across Vietnam, Cambodia, and Laos with consistent quality standards.',
      solution: 'Developed integrated multi-country program with unified quality standards, trained guides network, and real-time coordination.',
      results: 'Running 24 departures annually with consistent 4.8/5 guest ratings.',
      metrics: [
        { number: '24', label: 'Annual Departures' },
        { number: '4.8/5', label: 'Guest Rating' },
      ],
      testimonialQuote: 'The multi-country coordination is flawless. Our guests love the seamless experience across borders.',
      testimonialAuthor: 'Sarah C., Operations Director',
      featured: true,
    },
    {
      partnerName: 'Corporate Travel Solutions',
      partnerCountry: 'United Kingdom',
      partnerType: 'mice',
      title: 'Luxury Private Journey Program',
      description: 'Managing complex corporate events and incentive programs across multiple destinations.',
      challenge: 'High-end clients requiring bespoke experiences and white-glove service for corporate incentive groups.',
      solution: 'Created curated luxury experiences with dedicated concierge support, exclusive venue access, and personalized touches.',
      results: 'Generated 40% repeat bookings and premium segment growth.',
      metrics: [
        { number: '40%', label: 'Repeat Rate' },
        { number: '50+', label: 'Events Managed' },
      ],
      testimonialQuote: 'Working with Voyager has allowed us to confidently offer Vietnam to our luxury clients. Their local expertise is invaluable.',
      testimonialAuthor: 'James R., Managing Director',
      featured: false,
    },
  ];

  const displayCaseStudies = caseStudies.length > 0 ? caseStudies : defaultCaseStudies;
  
  // Separate featured and regular case studies
  const featuredStudies = displayCaseStudies.filter(s => s.featured);
  const regularStudies = displayCaseStudies.filter(s => !s.featured);

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-accent/5 to-transparent rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-accent/5 to-transparent rounded-full translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
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

        {/* Featured Case Studies - Hero Layout */}
        {featuredStudies.length > 0 && (
          <div className="mb-12">
            <div className="grid lg:grid-cols-2 gap-6">
              {featuredStudies.map((study, index) => {
                const typeColors = partnerTypeColors[study.partnerType || 'operator'] || partnerTypeColors.operator;
                const globalIndex = index;
                
                return (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    onHoverStart={() => setHoveredIndex(globalIndex)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    onClick={() => handleCardClick(study)}
                    className="group relative cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="relative h-[400px] md:h-[480px] rounded-3xl overflow-hidden 
                               border border-border hover:border-accent/50 transition-all duration-500
                               hover:shadow-2xl hover:shadow-accent/10"
                    >
                      {/* Background Image */}
                      {study.image?.url ? (
                        <Image
                          src={getImageUrl(study.image.url) || ''}
                          alt={study.title || 'Case study'}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5" />
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                      {/* Top badges */}
                      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-full backdrop-blur-sm">
                            Featured
                          </span>
                          {study.partnerType && (
                            <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${typeColors.bg} ${typeColors.text}`}>
                              {study.partnerType.charAt(0).toUpperCase() + study.partnerType.slice(1)}
                            </span>
                          )}
                        </div>
                        {study.partnerLogo?.url && (
                          <div className="relative w-20 h-10 bg-white/90 backdrop-blur-sm rounded-lg p-1.5">
                            <Image
                              src={getImageUrl(study.partnerLogo.url) || ''}
                              alt={study.partnerName || 'Partner'}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        {/* Partner Info */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-white/80 text-sm">{study.partnerName}</span>
                          {study.partnerCountry && (
                            <>
                              <span className="text-white/40">•</span>
                              <span className="text-white/60 text-sm">{study.partnerCountry}</span>
                            </>
                          )}
                        </div>

                        {/* Title */}
                        <motion.h3 
                          animate={{ x: hoveredIndex === globalIndex ? 10 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="font-serif text-2xl md:text-3xl text-white mb-4"
                        >
                          {study.title}
                        </motion.h3>

                        {/* Metrics */}
                        {study.metrics && study.metrics.length > 0 && (
                          <div className="flex gap-8 mb-6">
                            {study.metrics.slice(0, 2).map((metric, metricIndex) => (
                              <motion.div 
                                key={metricIndex}
                                animate={{ scale: hoveredIndex === globalIndex ? 1.1 : 1 }}
                                transition={{ duration: 0.3, delay: metricIndex * 0.05 }}
                              >
                                <p className="text-3xl font-serif text-accent">{metric.number}</p>
                                <p className="text-sm text-white/60">{metric.label}</p>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* CTA */}
                        <motion.div
                          animate={{ opacity: hoveredIndex === globalIndex ? 1 : 0.7 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center 
                                        group-hover:bg-accent transition-colors duration-300">
                            <svg className="w-5 h-5 text-foreground group-hover:text-white transition-colors" 
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                          <span className="text-white font-medium">Read Case Study</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular Case Studies - Compact Grid */}
        {regularStudies.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularStudies.map((study, index) => {
              const typeColors = partnerTypeColors[study.partnerType || 'operator'] || partnerTypeColors.operator;
              const globalIndex = featuredStudies.length + index;
              
              return (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredIndex(globalIndex)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => handleCardClick(study)}
                  className="group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface rounded-2xl overflow-hidden border border-border 
                             hover:border-accent/50 transition-all duration-300 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div className="aspect-[16/10] relative bg-border/20 overflow-hidden">
                      {study.image?.url ? (
                        <Image
                          src={getImageUrl(study.image.url) || ''}
                          alt={study.title || 'Case study'}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                          <motion.svg
                            animate={{ 
                              scale: hoveredIndex === globalIndex ? 1.1 : 1,
                              rotate: hoveredIndex === globalIndex ? 5 : 0 
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-12 h-12 text-accent/30"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </motion.svg>
                        </div>
                      )}

                      {/* Type Badge */}
                      {study.partnerType && (
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${typeColors.bg} ${typeColors.text}`}>
                            {study.partnerType.charAt(0).toUpperCase() + study.partnerType.slice(1)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Partner Info */}
                      <div className="flex items-center gap-2 mb-2">
                        {study.partnerName && (
                          <p className="text-xs uppercase tracking-wider text-accent">
                            {study.partnerName}
                          </p>
                        )}
                        {study.partnerCountry && (
                          <>
                            <span className="text-foreground-secondary/40">•</span>
                            <p className="text-xs text-foreground-secondary">
                              {study.partnerCountry}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <motion.h3 
                        animate={{ x: hoveredIndex === globalIndex ? 6 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-serif text-xl text-foreground mb-3 group-hover:text-accent transition-colors"
                      >
                        {study.title}
                      </motion.h3>

                      {/* Metrics Preview */}
                      {study.metrics && study.metrics.length > 0 && (
                        <div className="flex gap-6 pt-4 border-t border-border">
                          {study.metrics.slice(0, 2).map((metric, metricIndex) => (
                            <div key={metricIndex}>
                              <p className="text-xl font-serif text-accent">{metric.number}</p>
                              <p className="text-xs text-foreground-secondary">{metric.label}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        )}

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
            <span>Become Our Next Success Story</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        caseStudy={selectedStudy}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
