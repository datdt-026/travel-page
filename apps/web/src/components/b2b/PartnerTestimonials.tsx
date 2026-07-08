'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';

interface Testimonial {
  quote?: string;
  fullStory?: string;
  authorName?: string;
  authorRole?: string;
  companyName?: string;
  companyLogo?: { url?: string } | null;
  authorImage?: { url?: string } | null;
  partnerSince?: string;
  results?: string;
}

interface PartnerTestimonialsProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
}

// Testimonial Detail Modal - Luxury Travel Design
function TestimonialModal({
  testimonial,
  isOpen,
  onClose,
}: {
  testimonial: Testimonial | null;
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
      {isOpen && testimonial && (
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
              className="relative w-full max-w-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 
                       rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Decorative gradient orbs */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-accent/30 to-transparent rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-[80px] pointer-events-none" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-accent 
                         rounded-full flex items-center justify-center transition-all hover:scale-110 group"
              >
                <svg className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Large decorative quote mark */}
              <div className="absolute top-0 left-0 text-[300px] leading-none font-serif text-accent/5 select-none pointer-events-none -translate-y-1/4">
                "
              </div>

              {/* Header Section with Avatar */}
              <div className="relative p-8 md:p-10 pb-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-6"
                >
                  {/* Author Image with animated ring */}
                  <div className="relative">
                    {testimonial.authorImage?.url ? (
                      <div className="relative w-24 h-24 rounded-full overflow-hidden">
                        <Image
                          src={getImageUrl(testimonial.authorImage.url) || ''}
                          alt={testimonial.authorName || 'Author'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                        <span className="text-accent font-serif text-4xl">
                          {testimonial.authorName?.charAt(0) || 'P'}
                        </span>
                      </div>
                    )}
                   
                    {/* Status indicator */}
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent rounded-full flex items-center justify-center border-4 border-gray-900">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-serif text-2xl md:text-3xl text-white">{testimonial.authorName}</h3>
                      <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-medium">
                        Verified Partner
                      </span>
                    </div>
                    <p className="text-gray-400 text-lg">{testimonial.authorRole}</p>
                    {testimonial.companyName && (
                      <div className="flex items-center gap-2 mt-2">
                        <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <p className="text-accent font-medium">{testimonial.companyName}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Main Quote Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="px-8 md:px-10"
              >
                <blockquote className="text-xl md:text-2xl text-white leading-relaxed italic font-light">
                  "{testimonial.fullStory || testimonial.quote}"
                </blockquote>
              </motion.div>

              {/* Partner Info Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="px-8 md:px-10 py-8"
              >
                <div className="grid grid-cols-2 gap-4">
                  {testimonial.partnerSince && (
                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Partner Since</p>
                      </div>
                      <p className="text-white text-2xl font-serif">{testimonial.partnerSince}</p>
                    </div>
                  )}
                  {testimonial.results && (
                    <div className="p-5 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent rounded-2xl border border-accent/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Key Results</p>
                      </div>
                      <p className="text-accent text-lg font-medium">{testimonial.results}</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Company Logo */}
              {testimonial.companyLogo?.url && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="flex justify-center px-8 pb-6"
                >
                  <div className="relative w-36 h-14 opacity-50 hover:opacity-80 transition-opacity">
                    <Image
                      src={getImageUrl(testimonial.companyLogo.url) || ''}
                      alt={testimonial.companyName || 'Company'}
                      fill
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                </motion.div>
              )}

              {/* Footer CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 md:p-8 bg-black/30 border-t border-white/10"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <p className="text-gray-400 text-sm">
                    Join our network of successful partners
                  </p>
                  <a
                    href="/partners/inquiry"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white 
                             rounded-full font-medium hover:bg-accent/90 transition-all duration-300 group hover:shadow-lg hover:shadow-accent/20"
                  >
                    <span>Partner With Us</span>
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

export function PartnerTestimonials({
  eyebrow = 'What Our Partners Say',
  title = 'Partner Testimonials',
  description,
  testimonials = [],
}: PartnerTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCardClick = useCallback((testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTestimonial(null), 300);
  }, []);

  // Default testimonials with extended details
  const defaultTestimonials: Testimonial[] = [
    {
      quote: "Voyager has become an invaluable extension of our team. Their local expertise and attention to detail consistently exceeds our expectations.",
      fullStory: "Voyager has become an invaluable extension of our team. Their local expertise and attention to detail consistently exceeds our expectations. From the first inquiry to post-trip follow-ups, they handle every aspect with professionalism. Our clients consistently rate Vietnam trips as their favorites, and that's largely due to Voyager's exceptional ground handling.",
      authorName: "Sarah Mitchell",
      authorRole: "Product Director",
      companyName: "Premium Travel Group",
      partnerSince: "2019",
      results: "40% increase in Vietnam bookings",
    },
    {
      quote: "The responsiveness and professionalism we've experienced has been exceptional. They understand the demands of our business and deliver every time.",
      fullStory: "The responsiveness and professionalism we've experienced has been exceptional. They understand the demands of our business and deliver every time. Whether it's a last-minute change or a complex multi-country itinerary, they handle it seamlessly. Their 24/7 support during trips gives us and our clients complete peace of mind.",
      authorName: "Marcus Chen",
      authorRole: "Operations Manager",
      companyName: "Asia Pacific Tours",
      partnerSince: "2020",
      results: "98% client satisfaction rate",
    },
    {
      quote: "We've worked with many DMCs in Southeast Asia, but Voyager stands out for their quality assurance and sustainable practices.",
      fullStory: "We've worked with many DMCs in Southeast Asia, but Voyager stands out for their quality assurance and sustainable practices. Their commitment to responsible tourism aligns perfectly with our brand values. They've helped us develop genuine community-based experiences that our travelers rave about.",
      authorName: "Emma Thompson",
      authorRole: "Sustainability Lead",
      companyName: "Responsible Adventures",
      partnerSince: "2021",
      results: "Carbon-neutral partnership achieved",
    },
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-20 md:py-32 bg-surface relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/3 left-0 w-[600px] h-[600px] bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-[100px]" />
        
        {/* Large decorative quote mark */}
        <div className="hidden lg:block absolute top-1/4 right-10 text-[400px] leading-none font-serif text-accent/3 select-none">
          "
        </div>
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

        {/* Testimonials - Modern Travel Cards Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {displayTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(testimonial)}
                className={`group cursor-pointer ${index === 1 ? 'lg:-translate-y-6' : ''}`}
              >
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-full bg-gradient-to-br from-background via-background to-surface rounded-3xl p-8 
                           border border-border hover:border-accent/50 
                           transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 overflow-hidden"
                >
                  {/* Decorative gradient orb - appears on hover */}
                  <motion.div 
                    animate={{ opacity: hoveredIndex === index ? 0.3 : 0 }}
                    className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-accent to-transparent rounded-full blur-[60px] pointer-events-none"
                  />

                  {/* Decorative corner pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden rounded-tr-3xl pointer-events-none">
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rotate-45 transform origin-bottom-left" />
                  </div>

                  {/* Verified Partner Badge */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20"
                  >
                    <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-accent font-medium">Verified</span>
                  </motion.div>

                  {/* Quote Icon with animated ring */}
                  <div className="relative mb-6 w-fit">
                    <motion.div
                      animate={{ 
                        scale: hoveredIndex === index ? 1.1 : 1,
                        rotate: hoveredIndex === index ? 5 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center"
                    >
                      <svg className="w-7 h-7 text-accent" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    
                    </motion.div>
                  </div>

                  {/* Quote */}
                  {testimonial.quote && (
                    <blockquote className="text-foreground leading-relaxed mb-8 text-lg line-clamp-4 relative">
                      "{testimonial.quote}"
                    </blockquote>
                  )}

                  {/* Author Section - Enhanced */}
                  <div className="flex items-center gap-4 mt-auto relative">
                    {/* Author Image with animated border */}
                    <div className="relative">
                      {testimonial.authorImage?.url ? (
                        <motion.div 
                          animate={{ scale: hoveredIndex === index ? 1.08 : 1 }}
                          className="relative w-14 h-14 rounded-full overflow-hidden"
                        >
                          <Image
                            src={getImageUrl(testimonial.authorImage.url) || ''}
                            alt={testimonial.authorName || 'Author'}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      ) : (
                        <motion.div 
                          animate={{ scale: hoveredIndex === index ? 1.08 : 1 }}
                          className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center"
                        >
                          <span className="text-accent font-serif text-xl">
                            {testimonial.authorName?.charAt(0) || 'P'}
                          </span>
                        </motion.div>
                      )}
                      {/* Rotating ring on hover */}
                      <motion.div
                        animate={{ 
                          rotate: hoveredIndex === index ? 360 : 0,
                          opacity: hoveredIndex === index ? 1 : 0 
                        }}
                        transition={{ rotate: { duration: 8, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.3 } }}
                        className="absolute -inset-1.5 rounded-full border border-dashed border-accent/50 pointer-events-none"
                      />
                    </div>

                    <div className="flex-1">
                      {testimonial.authorName && (
                        <motion.p 
                          animate={{ x: hoveredIndex === index ? 4 : 0 }}
                          className="font-medium text-foreground group-hover:text-accent transition-colors"
                        >
                          {testimonial.authorName}
                        </motion.p>
                      )}
                      <p className="text-sm text-foreground-secondary">
                        {testimonial.authorRole}
                      </p>
                      {testimonial.companyName && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <p className="text-xs text-accent font-medium">
                            {testimonial.companyName}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Read More Indicator - Enhanced */}
                  <motion.div
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 10
                    }}
                    className="absolute bottom-8 right-8 flex items-center gap-2 text-accent"
                  >
                    <span className="text-sm font-medium">Full Story</span>
                   
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { value: '50+', label: 'Active Partners' },
            { value: '15+', label: 'Years Experience' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '20+', label: 'Countries' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="text-center"
            >
              <div className="font-serif text-4xl md:text-5xl text-accent mb-1">{stat.value}</div>
              <div className="text-sm text-foreground-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Testimonial Detail Modal */}
      <TestimonialModal
        testimonial={selectedTestimonial}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
