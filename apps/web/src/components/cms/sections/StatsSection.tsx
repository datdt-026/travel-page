'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';

interface StatItem {
  number: string;
  label: string;
}

interface StatsSectionProps {
  config: {
    enabled?: boolean;
    items?: StatItem[];
    backgroundColor?: 'light' | 'dark' | 'accent';
    backgroundImage?: { url?: string } | string;
  };
}

function AnimatedNumber({ target, duration = 2000 }: { target: string; duration?: number }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            // Parse the target - extract number and suffix
            const match = target.match(/^(\d+)(.*)$/);
            if (!match) {
              setDisplay(target);
              return;
            }
            
            const endValue = parseInt(match[1], 10);
            const suffix = match[2];
            const startTime = Date.now();
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const current = Math.floor(easeOutQuart * endValue);
              
              setDisplay(`${current}${suffix}`);
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{display}</span>;
}

export function StatsSection({ config }: StatsSectionProps) {
  if (!config?.enabled || !config.items?.length) return null;

  const bgClasses = {
    light: 'bg-surface-secondary',
    dark: 'bg-surface-dark',
    accent: 'bg-accent',
  };

  const bgImageUrl = config.backgroundImage && typeof config.backgroundImage === 'object'
    ? getImageUrl(config.backgroundImage.url)
    : typeof config.backgroundImage === 'string'
      ? config.backgroundImage
      : null;

  const isDarkBg = config.backgroundColor === 'dark' || config.backgroundColor === 'accent' || bgImageUrl;

  // Use fixed grid classes - Tailwind can't compile dynamic classes
  const getGridCols = (itemCount: number) => {
    if (itemCount <= 2) return 'grid-cols-2';
    if (itemCount === 3) return 'grid-cols-2 md:grid-cols-3';
    return 'grid-cols-2 md:grid-cols-4';
  };

  return (
    <section className={`relative py-16 md:py-20 ${!bgImageUrl ? bgClasses[config.backgroundColor || 'dark'] : ''}`}>
      {/* Background Image */}
      {bgImageUrl && (
        <>
          <Image
            src={bgImageUrl}
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}
      <div className="container-wide relative z-10">
        <div className={`grid ${getGridCols(config.items.length)} gap-8 md:gap-12`}>
          {config.items.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`font-serif text-4xl md:text-5xl lg:text-display-md mb-2 ${isDarkBg ? 'text-content-inverse' : 'text-content-primary'}`}>
                <AnimatedNumber target={stat.number} />
              </div>
              <div className={`text-label-md uppercase tracking-wider ${isDarkBg ? 'text-content-inverse/70' : 'text-content-muted'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
