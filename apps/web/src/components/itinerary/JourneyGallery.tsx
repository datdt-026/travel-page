'use client';

import Image from 'next/image';
import { getMediaImageUrl } from '@/lib/api';
import { Media } from '@/types';

/**
 * Journey Gallery Component
 * 
 * Editorial-style image gallery for visual storytelling.
 * 
 * DESIGN PRINCIPLES:
 * - Magazine-quality layouts
 * - Varied image sizes for visual interest
 * - Subtle captions
 * - Generous spacing
 */

interface GalleryImage {
  image: Media | string;
  caption?: string;
  featured?: boolean;
}

interface JourneyGalleryProps {
  title?: string;
  images: GalleryImage[];
  layout?: 'editorial' | 'masonry' | 'horizontal' | 'staggered';
  spacing?: 'tight' | 'comfortable' | 'generous';
  className?: string;
}

const spacingClasses: Record<string, string> = {
  tight: 'gap-2',
  comfortable: 'gap-4 md:gap-6',
  generous: 'gap-6 md:gap-10',
};

export default function JourneyGallery({
  title,
  images,
  layout = 'editorial',
  spacing = 'comfortable',
  className = '',
}: JourneyGalleryProps) {
  if (!images || images.length === 0) return null;

  const getImageUrl2 = (img: Media | string): string | undefined => {
    return getMediaImageUrl(img);
  };

  const getImageAlt = (img: Media | string, index: number): string => {
    if (typeof img === 'object') return img.alt || `Gallery image ${index + 1}`;
    return `Gallery image ${index + 1}`;
  };

  // Editorial Grid Layout
  if (layout === 'editorial') {
    return (
      <section className={`${className}`}>
        {title && (
          <div className="max-w-3xl mx-auto px-6 mb-10">
            <h3 className="text-2xl font-light text-neutral-900">{title}</h3>
          </div>
        )}
        
        <div className={`grid grid-cols-2 md:grid-cols-3 ${spacingClasses[spacing]} max-w-6xl mx-auto px-6`}>
          {images.map((item, index) => {
            const imageUrl = getImageUrl2(item.image);
            if (!imageUrl) return null;
            
            const isFeatured = item.featured || index === 0;
            
            return (
              <div
                key={index}
                className={`relative overflow-hidden group ${
                  isFeatured ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <div className={`relative ${isFeatured ? 'aspect-[4/3]' : 'aspect-square'}`}>
                  <Image
                    src={imageUrl}
                    alt={getImageAlt(item.image, index)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes={isFeatured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
                  />
                </div>
                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm text-white font-light">{item.caption}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Horizontal Scroll Layout
  if (layout === 'horizontal') {
    return (
      <section className={`${className}`}>
        {title && (
          <div className="max-w-3xl mx-auto px-6 mb-10">
            <h3 className="text-2xl font-light text-neutral-900">{title}</h3>
          </div>
        )}
        
        <div className="overflow-x-auto scrollbar-hide">
          <div className={`flex ${spacingClasses[spacing]} px-6 pb-4`}>
            {images.map((item, index) => {
              const imageUrl = getImageUrl2(item.image);
              if (!imageUrl) return null;
              
              const isFeatured = item.featured;
              
              return (
                <div
                  key={index}
                  className={`flex-shrink-0 relative overflow-hidden group ${
                    isFeatured ? 'w-[70vw] max-w-2xl' : 'w-[50vw] max-w-md'
                  }`}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={imageUrl}
                      alt={getImageAlt(item.image, index)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 70vw, 40vw"
                    />
                  </div>
                  {item.caption && (
                    <p className="mt-3 text-sm text-neutral-500 font-light">{item.caption}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Staggered Layout
  if (layout === 'staggered') {
    return (
      <section className={`${className}`}>
        {title && (
          <div className="max-w-3xl mx-auto px-6 mb-10">
            <h3 className="text-2xl font-light text-neutral-900">{title}</h3>
          </div>
        )}
        
        <div className="max-w-5xl mx-auto px-6">
          <div className={`grid grid-cols-12 ${spacingClasses[spacing]}`}>
            {images.map((item, index) => {
              const imageUrl = getImageUrl2(item.image);
              if (!imageUrl) return null;
              
              // Staggered pattern: alternate between different spans
              const patterns = [
                'col-span-12 md:col-span-8 md:col-start-1',
                'col-span-12 md:col-span-6 md:col-start-6',
                'col-span-12 md:col-span-7 md:col-start-2',
                'col-span-12 md:col-span-8 md:col-start-4',
              ];
              const pattern = patterns[index % patterns.length];
              
              return (
                <div key={index} className={`relative overflow-hidden group ${pattern}`}>
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={imageUrl}
                      alt={getImageAlt(item.image, index)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>
                  {item.caption && (
                    <p className="mt-4 text-sm text-neutral-500 font-light">{item.caption}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Masonry Layout
  return (
    <section className={`${className}`}>
      {title && (
        <div className="max-w-3xl mx-auto px-6 mb-10">
          <h3 className="text-2xl font-light text-neutral-900">{title}</h3>
        </div>
      )}
      
      <div className={`columns-2 md:columns-3 ${spacingClasses[spacing]} max-w-6xl mx-auto px-6`}>
        {images.map((item, index) => {
          const imageUrl = getImageUrl2(item.image);
          if (!imageUrl) return null;
          
          return (
            <div key={index} className="break-inside-avoid mb-4 md:mb-6 overflow-hidden group">
              <div className="relative">
                <Image
                  src={imageUrl}
                  alt={getImageAlt(item.image, index)}
                  width={600}
                  height={item.featured ? 800 : 400}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              {item.caption && (
                <p className="mt-3 text-sm text-neutral-500 font-light">{item.caption}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
