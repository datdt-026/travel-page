import { Metadata } from 'next';
import { getItineraries, getItinerariesPageConfig, getImageUrl } from '@/lib/api';
import { Itinerary } from '@/types';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import JourneyCollection, { JourneyCollectionHeader } from '@/components/itinerary/JourneyCollection';

export const revalidate = 60;

interface Props {
  params: { locale: string };
}

// Type for Itineraries Page CMS Config
interface ItinerariesPageConfig {
  hero?: {
    title?: string;
    subtitle?: string;
    eyebrow?: string;
    backgroundImage?: { url?: string } | null;
  };
  listing?: {
    showFilters?: boolean;
    showSearch?: boolean;
    searchPlaceholder?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const pageConfig = await getItinerariesPageConfig(locale) as ItinerariesPageConfig | null;
  const alternates = generateAlternateLanguages(`/${locale}/itineraries`);

  return {
    title: pageConfig?.seo?.metaTitle || pageConfig?.hero?.title || dict.itineraries?.title || 'Travel Itineraries',
    description: pageConfig?.seo?.metaDescription || pageConfig?.hero?.subtitle || dict.itineraries?.description || 'Browse curated travel itineraries and trip plans.',
    keywords: pageConfig?.seo?.metaKeywords,
    alternates,
  };
}

export default async function ItinerariesPage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  
  // Fetch page config from CMS
  const pageConfig = await getItinerariesPageConfig(locale) as ItinerariesPageConfig | null;
  
  const data = await getItineraries({ limit: 50, status: 'published', locale });
  const itineraries = data.docs as Itinerary[];

  const hreflangLinks = generateHreflangLinks(`/${locale}/itineraries`);

  // Get hero background from CMS or first itinerary
  const featuredItinerary = itineraries.find(i => i.featuredImage && typeof i.featuredImage === 'object');
  const heroBackgroundImage = pageConfig?.hero?.backgroundImage?.url 
    ? getImageUrl(pageConfig.hero.backgroundImage.url)
    : featuredItinerary?.featuredImage && typeof featuredItinerary.featuredImage === 'object'
      ? getImageUrl(featuredItinerary.featuredImage.url)
      : undefined;

  // Header content from CMS or fallback
  const headerContent = {
    title: pageConfig?.hero?.title || dict.itineraries?.title || 'The Journey Collection',
    subtitle: pageConfig?.hero?.subtitle || dict.itineraries?.description || 'Curated journeys, each with its own rhythm and soul',
    eyebrow: pageConfig?.hero?.eyebrow || 'Itineraries',
  };

  // Filter config from CMS
  const filterConfig = {
    showFilters: pageConfig?.listing?.showFilters !== false,
    showSearch: pageConfig?.listing?.showSearch !== false,
    searchPlaceholder: pageConfig?.listing?.searchPlaceholder,
  };

  return (
    <div className="min-h-screen bg-white">
      {hreflangLinks}
      
      {/* Editorial Header with dark background for header visibility */}
      <JourneyCollectionHeader
        title={headerContent.title}
        subtitle={headerContent.subtitle}
        eyebrow={headerContent.eyebrow}
        backgroundImage={heroBackgroundImage}
      />

      {/* Journey Collection - Compact Stagger Layout with Filters */}
      <JourneyCollection
        itineraries={itineraries}
        locale={locale}
        filterConfig={filterConfig}
        dict={{ itineraries: dict.itineraries as any }}
      />
    </div>
  );
}
