import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getItineraryBySlug, getItineraries, getItineraryDetailConfig, getImageUrl } from '@/lib/api';
import RichText from '@/components/RichText';
import ShareButton from '@/components/ShareButton';
import Section from '@/components/Section';
import { 
  ItineraryHero, 
  ItinerarySectionRenderer, 
  JourneySidebar,
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

// Helper function to get hero height class
function getHeroHeightClass(height?: string): string {
  switch (height) {
    case 'medium':
      return 'h-[50vh] min-h-[400px]';
    case 'large':
      return 'h-[60vh] min-h-[500px]';
    case 'full':
      return 'h-[80vh] min-h-[600px]';
    default:
      return 'h-[50vh] min-h-[400px]';
  }
}

// Helper function to get overlay class
function getOverlayClass(style?: string): string {
  switch (style) {
    case 'none':
      return '';
    case 'light':
      return 'bg-black/30';
    case 'medium':
      return 'bg-black/50';
    case 'heavy':
      return 'bg-black/70';
    case 'gradient':
      return 'bg-gradient-to-t from-black/80 via-black/40 to-transparent';
    default:
      return 'bg-black/50';
  }
}

// Helper function to get content width class
function getContentWidthClass(layout?: string): string {
  switch (layout) {
    case 'full-width':
      return 'max-w-7xl';
    case 'centered':
      return 'max-w-4xl';
    case 'sidebar-left':
    case 'sidebar-right':
      return 'max-w-6xl';
    default:
      return 'max-w-6xl';
  }
}

// Helper function to get day style
function getDayStyle(style?: string): string {
  switch (style) {
    case 'timeline':
      return 'border-l-4 border-blue-500 pl-6 relative';
    case 'cards':
      return 'bg-white rounded-xl shadow-md p-6';
    case 'accordion':
      return 'border border-gray-200 rounded-lg';
    case 'tabs':
      return '';
    default:
      return 'border-l-4 border-blue-500 pl-6 relative';
  }
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
    notFound();
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
  const editorialLayoutConfig = config?.editorialLayout || {};
  const layoutConfig = config?.contentLayout || {};
  const sectionsConfig = config?.sections || {};
  const sidebarConfig = config?.sidebar || {};
  const labelsConfig = config?.labels || {};

  // ═══════════════════════════════════════════════════════════════════
  // EDITORIAL MODE RENDERING
  // ═══════════════════════════════════════════════════════════════════
  if (isEditorialMode && hasEditorialSections) {
    const showSidebar = editorialLayoutConfig.showSidebar && editorialLayoutConfig.layout === 'centered-sidebar';
    
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

        {/* Editorial Content */}
        <div className={`${
          showSidebar
            ? 'max-w-7xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-[1fr_320px] gap-16'
            : 'py-8 md:py-16'
        }`}>
          {/* Main Content */}
          <div>
            <ItinerarySectionRenderer 
              sections={editorialSections} 
              locale={locale} 
            />
          </div>

          {/* Sidebar (for centered-sidebar layout) */}
          {showSidebar && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <JourneySidebar
                title={itinerary.title}
                duration={itinerary.duration}
                difficulty={itinerary.difficulty}
                estimatedBudget={itinerary.estimatedBudget}
                countries={itinerary.countries}
                cities={itinerary.cities}
                travelStyles={itinerary.travelStyle}
                locale={locale}
                showTripDetails={sidebarConfig.showTripDetails !== false}
                showCountries={sidebarConfig.showCountries !== false}
                showCities={sidebarConfig.showCities !== false}
                showShareButton={sidebarConfig.showShareButton !== false}
                showContactCTA={sidebarConfig.showBookingCTA}
                contactCtaText={sidebarConfig.bookingCtaText || 'Inquire'}
                contactCtaLink={sidebarConfig.bookingCtaLink || '/contact'}
              />
            </div>
          )}
        </div>

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

  // Layout settings
  const layout = layoutConfig.layout || 'sidebar-right';
  const showSidebar = layout !== 'full-width' && layout !== 'centered';
  const sidebarPosition = layout === 'sidebar-left' ? 'left' : 'right';

  // Sections settings
  const showDayByDay = sectionsConfig.showDayByDay !== false;
  const dayByDayStyle = sectionsConfig.dayByDayStyle || 'timeline';
  const showRelated = sectionsConfig.showRelatedItineraries !== false;
  const relatedLimit = sectionsConfig.relatedItinerariesLimit || 3;

  // Sidebar settings
  const showTripDetails = sidebarConfig.showTripDetails !== false;
  const showCountries = sidebarConfig.showCountries !== false;
  const showCities = sidebarConfig.showCities !== false;
  const showBookingCTA = sidebarConfig.showBookingCTA !== false;
  const bookingCtaText = sidebarConfig.bookingCtaText || 'Book This Trip';
  const bookingCtaLink = sidebarConfig.bookingCtaLink || '/contact';

  // Labels
  const dayByDayTitle = labelsConfig.dayByDayTitle || 'Day by Day Itinerary';
  const tripDetailsTitle = labelsConfig.tripDetailsTitle || 'Trip Details';
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

      {/* ─────────────────────────────────────────────────────────────────
          MAIN CONTENT - Single column, editorial reading experience
      ───────────────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        
        {/* Back Link - subtle */}
        <Link
          href={`/${locale}/itineraries`}
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-700 transition-colors mb-16"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="uppercase tracking-[0.15em]">{t.back}</span>
        </Link>

        {/* Overview Section */}
        {sectionsConfig.showIntroduction !== false && itinerary.description && (
          <article className="mb-20 md:mb-28">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-neutral-900 mb-10">
              {t.overview}
            </h2>
            <div className="prose prose-lg prose-neutral max-w-none
              prose-p:text-neutral-600 prose-p:font-light prose-p:leading-relaxed
              prose-headings:font-light prose-headings:text-neutral-900
              prose-a:text-neutral-900 prose-a:underline-offset-4
              prose-strong:font-normal prose-strong:text-neutral-800
            ">
              <RichText content={itinerary.description} />
            </div>
          </article>
        )}

        {/* Destinations - Elegant inline list */}
        {(showCountries || showCities) && ((itinerary.countries?.length ?? 0) > 0 || (itinerary.cities?.length ?? 0) > 0) && (
          <aside className="mb-20 md:mb-28 py-12 border-y border-neutral-100">
            <h3 className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">
              {t.destinations}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {showCountries && itinerary.countries?.map((country, index) => {
                const countryName = typeof country === 'string' ? country : country.name;
                const countrySlug = typeof country === 'string' ? null : country.slug;
                return (
                  <span key={`country-${index}`} className="inline-flex items-center">
                    {countrySlug ? (
                      <Link
                        href={`/${locale}/destinations/${countrySlug}`}
                        className="text-lg text-neutral-800 hover:text-neutral-600 transition-colors"
                      >
                        {countryName}
                      </Link>
                    ) : (
                      <span className="text-lg text-neutral-800">{countryName}</span>
                    )}
                    {index < (itinerary.countries?.length || 0) - 1 && (
                      <span className="ml-3 text-neutral-300">·</span>
                    )}
                  </span>
                );
              })}
              {showCountries && showCities && (itinerary.countries?.length ?? 0) > 0 && (itinerary.cities?.length ?? 0) > 0 && (
                <span className="text-neutral-200 mx-2">|</span>
              )}
              {showCities && itinerary.cities?.map((city, index) => {
                const cityName = typeof city === 'string' ? city : city.name;
                return (
                  <span key={`city-${index}`} className="inline-flex items-center">
                    <span className="text-neutral-500">{cityName}</span>
                    {index < (itinerary.cities?.length || 0) - 1 && (
                      <span className="ml-3 text-neutral-300">·</span>
                    )}
                  </span>
                );
              })}
            </div>
          </aside>
        )}

        {/* Day by Day - Refined timeline */}
        {showDayByDay && itinerary.days && itinerary.days.length > 0 && (
          <article className="mb-20 md:mb-28">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-neutral-900 mb-12">
              {dayByDayTitle || t.dayByDay}
            </h2>
            
            <div className="space-y-0">
              {itinerary.days.map((day, index) => (
                <div 
                  key={index} 
                  className="relative pl-8 pb-12 last:pb-0 border-l border-neutral-200"
                >
                  {/* Timeline marker */}
                  <div className="absolute -left-[5px] top-0 w-[10px] h-[10px] rounded-full bg-neutral-300" />
                  
                  {/* Day header */}
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                      {dayLabel} {day.dayNumber}
                    </span>
                    <h3 className="text-xl md:text-2xl font-light text-neutral-900 mt-1">
                      {day.title}
                    </h3>
                  </div>
                  
                  {/* Day description */}
                  {day.description && (
                    <div className="prose prose-neutral max-w-none mb-6
                      prose-p:text-neutral-600 prose-p:font-light prose-p:leading-relaxed prose-p:text-[15px]
                    ">
                      <RichText content={day.description} />
                    </div>
                  )}
                  
                  {/* Activities - refined list */}
                  {sectionsConfig.showActivities !== false && day.activities && day.activities.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-neutral-100">
                      <ul className="space-y-3">
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-start gap-3">
                            <span className="w-1 h-1 rounded-full bg-neutral-400 mt-2.5 flex-shrink-0" />
                            <div>
                              <span className="text-neutral-800">{activity.activity}</span>
                              {activity.description && (
                                <p className="text-sm text-neutral-500 mt-0.5">{activity.description}</p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>
        )}

        {/* Packing List - Clean checklist */}
        {sectionsConfig.showPackingList !== false && itinerary.packingList && itinerary.packingList.length > 0 && (
          <article className="mb-20 md:mb-28">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-neutral-900 mb-10">
              {labelsConfig.packingListTitle || t.packingList}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {itinerary.packingList.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-neutral-600">
                  <span className="w-4 h-px bg-neutral-300 flex-shrink-0" />
                  {item.item}
                </li>
              ))}
            </ul>
          </article>
        )}

        {/* Tips Section - Editorial note style */}
        {sectionsConfig.showTips !== false && itinerary.tips && (
          <article className="mb-20 md:mb-28">
            <h2 className="font-serif text-3xl md:text-4xl font-light text-neutral-900 mb-10">
              {labelsConfig.tipsTitle || t.tips}
            </h2>
            <div className="pl-6 border-l-2 border-neutral-200">
              <div className="prose prose-neutral max-w-none
                prose-p:text-neutral-600 prose-p:font-light prose-p:leading-relaxed
              ">
                <RichText content={itinerary.tips} />
              </div>
            </div>
          </article>
        )}

        {/* Share Section */}
        {sidebarConfig.showShareButton !== false && (
          <div className="py-8 border-t border-neutral-100">
            <ShareButton title={itinerary.title} />
          </div>
        )}
      </div>

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
