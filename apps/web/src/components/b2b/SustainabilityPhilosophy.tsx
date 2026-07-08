'use client';

import React from 'react';
import { motion } from 'framer-motion';
import RichText from '@/components/RichText';

interface SustainabilityPhilosophyProps {
  eyebrow?: string;
  title?: string;
  content?: unknown[];
  quote?: string;
  quoteAuthor?: string;
}

export function SustainabilityPhilosophy({
  eyebrow = 'Our Philosophy',
  title = 'Sustainable Travel, Meaningful Impact',
  content,
  quote,
  quoteAuthor,
}: SustainabilityPhilosophyProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div>
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
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6"
            >
              {title}
            </motion.h2>
            
            {content ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="prose prose-lg text-foreground-secondary"
              >
                <RichText content={content as Parameters<typeof RichText>[0]['content']} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="space-y-4 text-foreground-secondary"
              >
                <p>
                  We believe that travel should create positive impact—for the communities we visit, 
                  the environments we explore, and the travelers who experience them.
                </p>
                <p>
                  Our approach to sustainability goes beyond carbon offsets and eco-labels. 
                  We&apos;re committed to building genuine partnerships with local communities, 
                  preserving cultural heritage, and ensuring that tourism benefits those who call 
                  our destinations home.
                </p>
                <p>
                  Every itinerary we design considers its environmental footprint, cultural sensitivity, 
                  and economic impact on local communities. This isn&apos;t just good ethics—it&apos;s 
                  what creates truly meaningful travel experiences.
                </p>
              </motion.div>
            )}
          </div>

          {/* Right Column - Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface rounded-xl p-8 md:p-12 border border-border"
          >
            <svg
              className="w-12 h-12 text-accent/30 mb-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-6">
              {quote || "True luxury in travel isn't about opulence—it's about experiences that leave the world a little better than we found it."}
            </blockquote>
            <p className="text-foreground-secondary">
              — {quoteAuthor || "Voyager Sustainability Commitment"}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
