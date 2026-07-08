'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * SupplierStandardsSection
 * 
 * An editorial, typography-driven component for presenting partner & supplier
 * selection criteria. Designed for institutional credibility—communicating
 * rigorous vetting standards without marketing hyperbole.
 * 
 * Design philosophy:
 * - Quiet confidence, not promotional claims
 * - Clean vertical rhythm with generous whitespace
 * - Criteria presented as operational standards, not checkboxes
 * - Rich text description rendered with editorial care
 * - Visual hierarchy through typography, not decoration
 * - Harmonizes with ResponsiblePracticesSection & MeasurableResultsSection
 */

interface SupplierCriterion {
  text?: string;
}

interface SupplierStandardsSectionProps {
  eyebrow?: string;
  title?: string;
  description?: React.ReactNode;
  criteria?: SupplierCriterion[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// Default criteria if none provided
const defaultCriteria: SupplierCriterion[] = [
  { text: 'Documented fair wage policies and worker welfare standards' },
  { text: 'Environmental management systems with measurable reduction targets' },
  { text: 'Local ownership or substantial community employment commitment' },
  { text: 'Third-party certifications (Travelife, Green Globe, or equivalent) preferred' },
  { text: 'Transparent pricing structures with no hidden commissions' },
  { text: 'Emergency response protocols and adequate insurance coverage' },
  { text: 'Commitment to continuous improvement through annual performance reviews' },
];

// Render rich text from Payload CMS
function RichTextRenderer({ content }: { content: unknown }) {
  if (!content || !Array.isArray(content)) return null;

  return (
    <div className="prose prose-lg max-w-none text-[#4A4A4A] font-light leading-[1.85]">
      {content.map((block: { type?: string; children?: { text?: string; bold?: boolean; italic?: boolean; underline?: boolean }[] }, index: number) => {
        if (block.type === 'paragraph' || !block.type) {
          return (
            <p key={index} className="mb-6 last:mb-0">
              {block.children?.map((child, childIndex: number) => {
                let element: React.ReactNode = child.text || '';
                if (child.bold) element = <strong key={childIndex} className="font-medium text-[#2C2C2C]">{element}</strong>;
                if (child.italic) element = <em key={childIndex}>{element}</em>;
                if (child.underline) element = <u key={childIndex}>{element}</u>;
                return element;
              })}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}

export function SupplierStandardsSection({
  eyebrow = 'Supply Chain',
  title = 'Partner & Supplier Standards',
  description,
  criteria = [],
}: SupplierStandardsSectionProps) {
  const displayCriteria = criteria.length > 0 ? criteria : defaultCriteria;

  return (
    <section className="relative py-24 md:py-32 lg:py-40 bg-white overflow-hidden">
      {/* Subtle decorative element — geometric line pattern */}
      <div 
        className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02] pointer-events-none"
        aria-hidden="true"
      >
        <svg 
          viewBox="0 0 400 800" 
          fill="none" 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Vertical lines pattern — architectural, not decorative */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={i}
              x1={i * 20 + 10}
              y1="0"
              x2={i * 20 + 10}
              y2="800"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-[#2C2C2C]"
            />
          ))}
        </svg>
      </div>

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-28">
          
          {/* Left Column — Header & Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 xl:col-span-4"
          >
            {/* Eyebrow */}
            {eyebrow && (
              <span className="block text-[#C4A35A] text-xs tracking-[0.3em] uppercase font-light mb-6">
                {eyebrow}
              </span>
            )}

            {/* Title — Large editorial serif */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-light text-[#2C2C2C] tracking-tight leading-[1.15] mb-8">
              {title}
            </h2>

            {/* Description — Rich editorial copy */}
            {description ? (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <RichTextRenderer content={description} />
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[#4A4A4A] text-lg font-light leading-[1.85]"
              >
                Every partner in our network meets documented standards for ethical operations, 
                environmental stewardship, and service quality. We audit annually and maintain 
                transparent records. These standards are non-negotiable—they define who we work with 
                and why.
              </motion.p>
            )}

            {/* Visual anchor — small decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block mt-12 origin-left"
            >
              <div className="w-16 h-px bg-[#C4A35A]/60" />
            </motion.div>
          </motion.div>

          {/* Right Column — Selection Criteria */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Section subheader */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10 pb-6 border-b border-[#E8E6E0]"
            >
              <span className="text-xs tracking-[0.2em] uppercase text-[#8A8A8A] font-light">
                Selection Criteria
              </span>
            </motion.div>

            {/* Criteria List — Clean, enumerated */}
            <motion.ol
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-0"
            >
              {displayCriteria.map((criterion, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="flex items-start gap-6 py-5 border-b border-[#F0EEE8] last:border-b-0 group-hover:bg-[#FAFAF8] transition-colors duration-300 -mx-4 px-4 lg:-mx-6 lg:px-6">
                    {/* Index number — typographic anchor */}
                    <span className="flex-shrink-0 font-mono text-sm text-[#C4A35A] pt-0.5 w-8">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    
                    {/* Criterion text */}
                    <span className="text-[#3A3A3A] text-base md:text-[1.0625rem] font-light leading-relaxed flex-1">
                      {criterion.text}
                    </span>

                    {/* Subtle checkmark on hover */}
                    <span className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#C4A35A]">
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={1.5}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M4.5 12.75l6 6 9-13.5" 
                        />
                      </svg>
                    </span>
                  </div>
                </motion.li>
              ))}
            </motion.ol>

            {/* Footer note — credibility reinforcement */}
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-12 pt-8 border-t border-[#E0DED8]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                {/* Verification badge */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F5F4F0] flex items-center justify-center">
                    <svg 
                      className="w-5 h-5 text-[#C4A35A]" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={1.5}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" 
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-[#2C2C2C]">
                      Independently Verified
                    </span>
                    <span className="block text-xs text-[#8A8A8A] font-light">
                      Annual third-party audits
                    </span>
                  </div>
                </div>

                {/* Separator */}
                <div className="hidden sm:block w-px h-10 bg-[#E8E6E0]" />

                {/* Stats snippet */}
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="font-serif text-2xl text-[#2C2C2C]">200+</span>
                    <span className="block text-xs text-[#8A8A8A] font-light mt-0.5">
                      Vetted Partners
                    </span>
                  </div>
                  <div>
                    <span className="font-serif text-2xl text-[#2C2C2C]">47</span>
                    <span className="block text-xs text-[#8A8A8A] font-light mt-0.5">
                      Point Assessment
                    </span>
                  </div>
                </div>
              </div>
            </motion.footer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupplierStandardsSection;
