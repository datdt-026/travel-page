'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';

interface Download {
  title?: string;
  description?: string;
  file?: { url?: string } | null;
  requiresContact?: boolean;
}

interface Certification {
  logo?: { url?: string } | null;
  name?: string;
}

interface CredentialsDownloadSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  downloads?: Download[];
  certifications?: Certification[];
}

export function CredentialsDownloadSection({
  eyebrow = 'Due Diligence',
  title = 'Our Credentials',
  description = 'Download our company credentials, certifications, and business documentation.',
  downloads = [],
  certifications = [],
}: CredentialsDownloadSectionProps) {
  // Default downloads if none provided
  const defaultDownloads: Download[] = [
    {
      title: 'Company Profile',
      description: 'Overview of our services, capabilities, and team',
      file: null,
      requiresContact: false,
    },
    {
      title: 'Business License',
      description: 'Official business registration and tourism license',
      file: null,
      requiresContact: false,
    },
    {
      title: 'Insurance Certificate',
      description: 'Professional liability and travel insurance coverage',
      file: null,
      requiresContact: true,
    },
    {
      title: 'Rate Card',
      description: 'Seasonal rates and pricing structure',
      file: null,
      requiresContact: true,
    },
  ];

  const displayDownloads = downloads.length > 0 ? downloads : defaultDownloads;

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Downloads */}
          <div>
            {/* Section Header */}
            {eyebrow && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-accent text-sm uppercase tracking-widest font-medium mb-4 block"
              >
                {eyebrow}
              </motion.span>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl text-foreground mb-4"
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-foreground-secondary mb-8"
              >
                {description}
              </motion.p>
            )}

            {/* Downloads List */}
            <div className="space-y-4">
              {displayDownloads.map((download, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-accent/30 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
                        {download.title}
                      </h4>
                      {download.description && (
                        <p className="text-sm text-foreground-secondary">
                          {download.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {download.file?.url ? (
                    <a
                      href={getImageUrl(download.file.url) || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-accent hover:bg-accent/10 rounded-full transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </a>
                  ) : download.requiresContact ? (
                    <span className="text-sm text-foreground-secondary">
                      Contact for access
                    </span>
                  ) : (
                    <span className="text-sm text-foreground-secondary">
                      Coming soon
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background rounded-xl p-8 border border-border"
            >
              <h3 className="font-serif text-2xl text-foreground mb-6">
                Certifications & Memberships
              </h3>

              {certifications.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center"
                    >
                      {cert.logo?.url ? (
                        <div className="relative w-20 h-20 mb-3">
                          <Image
                            src={getImageUrl(cert.logo.url) || ''}
                            alt={cert.name || 'Certification'}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-surface rounded-lg flex items-center justify-center mb-3">
                          <svg
                            className="w-10 h-10 text-accent"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                          </svg>
                        </div>
                      )}
                      {cert.name && (
                        <span className="text-sm text-foreground-secondary">
                          {cert.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                // Default certifications
                <div className="grid grid-cols-2 gap-6">
                  {[
                    'Licensed Tour Operator',
                    'PATA Member',
                    'Travelife Certified',
                    'ISO 9001:2015',
                  ].map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-foreground-secondary"
                    >
                      <svg
                        className="w-6 h-6 text-accent flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-accent/5 rounded-xl p-6 border border-accent/20"
            >
              <h4 className="font-medium text-foreground mb-2">
                Need Additional Documentation?
              </h4>
              <p className="text-sm text-foreground-secondary mb-4">
                Contact our partnership team for specific documents or custom requirements.
              </p>
              <a
                href="mailto:partners@voyager.travel"
                className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:underline"
              >
                partners@voyager.travel
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
