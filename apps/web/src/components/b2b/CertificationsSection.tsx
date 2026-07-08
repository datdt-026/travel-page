'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';

interface Certification {
  logo?: { url?: string } | null;
  name?: string;
  description?: string;
  year?: string;
  // Extended fields for modal
  issuer?: string;
  scope?: string;
  validUntil?: string;
  requirements?: string[];
  benefits?: string[];
  verificationUrl?: string;
}

interface CertificationsSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  certifications?: Certification[];
}

// Elegant Modal component for certification details - Luxury Travel Design
function CertificationModal({
  certification,
  isOpen,
  onClose,
}: {
  certification: Certification | null;
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

  if (!certification) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999]"
        >
          {/* Elegant dark backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container - Refined Luxury Design */}
          <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden bg-white rounded-sm shadow-2xl"
            >
              {/* Scrollable content */}
              <div className="relative max-h-[90vh] overflow-y-auto">
                {/* Close button - minimal */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center
                           text-foreground-secondary hover:text-foreground transition-colors duration-300"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Hero Image Area */}
                <div className="relative aspect-[16/9] bg-surface overflow-hidden">
                  {certification.logo?.url ? (
                    <Image
                      src={getImageUrl(certification.logo.url) || ''}
                      alt={certification.name || 'Certification'}
                      fill
                      className="object-contain p-12 md:p-16"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-background">
                      <div className="text-center">
                        <span className="font-serif text-6xl md:text-8xl text-foreground/10">
                          {certification.name?.charAt(0) || 'C'}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Year overlay */}
                  {certification.year && (
                    <div className="absolute bottom-6 left-6">
                      <span className="text-xs tracking-[0.2em] uppercase text-foreground-secondary">
                        Since {certification.year}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-8 md:p-12">
                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-serif text-3xl md:text-4xl text-foreground mb-6"
                  >
                    {certification.name}
                  </motion.h3>

                  {/* Description */}
                  {certification.description && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      className="text-foreground-secondary text-lg leading-relaxed mb-8"
                    >
                      {certification.description}
                    </motion.p>
                  )}

                  {/* Meta Info - Refined layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-10 border-b border-border">
                    {certification.issuer && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="text-xs tracking-[0.2em] uppercase text-foreground-secondary block mb-2">
                          Issued By
                        </span>
                        <span className="text-foreground font-medium">
                          {certification.issuer}
                        </span>
                      </motion.div>
                    )}

                    {certification.scope && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                      >
                        <span className="text-xs tracking-[0.2em] uppercase text-foreground-secondary block mb-2">
                          Scope
                        </span>
                        <span className="text-foreground font-medium">
                          {certification.scope}
                        </span>
                      </motion.div>
                    )}
                    
                    {certification.validUntil && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <span className="text-xs tracking-[0.2em] uppercase text-foreground-secondary block mb-2">
                          Valid Until
                        </span>
                        <span className="text-foreground font-medium">
                          {certification.validUntil}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Requirements */}
                  {certification.requirements && certification.requirements.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45 }}
                      className="mb-10"
                    >
                      <h4 className="text-xs tracking-[0.2em] uppercase text-foreground-secondary mb-5">
                        Certification Requirements
                      </h4>
                      <ul className="space-y-4">
                        {certification.requirements.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-4 text-foreground-secondary"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                            <span className="leading-relaxed">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Benefits */}
                  {certification.benefits && certification.benefits.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mb-10 p-8 bg-surface rounded-sm"
                    >
                      <h4 className="text-xs tracking-[0.2em] uppercase text-foreground-secondary mb-5">
                        Key Benefits
                      </h4>
                      <ul className="space-y-4">
                        {certification.benefits.map((benefit, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-4 text-foreground-secondary"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                            <span className="leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Verification Link */}
                  {certification.verificationUrl && (
                    <motion.a
                      href={certification.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.55 }}
                      className="inline-flex items-center gap-3 text-accent hover:text-accent/80 
                               transition-colors duration-300 group"
                    >
                      <span className="text-sm tracking-wide">Verify this certification</span>
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CertificationsSection({
  eyebrow = 'Our Certifications',
  title = 'Recognized Sustainable Practices',
  description,
  certifications = [],
}: CertificationsSectionProps) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = useCallback((cert: Certification) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCert(null), 300);
  }, []);

  // Default certifications with extended fields
  const defaultCertifications: Certification[] = [
    {
      name: 'Travelife Certified',
      description: 'Internationally recognized certification for sustainability in tour operations',
      year: '2022',
      issuer: 'Travelife International',
      scope: 'All tour operations in Vietnam, Cambodia, Laos, and Thailand',
      validUntil: '2025',
      requirements: [
        'Annual sustainability audit and reporting',
        'Staff training on sustainable practices',
        'Supplier sustainability assessment program',
        'Community engagement initiatives',
      ],
      benefits: [
        'Recognized by 60+ tour operators worldwide',
        'Preferred partner status with sustainability-focused agencies',
        'Access to Travelife sustainability resources and training',
      ],
    },
    {
      name: 'PATA Membership',
      description: 'Pacific Asia Travel Association member committed to responsible tourism',
      year: '2020',
      issuer: 'Pacific Asia Travel Association',
      scope: 'Asia-Pacific tourism operations',
      requirements: [
        'Commitment to responsible tourism principles',
        'Active participation in PATA events and initiatives',
        'Adherence to PATA code of ethics',
      ],
      benefits: [
        'Access to industry insights and research',
        'Networking with 750+ member organizations',
        'Participation in PATA awards and recognition programs',
      ],
    },
    {
      name: 'Green Office',
      description: 'Certified sustainable office operations and practices',
      year: '2023',
      issuer: 'WWF Vietnam',
      scope: 'All office locations in Hanoi and Ho Chi Minh City',
      requirements: [
        'Energy efficiency measures implementation',
        'Waste reduction and recycling programs',
        'Sustainable procurement policies',
        'Employee engagement in sustainability',
      ],
      benefits: [
        'Reduced operational environmental footprint',
        'Cost savings through resource efficiency',
        'Enhanced brand reputation with eco-conscious partners',
      ],
    },
    {
      name: 'Carbon Neutral Operations',
      description: 'Offset program for operational carbon emissions',
      year: '2024',
      issuer: 'Gold Standard',
      scope: 'All office operations and business travel',
      validUntil: '2024',
      requirements: [
        'Annual carbon footprint assessment',
        'Investment in verified offset projects',
        'Continuous improvement in emission reduction',
      ],
      benefits: [
        'Supports clean energy projects in Vietnam',
        'Transparent reporting to partners and clients',
        'Leadership in tourism carbon neutrality',
      ],
    },
  ];

  const displayCertifications = certifications.length > 0 ? certifications : defaultCertifications;

  return (
    <section className="py-24 md:py-36 bg-background relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-accent/3 to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header - Centered, elegant */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-accent text-xs tracking-[0.3em] uppercase mb-6"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light leading-tight"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-foreground-secondary text-lg leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Certifications Grid - Clean, image-focused cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {displayCertifications.map((cert, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleCardClick(cert)}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-surface">
                {cert.logo?.url ? (
                  <Image
                    src={getImageUrl(cert.logo.url) || ''}
                    alt={cert.name || 'Certification'}
                    fill
                    className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-background">
                    <span className="font-serif text-7xl text-foreground/10 transition-all duration-500 group-hover:text-accent/20">
                      {cert.name?.charAt(0) || 'C'}
                    </span>
                  </div>
                )}
                
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />
              </div>

              {/* Content */}
              <div className="space-y-3 text-center">
                {/* Year - subtle */}
                {cert.year && (
                  <span className="text-xs tracking-[0.15em] uppercase text-foreground-secondary/70">
                    Since {cert.year}
                  </span>
                )}
                
                {/* Title */}
                {cert.name && (
                  <h3 className="font-serif text-xl text-foreground transition-colors duration-300 group-hover:text-accent">
                    {cert.name}
                  </h3>
                )}

                {/* Description */}
                {cert.description && (
                  <p className="text-foreground-secondary text-sm leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                )}

                {/* View Details - subtle link */}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-sm text-accent opacity-0 translate-y-2 
                                 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>Learn more</span>
                    <svg 
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Trust footer - minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 md:mt-28 text-center"
        >
          <p className="text-foreground-secondary/60 text-sm tracking-wide">
            All certifications independently verified and audited annually
          </p>
        </motion.div>
      </div>

      {/* Certification Modal */}
      <CertificationModal
        certification={selectedCert}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
