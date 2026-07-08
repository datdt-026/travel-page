'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getMediaImageUrl } from '@/lib/api';

interface ServiceItem {
  image?: { url?: string } | string | null;
  icon?: string;
  title?: string;
  description?: string;
  features?: { text?: string }[];
}

interface ServicesSectionPremiumProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  services?: ServiceItem[];
  layout?: 'cards' | 'featured' | 'list';
  backgroundColor?: 'light' | 'dark';
}

function getImageUrl(image: { url?: string } | string | null | undefined): string | undefined {
  return getMediaImageUrl(image);
}

export function ServicesSectionPremium({
  eyebrow = 'What We Do',
  title = 'Comprehensive DMC Services',
  description,
  services = [],
  layout = 'cards',
  backgroundColor = 'light',
}: ServicesSectionPremiumProps) {
  const isDark = backgroundColor === 'dark';
  const bgClass = isDark ? 'bg-[#1C1C1C]' : 'bg-[#FAFAF8]';

  if (layout === 'featured') {
    // Featured layout with large first item
    const [featured, ...rest] = services;
    const featuredImageUrl = getImageUrl(featured?.image);

    return (
      <section className={`py-24 md:py-32 ${bgClass}`}>
        <div className="container-wide">
          {/* Header */}
          <div className="max-w-3xl mb-16 md:mb-24">
            {eyebrow && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block text-[#C4A35A] text-xs tracking-[0.3em] uppercase font-light mb-6"
              >
                {eyebrow}
              </motion.span>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight ${isDark ? 'text-white' : 'text-[#2C2C2C]'}`}
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`mt-6 text-lg font-light leading-relaxed ${isDark ? 'text-white/70' : 'text-[#666]'}`}
              >
                {description}
              </motion.p>
            )}
          </div>

          {/* Featured Item */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20"
            >
              <div className="relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden rounded-sm">
                {featuredImageUrl ? (
                  <Image
                    src={featuredImageUrl}
                    alt={featured.title || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-[#E5E5E5]'}`}>
                    <span className="text-8xl">{featured.icon || ''}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div>
                <span className="inline-block text-[#C4A35A] text-xs tracking-[0.3em] uppercase font-light mb-4">
                  Featured
                </span>
                <h3 className={`font-serif text-2xl md:text-3xl lg:text-4xl font-light mb-6 ${isDark ? 'text-white' : 'text-[#2C2C2C]'}`}>
                  {featured.title}
                </h3>
                <p className={`text-lg font-light leading-relaxed mb-8 ${isDark ? 'text-white/70' : 'text-[#666]'}`}>
                  {featured.description}
                </p>

                {featured.features && featured.features.length > 0 && (
                  <ul className="space-y-3">
                    {featured.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C4A35A]" />
                        <span className={isDark ? 'text-white/80' : 'text-[#555]'}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}

          {/* Rest of services */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((service, index) => {
              const imageUrl = getImageUrl(service.image);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group p-8 rounded-sm ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:shadow-xl'} transition-all duration-300`}
                >
                  {/* Image or Icon */}
                  <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-6 -mx-2 -mt-2">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={service.title || ''}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-[#F5F5F5]'}`}>
                        <span className="text-5xl">{service.icon || ''}</span>
                      </div>
                    )}
                  </div>

                  <h3 className={`font-serif text-xl font-light mb-3 ${isDark ? 'text-white' : 'text-[#2C2C2C]'}`}>
                    {service.title}
                  </h3>
                  <p className={`font-light leading-relaxed mb-6 ${isDark ? 'text-white/60' : 'text-[#666]'}`}>
                    {service.description}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <span className="w-1 h-1 rounded-full bg-[#C4A35A]" />
                          <span className={isDark ? 'text-white/70' : 'text-[#555]'}>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Default cards layout
  return (
    <section className={`py-24 md:py-32 ${bgClass}`}>
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block text-[#C4A35A] text-xs tracking-[0.3em] uppercase font-light mb-6"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight ${isDark ? 'text-white' : 'text-[#2C2C2C]'}`}
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`mt-6 text-lg font-light leading-relaxed ${isDark ? 'text-white/70' : 'text-[#666]'}`}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const imageUrl = getImageUrl(service.image);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-sm ${isDark ? 'bg-white/5' : 'bg-white shadow-sm'}`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={service.title || ''}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-[#F0F0F0]'}`}>
                      <span className="text-5xl">{service.icon || '✨'}</span>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  
                  {/* Title overlay on image */}
                  <div className="absolute inset-0 flex items-end p-6">
                    <h3 className="font-serif text-xl text-white font-light drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`font-serif text-lg font-light mb-2 group-hover:text-[#C4A35A] transition-colors ${isDark ? 'text-white' : 'text-[#2C2C2C]'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-white/60' : 'text-[#666]'}`}>
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSectionPremium;
