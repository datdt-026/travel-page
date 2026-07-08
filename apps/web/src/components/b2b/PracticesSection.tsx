'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Practice {
  icon?: string;
  title?: string;
  description?: string;
  details?: string;
  impact?: string;
}

interface Category {
  title?: string;
  icon?: string;
  color?: string;
  practices?: Practice[];
}

interface PracticesSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  categories?: Category[];
}

// Practice Detail Modal - Luxury Travel Design
function PracticeModal({
  practice,
  category,
  isOpen,
  onClose,
}: {
  practice: Practice | null;
  category: Category | null;
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

  return (
    <AnimatePresence mode="wait">
      {isOpen && practice && (
        <motion.div className="fixed inset-0 z-[9999]">
          {/* Backdrop with luxury blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-black/90 backdrop-blur-2xl"
          />
          
          {/* Modal Content - Luxury Design */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
              className="relative w-full max-w-xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 
                       rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Decorative gradient orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/30 to-transparent rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-accent backdrop-blur-sm
                         rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header with icon */}
              <div className="relative p-8 pb-6 bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex items-start gap-5">
                  {/* Animated Icon Container */}
                 
                    {/* <div className="w-20 h-20 bg-gradient-to-br from-accent/30 to-accent/10 rounded-2xl flex items-center justify-center text-5xl border border-accent/30">
                      {practice.icon || '✨'}
                    </div> */}
              
                  
                  <div className="flex-1 pt-2">
                    {category?.title && (
                      <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="inline-block px-3 py-1.5 bg-accent/20 text-accent rounded-full text-xs font-medium mb-3 border border-accent/30"
                      >
                        {category.title}
                      </motion.span>
                    )}
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-serif text-2xl md:text-3xl text-white"
                    >
                      {practice.title}
                    </motion.h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 pb-8 space-y-6">
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-gray-300 leading-relaxed text-lg"
                >
                  {practice.details || practice.description}
                </motion.p>

                {/* Impact Card */}
                {practice.impact && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-4 p-5 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent rounded-2xl border border-accent/30"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-accent/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Measured Impact</p>
                      <p className="text-xl text-white font-medium">{practice.impact}</p>
                    </div>
                  </motion.div>
                )}

                {/* CTA */}
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  href="/partners/inquiry"
                  className="inline-flex items-center gap-3 w-full justify-center px-8 py-4 bg-accent text-white 
                           rounded-2xl font-medium hover:bg-accent/90 transition-all duration-300 group"
                >
                  <span>Partner With Us</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const categoryIcons: Record<string, string> = {
  'Environmental': '🌍',
  'Social': '🤝',
  'Economic': '💎',
};

const categoryColors: Record<string, string> = {
  'Environmental': 'from-emerald-500/20 to-green-500/10',
  'Social': 'from-blue-500/20 to-indigo-500/10',
  'Economic': 'from-amber-500/20 to-orange-500/10',
};

export function PracticesSection({
  eyebrow = 'Our Practices',
  title = 'How We Operate Sustainably',
  description,
  categories = [],
}: PracticesSectionProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredPractice, setHoveredPractice] = useState<number | null>(null);

  const handlePracticeClick = useCallback((practice: Practice, category: Category) => {
    setSelectedPractice(practice);
    setSelectedCategory(category);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedPractice(null);
      setSelectedCategory(null);
    }, 300);
  }, []);

  // Default practices with extended details
  const defaultCategories: Category[] = [
    {
      title: 'Environmental',
      icon: '🌍',
      color: 'emerald',
      practices: [
        { 
          icon: '🌿', 
          title: 'Carbon Tracking', 
          description: 'We measure and offset the carbon footprint of every trip',
          details: 'Using advanced tracking tools, we calculate the carbon emissions of each journey including transportation, accommodations, and activities. We then offset 120% of emissions through verified reforestation and renewable energy projects.',
          impact: '500+ tons offset in 2024'
        },
        { 
          icon: '♻️', 
          title: 'Waste Reduction', 
          description: 'Plastic-free operations and recycling programs',
          details: 'All our tours operate plastic-free with reusable bottles and containers. We partner with local recycling facilities and organize regular beach and trail cleanups as part of our itineraries.',
          impact: '90% waste reduction achieved'
        },
        { 
          icon: '🚲', 
          title: 'Low-Impact Transport', 
          description: 'Prioritizing cycling, walking, and electric vehicles',
          details: 'Wherever possible, we use bicycles, walking tours, and electric vehicles. When longer distances require traditional transport, we choose the most efficient options and offset the impact.',
          impact: '60% EV fleet by 2025'
        },
      ],
    },
    {
      title: 'Social',
      icon: '🤝',
      color: 'blue',
      practices: [
        { 
          icon: '👥', 
          title: 'Local Employment', 
          description: '95% of our team are local hires from destination communities',
          details: 'We believe in empowering local communities through meaningful employment. Our guides, drivers, and support staff are all trained locals who share authentic knowledge and directly benefit from tourism.',
          impact: '200+ local jobs created'
        },
        { 
          icon: '🏠', 
          title: 'Community Tourism', 
          description: 'Direct partnerships with local families and villages',
          details: 'Our homestay and village visit programs create direct connections between travelers and communities. Families host guests in their homes, sharing meals and traditions while earning sustainable income.',
          impact: '50+ partner villages'
        },
        { 
          icon: '📚', 
          title: 'Education Support', 
          description: 'Scholarship programs for hospitality students',
          details: 'We fund scholarships for students from underserved communities to pursue hospitality and tourism education, creating pathways to rewarding careers in the industry.',
          impact: '100+ scholarships awarded'
        },
      ],
    },
    {
      title: 'Economic',
      icon: '💎',
      color: 'amber',
      practices: [
        { 
          icon: '🏪', 
          title: 'Local Suppliers', 
          description: 'Prioritizing locally-owned hotels and restaurants',
          details: 'We partner with family-owned accommodations and local eateries rather than international chains. This ensures tourism revenue stays in the community and supports local entrepreneurs.',
          impact: '80% local supplier rate'
        },
        { 
          icon: '🎨', 
          title: 'Artisan Partnerships', 
          description: 'Supporting traditional craftspeople and markets',
          details: 'Our tours include visits to artisan workshops where travelers can learn traditional crafts and purchase directly from makers. We ensure fair prices that value the skill and time of artisans.',
          impact: '150+ artisans supported'
        },
        { 
          icon: '💳', 
          title: 'Fair Pricing', 
          description: 'Ensuring fair wages throughout the supply chain',
          details: 'We audit our supply chain to ensure all workers receive fair compensation. This includes guides, drivers, hotel staff, restaurant workers, and activity providers.',
          impact: 'Living wage certified'
        },
      ],
    },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;
  return (
    <section className="py-20 md:py-32 bg-surface relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-gradient-to-bl from-accent/5 to-transparent rounded-full" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-gradient-to-tr from-accent/5 to-transparent rounded-full" />
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

        {/* Category Tabs - Modern pill design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {displayCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2
                        ${activeCategory === index 
                          ? 'bg-foreground text-background shadow-lg' 
                          : 'bg-background text-foreground-secondary hover:bg-border/50 border border-border'
                        }`}
            >
              <span>{category.title}</span>
              {activeCategory === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-foreground rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Practices Display - Bento Grid Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {displayCategories[activeCategory]?.practices?.map((practice, index) => {
              const category = displayCategories[activeCategory];
              const isFirst = index === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredPractice(index)}
                  onHoverEnd={() => setHoveredPractice(null)}
                  onClick={() => handlePracticeClick(practice, category)}
                  className={`group relative cursor-pointer
                            ${isFirst ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={`h-full bg-gradient-to-br ${categoryColors[category.title || ''] || 'from-accent/20 to-accent/5'}
                              rounded-3xl border border-border hover:border-accent/50 
                              transition-all duration-500 overflow-hidden
                              ${isFirst ? 'p-8 md:p-10' : 'p-6'}`}
                  >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon */}
                    <motion.div
                      animate={{ 
                        scale: hoveredPractice === index ? 1.2 : 1,
                        rotate: hoveredPractice === index ? 10 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className={`mb-4 ${isFirst ? 'text-6xl' : 'text-4xl'}`}
                    >
                      {practice.icon}
                    </motion.div>

                    {/* Title */}
                    <motion.h4
                      animate={{ x: hoveredPractice === index ? 8 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`font-serif text-foreground mb-3 group-hover:text-accent transition-colors
                                ${isFirst ? 'text-2xl md:text-3xl' : 'text-xl'}`}
                    >
                      {practice.title}
                    </motion.h4>

                    {/* Description */}
                    <p className={`text-foreground-secondary mb-6 ${isFirst ? 'text-base max-w-md' : 'text-sm'}`}>
                      {practice.description}
                    </p>

                    {/* Impact Badge */}
                    {practice.impact && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/50 backdrop-blur-sm rounded-full border border-border/50">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-accent">{practice.impact}</span>
                      </div>
                    )}

                    {/* Hover indicator */}
                    <motion.div
                      animate={{ opacity: hoveredPractice === index ? 1 : 0, x: hoveredPractice === index ? 0 : -10 }}
                      className="absolute bottom-6 right-6 flex items-center gap-2 text-accent"
                    >
                      <span className="text-sm font-medium">Learn more</span>
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '3', label: 'Pillars of Sustainability' },
            { value: '9+', label: 'Core Practices' },
            { value: '100%', label: 'Commitment to Impact' },
            { value: '2027', label: 'Carbon Neutral Goal' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="text-center p-6 rounded-2xl bg-background/50 border border-border"
            >
              <div className="font-serif text-3xl md:text-4xl text-accent mb-2">{stat.value}</div>
              <div className="text-sm text-foreground-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Practice Detail Modal */}
      <PracticeModal
        practice={selectedPractice}
        category={selectedCategory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
