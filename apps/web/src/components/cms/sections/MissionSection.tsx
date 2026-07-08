'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
import RichText from '@/components/RichText';

interface MissionSectionProps {
  config: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    content?: unknown[] | string; // RichText content or plain text
    image?: { url?: string; alt?: string } | string;
    imagePosition?: 'left' | 'right';
    backgroundColor?: 'primary' | 'secondary';
  };
}

export function MissionSection({ config }: MissionSectionProps) {
  if (!config?.enabled) return null;

  const imageUrl = config.image && typeof config.image === 'object' 
    ? getImageUrl(config.image.url)
    : typeof config.image === 'string' 
      ? config.image 
      : null;

  const isImageLeft = config.imagePosition === 'left';
  const bgClass = config.backgroundColor === 'secondary' ? 'bg-surface-secondary' : 'bg-surface-primary';

  // Handle both RichText array and plain string content
  const renderContent = () => {
    if (!config.content) return null;
    
    if (typeof config.content === 'string') {
      return (
        <div className="prose prose-luxury max-w-none">
          <p className="text-body-lg text-content-secondary leading-relaxed">
            {config.content}
          </p>
        </div>
      );
    }
    
    if (Array.isArray(config.content) && config.content.length > 0) {
      return (
        <div className="prose prose-luxury max-w-none">
          <RichText content={config.content as Parameters<typeof RichText>[0]['content']} />
        </div>
      );
    }
    
    return null;
  };

  return (
    <section className={`section-lg ${bgClass}`}>
      <div className="container-wide">
        <div className={`grid ${imageUrl ? 'md:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'} gap-12 lg:gap-20 items-center`}>
          {/* Image */}
          {imageUrl && (
            <div className={`relative aspect-[4/3] ${isImageLeft ? 'order-1' : 'order-2'}`}>
              <Image
                src={imageUrl}
                alt={typeof config.image === 'object' ? config.image.alt || config.title || '' : config.title || ''}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className={`${imageUrl ? (isImageLeft ? 'order-2' : 'order-1') : 'text-center'}`}>
            {config.eyebrow && (
              <span className="text-label-md uppercase text-accent mb-4 block tracking-wider">
                {config.eyebrow}
              </span>
            )}
            
            {config.title && (
              <h2 className="font-serif text-heading-xl text-content-primary mb-6">
                {config.title}
              </h2>
            )}

            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
