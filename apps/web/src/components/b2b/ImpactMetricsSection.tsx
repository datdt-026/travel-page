'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Metric {
  value?: string;
  label?: string;
  description?: string;
  icon?: string;
}

interface ImpactMetricsSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  metrics?: Metric[];
}

export function ImpactMetricsSection({
  eyebrow = 'Our Impact',
  title = 'Measurable Results',
  description,
  metrics = [],
}: ImpactMetricsSectionProps) {
  // Default metrics
  const defaultMetrics: Metric[] = [
    { value: '15+', label: 'Communities Supported', description: 'Local villages directly benefiting from our programs', icon: '🏘️' },
    { value: '200+', label: 'Local Artisans', description: 'Traditional craftspeople supported through fair trade', icon: '🎨' },
    { value: '$250K', label: 'Community Investment', description: 'Annual contribution to local development projects', icon: '💰' },
    { value: '100K+', label: 'Plastic Bottles Saved', description: 'Through our reusable bottle program', icon: '🌊' },
    { value: '95%', label: 'Local Employment', description: 'Of our team are local hires', icon: '👥' },
    { value: '12', label: 'NGO Partnerships', description: 'Conservation and community organizations we support', icon: '🤝' },
  ];

  const displayMetrics = metrics.length > 0 ? metrics : defaultMetrics;

  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
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
            className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-background/80"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-background/5 backdrop-blur-sm rounded-xl border border-background/10"
            >
              {/* Icon */}
              {metric.icon && (
                <div className="text-4xl mb-4">{metric.icon}</div>
              )}

              {/* Value */}
              {metric.value && (
                <div className="font-serif text-4xl md:text-5xl text-accent mb-2">
                  {metric.value}
                </div>
              )}

              {/* Label */}
              {metric.label && (
                <h3 className="text-lg font-medium mb-1">{metric.label}</h3>
              )}

              {/* Description */}
              {metric.description && (
                <p className="text-background/60 text-sm">{metric.description}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-background/60 text-sm"
        >
          Data as of December 2024. We publish our full sustainability report annually.
        </motion.p>
      </div>
    </section>
  );
}
