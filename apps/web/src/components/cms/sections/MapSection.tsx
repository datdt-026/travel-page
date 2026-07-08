'use client';

interface MapSectionProps {
  config: {
    enabled?: boolean;
    embedUrl?: string;
    height?: 'small' | 'medium' | 'large';
  };
}

export function MapSection({ config }: MapSectionProps) {
  if (!config?.enabled || !config.embedUrl) return null;

  const heightClasses = {
    small: 'h-[300px]',
    medium: 'h-[400px]',
    large: 'h-[500px]',
  };

  return (
    <section className={`${heightClasses[config.height || 'medium']} w-full`}>
      <iframe
        src={config.embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
      />
    </section>
  );
}

export default MapSection;
