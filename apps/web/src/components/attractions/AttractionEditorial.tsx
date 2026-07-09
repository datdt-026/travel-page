"use client";

import Link from "next/link";
import Image from "next/image";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ATTRACTION EDITORIAL COMPONENTS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Thiết kế: Quiet cultural travel editorial
 *
 * Attraction KHÔNG PHẢI POI,
 * mà là một nơi có bối cảnh – ý nghĩa – cách tiếp cận.
 *
 * Cảm giác:
 * - Tĩnh
 * - Có chiều sâu
 * - Tôn trọng nơi chốn
 * - Không "check-in", không gấp gáp
 *
 * GIỐNG: museum catalogue, cultural editorial
 * KHÔNG GIỐNG: directory, listicle, Google Maps POI
 *
 * TUYỆT ĐỐI TRÁNH:
 * - Grid đều nhau
 * - Card hover effects
 * - Icon loại hình (temple/mountain/beach)
 * - Rating, review, sao
 */

// ═══════════════════════════════════════════════════════════════════════════
// EDITORIAL PLACE CARD
// Mỗi attraction như object trong triển lãm - được nhìn chậm
// ═══════════════════════════════════════════════════════════════════════════

interface EditorialPlaceCardProps {
  href: string;
  image?: string;
  imageAlt?: string;
  title: string;
  /** Short contextual intro - NOT a description */
  context?: string;
  /** Location name */
  location?: string;
  /** Layout variant for varied grid */
  variant?: "default" | "featured" | "minimal";
}

export function EditorialPlaceCard({
  href,
  image,
  imageAlt,
  title,
  context,
  location,
  variant = "default",
}: EditorialPlaceCardProps) {
  const isFeatured = variant === "featured";
  const isMinimal = variant === "minimal";

  return (
    <Link href={href} className="group block">
      {/* Image - Trầm, tĩnh, ánh sáng tự nhiên */}
      <div
        className={`
        relative bg-surface-secondary overflow-hidden
        ${isFeatured ? "aspect-[4/5] md:aspect-[3/4]" : isMinimal ? "aspect-[4/3]" : "aspect-[5/6]"}
      `}
      >
        {image ? (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover transition-all duration-1000 ease-out grayscale-[15%] group-hover:grayscale-0"
            sizes={
              isFeatured
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
          />
        ) : (
          <div className="w-full h-full bg-surface-tertiary" />
        )}
      </div>

      {/* Content - Tối giản, khoảng trắng */}
      <div
        className={`
        ${isFeatured ? "mt-8 space-y-4" : "mt-6 space-y-3"}
      `}
      >
        {/* Location - nhỏ, nhẹ */}
        {location && (
          <span className="block text-label-sm uppercase tracking-[0.15em] text-content-light">
            {location}
          </span>
        )}

        {/* Title - serif, thanh lịch */}
        <h3
          className={`
          font-serif text-content-primary leading-tight
          ${isFeatured ? "text-heading-lg md:text-display-sm" : "text-heading-md"}
        `}
        >
          {title}
        </h3>

        {/* Context - Một câu bối cảnh, không phải mô tả */}
        {context && !isMinimal && (
          <p
            className={`
            text-content-muted leading-relaxed
            ${isFeatured ? "text-body-md" : "text-body-sm"}
          `}
          >
            {context}
          </p>
        )}
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CURATED GALLERY - Layout không đều, như triển lãm
// ═══════════════════════════════════════════════════════════════════════════

interface CuratedGalleryProps {
  children: React.ReactNode;
  /** Variation of the layout pattern */
  pattern?: "A" | "B" | "C";
}

export function CuratedGallery({
  children,
  pattern = "A",
}: CuratedGalleryProps) {
  return (
    <div className="curated-gallery" data-pattern={pattern}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PLACE SECTION HEADER - Editorial intro
// ═══════════════════════════════════════════════════════════════════════════

interface PlaceSectionHeaderProps {
  title?: string;
  context?: string;
  /** Optional editorial note */
  note?: string;
}

export function PlaceSectionHeader({
  title,
  context,
  note,
}: PlaceSectionHeaderProps) {
  return (
    <header className="max-w-2xl">
      {note && (
        <span className="block text-label-sm uppercase tracking-[0.2em] text-content-inverse/50 mb-6">
          {note}
        </span>
      )}

      {title && (
        <h1 className="font-serif text-display-md md:text-display-lg text-content-inverse mb-8 leading-[1.1]">
          {title}
        </h1>
      )}

      {context && (
        <p className="text-body-lg text-content-inverse/70 leading-relaxed">
          {context}
        </p>
      )}
    </header>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// NARRATIVE BLOCK - For detail page content
// ═══════════════════════════════════════════════════════════════════════════

interface NarrativeBlockProps {
  children: React.ReactNode;
  /** Optional subtle label */
  label?: string;
}

export function NarrativeBlock({ children, label }: NarrativeBlockProps) {
  return (
    <section className="narrative-block mb-16 md:mb-24">
      {label && (
        <span className="block text-label-sm uppercase tracking-[0.15em] text-content-light mb-6">
          {label}
        </span>
      )}
      <div className="prose-editorial">{children}</div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PRACTICAL NOTES - Thông tin thực tế, nhỏ, không spotlight
// ═══════════════════════════════════════════════════════════════════════════

interface PracticalNote {
  label: string;
  value: string;
}

interface PracticalNotesProps {
  notes: PracticalNote[];
  title?: string;
}

export function PracticalNotes({ notes, title }: PracticalNotesProps) {
  if (notes.length === 0) return null;

  return (
    <aside className="practical-notes pt-12 mt-16 border-t border-border-light">
      {title && (
        <span className="block text-label-sm uppercase tracking-[0.15em] text-content-light mb-8">
          {title}
        </span>
      )}
      <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
        {notes.map((note, index) => (
          <div key={index}>
            <dt className="text-label-xs uppercase tracking-[0.1em] text-content-light mb-1">
              {note.label}
            </dt>
            <dd className="text-body-sm text-content-secondary">
              {note.value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPERIENCE GUIDE - "How to experience" thay vì "What it is"
// ═══════════════════════════════════════════════════════════════════════════

interface ExperienceGuideProps {
  /** Narrative approach text */
  approach?: string;
  /** Suggested rhythm/pace */
  rhythm?: string;
  /** Best moments */
  moments?: string[];
  title?: string;
}

export function ExperienceGuide({
  approach,
  rhythm,
  moments,
  title,
}: ExperienceGuideProps) {
  if (!approach && !rhythm && (!moments || moments.length === 0)) return null;

  return (
    <section className="experience-guide py-16 md:py-24 my-16 md:my-24 bg-surface-secondary -mx-4 md:-mx-8 px-4 md:px-8">
      <div className="max-w-3xl">
        {title && (
          <span className="block text-label-sm uppercase tracking-[0.15em] text-content-light mb-8">
            {title}
          </span>
        )}

        {approach && (
          <p className="text-body-lg md:text-xl text-content-primary leading-relaxed mb-8 font-serif">
            {approach}
          </p>
        )}

        {rhythm && (
          <p className="text-body-md text-content-secondary leading-relaxed mb-8">
            {rhythm}
          </p>
        )}

        {moments && moments.length > 0 && (
          <div className="space-y-3 mt-12">
            {moments.map((moment, index) => (
              <p
                key={index}
                className="text-body-sm text-content-muted pl-6 border-l-2 border-border-medium"
              >
                {moment}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT IMAGE - Hero bối cảnh, không phải cảnh đẹp
// ═══════════════════════════════════════════════════════════════════════════

interface ContextImageProps {
  src: string;
  alt: string;
  /** Optional caption for context */
  caption?: string;
}

export function ContextImage({ src, alt, caption }: ContextImageProps) {
  return (
    <figure className="context-image -mx-4 md:-mx-8 lg:-mx-16 my-16 md:my-24">
      <div className="relative aspect-[21/9] md:aspect-[3/1] bg-surface-secondary">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover grayscale-[10%]"
          sizes="100vw"
          priority
        />
      </div>
      {caption && (
        <figcaption className="mt-4 px-4 md:px-8 lg:px-16 text-label-sm text-content-light">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// RELATED PLACES - Không phải "similar" mà là "contextually connected"
// ═══════════════════════════════════════════════════════════════════════════

interface RelatedPlace {
  href: string;
  title: string;
  location?: string;
  image?: string;
}

interface RelatedPlacesProps {
  places: RelatedPlace[];
  title?: string;
  context?: string;
}

export function RelatedPlaces({
  places,
  title = "Also in this region",
  context,
}: RelatedPlacesProps) {
  if (places.length === 0) return null;

  return (
    <section className="related-places pt-16 md:pt-24 mt-16 md:mt-24 border-t border-border-light">
      <div className="mb-12">
        <span className="block text-label-sm uppercase tracking-[0.15em] text-content-light mb-4">
          {title}
        </span>
        {context && (
          <p className="text-body-md text-content-muted max-w-lg">{context}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {places.map((place, index) => (
          <Link key={index} href={place.href} className="group block">
            {place.image && (
              <div className="relative aspect-[4/3] bg-surface-secondary mb-4 overflow-hidden">
                <Image
                  src={place.image}
                  alt={place.title}
                  fill
                  className="object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 via-black/35 to-transparent">
                  <span className="font-serif text-lg text-white leading-tight">
                    {place.title}
                  </span>
                  {place.location && (
                    <span className="block mt-1 text-[10px] uppercase tracking-[0.18em] text-white/70">
                      {place.location}
                    </span>
                  )}
                </div>
              </div>
            )}
            <h4
              className={`font-serif text-heading-sm text-content-primary ${place.image ? "sr-only" : ""}`}
            >
              {place.title}
            </h4>
            {place.location && (
              <span className="block mt-1 text-label-sm uppercase tracking-wider text-content-light">
                {place.location}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export default {
  EditorialPlaceCard,
  CuratedGallery,
  PlaceSectionHeader,
  NarrativeBlock,
  PracticalNotes,
  ExperienceGuide,
  ContextImage,
  RelatedPlaces,
};
