'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Stat {
  value?: string;
  label?: string;
  description?: string;
}

interface CapacityStatsConfig {
  enabled?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  stats?: Stat[];
}

interface CapacityStatsSectionProps {
  config: CapacityStatsConfig;
}

export function CapacityStatsSection({ config }: CapacityStatsSectionProps) {
  if (!config.enabled) return null;

  // Default stats
  const defaultStats: Stat[] = [
    { value: '10,000+', label: 'Passengers Annually', description: 'FIT and group travelers served' },
    { value: '500+', label: 'Groups Per Year', description: 'Successfully operated' },
    { value: '50+', label: 'Active Partners', description: 'Worldwide' },
    { value: '6', label: 'Destinations', description: 'Across Southeast Asia' },
  ];

  const stats = config.stats?.length ? config.stats : defaultStats;

  return (
    <section className="py-16 md:py-24 bg-background">
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
            {config.title || 'Our Capacity'}
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

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-surface rounded-xl border border-border"
            >
              {/* Value */}
              {stat.value && (
                <div className="font-serif text-4xl md:text-5xl text-accent mb-2">
                  {stat.value}
                </div>
              )}

              {/* Label */}
              {stat.label && (
                <h3 className="text-lg font-medium text-foreground mb-1">
                  {stat.label}
                </h3>
              )}

              {/* Description */}
              {stat.description && (
                <p className="text-foreground-secondary text-sm">
                  {stat.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
