import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAttractionBySlug, getAttractionsByCity, getImageUrl, getAttractionDetailConfig } from '@/lib/api';
import { Attraction, AttractionDetailConfig, City, Country } from '@/types';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import { JsonLd, generateTouristAttractionSchema } from '@/lib/seo';
import RichText from '@/components/RichText';
import {
  NarrativeBlock,
  PracticalNotes,
  ExperienceGuide,
  RelatedPlaces,
} from '@/components/attractions';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * /ATTRACTIONS/[SLUG] — THE PLACE PROFILE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Design Philosophy: Quiet cultural travel editorial
 * 
 * Đây là trang để HIỂU một nơi, không phải trang "hướng dẫn đi nhanh".
 * 
 * Cảm giác khi vào:
 * "Mình đang được giới thiệu về một nơi,
 *  với sự trân trọng và bối cảnh."
 * 
 * Visual Language:
 * 1. Hero = bối cảnh, không phải cảnh đẹp
 * 2. Narrative > thông tin (chảy như field note)
 * 3. "How to experience" > "What it is"
 * 4. Practical notes = phụ, không dẫn
 * 
 * TUYỆT ĐỐI TRÁNH:
 * - Gallery ảnh
 * - Timeline lịch sử khô
 * - Icon "best time / duration"
 * - Bảng thông tin cứng
 */

interface PageProps {
  params: { locale: string; slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const attraction = (await getAttractionBySlug(params.slug, locale)) as Attraction | null;

  if (!attraction) {
    return { title: 'Place Not Found' };
  }

  const alternates = generateAlternateLanguages(`/${locale}/attractions/${params.slug}`);

  return {
    title: attraction.metaTitle || attraction.name,
    description: attraction.metaDescription || attraction.excerpt,
    keywords: attraction.metaKeywords,
    alternates,
    openGraph: {
      title: attraction.metaTitle || attraction.name,
      description: attraction.metaDescription || attraction.excerpt,
      images:
        attraction.featuredImage && typeof attraction.featuredImage === 'object'
          ? [getImageUrl(attraction.featuredImage.url) || '']
          : undefined,
    },
  };
}

export const revalidate = 60;

export default async function AttractionPage({ params }: PageProps) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  
  // Fetch attraction and config in parallel
  const [attraction, config] = await Promise.all([
    getAttractionBySlug(params.slug, locale) as Promise<Attraction | null>,
    getAttractionDetailConfig(locale) as Promise<AttractionDetailConfig | null>,
  ]);

  if (!attraction) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const hreflangLinks = generateHreflangLinks(`/${locale}/attractions/${params.slug}`);
  const localePath = (path: string) => `/${locale}${path}`;

  const city = attraction.city as City;
  const country = city?.country as Country;

  // Fetch related attractions from same city
  let relatedAttractions: Attraction[] = [];
  if (city) {
    const response = await getAttractionsByCity(city.id, { 
      limit: 4, 
      status: 'published',
      locale 
    });
    relatedAttractions = (response.docs as Attraction[])
      .filter(a => a.id !== attraction.id)
      .slice(0, 3);
  }

  // Build practical notes (small, not spotlight)
  const practicalNotes = buildPracticalNotes(attraction, dict);

  // Get hero image
  const heroImage = attraction.featuredImage && typeof attraction.featuredImage === 'object'
    ? getImageUrl(attraction.featuredImage.url)
    : null;

  return (
    <article className="attraction-profile bg-surface-primary">
      {hreflangLinks}
      <JsonLd data={generateTouristAttractionSchema(attraction)} />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO: Bối cảnh, không phải cảnh đẹp
          Hero mở ra cảm giác, không bán vé
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] -mt-20 md:-mt-24">
        {heroImage ? (
          <>
            <div className="absolute inset-0">
              <Image
                src={heroImage}
                alt={attraction.name}
                fill
                className="object-cover grayscale-[10%]"
                priority
                sizes="100vw"
              />
            </div>
            {/* Gradient overlays - top for header, bottom for content transition */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-primary via-surface-primary/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-surface-dark" />
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          INTRO: Breadcrumb nhẹ + Title + Context
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative -mt-32 md:-mt-40 pb-16 md:pb-24">
        <div className="container-editorial">
          {/* Subtle breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center gap-3 text-label-sm uppercase tracking-[0.15em]">
              <Link 
                href={localePath('/attractions')} 
                className="text-content-light hover:text-content-secondary transition-colors"
              >
                {dict.attractions?.title || 'Places'}
              </Link>
              {city && (
                <>
                  <span className="text-content-light/40">·</span>
                  <Link
                    href={localePath(`/cities/${city.slug}`)}
                    className="text-content-light hover:text-content-secondary transition-colors"
                  >
                    {city.name}
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Location context */}
          {city && (
            <span className="block text-label-sm uppercase tracking-[0.2em] text-content-light mb-6">
              {city.name}{country ? `, ${country.name}` : ''}
            </span>
          )}

          {/* Title - serif, calm */}
          <h1 className="font-serif text-display-md md:text-display-lg text-content-primary leading-[1.1] mb-8">
            {attraction.name}
          </h1>

          {/* Opening context - NOT a tagline */}
          {attraction.excerpt && (
            <p className="text-body-lg md:text-xl text-content-secondary max-w-2xl leading-relaxed">
              {attraction.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          NARRATIVE: Content chảy như field note
          Không trình bày kiểu factsheet hay bullet nhanh
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="container-editorial py-8 md:py-16">
        <div className="max-w-3xl">
          <NarrativeBlock>
            <RichText 
              content={attraction.description} 
              className="prose-editorial text-body-md md:text-body-lg text-content-secondary leading-[1.8]" 
            />
          </NarrativeBlock>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          EXPERIENCE GUIDE: "How to experience" > "What it is"
          Cách tiếp cận, cách trải nghiệm, nhịp tham quan
      ═══════════════════════════════════════════════════════════════════ */}
      {attraction.tips && attraction.tips.length > 0 && (
        <section className="bg-surface-secondary">
          <div className="container-editorial py-16 md:py-24">
            <ExperienceGuide
              title={dict.attractions?.howToExperience || 'How to experience this place'}
              approach={attraction.tips[0]?.tip}
              moments={attraction.tips.slice(1).map(t => t.tip)}
            />
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PRACTICAL NOTES: Nhỏ, đặt sau, không tranh spotlight
          Giờ mở cửa, thời điểm tốt - phụ, không dẫn
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="container-editorial py-16 md:py-24">
        <div className="max-w-3xl">
          <PracticalNotes
            notes={practicalNotes}
            title={dict.attractions?.practicalNotes || 'Practical notes'}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          RELATED PLACES: Contextually connected, không phải "similar"
      ═══════════════════════════════════════════════════════════════════ */}
      {relatedAttractions.length > 0 && (
        <section className="container-editorial pb-24 md:pb-40">
          <RelatedPlaces
            places={relatedAttractions.map(a => ({
              href: localePath(`/attractions/${a.slug}`),
              title: a.name,
              location: city?.name,
              image: a.featuredImage && typeof a.featuredImage === 'object'
                ? getImageUrl(a.featuredImage.url)
                : undefined,
            }))}
            title={dict.attractions?.alsoInRegion || 'Also in this region'}
            context={city ? `Other places worth understanding in ${city.name}.` : undefined}
          />
        </section>
      )}
    </article>
  );
}

// Helper: Build practical notes array
function buildPracticalNotes(
  attraction: Attraction, 
  dict: { attractions?: { openingHours?: string; ticketPrice?: string; visitDuration?: string }; common?: { address?: string; free?: string } }
): { label: string; value: string }[] {
  const notes: { label: string; value: string }[] = [];

  if (attraction.openingHours) {
    notes.push({
      label: dict.attractions?.openingHours || 'Hours',
      value: attraction.openingHours,
    });
  }

  if (attraction.ticketPrice) {
    const priceValue = attraction.ticketPrice.adult === 0
      ? dict.common?.free || 'Free admission'
      : `${attraction.ticketPrice.currency || 'USD'} ${attraction.ticketPrice.adult}`;
    notes.push({
      label: dict.attractions?.ticketPrice || 'Admission',
      value: priceValue,
    });
  }

  if (attraction.visitDuration) {
    notes.push({
      label: dict.attractions?.visitDuration || 'Suggested time',
      value: attraction.visitDuration,
    });
  }

  if (attraction.address) {
    notes.push({
      label: dict.common?.address || 'Address',
      value: attraction.address,
    });
  }

  return notes;
}
