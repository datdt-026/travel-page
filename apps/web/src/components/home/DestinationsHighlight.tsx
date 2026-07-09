"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Country, SectionStyling } from "@/types";
import { defaultLocale } from "@/i18n";
import { getMediaImageUrl } from "@/lib/api";

interface DestinationsHighlightProps {
  destinations: Country[];
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  locale?: string;
  limit?: number;
  styling?: SectionStyling;
}

function getImageUrl(image: any): string | null {
  return getMediaImageUrl(image, ["large"]) || null;
}

export default function DestinationsHighlight({
  destinations,
  title = "Điểm đến chọn lọc",
  subtitle = "Những vùng đất đặc biệt, được tuyển chọn kỹ lưỡng",
  ctaText = "Khám phá tất cả",
  ctaHref = "/destinations",
  locale = defaultLocale,
  limit = 4,
  styling,
}: DestinationsHighlightProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: "-50px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Take only first N destinations for the editorial grid (based on limit prop)
  const featuredDestinations = destinations.slice(0, limit);

  if (featuredDestinations.length === 0) return null;

  // Build inline styles from styling prop
  const sectionStyle: React.CSSProperties = {};
  if (styling?.sectionBackground) {
    sectionStyle.backgroundColor = styling.sectionBackground;
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-surface-secondary overflow-hidden"
      style={sectionStyle}
    >
      <div className="container-wide">
        {/* Section Header - Minimal, centered */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ease-elegant ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span
            className="inline-block text-xs uppercase tracking-[0.2em] text-content-muted mb-4"
            style={
              styling?.subtitleColor
                ? { color: styling.subtitleColor }
                : undefined
            }
          >
            {subtitle}
          </span>
          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-content-primary tracking-tight mb-8"
            style={
              styling?.titleColor ? { color: styling.titleColor } : undefined
            }
          >
            {title}
          </h2>
          <div
            className="w-12 h-px bg-accent/40 mx-auto"
            style={
              styling?.accentColor
                ? { backgroundColor: styling.accentColor }
                : undefined
            }
          />
        </div>

        {/* Editorial Bento Grid - Magazine style layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {featuredDestinations.map((destination, index) => {
            const imageUrl = getImageUrl(destination.featuredImage);
            const destinationName =
              destination.name?.trim() || destination.slug || "Destination";

            // Build card styles
            const cardStyle: React.CSSProperties = {};
            if (styling?.cardBackground) {
              cardStyle.backgroundColor = styling.cardBackground;
            }
            if (styling?.cardBorderColor) {
              cardStyle.borderColor = styling.cardBorderColor;
              cardStyle.borderWidth = "1px";
              cardStyle.borderStyle = "solid";
            }

            // Layout configuration that repeats every 6 items for scalable grid
            // Pattern: Large (8) + Tall (4) | Medium (5) + Wide (7) | Wide (7) + Medium (5)
            const layoutPatterns = [
              // Row 1: Large hero + Tall sidebar
              {
                colSpan: "col-span-12 md:col-span-8",
                aspectRatio: "aspect-[16/10]",
              },
              {
                colSpan: "col-span-12 md:col-span-4",
                aspectRatio: "aspect-[3/4] md:aspect-[3/4]",
              },
              // Row 2: Medium + Wide
              {
                colSpan: "col-span-12 md:col-span-5",
                aspectRatio: "aspect-[4/3]",
              },
              {
                colSpan: "col-span-12 md:col-span-7",
                aspectRatio: "aspect-[16/9]",
              },
              // Row 3: Wide + Medium (reversed pattern)
              {
                colSpan: "col-span-12 md:col-span-7",
                aspectRatio: "aspect-[16/9]",
              },
              {
                colSpan: "col-span-12 md:col-span-5",
                aspectRatio: "aspect-[4/3]",
              },
            ];

            // Use modulo to repeat layout pattern for any number of items
            const config = layoutPatterns[index % layoutPatterns.length];

            return (
              <Link
                key={destination.id}
                href={`/${locale}/destinations/${destination.slug}`}
                className={`group relative block overflow-hidden rounded-sm transition-all duration-1000 ease-elegant ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                } ${config.colSpan}`}
                style={{
                  transitionDelay: `${(index + 1) * 150}ms`,
                  ...cardStyle,
                }}
              >
                {/* Image Container */}
                <div
                  className={`relative overflow-hidden ${config.aspectRatio}`}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={destinationName}
                      fill
                      className="object-cover transition-transform duration-[1.2s] ease-elegant group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-surface-tertiary" />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                    {/* Location tag */}
                    {destination.excerpt && (
                      <span
                        className="inline-block text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/70 mb-2 md:mb-3"
                        style={
                          styling?.cardTextColor
                            ? { color: styling.cardTextColor }
                            : undefined
                        }
                      >
                        {destination.excerpt.length > 40
                          ? `${destination.excerpt.substring(0, 40)}...`
                          : destination.excerpt}
                      </span>
                    )}

                    {/* Destination name is revealed with the CTA on hover. */}
                    <h3 className="sr-only">{destinationName}</h3>

                    {/* Hover reveal title + arrow */}
                    <div className="mt-3 md:mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      <span
                        className="block font-serif text-xl md:text-2xl lg:text-3xl text-white tracking-wide leading-tight mb-3"
                        style={
                          styling?.cardTitleColor
                            ? { color: styling.cardTitleColor }
                            : undefined
                        }
                      >
                        {destinationName}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-[0.15em] text-white/80">
                          Discover
                        </span>
                        <svg
                          className="w-4 h-4 text-white/80 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle border on hover */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-500 rounded-sm pointer-events-none" />
              </Link>
            );
          })}
        </div>

        {/* View All CTA */}
        <div
          className={`text-center mt-16 md:mt-20 transition-all duration-1000 ease-elegant ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <Link
            href={`/${locale}${ctaHref}`}
            className="group inline-flex items-center gap-3 px-8 py-4 border border-content-primary/20 hover:border-content-primary/40 text-sm uppercase tracking-[0.15em] text-content-secondary hover:text-content-primary transition-all duration-500"
            style={{
              ...(styling?.buttonBackground
                ? {
                    backgroundColor: styling.buttonBackground,
                    borderColor: styling.buttonBackground,
                  }
                : {}),
              ...(styling?.buttonTextColor
                ? { color: styling.buttonTextColor }
                : {}),
            }}
          >
            <span>{ctaText}</span>
            <svg
              className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
