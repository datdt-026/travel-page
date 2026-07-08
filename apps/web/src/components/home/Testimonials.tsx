'use client';

import { useEffect, useRef, useState } from 'react';
import { Media, SectionStyling } from '@/types';

interface Testimonial {
  id?: string;
  quote: string;
  author: string;
  location?: string;
  trip?: string;
  avatar?: Media | string;
  rating?: number;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
  items?: Testimonial[]; // CMS items prop
  title?: string;
  styling?: SectionStyling;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: "This wasn't just a trip—it was a profound shift in how I experience the world. Every detail was considered, every moment meaningful.",
    author: "Alexandra M.",
    location: "New York",
    trip: "Kyoto, Japan"
  },
  {
    id: '2',
    quote: "In a world of rushed itineraries, they gave us the gift of slowness. We didn't just visit places; we truly inhabited them.",
    author: "Thomas & Sarah L.",
    location: "London",
    trip: "Amalfi Coast"
  },
  {
    id: '3',
    quote: "The kind of travel that reminds you why you fell in love with exploring in the first place. Understated, elegant, unforgettable.",
    author: "Marie C.",
    location: "Paris",
    trip: "Vietnam"
  }
];

export default function Testimonials({
  testimonials,
  items,
  title = "Words from Our Travelers",
  styling
}: TestimonialsProps) {
  // Use CMS items if provided, otherwise fallback to testimonials prop, then defaults
  const displayTestimonials = (items && items.length > 0) 
    ? items 
    : (testimonials && testimonials.length > 0) 
      ? testimonials 
      : defaultTestimonials;
  
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance testimonials (slow, luxurious)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  if (displayTestimonials.length === 0) return null;

  const currentTestimonial = displayTestimonials[activeIndex];

  // Build inline styles from styling prop
  const sectionStyle: React.CSSProperties = {};
  if (styling?.sectionBackground) {
    sectionStyle.backgroundColor = styling.sectionBackground;
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-40 lg:py-48 bg-surface-dark overflow-hidden"
      style={sectionStyle}
    >
      {/* Subtle decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-content-inverse/10" />
      
      {/* Large quotation mark - editorial style */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="font-serif text-[12rem] md:text-[16rem] text-content-inverse/[0.03] leading-none select-none">
          "
        </span>
      </div>

      <div className="container-narrow relative z-10">
        {/* Section Title */}
        <div 
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ease-elegant ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span 
            className="text-label-md uppercase tracking-luxury text-content-inverse/40"
            style={styling?.titleColor ? { color: styling.titleColor } : undefined}
          >
            {title}
          </span>
        </div>

        {/* Testimonial Content */}
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className={`transition-all duration-1000 ease-elegant ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Quote */}
            <blockquote className="relative">
              <p 
                key={currentTestimonial.id}
                className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-content-inverse leading-relaxed animate-fade-in"
                style={styling?.textColor ? { color: styling.textColor } : undefined}
              >
                "{currentTestimonial.quote}"
              </p>
            </blockquote>

            {/* Author */}
            <div className="mt-12 space-y-2">
              <p 
                className="text-body-md text-content-inverse font-light"
                style={styling?.subtitleColor ? { color: styling.subtitleColor } : undefined}
              >
                {currentTestimonial.author}
              </p>
              <div className="flex items-center justify-center gap-3 text-body-sm text-content-inverse/50">
                {currentTestimonial.location && (
                  <span>{currentTestimonial.location}</span>
                )}
                {currentTestimonial.location && currentTestimonial.trip && (
                  <span 
                    className="w-1 h-1 rounded-full bg-accent/50"
                    style={styling?.accentColor ? { backgroundColor: styling.accentColor } : undefined}
                  />
                )}
                {currentTestimonial.trip && (
                  <span className="italic">{currentTestimonial.trip}</span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Dots - Minimal */}
          {displayTestimonials.length > 1 && (
            <div className="flex items-center justify-center gap-3 mt-16">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === activeIndex 
                      ? 'bg-accent w-6' 
                      : 'bg-content-inverse/20 hover:bg-content-inverse/40'
                  }`}
                  style={index === activeIndex && styling?.accentColor ? { backgroundColor: styling.accentColor } : undefined}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-content-inverse/10" />
    </section>
  );
}
