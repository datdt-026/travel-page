'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';

interface Destination {
  name?: string;
  countries?: string;
  image?: { url?: string } | null;
  description?: string;
  highlights?: string[];
  highlighted?: boolean;
  // Extended details for popup
  keyAttractions?: string[];
  bestTime?: string;
  travelStyles?: string[];
  localTeam?: string;
  languages?: string[];
}

interface DestinationCoverageSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  destinations?: Destination[];
}

// Redesigned Modal - Modern, immersive full-screen experience
function DestinationModal({ 
  destination, 
  isOpen, 
  onClose 
}: { 
  destination: Destination | null; 
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

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!destination) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999]"
        >
          {/* Full-screen backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          
          {/* Modal Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Decorative gradient orbs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              
              {/* Close Button - Floating */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={onClose}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20
                         flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 
                         transition-all duration-300 group"
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Content Layout - Split design */}
              <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                {/* Left: Hero Image Section */}
                <div className="relative lg:w-2/5 h-64 lg:h-auto flex-shrink-0">
                  {destination.image?.url ? (
                    <Image
                      src={getImageUrl(destination.image.url) || ''}
                      alt={destination.name || 'Destination'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-accent/20 to-transparent" />
                  )}
                  
                  {/* Image overlay gradient */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent" /> */}
                  
                  {/* Large decorative letter */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-0 left-4 lg:left-8 font-serif text-[180px] lg:text-[250px] text-white leading-none pointer-events-none"
                  >
                    {destination.name?.charAt(0)}
                  </motion.span>
                  
                  {/* Title on image - mobile only */}
                  <div className="absolute bottom-6 left-6 lg:hidden">
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-serif text-4xl text-white font-light"
                    >
                      {destination.name}
                    </motion.h3>
                  </div>
                </div>

                {/* Right: Content Section */}
                <div className="flex-1 overflow-y-auto lg:py-16 lg:px-12 p-6 relative z-10">
                  {/* Title - desktop */}
                  <div className="hidden lg:block mb-8">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-accent text-xs tracking-[0.3em] uppercase font-light"
                    >
                      Destination
                    </motion.span>
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-serif text-5xl xl:text-6xl text-white font-light mt-2"
                    >
                      {destination.name}
                    </motion.h3>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="h-px w-24 bg-gradient-to-r from-accent to-transparent mt-6 origin-left"
                    />
                  </div>

                  {/* Description */}
                  {destination.description && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-white/60 text-lg leading-relaxed mb-10"
                    >
                      {destination.description}
                    </motion.p>
                  )}

                  {/* Info Grid - Modern Cards */}
                  <div className="space-y-6">
                    {/* Key Destinations */}
                    {destination.highlights && destination.highlights.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                      >
                        <h4 className="text-accent text-xs tracking-[0.2em] uppercase mb-4">Key Destinations</h4>
                        <div className="flex flex-wrap gap-2">
                          {destination.highlights.map((highlight, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + index * 0.05 }}
                              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm
                                       hover:bg-accent/20 hover:border-accent/50 transition-all duration-300"
                            >
                              {highlight}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Travel Styles + Quick Info Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {destination.travelStyles && destination.travelStyles.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                        >
                          <h4 className="text-accent text-xs tracking-[0.2em] uppercase mb-4">Travel Styles</h4>
                          <div className="space-y-2">
                            {destination.travelStyles.map((style, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.45 + index * 0.05 }}
                                className="flex items-center gap-3 text-white/70"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                <span className="text-sm">{style}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 space-y-4"
                      >
                        {destination.localTeam && (
                          <div>
                            <h4 className="text-accent text-xs tracking-[0.2em] uppercase mb-2">Local Team</h4>
                            <p className="text-white/70 text-sm">{destination.localTeam}</p>
                          </div>
                        )}
                        {destination.bestTime && (
                          <div>
                            <h4 className="text-accent text-xs tracking-[0.2em] uppercase mb-2">Best Time to Visit</h4>
                            <p className="text-white/70 text-sm">{destination.bestTime}</p>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Languages */}
                    {destination.languages && destination.languages.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-r from-accent/10 to-transparent rounded-2xl p-6 border border-accent/20"
                      >
                        <h4 className="text-accent text-xs tracking-[0.2em] uppercase mb-4">Guide Languages Available</h4>
                        <div className="flex flex-wrap gap-2">
                          {destination.languages.map((lang, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-accent/10 text-accent/90 rounded-full text-sm font-medium"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* CTA Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="mt-10 pt-8 border-t border-white/10"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                      <p className="text-white/50 text-sm">
                        Ready to create a program for {destination.name}?
                      </p>
                      <a
                        href="/partners/inquiry"
                        className="group inline-flex items-center gap-4 px-8 py-4 bg-accent text-white rounded-full 
                                 hover:bg-accent/90 transition-all duration-300 font-medium"
                      >
                        <span>Request Quote</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DestinationCoverageSection({
  eyebrow = 'Our Coverage',
  title = 'Destinations We Serve',
  description,
  destinations = [],
}: DestinationCoverageSectionProps) {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  const handleCardClick = useCallback((destination: Destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Delay clearing destination to allow exit animation
    setTimeout(() => setSelectedDestination(null), 300);
  }, []);

  // Default destinations with extended details
  const defaultDestinations: Destination[] = [
    {
      name: 'Vietnam',
      description: 'From the misty mountains of Sapa to the floating markets of the Mekong Delta, Vietnam offers an incredible diversity of experiences. Our deep local expertise ensures authentic, seamless travel programs.',
      highlights: ['Hanoi & Ho Chi Minh City', 'Ha Long Bay', 'Mekong Delta', 'Central Highlands', 'Hue & Hoi An'],
      travelStyles: ['Cultural Heritage', 'Adventure', 'Culinary', 'Beach & Wellness', 'Photography'],
      localTeam: '25+ dedicated staff in Hanoi, HCMC, Da Nang',
      bestTime: 'Year-round (varies by region)',
      languages: ['English', 'French', 'German', 'Spanish', 'Japanese', 'Chinese'],
    },
    {
      name: 'Cambodia',
      description: 'Home to the magnificent Angkor temples and a resilient culture, Cambodia captivates with its ancient wonders and warm hospitality. We provide comprehensive coverage across all major destinations.',
      highlights: ['Angkor Complex', 'Phnom Penh', 'Siem Reap', 'Coastal Islands', 'Battambang'],
      travelStyles: ['Temple Tours', 'Cultural Immersion', 'River Cruises', 'Beach Relaxation'],
      localTeam: '15+ staff in Siem Reap and Phnom Penh',
      bestTime: 'November to April',
      languages: ['English', 'French', 'German', 'Spanish'],
    },
    {
      name: 'Laos',
      description: 'The hidden gem of Southeast Asia, Laos offers untouched natural beauty and authentic Buddhist traditions. Our local team navigates the unique logistics of this landlocked paradise.',
      highlights: ['Luang Prabang', 'Vientiane', 'Mekong River', 'Plain of Jars', '4000 Islands'],
      travelStyles: ['Heritage & Spirituality', 'River Journeys', 'Eco-Tourism', 'Trekking'],
      localTeam: '10+ staff based in Luang Prabang',
      bestTime: 'October to April',
      languages: ['English', 'French', 'German'],
    },
    {
      name: 'Thailand',
      description: 'From buzzing Bangkok to serene islands, Thailand delivers diverse experiences for every traveler type. Our extensive supplier network ensures competitive rates and reliable service.',
      highlights: ['Bangkok', 'Chiang Mai', 'Islands & Beaches', 'Cultural North', 'Khao Sok'],
      travelStyles: ['City Breaks', 'Beach & Luxury', 'Adventure', 'Wellness & Spa', 'Culinary'],
      localTeam: '20+ staff across Bangkok and Chiang Mai',
      bestTime: 'November to February (peak), Year-round for islands',
      languages: ['English', 'German', 'French', 'Russian', 'Chinese', 'Japanese'],
    },
    {
      name: 'Myanmar',
      description: 'A land of golden pagodas and timeless traditions, Myanmar is slowly reopening to tourism. We maintain trusted relationships with vetted local partners for safe, meaningful travel.',
      highlights: ['Bagan', 'Yangon', 'Inle Lake', 'Mandalay', 'Ngapali Beach'],
      travelStyles: ['Cultural Discovery', 'Photography', 'River Cruises', 'Pilgrimage Tours'],
      localTeam: 'Partner network with oversight from Thailand office',
      bestTime: 'October to February',
      languages: ['English', 'German', 'French'],
    },
    {
      name: 'Multi-Country',
      description: 'Seamless cross-border journeys combining the best of Southeast Asia. We handle all logistics, border procedures, and coordination for hassle-free multi-destination programs.',
      highlights: ['Indochina Classics', 'Mekong Journey', 'Temple Trail', 'Custom Routing', 'Grand Southeast Asia'],
      travelStyles: ['Classic Tours', 'Luxury Journeys', 'Adventure Expeditions', 'River & Coastal'],
      localTeam: 'Coordinated by regional operations team',
      bestTime: 'Varies by itinerary',
      languages: ['All major European languages', 'Asian languages available'],
    },
  ];

  const displayDestinations = destinations.length > 0 ? destinations : defaultDestinations;

  // Navigate carousel
  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % displayDestinations.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + displayDestinations.length) % displayDestinations.length);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-16 md:py-20 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          style={{ x: smoothMouseX, y: smoothMouseY }}
          className="absolute top-20 left-[10%] w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: useTransform(smoothMouseX, v => -v), y: useTransform(smoothMouseY, v => -v) }}
          className="absolute bottom-20 right-[10%] w-80 h-80 bg-gradient-to-tl from-accent/15 to-transparent rounded-full blur-3xl"
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header - Asymmetric layout */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 md:mb-14">
          <div className="max-w-2xl">
            {eyebrow && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block text-accent text-xs tracking-[0.3em] uppercase font-light mb-6"
              >
                {eyebrow}
              </motion.span>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-tight"
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="mt-6 text-white/50 text-lg font-light leading-relaxed"
              >
                {description}
              </motion.p>
            )}
          </div>
          
          {/* Navigation controls - desktop */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden lg:flex items-center gap-4"
          >
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center
                       text-white/60 hover:text-white hover:border-accent hover:bg-accent/10 
                       transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center
                       text-white/60 hover:text-white hover:border-accent hover:bg-accent/10 
                       transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Main Destination Display - Immersive Card Layout */}
        <div className="relative">
          {/* Featured destination - Large display */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center mb-8">
            {/* Image side with parallax */}
            <motion.div
              key={`image-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              onClick={() => handleCardClick(displayDestinations[activeIndex])}
            >
              {displayDestinations[activeIndex]?.image?.url ? (
                <Image
                  src={getImageUrl(displayDestinations[activeIndex].image!.url!) || ''}
                  alt={displayDestinations[activeIndex]?.name || 'Destination'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent/10 to-transparent" />
              )}
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Country initial - large decorative */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.1, y: 0 }}
                className="absolute top-8 left-8 font-serif text-[200px] text-white leading-none pointer-events-none"
              >
                {displayDestinations[activeIndex]?.name?.charAt(0)}
              </motion.span>
              
              {/* Click hint */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 text-white/70 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm">View details</span>
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              
              {/* Highlighted badge */}
              {displayDestinations[activeIndex]?.highlighted && (
                <div className="absolute top-6 left-6 px-4 py-2 bg-accent text-white text-xs font-medium 
                              rounded-full tracking-wide uppercase">
                  Primary Destination
                </div>
              )}
            </motion.div>
            
            {/* Content side */}
            <motion.div
              key={`content-${activeIndex}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:py-8"
            >
              {/* Country name with animated underline */}
              <div className="relative mb-4">
                <h3 className="font-serif text-4xl md:text-5xl lg:text-5xl text-white font-light">
                  {displayDestinations[activeIndex]?.name}
                </h3>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="h-px bg-gradient-to-r from-accent to-transparent mt-4 origin-left"
                />
              </div>
              
              {/* Description */}
              {displayDestinations[activeIndex]?.description && (
                <p className="text-white/60 text-base font-light leading-relaxed mb-6">
                  {displayDestinations[activeIndex].description}
                </p>
              )}
              
              {/* Highlights as animated tags */}
              {displayDestinations[activeIndex]?.highlights && (
                <div className="mb-6">
                  <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">Key Destinations</p>
                  <div className="flex flex-wrap gap-2">
                    {displayDestinations[activeIndex].highlights!.map((highlight, i) => (
                      <motion.span
                        key={highlight}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm
                                 hover:bg-accent/20 hover:border-accent/50 transition-all duration-300 cursor-default"
                      >
                        {highlight}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {displayDestinations[activeIndex]?.localTeam && (
                  <div>
                    <p className="text-accent text-xs uppercase tracking-[0.2em] mb-2">Local Team</p>
                    <p className="text-white/80 text-sm">{displayDestinations[activeIndex].localTeam}</p>
                  </div>
                )}
                {displayDestinations[activeIndex]?.bestTime && (
                  <div>
                    <p className="text-accent text-xs uppercase tracking-[0.2em] mb-2">Best Time</p>
                    <p className="text-white/80 text-sm">{displayDestinations[activeIndex].bestTime}</p>
                  </div>
                )}
              </div>
              
              {/* CTA */}
              <button
                onClick={() => handleCardClick(displayDestinations[activeIndex])}
                className="inline-flex items-center gap-4 group"
              >
                <span className="text-sm tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors">
                  Explore {displayDestinations[activeIndex]?.name}
                </span>
                <span className="w-12 h-px bg-accent group-hover:w-20 transition-all duration-500" />
                <svg 
                  className="w-5 h-5 text-accent -translate-x-2 group-hover:translate-x-0 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </motion.div>
          </div>
          
          {/* Destination Selector - Horizontal scrolling thumbnails */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {displayDestinations.map((destination, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => goToSlide(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative flex-shrink-0 w-32 h-20 md:w-40 md:h-24 rounded-xl overflow-hidden 
                            transition-all duration-500 ${
                              activeIndex === index 
                                ? 'ring-2 ring-accent scale-105' 
                                : 'opacity-60 hover:opacity-100'
                            }`}
                >
                  {destination.image?.url ? (
                    <Image
                      src={getImageUrl(destination.image.url) || ''}
                      alt={destination.name || 'Destination'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-accent/10 flex items-center justify-center">
                      <span className="font-serif text-3xl text-white/60">
                        {destination.name?.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 
                                 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`} />
                  
                  {/* Name */}
                  <span className={`absolute bottom-2 left-3 text-xs font-medium text-white transition-opacity duration-300
                                  ${activeIndex === index || hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                    {destination.name}
                  </span>
                  
                  {/* Active indicator */}
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Scroll fade indicators */}
            <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none" />
          </div>
          
          {/* Mobile navigation */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center
                       text-white/60 active:bg-accent/10 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Dots indicator */}
            <div className="flex gap-2">
              {displayDestinations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index ? 'w-8 bg-accent' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center
                       text-white/60 active:bg-accent/10 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Destination Detail Modal */}
      <DestinationModal 
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
