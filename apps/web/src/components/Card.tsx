import Link from 'next/link';
import Image from 'next/image';
import { Media } from '@/types';
import { getMediaImageUrl } from '@/lib/api';

interface CardProps {
  title: string;
  href: string;
  excerpt?: string;
  image?: Media | string;
  imageAlt?: string;
  meta?: string;
  tags?: string[];
  className?: string;
  variant?: 'default' | 'horizontal' | 'featured' | 'editorial';
}

function getImageUrl(image: Media | string | undefined): string | undefined {
  return getMediaImageUrl(image, ['card']);
}

function getImageAlt(image: Media | string | undefined, fallback: string): string {
  if (!image || typeof image === 'string') return fallback;
  return image.alt || fallback;
}

export default function Card({
  title,
  href,
  excerpt,
  image,
  imageAlt,
  meta,
  tags,
  className = '',
  variant = 'default',
}: CardProps) {
  const imageUrl = getImageUrl(image);
  const alt = imageAlt || getImageAlt(image, title);

  // Horizontal variant - side by side layout
  if (variant === 'horizontal') {
    return (
      <Link
        href={href}
        className={`group flex bg-surface-primary transition-all duration-500 ease-elegant overflow-hidden hover:shadow-soft ${className}`}
      >
        <div className="w-48 h-36 flex-shrink-0 relative bg-surface-tertiary overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={alt}
              fill
              className="object-cover img-zoom"
              sizes="192px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-content-muted">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 p-6 flex flex-col justify-center">
          <h3 className="font-serif text-lg font-normal text-content-primary group-hover:text-accent transition-colors duration-300 line-clamp-1">
            {title}
          </h3>
          {excerpt && (
            <p className="text-content-muted text-sm mt-2 line-clamp-2 font-light">{excerpt}</p>
          )}
          {meta && (
            <span className="text-label-sm uppercase tracking-editorial text-content-light mt-3 block">{meta}</span>
          )}
        </div>
      </Link>
    );
  }

  // Featured variant - large with overlay text
  if (variant === 'featured') {
    return (
      <Link
        href={href}
        className={`group relative block overflow-hidden aspect-hero ${className}`}
      >
        <div className="absolute inset-0 bg-surface-tertiary">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={alt}
              fill
              className="object-cover img-zoom"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-content-muted">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 via-surface-dark/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-content-inverse">
          {tags && tags.length > 0 && (
            <div className="flex gap-3 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-label-sm uppercase tracking-editorial text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-serif text-2xl md:text-3xl font-normal text-content-inverse">
            {title}
          </h3>
          {excerpt && (
            <p className="text-content-inverse/70 text-sm mt-3 line-clamp-2 font-light max-w-lg">{excerpt}</p>
          )}
          {meta && (
            <span className="text-label-sm uppercase tracking-editorial text-content-inverse/50 mt-4 block">{meta}</span>
          )}
        </div>
      </Link>
    );
  }

  // Editorial variant - magazine style with image above text
  if (variant === 'editorial') {
    return (
      <Link
        href={href}
        className={`group block ${className}`}
      >
        <div className="aspect-portrait relative bg-surface-tertiary overflow-hidden mb-6">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={alt}
              fill
              className="object-cover img-zoom"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-content-muted">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-label-sm uppercase tracking-editorial text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-serif text-xl font-normal text-content-primary group-hover:text-accent transition-colors duration-300">
            {title}
          </h3>
          {excerpt && (
            <p className="text-content-muted text-sm mt-3 line-clamp-3 font-light">{excerpt}</p>
          )}
          {meta && (
            <span className="text-label-sm uppercase tracking-editorial text-content-light mt-4 block">{meta}</span>
          )}
        </div>
      </Link>
    );
  }

  // Default card variant - clean and minimal
  return (
    <Link
      href={href}
      className={`group block bg-surface-primary transition-all duration-500 ease-elegant overflow-hidden hover:shadow-soft ${className}`}
    >
      <div className="aspect-landscape relative bg-surface-tertiary overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover img-zoom"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-content-muted">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-label-sm uppercase tracking-editorial text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-serif text-lg font-normal text-content-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="text-content-muted text-sm mt-3 line-clamp-3 font-light">{excerpt}</p>
        )}
        {meta && (
          <span className="text-label-sm uppercase tracking-editorial text-content-light mt-4 block">{meta}</span>
        )}
      </div>
    </Link>
  );
}
