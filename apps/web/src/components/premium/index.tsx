'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';

interface PremiumHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  alignment?: 'left' | 'center';
  height?: 'medium' | 'large' | 'full';
  showScrollIndicator?: boolean;
  cta?: {
    label: string;
    href: string;
  };
  breadcrumb?: {
    homeLabel: string;
    currentLabel: string;
    homeHref?: string;
  };
  overlay?: 'light' | 'medium' | 'dark';
}

export function PremiumHero({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  alignment = 'left',
  height = 'large',
  showScrollIndicator = true,
  cta,
  breadcrumb,
  overlay = 'medium',
}: PremiumHeroProps) {
  const heightClasses = {
    medium: 'min-h-[70vh]',
    large: 'min-h-[85vh]',
    full: 'min-h-screen',
  };

  const overlayClasses = {
    light: 'bg-black/30',
    medium: 'bg-gradient-to-r from-black/70 via-black/50 to-black/30',
    dark: 'bg-black/60',
  };

  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
  };

  return (
    <section className={`relative ${heightClasses[height]} flex items-end`}>
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <Image
            src={getImageUrl(backgroundImage) || backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C1C] via-[#2a2a2a] to-[#1C1C1C]" />
        )}
        <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Accent line */}
        <div className="absolute left-0 top-1/3 w-24 h-px bg-gradient-to-r from-[#C4A35A] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative w-full px-6 md:px-10 lg:px-16 pb-20 md:pb-28 pt-32">
        <div className={`flex flex-col ${alignmentClasses[alignment]} max-w-5xl ${alignment === 'center' ? 'mx-auto' : ''}`}>
          
          {/* Breadcrumb */}
          {breadcrumb && (
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <Link href={breadcrumb.homeHref || '/'} className="text-[12px] tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors">
                {breadcrumb.homeLabel}
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-[12px] tracking-[0.15em] uppercase text-white/90">
                {breadcrumb.currentLabel}
              </span>
            </motion.nav>
          )}

          {/* Eyebrow */}
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[11px] tracking-[0.3em] uppercase text-[#C4A35A] mb-6 font-light"
            >
              {eyebrow}
            </motion.span>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-light text-white tracking-tight leading-[1.1]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-white/70 mt-6 max-w-2xl font-light leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA */}
          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10"
            >
              <Link
                href={cta.href}
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-[12px] tracking-[0.2em] uppercase hover:bg-white hover:text-[#1C1C1C] transition-all duration-500"
              >
                {cta.label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Stats Banner Component
interface StatItem {
  value: string;
  label: string;
}

interface StatsBannerProps {
  stats: StatItem[];
  variant?: 'dark' | 'light' | 'accent';
}

export function StatsBanner({ stats, variant = 'dark' }: StatsBannerProps) {
  const bgClasses = {
    dark: 'bg-[#1C1C1C]',
    light: 'bg-[#f8f7f5]',
    accent: 'bg-[#C4A35A]',
  };

  const textClasses = {
    dark: { value: 'text-white', label: 'text-white/50' },
    light: { value: 'text-[#1C1C1C]', label: 'text-[#888]' },
    accent: { value: 'text-white', label: 'text-white/70' },
  };

  return (
    <section className={`${bgClasses[variant]} py-16 md:py-20`}>
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`text-center ${idx > 0 ? 'md:border-l md:border-white/10' : ''}`}
            >
              <div className={`text-4xl md:text-5xl font-light tracking-tight mb-2 ${textClasses[variant].value}`}>
                {stat.value}
              </div>
              <div className={`text-[11px] tracking-[0.2em] uppercase ${textClasses[variant].label}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured Grid Section
interface GridItem {
  title: string;
  description?: string;
  image?: string;
  href: string;
  category?: string;
}

interface FeaturedGridProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: GridItem[];
  columns?: 2 | 3 | 4;
  variant?: 'cards' | 'minimal';
  cta?: {
    label: string;
    href: string;
  };
}

export function FeaturedGrid({
  eyebrow,
  title,
  subtitle,
  items,
  columns = 3,
  variant = 'cards',
  cta,
}: FeaturedGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="w-full px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] tracking-[0.3em] uppercase text-[#C4A35A] mb-4 block"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1C1C1C] tracking-tight"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#666] mt-4 font-light"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Grid */}
        <div className={`grid ${gridCols[columns]} gap-6 md:gap-8`}>
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Link href={item.href} className="group block">
                {/* Image */}
                <div className="relative aspect-[4/3] mb-5 overflow-hidden bg-[#f5f5f5]">
                  {item.image ? (
                    <Image
                      src={getImageUrl(item.image) || item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#e5e5e5] to-[#f5f5f5]" />
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div>
                  {item.category && (
                    <span className="text-[11px] tracking-[0.2em] uppercase text-[#C4A35A] mb-2 block">
                      {item.category}
                    </span>
                  )}
                  <h3 className="text-lg font-normal text-[#1C1C1C] group-hover:text-[#C4A35A] transition-colors duration-300">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-[14px] text-[#888] mt-2 font-light line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              href={cta.href}
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#1C1C1C] text-[#1C1C1C] text-[12px] tracking-[0.2em] uppercase hover:bg-[#1C1C1C] hover:text-white transition-all duration-500"
            >
              {cta.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Content Section with Image
interface ContentSectionProps {
  eyebrow?: string;
  title: string;
  content: string | React.ReactNode;
  image?: string;
  imagePosition?: 'left' | 'right';
  variant?: 'default' | 'dark';
  cta?: {
    label: string;
    href: string;
  };
}

export function ContentSection({
  eyebrow,
  title,
  content,
  image,
  imagePosition = 'right',
  variant = 'default',
  cta,
}: ContentSectionProps) {
  const bgClass = variant === 'dark' ? 'bg-[#1C1C1C]' : 'bg-[#f8f7f5]';
  const textClass = variant === 'dark' ? 'text-white' : 'text-[#1C1C1C]';
  const mutedClass = variant === 'dark' ? 'text-white/60' : 'text-[#666]';

  return (
    <section className={`py-20 md:py-32 ${bgClass}`}>
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${imagePosition === 'left' ? 'lg:grid-flow-dense' : ''}`}>
          {/* Content */}
          <div className={imagePosition === 'left' ? 'lg:col-start-2' : ''}>
            {eyebrow && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] tracking-[0.3em] uppercase text-[#C4A35A] mb-4 block"
              >
                {eyebrow}
              </motion.span>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-3xl md:text-4xl font-light ${textClass} tracking-tight mb-6`}
            >
              {title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-lg ${mutedClass} font-light leading-relaxed`}
            >
              {typeof content === 'string' ? <p>{content}</p> : content}
            </motion.div>

            {cta && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                <Link
                  href={cta.href}
                  className={`inline-flex items-center gap-2 text-[13px] tracking-[0.1em] uppercase ${textClass} hover:text-[#C4A35A] transition-colors`}
                >
                  {cta.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative aspect-[4/3] ${imagePosition === 'left' ? 'lg:col-start-1' : ''}`}
          >
            {image ? (
              <Image
                src={getImageUrl(image) || image}
                alt={title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#e5e5e5] to-[#d5d5d5]" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Values/Features Grid
interface ValueItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

interface ValuesGridProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: ValueItem[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'dark' | 'bordered';
}

export function ValuesGrid({
  eyebrow,
  title,
  subtitle,
  items,
  columns = 3,
  variant = 'default',
}: ValuesGridProps) {
  const bgClass = variant === 'dark' ? 'bg-[#1C1C1C]' : 'bg-white';
  const textClass = variant === 'dark' ? 'text-white' : 'text-[#1C1C1C]';
  const mutedClass = variant === 'dark' ? 'text-white/60' : 'text-[#666]';

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className={`py-20 md:py-32 ${bgClass}`}>
      <div className="w-full px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] tracking-[0.3em] uppercase text-[#C4A35A] mb-4 block"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl lg:text-5xl font-light ${textClass} tracking-tight`}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-lg ${mutedClass} mt-4 font-light`}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Grid */}
        <div className={`grid ${gridCols[columns]} gap-8 md:gap-12`}>
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`${variant === 'bordered' ? 'p-8 border border-[#e5e5e5]' : ''}`}
            >
              {item.icon && (
                <div className="w-12 h-12 flex items-center justify-center text-[#C4A35A] mb-5">
                  {item.icon}
                </div>
              )}
              <h3 className={`text-lg font-normal ${textClass} mb-3`}>
                {item.title}
              </h3>
              <p className={`text-[15px] ${mutedClass} font-light leading-relaxed`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Banner
interface CTABannerProps {
  title: string;
  subtitle?: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  variant?: 'dark' | 'accent' | 'image';
  backgroundImage?: string;
}

export function CTABanner({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  variant = 'dark',
  backgroundImage,
}: CTABannerProps) {
  const bgClass = variant === 'accent' ? 'bg-[#C4A35A]' : 'bg-[#1C1C1C]';

  return (
    <section className={`relative py-20 md:py-28 ${variant !== 'image' ? bgClass : ''}`}>
      {/* Background Image */}
      {variant === 'image' && backgroundImage && (
        <>
          <Image
            src={getImageUrl(backgroundImage) || backgroundImage}
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}

      <div className="relative w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/70 mt-4 font-light"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link
              href={primaryCta.href}
              className="px-8 py-4 bg-white text-[#1C1C1C] text-[12px] tracking-[0.2em] uppercase hover:bg-white/90 transition-colors"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="px-8 py-4 border border-white/40 text-white text-[12px] tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
              >
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
