import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getItineraryBySlug, getItineraries, getItineraryDetailConfig, getImageUrl } from '@/lib/api';
import { 
  ItineraryHero, 
  ItineraryDetailTabs,
  JourneySummary
} from '@/components/itinerary';
import { Itinerary, ItineraryDetailConfig, Media } from '@/types';
import { defaultLocale } from '@/i18n';

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  const itinerary = (await getItineraryBySlug(slug, locale)) as Itinerary | null;

  if (!itinerary) {
    return {
      title: 'Itinerary Not Found',
    };
  }

  const imageUrl = typeof itinerary.featuredImage === 'object' 
    ? getImageUrl((itinerary.featuredImage as Media).url) 
    : undefined;

  return {
    title: itinerary.metaTitle || itinerary.title,
    description: itinerary.metaDescription || itinerary.excerpt,
    keywords: itinerary.metaKeywords,
    openGraph: {
      title: itinerary.metaTitle || itinerary.title,
      description: itinerary.metaDescription || itinerary.excerpt,
      images: imageUrl ? [imageUrl] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: itinerary.metaTitle || itinerary.title,
      description: itinerary.metaDescription || itinerary.excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `/${locale}/itineraries/${slug}`,
      languages: {
        en: `/en/itineraries/${slug}`,
        vi: `/vi/itineraries/${slug}`,
        fr: `/fr/itineraries/${slug}`,
        de: `/de/itineraries/${slug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const response = await getItineraries({ locale: defaultLocale, limit: 100 });
  const itineraries = (response?.docs || []) as Itinerary[];
  return itineraries.map((itinerary) => ({
    slug: itinerary.slug,
  }));
}

// Helper to get image URL
function getFeaturedImageUrl(image: Media | string | undefined): string | undefined {
  if (!image) return undefined;
  if (typeof image === 'string') return undefined;
  return getImageUrl(image.url);
}

export default async function ItineraryDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  const [itinerary, config, relatedResponse] = await Promise.all([
    getItineraryBySlug(slug, locale) as Promise<Itinerary | null>,
    getItineraryDetailConfig(locale) as Promise<ItineraryDetailConfig | null>,
    getItineraries({ locale, limit: 10 }),
  ]);

  const relatedItineraries = (relatedResponse?.docs || []) as Itinerary[];

  if (!itinerary) {
    return notFound();
  }

  // Determine presentation mode (type-safe access)
  const presentationMode = 
    itinerary.presentationMode || 
    config?.defaultPresentationMode || 
    'editorial';
  
  const isEditorialMode = presentationMode === 'editorial';
  const editorialSections = itinerary.editorialSections || [];
  const hasEditorialSections = editorialSections.length > 0;

  // Extract config with defaults
  const heroConfig = config?.hero || {};
  const sectionsConfig = config?.sections || {};
  const sidebarConfig = config?.sidebar || {};
  const labelsConfig = config?.labels || {};

  // ═══════════════════════════════════════════════════════════════════
  // EDITORIAL MODE RENDERING
  // ═══════════════════════════════════════════════════════════════════
  if (isEditorialMode && hasEditorialSections) {
    return (
      <main className="min-h-screen bg-white">
        {/* Editorial Hero */}
        <ItineraryHero
          title={itinerary.title}
          subtitle={itinerary.excerpt}
          featuredImage={itinerary.featuredImage}
          duration={itinerary.duration}
          difficulty={itinerary.difficulty}
          travelStyles={itinerary.travelStyle}
          locale={locale}
          heroHeight={heroConfig.height === 'full' ? 'full' : heroConfig.height === 'medium' ? 'medium' : 'large'}
          overlayStyle={heroConfig.overlayStyle === 'heavy' ? 'medium' : heroConfig.overlayStyle === 'gradient' ? 'gradient' : 'medium'}
          showBreadcrumb={heroConfig.showBreadcrumb !== false}
          showDuration={heroConfig.showDuration !== false}
          showDifficulty={heroConfig.showDifficulty !== false}
          contentPosition={heroConfig.contentPosition?.includes('center') ? 'bottom-center' : 'bottom-left'}
        />

        {/* Journey Summary - Soft Schedule Orientation */}
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
          <JourneySummary
            duration={itinerary.duration}
            cities={itinerary.cities}
            difficulty={itinerary.difficulty}
            chapterCount={editorialSections.filter((s: any) => s.blockType === 'chapter').length}
          />
        </div>

        <ItineraryDetailTabs
          itinerary={itinerary}
          locale={locale}
          editorialSections={editorialSections}
          labels={{
            dayLabel: labelsConfig.dayLabel || 'Day',
            overviewTitle: 'Journey Overview',
            packingListTitle: labelsConfig.packingListTitle,
            tipsTitle: labelsConfig.tipsTitle,
          }}
          showActivities={sectionsConfig.showActivities !== false}
          contactHref={sidebarConfig.bookingCtaLink || `/${locale}/contact`}
          contactText={sidebarConfig.bookingCtaText || 'Inquire'}
        />

        {/* Related Itineraries (Editorial Style) */}
        {sectionsConfig.showRelatedItineraries !== false && (
          <EditorialRelatedSection
            itineraries={relatedItineraries}
            currentSlug={slug}
            locale={locale}
            limit={sectionsConfig.relatedItinerariesLimit || 3}
            title={labelsConfig.relatedTitle || 'Continue Exploring'}
          />
        )}
      </main>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // CLASSIC MODE RENDERING (Original Implementation Below)
  // ═══════════════════════════════════════════════════════════════════

  // Hero settings
  const heroHeight = heroConfig.height || 'medium';
  const overlayStyle = heroConfig.overlayStyle || 'medium';
  const showBreadcrumb = heroConfig.showBreadcrumb !== false;
  const showDuration = heroConfig.showDuration !== false;
  const showDifficulty = heroConfig.showDifficulty !== false;

  // Sections settings
  const showDayByDay = sectionsConfig.showDayByDay !== false;
  const showRelated = sectionsConfig.showRelatedItineraries !== false;
  const relatedLimit = sectionsConfig.relatedItinerariesLimit || 3;

  // Sidebar settings
  const showBookingCTA = sidebarConfig.showBookingCTA !== false;
  const bookingCtaText = sidebarConfig.bookingCtaText || 'Book This Trip';
  const bookingCtaLink = sidebarConfig.bookingCtaLink || '/contact';

  // Labels
  const dayLabel = labelsConfig.dayLabel || 'Day';
  const relatedTitle = labelsConfig.relatedTitle || 'Related Itineraries';

  // Filter related itineraries
  const related = relatedItineraries
    .filter((item) => item.slug !== slug)
    .slice(0, relatedLimit);

  const imageUrl = getFeaturedImageUrl(itinerary.featuredImage);

  // Get difficulty label - refined for luxury aesthetic
  const difficultyLabels: Record<string, { label: string; description: string }> = {
    easy: { label: 'Gentle', description: 'Relaxed pace, suitable for all' },
    moderate: { label: 'Moderate', description: 'Comfortable pace with some activity' },
    challenging: { label: 'Adventurous', description: 'Active exploration required' },
  };

  // Translations
  const translations: Record<string, Record<string, string>> = {
    en: {
      back: 'All Journeys',
      overview: 'The Journey',
      highlights: 'Highlights',
      packingList: 'What to Bring',
      tips: 'Traveler\'s Notes',
      share: 'Share',
      dayByDay: 'Day by Day',
      destinations: 'Destinations',
      inquire: 'Begin Planning',
    },
    vi: {
      back: 'Tất cả hành trình',
      overview: 'Hành trình',
      highlights: 'Điểm nổi bật',
      packingList: 'Cần chuẩn bị',
      tips: 'Ghi chú du lịch',
      share: 'Chia sẻ',
      dayByDay: 'Từng ngày',
      destinations: 'Điểm đến',
      inquire: 'Bắt đầu lên kế hoạch',
    },
    fr: {
      back: 'Tous les voyages',
      overview: 'Le Voyage',
      highlights: 'Points forts',
      packingList: 'À emporter',
      tips: 'Notes de voyage',
      share: 'Partager',
      dayByDay: 'Jour par jour',
      destinations: 'Destinations',
      inquire: 'Commencer à planifier',
    },
    de: {
      back: 'Alle Reisen',
      overview: 'Die Reise',
      highlights: 'Highlights',
      packingList: 'Packliste',
      tips: 'Reisehinweise',
      share: 'Teilen',
      dayByDay: 'Tag für Tag',
      destinations: 'Reiseziele',
      inquire: 'Planung beginnen',
    },
  };

  const t = translations[locale] || translations.en;

  // ═══════════════════════════════════════════════════════════════════
  // QUIET LUXURY LAYOUT - Single Column, Editorial Style
  // No sidebars, generous whitespace, refined typography
  // ═══════════════════════════════════════════════════════════════════

  return (
    <main className="min-h-screen bg-white">
      {/* ─────────────────────────────────────────────────────────────────
          HERO SECTION - Cinematic, Immersive
          Full-height with gradient overlay, serif typography
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[600px]">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={(itinerary.featuredImage as Media)?.alt || itinerary.title}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Gradient overlay - elegant fade from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-5xl mx-auto w-full px-6 pb-16 md:pb-24">
            {/* Breadcrumb - subtle, uppercase */}
            {showBreadcrumb && (
              <nav className="mb-8">
                <ol className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/60">
                  <li>
                    <Link href={`/${locale}`} className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li className="text-white/40">—</li>
                  <li>
                    <Link href={`/${locale}/itineraries`} className="hover:text-white transition-colors">
                      Journeys
                    </Link>
                  </li>
                </ol>
              </nav>
            )}

            {/* Meta Info - refined typography */}
            <div className="flex items-center gap-4 mb-6 text-white/80">
              {showDuration && itinerary.duration && (
                <span className="text-sm tracking-wide">
                  {itinerary.duration} {itinerary.duration === 1 ? 'Day' : 'Days'}
                </span>
              )}
              {showDuration && showDifficulty && itinerary.difficulty && (
                <span className="text-white/40">·</span>
              )}
              {showDifficulty && itinerary.difficulty && (
                <span className="text-sm tracking-wide">
                  {difficultyLabels[itinerary.difficulty]?.label || itinerary.difficulty}
                </span>
              )}
            </div>

            {/* Title - Large serif, elegant */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.1] mb-6">
              {itinerary.title}
            </h1>

            {/* Excerpt */}
            {itinerary.excerpt && (
              <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed">
                {itinerary.excerpt}
              </p>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          JOURNEY ESSENCE - Key details in refined horizontal layout
      ───────────────────────────────────────────────────────────────── */}
      <section className="border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Duration */}
            {itinerary.duration && (
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">Duration</dt>
                <dd className="text-2xl font-light text-neutral-900">
                  {itinerary.duration} <span className="text-lg text-neutral-500">{itinerary.duration === 1 ? 'Day' : 'Days'}</span>
                </dd>
              </div>
            )}
            
            {/* Pace */}
            {itinerary.difficulty && (
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">Pace</dt>
                <dd className="text-2xl font-light text-neutral-900">
                  {difficultyLabels[itinerary.difficulty]?.label || itinerary.difficulty}
                </dd>
              </div>
            )}
            
            {/* Investment */}
            {itinerary.estimatedBudget?.min && itinerary.estimatedBudget?.max && (
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">Investment</dt>
                <dd className="text-2xl font-light text-neutral-900">
                  <span className="text-lg text-neutral-500">{itinerary.estimatedBudget.currency || 'USD'}</span> {itinerary.estimatedBudget.min.toLocaleString()}+
                </dd>
              </div>
            )}
            
            {/* Destinations */}
            {itinerary.cities && itinerary.cities.length > 0 && (
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">{t.destinations}</dt>
                <dd className="text-2xl font-light text-neutral-900">
                  {itinerary.cities.length} <span className="text-lg text-neutral-500">{itinerary.cities.length === 1 ? 'City' : 'Cities'}</span>
                </dd>
              </div>
            )}
          </div>
        </div>
      </section>

      <ItineraryDetailTabs
        itinerary={itinerary}
        locale={locale}
        labels={{
          dayLabel,
          overviewTitle: t.overview,
          packingListTitle: labelsConfig.packingListTitle || t.packingList,
          tipsTitle: labelsConfig.tipsTitle || t.tips,
        }}
        showActivities={sectionsConfig.showActivities !== false && showDayByDay}
        contactHref={bookingCtaLink || `/${locale}/contact`}
        contactText={bookingCtaText || t.inquire}
      />

      {/* ─────────────────────────────────────────────────────────────────
          CTA SECTION - Full-width, subtle elegance
      ───────────────────────────────────────────────────────────────── */}
      {showBookingCTA && bookingCtaLink && (
        <section className="bg-neutral-50 border-y border-neutral-100">
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-4">
              Ready to begin?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-neutral-900 mb-6">
              Let's craft your journey
            </h2>
            <p className="text-neutral-600 font-light mb-10 max-w-xl mx-auto">
              Every detail thoughtfully considered. Every moment carefully curated.
            </p>
            <Link
              href={bookingCtaLink}
              className="inline-block px-10 py-4 text-sm uppercase tracking-[0.15em] border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300"
            >
              {bookingCtaText || t.inquire}
            </Link>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          RELATED ITINERARIES - Elegant grid
      ───────────────────────────────────────────────────────────────── */}
      {showRelated && related.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-neutral-900 mb-12 text-center">
              {relatedTitle}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {related.map((item) => {
                const relatedImageUrl = getFeaturedImageUrl(item.featuredImage);
                return (
                  <Link
                    key={item.id}
                    href={`/${locale}/itineraries/${item.slug}`}
                    className="group"
                  >
                    {relatedImageUrl && (
                      <div className="relative aspect-[4/3] mb-5 overflow-hidden">
                        <Image
                          src={relatedImageUrl}
                          alt={(item.featuredImage as Media)?.alt || item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      {item.duration && (
                        <span className="text-sm text-neutral-400">
                          {item.duration} {item.duration === 1 ? 'Day' : 'Days'}
                        </span>
                      )}
                      {item.duration && item.difficulty && (
                        <span className="text-neutral-300">·</span>
                      )}
                      {item.difficulty && (
                        <span className="text-sm text-neutral-400 capitalize">
                          {difficultyLabels[item.difficulty]?.label || item.difficulty}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-light text-neutral-900 group-hover:text-neutral-600 transition-colors">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-neutral-500 text-sm mt-2 line-clamp-2 font-light">
                        {item.excerpt}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

/**
 * Editorial Related Section
 * Elegant, minimal related itineraries for editorial mode
 */
function EditorialRelatedSection({
  itineraries,
  currentSlug,
  locale,
  limit,
  title,
}: {
  itineraries: Itinerary[];
  currentSlug: string;
  locale: string;
  limit: number;
  title: string;
}) {
  const related = itineraries.filter(item => item.slug !== currentSlug).slice(0, limit);

  if (related.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-light text-neutral-900 mb-12 text-center">
          {title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {related.map((item) => {
            const imageUrl = getFeaturedImageUrl(item.featuredImage);

            return (
              <Link
                key={item.id}
                href={`/${locale}/itineraries/${item.slug}`}
                className="group"
              >
                {imageUrl && (
                  <div className="relative aspect-[4/3] mb-5 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={(item.featuredImage as Media)?.alt || item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-neutral-400">{item.duration} Days</span>
                  {item.difficulty && (
                    <>
                      <span className="text-neutral-300">·</span>
                      <span className="text-sm text-neutral-400 capitalize">{item.difficulty}</span>
                    </>
                  )}
                </div>
                <h3 className="text-xl font-light text-neutral-900 group-hover:text-neutral-600 transition-colors">
                  {item.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
