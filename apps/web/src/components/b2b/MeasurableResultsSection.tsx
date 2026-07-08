"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * MeasurableResultsSection
 * 
 * Text-first, vertically stacked layout for presenting sustainability metrics.
 * Designed for institutional credibility—not marketing dashboards.
 * 
 * Design principles:
 * - Typography-driven hierarchy
 * - Generous vertical spacing
 * - No cards, grids, icons, or animated counters
 * - Optional "How this is measured" methodology for transparency
 * - Subtle background texture option (low contrast, non-competing)
 */

interface MeasurementMethod {
  text?: string;
}

interface MeasurableResult {
  number?: string;
  label?: string;
  description?: string;
  measurementMethod?: MeasurementMethod[];
}

interface MeasurableResultsSectionProps {
  eyebrow?: string;
  title?: string;
  year?: string;
  results?: MeasurableResult[];
  backgroundImage?: string;
}

export function MeasurableResultsSection({
  eyebrow = "Our Impact",
  title = "Measurable Results",
  year,
  results = [],
  backgroundImage,
}: MeasurableResultsSectionProps) {
  const defaultResults: MeasurableResult[] = [
    {
      number: "500+ tons",
      label: "Carbon Offset Annually",
      description: "Verified through Gold Standard certified projects since 2022",
      measurementMethod: [
        { text: "Calculated per-trip using DEFRA emission factors" },
        { text: "Third-party audited annually by SGS" },
      ],
    },
    {
      number: "15 communities",
      label: "Direct Tourism Revenue Recipients",
      description: "Receiving documented income through homestays, guiding, and artisan sales",
      measurementMethod: [
        { text: "Monthly payment records maintained per household" },
        { text: "Revenue tracked via local cooperative ledgers" },
      ],
    },
    {
      number: "80%",
      label: "Single-Use Plastic Reduction",
      description: "Across all managed operations since 2021 baseline",
      measurementMethod: [
        { text: "Quarterly waste audits at partner hotels" },
        { text: "Supplier compliance verified during annual reviews" },
      ],
    },
    {
      number: "200+",
      label: "Vetted Partners",
      description: "Meeting documented sustainability and labor criteria",
      measurementMethod: [
        { text: "47-point assessment applied at onboarding" },
        { text: "Re-evaluated annually with published scoring" },
      ],
    },
  ];

  const displayResults = results.length > 0 ? results : defaultResults;

  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-[#FAFAF8]">
      {/* Optional subtle background texture */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.03] grayscale pointer-events-none"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      {/* Subtle gradient overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.01) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <header className="max-w-3xl mb-16 md:mb-24">
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="block text-[#C4A35A] text-xs tracking-[0.3em] uppercase font-light mb-4"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-light text-[#2C2C2C] tracking-tight leading-tight"
          >
            {title}
            {year && (
              <span className="block mt-2 text-lg md:text-xl font-light text-[#6A6A6A]">
                {year} Report
              </span>
            )}
          </motion.h2>
        </header>

        {/* Results — Vertical Stack */}
        <div className="space-y-0">
          {displayResults.map((result, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group border-t border-[#E0DED8] py-12 md:py-16 lg:py-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                {/* Left column: Quantitative Value */}
                <div className="lg:col-span-4 xl:col-span-3">
                  <div className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-light text-[#2C2C2C] leading-none tracking-tight">
                    {result.number}
                  </div>
                </div>

                {/* Right column: Label, Description, Methodology */}
                <div className="lg:col-span-8 xl:col-span-9 lg:pt-2">
                  {/* Metric Title */}
                  {result.label && (
                    <h3 className="text-lg md:text-xl font-medium text-[#2C2C2C] mb-3 tracking-tight">
                      {result.label}
                    </h3>
                  )}

                  {/* Context Line */}
                  {result.description && (
                    <p className="text-base text-[#5A5A5A] font-light leading-relaxed mb-6 max-w-2xl">
                      {result.description}
                    </p>
                  )}

                  {/* How This Is Measured — Optional */}
                  {result.measurementMethod && result.measurementMethod.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-[#E8E6E0]">
                      <span className="block text-xs tracking-[0.15em] uppercase text-[#8A8A8A] font-light mb-3">
                        How this is measured
                      </span>
                      <ul className="space-y-2">
                        {result.measurementMethod.map((method, methodIndex) => (
                          <li 
                            key={methodIndex}
                            className="text-sm text-[#6A6A6A] font-light leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-[#B0AEA6]"
                          >
                            {method.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom border for visual closure */}
        <div className="border-t border-[#E0DED8]" aria-hidden="true" />
      </div>
    </section>
  );
}
