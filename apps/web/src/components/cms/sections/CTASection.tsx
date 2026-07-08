'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';

interface CTASectionProps {
  config: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    backgroundImage?: { url?: string } | string;
  };
}

export function CTASection({ config }: CTASectionProps) {
  if (!config?.enabled) return null;

  const bgImageUrl = config.backgroundImage && typeof config.backgroundImage === 'object'
    ? getImageUrl(config.backgroundImage.url)
    : typeof config.backgroundImage === 'string'
      ? config.backgroundImage
      : null;

  return (
    <section className="relative py-24 md:py-32">
      {/* Background */}
      {bgImageUrl ? (
        <>
          <Image
            src={bgImageUrl}
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      ) : (
        <div className="absolute inset-0 bg-surface-dark" />
      )}

      {/* Content */}
      <div className="container-main relative z-10 text-center">
        {config.title && (
          <h2 className="font-serif text-heading-xl text-content-inverse mb-6 max-w-3xl mx-auto">
            {config.title}
          </h2>
        )}
        {config.subtitle && (
          <p className="text-body-lg text-content-inverse/80 mb-10 max-w-2xl mx-auto">
            {config.subtitle}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {config.primaryButtonText && config.primaryButtonLink && (
            <Link 
              href={config.primaryButtonLink}
              className="btn-primary"
            >
              {config.primaryButtonText}
            </Link>
          )}
          {config.secondaryButtonText && config.secondaryButtonLink && (
            <Link 
              href={config.secondaryButtonLink}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-content-inverse hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-label-lg uppercase tracking-wider"
            >
              {config.secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default CTASection;
