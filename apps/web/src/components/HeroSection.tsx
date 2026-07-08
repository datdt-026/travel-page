import Image from 'next/image';
import Link from 'next/link';
import { Media, SectionStyling } from '@/types';
import { mockImages } from '@/assets/mockImages';
import { getMediaImageUrl } from '@/lib/api';

interface HeroSectionProps {
  title: string;
  brandName?: string;
  subtitle?: string;
  image?: Media | string;
  video?: Media | string;
  videoPoster?: Media | string;
  mediaType?: 'image' | 'video';
  imageAlt?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  align?: 'left' | 'center' | 'right';
  overlay?: 'none' | 'light' | 'medium' | 'dark';
  showScrollIndicator?: boolean;
  children?: React.ReactNode;
  styling?: SectionStyling;
}

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';

function getImageUrl(image: Media | string | undefined): string | undefined {
  return getMediaImageUrl(image, ['hero']);
}

function getVideoUrl(video: Media | string | undefined): string | undefined {
  if (!video) return undefined;
  if (typeof video === 'string') return video;
  const url = video.url;
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${CMS_URL}${url}`;
}

export default function HeroSection({
  title,
  brandName,
  subtitle,
  image,
  video,
  videoPoster,
  mediaType = 'image',
  imageAlt,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  size = 'full',
  align = 'left',
  overlay = 'medium',
  showScrollIndicator = true,
  children,
  styling,
}: HeroSectionProps) {
  const imageUrl = getImageUrl(image) || mockImages.hero.src;
  const videoUrl = getVideoUrl(video);
  const posterUrl = getImageUrl(videoPoster);
  // Use CMS video if provided, otherwise fallback to env variable
  const heroVideoUrl = videoUrl || (mediaType !== 'image' ? undefined : process.env.NEXT_PUBLIC_HERO_VIDEO_URL) || `${CMS_URL}/media/homevideo1280x720.mp4`;
  const useVideo = mediaType === 'video' && !!heroVideoUrl;

  const sizeClasses = {
    sm: 'min-h-[50vh] py-24',
    md: 'min-h-[70vh] py-32',
    lg: 'min-h-[85vh] py-40',
    full: 'min-h-screen',
  };

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const overlayClasses = {
    none: '',
    light: 'hero-overlay-luxury',
    medium: 'hero-overlay-medium',
    dark: 'hero-overlay-dark',
  };

  return (
    <section className={`relative flex items-center ${sizeClasses[size]}`}>
      {/* Background Video (preferred) -> Image -> Fallback gradient */}
      {useVideo && heroVideoUrl ? (
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster={posterUrl}
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
          {overlay !== 'none' && <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />}
        </>
      ) : imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            className="object-cover hero-image"
            priority
            sizes="100vw"
            quality={90}
          />
          {overlay !== 'none' && <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" /> */}
        </>
      ) : (
        /* Fallback - Elegant dark gradient */
        <div className="absolute inset-0 bg-surface-dark">
          {/* Subtle gradient orbs */}
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-accent/3 rounded-full blur-3xl animate-float-delayed" />
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(28,28,28,0.5)_100%)]" />
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 container-luxury w-full flex flex-col ${alignClasses[align]} ${size === 'full' ? 'pt-24' : ''}`}>
        <div className={`max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
          
          {/* Accent line */}
          <div className="w-16 h-px bg-accent mb-8 opacity-0 animate-fade-in" />
          
          {/* Main heading */}
          <h1 className="text-content-inverse opacity-0 animate-fade-in-up font-serif font-semibold">
            <span className="tracking-tight">{title}</span>
            {brandName && (
              <>
                {' '}
                <span className="font-medium text-accent">{brandName}</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <div className="mt-8 opacity-0 animate-fade-in-up animation-delay-200">
              <p className="text-lg md:text-xl text-content-inverse/70 font-light leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          {(ctaText || secondaryCtaText) && (
            <div className={`mt-12 flex flex-wrap gap-6 opacity-0 animate-fade-in-up animation-delay-400 ${align === 'center' ? 'justify-center' : ''}`}>
              {ctaText && ctaHref && (
                <Link 
                  href={ctaHref} 
                  className="btn-accent group"
                >
                  <span>{ctaText}</span>
                  <svg 
                    className="w-4 h-4 ml-3 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
              {secondaryCtaText && secondaryCtaHref && (
                <Link 
                  href={secondaryCtaHref} 
                  className="btn-ghost-luxury"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          )}

          {children && (
            <div className="mt-12 opacity-0 animate-fade-in-up animation-delay-600">
              {children}
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        {/* {size === 'full' && showScrollIndicator && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-600">
            <div className="flex flex-col items-center gap-4">
              <span className="text-label-sm uppercase tracking-luxury text-accent/70">
                Discover
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent" />
            </div>
          </div>
        )} */}
      </div>
    </section>
  );
}
