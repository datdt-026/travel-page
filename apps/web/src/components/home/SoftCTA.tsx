'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
import { SectionStyling } from '@/types';
import { defaultLocale } from '@/i18n';

interface SoftCTAProps {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  locale?: string;
  styling?: SectionStyling;
}

export default function SoftCTA({
  title = "Bắt đầu hành trình của bạn",
  subtitle = "Cùng tạo nên một trải nghiệm thật khác biệt",
  description = "Dù bạn đang tìm kiếm một kỳ nghỉ chuyển hóa hay một chuyến phiêu lưu được thiết kế tỉ mỉ, chúng tôi luôn sẵn sàng lắng nghe, thấu hiểu và tạo nên hành trình phù hợp với bạn.",
  backgroundImage,
  primaryCta = { text: "Bắt đầu trao đổi", href: "/contact" },
  secondaryCta = { text: "Khám phá điểm đến", href: "/destinations" },
  locale = defaultLocale,
  styling
}: SoftCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const bgImageUrl = backgroundImage ? getImageUrl(backgroundImage) : undefined;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
      style={{ backgroundColor: styling?.sectionBackground || 'var(--surface-secondary)' }}
    >
      {/* Background image if provided */}
      {bgImageUrl && (
        <div className="absolute inset-0">
          <Image
            src={bgImageUrl}
            alt=""
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: styling?.sectionBackground ? `${styling.sectionBackground}CC` : 'rgba(var(--surface-secondary-rgb), 0.8)' }}
          />
        </div>
      )}

      {/* Subtle decorative lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 left-1/4 w-px h-full opacity-50"
          style={{ 
            background: `linear-gradient(to bottom, ${styling?.cardBorderColor || 'var(--border-light)'}, ${styling?.cardBorderColor ? `${styling.cardBorderColor}4D` : 'rgba(var(--border-light-rgb), 0.3)'}, transparent)` 
          }}
        />
        <div 
          className="absolute top-0 right-1/4 w-px h-full opacity-50"
          style={{ 
            background: `linear-gradient(to bottom, transparent, ${styling?.cardBorderColor ? `${styling.cardBorderColor}4D` : 'rgba(var(--border-light-rgb), 0.3)'}, ${styling?.cardBorderColor || 'var(--border-light)'})` 
          }}
        />
      </div>

      <div className="container-narrow relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Subtitle */}
          <div 
            className={`transition-all duration-1000 ease-elegant ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span 
              className="text-label-md uppercase tracking-luxury text-content-muted mb-6 block"
              style={styling?.subtitleColor ? { color: styling.subtitleColor } : undefined}
            >
              {subtitle}
            </span>
          </div>

          {/* Title */}
          <div 
            className={`transition-all duration-1000 delay-150 ease-elegant ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 
              className="font-serif text-display-md text-content-primary tracking-tight mb-8"
              style={styling?.titleColor ? { color: styling.titleColor } : undefined}
            >
              {title}
            </h2>
          </div>

          {/* Description */}
          <div 
            className={`transition-all duration-1000 delay-300 ease-elegant ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p 
              className="text-body-lg text-content-secondary leading-relaxed mb-12 max-w-xl mx-auto"
              style={styling?.textColor ? { color: styling.textColor } : undefined}
            >
              {description}
            </p>
          </div>

          {/* CTAs - Soft, inviting */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 delay-500 ease-elegant ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link 
              href={`/${locale}${primaryCta.href}`}
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-editorial transition-all duration-500 hover:opacity-90"
              style={{
                backgroundColor: styling?.buttonBackground || 'var(--surface-dark)',
                color: styling?.buttonTextColor || 'var(--content-inverse)',
              }}
            >
              <span>{primaryCta.text}</span>
              <svg 
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <Link 
              href={`/${locale}${secondaryCta.href}`}
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-editorial transition-colors duration-300 border hover:opacity-80"
              style={{
                color: styling?.textColor || 'var(--content-secondary)',
                borderColor: styling?.accentColor || 'var(--border)',
              }}
            >
              <span>{secondaryCta.text}</span>
            </Link>
          </div>

          {/* Decorative accent */}
          <div 
            className={`mt-16 flex justify-center transition-all duration-1000 delay-700 ease-elegant ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          >
            <div 
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: styling?.accentColor || 'var(--accent)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
