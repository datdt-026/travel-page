import Link from 'next/link';
import Image from 'next/image';
import { Media } from '@/types';
import { getMediaImageUrl } from '@/lib/api';

interface DestinationCardProps {
  title: string;
  href: string;
  image?: Media | string;
  imageAlt?: string;
  subtitle?: string;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function getImageUrl(image: Media | string | undefined): string | undefined {
  return getMediaImageUrl(image, ['card']);
}

function getImageAlt(image: Media | string | undefined, fallback: string): string {
  if (!image || typeof image === 'string') return fallback;
  return image.alt || fallback;
}

export default function DestinationCard({
  title,
  href,
  image,
  imageAlt,
  subtitle,
  icon,
  size = 'md',
  className = '',
}: DestinationCardProps) {
  const imageUrl = getImageUrl(image);
  const alt = imageAlt || getImageAlt(image, title);

  const sizeClasses = {
    sm: 'aspect-[4/3]',
    md: 'aspect-[4/5]',
    lg: 'aspect-[3/4]',
  };

  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden ${sizeClasses[size]} ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-gray-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover img-zoom"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {/* Icon/Logo */}
        {icon && (
          <div className="mb-4 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <Image
              src={icon}
              alt=""
              width={48}
              height={48}
              className="w-12 h-12 object-contain brightness-0 invert"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-white text-xl md:text-2xl font-light tracking-wide uppercase mb-2 transition-transform duration-500 group-hover:-translate-y-2">
          {title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-white/70 text-sm font-light mb-4 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            {subtitle}
          </p>
        )}

        {/* View More Link */}
        <div className="flex items-center gap-2 text-white/80 text-sm tracking-wider uppercase opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <span>View more</span>
          <svg 
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Subtle border on hover */}
      <div className="absolute inset-0 border border-white/0 transition-all duration-500 group-hover:border-white/20" />
    </Link>
  );
}
