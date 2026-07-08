'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Benefit {
  icon?: string;
  title?: string;
  description?: string;
}

interface Contact {
  title?: string;
  email?: string;
  phone?: string;
  responseTime?: string;
}

interface SidebarConfig {
  enabled?: boolean;
  title?: string;
  benefits?: Benefit[];
  contact?: Contact;
}

interface InquiryBenefitsProps {
  config: SidebarConfig;
}

// Premium icon components for benefits
const BenefitIcon = ({ index }: { index: number }) => {
  const icons = [
    // Quick Response - Clock/Speed
    <svg key="0" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    // Dedicated Support - User/Heart
    <svg key="1" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>,
    // Competitive Pricing - Tag/Percent
    <svg key="2" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
    </svg>,
    // Quality Guaranteed - Shield/Check
    <svg key="3" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
  ];
  return icons[index % icons.length];
};

export function InquiryBenefits({ config }: InquiryBenefitsProps) {
  return (
    <div className="space-y-6">
      {/* Benefits Card - Premium styling */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-[#E8E8E4]"
      >
        {config.title && (
          <div className="px-8 pt-8 pb-6 border-b border-[#E8E8E4]">
            <h3 className="text-sm tracking-[0.2em] uppercase text-[#A0A0A0] font-light">
              {config.title}
            </h3>
          </div>
        )}

        {config.benefits && config.benefits.length > 0 && (
          <ul className="divide-y divide-[#E8E8E4]">
            {config.benefits.map((benefit, index) => (
              <motion.li 
                key={index} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-5 p-6 group hover:bg-[#FAFAF8] transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C4A35A]/10 flex items-center justify-center text-[#C4A35A] group-hover:bg-[#C4A35A]/20 transition-colors">
                  <BenefitIcon index={index} />
                </div>
                <div className="flex-1 min-w-0">
                  {benefit.title && (
                    <h4 className="font-light text-[#2C2C2C] mb-1.5 tracking-wide text-sm">
                      {benefit.title}
                    </h4>
                  )}
                  {benefit.description && (
                    <p className="text-xs text-[#7A7A7A] font-light leading-relaxed">
                      {benefit.description}
                    </p>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>

      {/* Contact Card - Premium styling */}
      {config.contact && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-[#1C1C1C] overflow-hidden"
        >
          {/* Subtle gradient overlay */}
          <div className="relative p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C4A35A]/5 to-transparent pointer-events-none" />
            
            <div className="relative">
              {config.contact.title && (
                <h3 className="text-xs tracking-[0.2em] uppercase text-[#C4A35A] font-light mb-6">
                  {config.contact.title}
                </h3>
              )}

              <div className="space-y-4">
                {config.contact.email && (
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <svg
                        className="w-4 h-4 text-[#C4A35A]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-light">{config.contact.email}</span>
                  </a>
                )}

                {config.contact.phone && (
                  <a
                    href={`tel:${config.contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <svg
                        className="w-4 h-4 text-[#C4A35A]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-light">{config.contact.phone}</span>
                  </a>
                )}
              </div>

              {config.contact.responseTime && (
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#C4A35A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-white/50 font-light">{config.contact.responseTime}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Trust Badges - Premium */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="py-6 px-8 bg-[#F5F5F3] border border-[#E8E8E4]"
      >
        <div className="flex items-center justify-center gap-3">
          <svg
            className="w-4 h-4 text-[#C4A35A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span className="text-xs text-[#7A7A7A] font-light">Your information is secure & confidential</span>
        </div>
      </motion.div>
    </div>
  );
}
