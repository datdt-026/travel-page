import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getCountryBySlug,
  getCityBySlug,
  getAttractionsByCity,
  getItineraries,
  getImageUrl,
  getCityDetailConfig,
} from '@/lib/api';
import { Country, City, Attraction, Itinerary, CityDetailConfig } from '@/types';
import {
  JsonLd,
  generateTouristDestinationSchema,
  getMediaUrl,
} from '@/lib/seo';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import { CityPortraitLayout } from '@/components/destinations';

interface CityPageProps {
  params: { locale: string; country: string; city: string };
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const [country, city] = await Promise.all([
    getCountryBySlug(params.country, locale) as Promise<Country | null>,
    getCityBySlug(params.city, locale) as Promise<City | null>,
  ]);

  if (!country || !city) {
    return { title: 'City Not Found' };
  }

  const dict = await getDictionary(locale);
  const alternates = generateAlternateLanguages(`/${locale}/destinations/${country.slug}/${city.slug}`);
  const countryName = country.name?.trim() || country.slug || 'Destination';
  const cityName = city.name?.trim() || city.slug || 'City';

  return {
    title: city.metaTitle || `${cityName}, ${countryName} - ${dict.destinations.title}`,
    description: city.metaDescription || city.excerpt,
    keywords: city.metaKeywords,
    alternates,
    openGraph: {
      title: city.metaTitle || `${cityName} Travel Guide`,
      description: city.metaDescription || city.excerpt,
      images: city.featuredImage && typeof city.featuredImage === 'object'
        ? [getImageUrl(city.featuredImage.url) || '']
        : undefined,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  
  // Fetch city, country and config in parallel
  const [country, city, config] = await Promise.all([
    getCountryBySlug(params.country, locale) as Promise<Country | null>,
    getCityBySlug(params.city, locale) as Promise<City | null>,
    getCityDetailConfig(locale) as Promise<CityDetailConfig | null>,
  ]);

  if (!country || !city) {
    notFound();
  }

  const dict = await getDictionary(locale);

  // Config values with defaults
  const sectionsConfig = config?.sections || {};

  // Fetch attractions and itineraries based on config
  const attractionsLimit = sectionsConfig.attractionsLimit || 12;
  const itinerariesLimit = sectionsConfig.itinerariesLimit || 4;

  const [attractionsData, itinerariesData] = await Promise.all([
    sectionsConfig.showAttractions !== false
      ? getAttractionsByCity(city.id, { limit: attractionsLimit, status: 'published', locale })
      : Promise.resolve({ docs: [] }),
    sectionsConfig.showItineraries !== false
      ? getItineraries({
          limit: itinerariesLimit,
          status: 'published',
          locale,
          where: { cities: { contains: city.id } },
        })
      : Promise.resolve({ docs: [] }),
  ]);

  const attractions = attractionsData.docs as Attraction[];
  const itineraries = itinerariesData.docs as Itinerary[];

  const imageUrl = getMediaUrl(city.featuredImage);
  const hreflangLinks = generateHreflangLinks(`/${locale}/destinations/${country.slug}/${city.slug}`);
  const countryName = country.name?.trim() || country.slug || 'Destination';
  const cityName = city.name?.trim() || city.slug || 'City';

  return (
    <>
      {hreflangLinks}
      {config?.schema?.enableJsonLd !== false && (
        <JsonLd
          data={generateTouristDestinationSchema(
            `${cityName}, ${countryName}`,
            city.excerpt,
            imageUrl,
            city.coordinates
          )}
        />
      )}

      {/* City Portrait Layout - Editorial, atmospheric design */}
      <CityPortraitLayout
        city={city}
        country={country}
        attractions={attractions}
        itineraries={itineraries}
        locale={locale}
        dict={dict}
      />
    </>
  );
}
