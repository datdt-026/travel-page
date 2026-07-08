'use client';

import Link from 'next/link';

interface ContactCTASectionProps {
  config: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundColor?: 'light' | 'dark' | 'accent';
  };
}

export function ContactCTASection({ config }: ContactCTASectionProps) {
  if (!config?.enabled) return null;

  const bgClasses = {
    light: 'bg-surface-secondary',
    dark: 'bg-surface-dark',
    accent: 'bg-accent',
  };

  const isDarkBg = config.backgroundColor === 'dark' || config.backgroundColor === 'accent';

  return (
    <section className={`py-16 md:py-20 ${bgClasses[config.backgroundColor || 'light']}`}>
      <div className="container-main text-center">
        {config.title && (
          <h2 className={`font-serif text-heading-lg mb-4 ${isDarkBg ? 'text-content-inverse' : 'text-content-primary'}`}>
            {config.title}
          </h2>
        )}
        {config.subtitle && (
          <p className={`text-body-lg mb-8 max-w-2xl mx-auto ${isDarkBg ? 'text-content-inverse/80' : 'text-content-muted'}`}>
            {config.subtitle}
          </p>
        )}
        {config.buttonText && config.buttonLink && (
          <Link 
            href={config.buttonLink}
            className={isDarkBg ? 'btn-secondary-light' : 'btn-primary'}
          >
            {config.buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}

export default ContactCTASection;
