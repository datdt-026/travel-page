'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Benefit {
  icon?: string;
  title?: string;
  description?: string;
}

interface ValuePropositionSectionProps {
  eyebrow?: string;
  title?: string;
  description?: unknown[];
  benefits?: Benefit[];
}

export function ValuePropositionSection({
  eyebrow = 'Why Partner With Us',
  title = 'Your Success Is Our Mission',
  benefits = [],
}: ValuePropositionSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
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
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground"
          >
            {title}
          </motion.h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-surface rounded-lg p-6 md:p-8 border border-border hover:border-accent/30 transition-all duration-300"
            >
              {benefit.icon && (
                <div className="text-4xl mb-4">{benefit.icon}</div>
              )}
              {benefit.title && (
                <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
                  {benefit.title}
                </h3>
              )}
              {benefit.description && (
                <p className="text-foreground-secondary text-sm leading-relaxed">
                  {benefit.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
