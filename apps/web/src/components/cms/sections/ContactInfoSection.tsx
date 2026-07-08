'use client';

import Link from 'next/link';

interface ContactInfoItem {
  icon?: string;
  label?: string;
  value?: string;
  description?: string;
  link?: string;
}

interface ContactInfoSectionProps {
  config: {
    sectionTitle?: string;
    email?: ContactInfoItem;
    phone?: ContactInfoItem;
    address?: ContactInfoItem & { mapLink?: string };
    hours?: ContactInfoItem;
  };
}

export function ContactInfoSection({ config }: ContactInfoSectionProps) {
  const items = [
    config.email?.value && {
      icon: config.email.icon || '✉️',
      label: config.email.label || 'Email Us',
      value: config.email.value,
      description: config.email.description,
      link: `mailto:${config.email.value}`,
    },
    config.phone?.value && {
      icon: config.phone.icon || '📞',
      label: config.phone.label || 'Call Us',
      value: config.phone.value,
      description: config.phone.description,
      link: `tel:${config.phone.value.replace(/\s/g, '')}`,
    },
    config.address?.value && {
      icon: config.address.icon || '📍',
      label: config.address.label || 'Visit Us',
      value: config.address.value,
      description: config.address.description,
      link: config.address.mapLink,
    },
    config.hours?.value && {
      icon: config.hours.icon || '🕐',
      label: config.hours.label || 'Business Hours',
      value: config.hours.value,
      description: config.hours.description,
    },
  ].filter(Boolean) as (ContactInfoItem & { link?: string })[];

  if (items.length === 0) return null;

  return (
    <div>
      {config.sectionTitle && (
        <h2 className="font-serif text-heading-lg text-content-primary mb-8">
          {config.sectionTitle}
        </h2>
      )}
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <div 
            key={index}
            className="flex items-start gap-6 p-6 bg-surface-secondary border border-border-light hover:border-accent transition-colors duration-300"
          >
            <div className="w-12 h-12 bg-surface-tertiary flex items-center justify-center flex-shrink-0">
              <span className="text-xl">{item.icon}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-label-md uppercase text-content-muted mb-1 tracking-wider">
                {item.label}
              </h3>
              {item.link ? (
                <Link
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-body-md text-content-primary hover:text-accent transition-colors duration-300 whitespace-pre-line"
                >
                  {item.value}
                </Link>
              ) : (
                <p className="text-body-md text-content-primary whitespace-pre-line">
                  {item.value}
                </p>
              )}
              {item.description && (
                <p className="text-body-sm text-content-muted mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactInfoSection;
