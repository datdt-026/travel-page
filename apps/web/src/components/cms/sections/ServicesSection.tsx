'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Service {
  icon?: string;
  title?: string;
  description?: string;
  features?: string[] | { text?: string }[];
}

interface ServicesConfig {
  enabled?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  services?: Service[];
}

interface ServicesSectionProps {
  config: ServicesConfig;
}

// Helper to normalize features
function normalizeFeatures(features: string[] | { text?: string }[] | undefined): string[] {
  if (!features) return [];
  return features.map((f) => (typeof f === 'string' ? f : f.text || ''));
}

export function ServicesSection({ config }: ServicesSectionProps) {
  if (!config.enabled) return null;

  // Default services
  const defaultServices: Service[] = [
    {
      icon: '🎯',
      title: 'FIT & Tailor-Made',
      description: 'Fully customized individual travel experiences with personal attention to every detail.',
      features: ['Custom itineraries', 'Private guides', 'Flexible modifications', 'VIP services'],
    },
    {
      icon: '👥',
      title: 'Group Tours',
      description: 'Expertly managed group programs from small parties to large series operations.',
      features: ['Series programs', 'Educational groups', 'Religious tours', 'Special interest'],
    },
    {
      icon: '🏢',
      title: 'MICE & Corporate',
      description: 'Professional event management and corporate travel solutions.',
      features: ['Incentive programs', 'Conferences', 'Team building', 'Gala events'],
    },
    {
      icon: '✨',
      title: 'Luxury Travel',
      description: 'Exclusive experiences and premium services for discerning travelers.',
      features: ['Luxury accommodations', 'Private transfers', 'Exclusive access', 'Concierge service'],
    },
    {
      icon: '🚢',
      title: 'Cruise & Shore',
      description: 'Shore excursion programs for cruise lines and individual cruise passengers.',
      features: ['Port logistics', 'Shore excursions', 'Meet & greet', 'Time-optimized tours'],
    },
    {
      icon: '🌿',
      title: 'Sustainable Travel',
      description: 'Responsible tourism programs that benefit local communities.',
      features: ['Community visits', 'Eco-lodges', 'Conservation activities', 'Cultural exchange'],
    },
  ];

  const services = config.services?.length ? config.services : defaultServices;

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          {config.eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent text-sm uppercase tracking-widest font-medium mb-4 block"
            >
              {config.eyebrow}
            </motion.span>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            {config.title || 'Our Services'}
          </motion.h2>
          {config.description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-foreground-secondary"
            >
              {config.description}
            </motion.p>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-background rounded-xl p-6 md:p-8 border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              {service.icon && (
                <div className="text-4xl mb-4">{service.icon}</div>
              )}

              {/* Title */}
              {service.title && (
                <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
              )}

              {/* Description */}
              {service.description && (
                <p className="text-foreground-secondary text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
              )}

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <ul className="space-y-1">
                  {normalizeFeatures(service.features).map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm text-foreground-secondary"
                    >
                      <span className="w-1 h-1 bg-accent rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/partners/inquiry"
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent rounded-full font-medium hover:bg-accent hover:text-white transition-colors"
          >
            Discuss Your Requirements
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
