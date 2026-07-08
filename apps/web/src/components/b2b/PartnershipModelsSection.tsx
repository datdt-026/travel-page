'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Feature {
  text?: string;
}

interface PartnershipModel {
  icon?: string;
  title?: string;
  description?: string;
  features?: Feature[];
  idealFor?: string;
}

interface PartnershipModelsSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  models?: PartnershipModel[];
}

export function PartnershipModelsSection({
  eyebrow = 'How We Work Together',
  title = 'Partnership Models',
  description,
  models = [],
}: PartnershipModelsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-surface">
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
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-foreground-secondary"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {models.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-background rounded-xl p-6 md:p-8 border border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              {model.icon && (
                <div className="text-4xl mb-4">{model.icon}</div>
              )}

              {/* Title */}
              {model.title && (
                <h3 className="font-serif text-2xl text-foreground mb-3 group-hover:text-accent transition-colors">
                  {model.title}
                </h3>
              )}

              {/* Description */}
              {model.description && (
                <p className="text-foreground-secondary text-sm mb-6 leading-relaxed">
                  {model.description}
                </p>
              )}

              {/* Features List */}
              {model.features && model.features.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {model.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm text-foreground-secondary">
                      <span className="text-accent mt-0.5">✓</span>
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Ideal For */}
              {model.idealFor && (
                <div className="pt-4 border-t border-border">
                  <p className="text-xs uppercase tracking-wider text-foreground-secondary mb-1">
                    Ideal For
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    {model.idealFor}
                  </p>
                </div>
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent-hover transition-colors"
          >
            Discuss Partnership Options
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
