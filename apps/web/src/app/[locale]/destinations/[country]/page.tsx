import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCountryBySlug, getCitiesByCountry, getItineraries, getImageUrl, getCountryDetailConfig } from '@/lib/api';
import { Country, City, Itinerary, CountryDetailConfig } from '@/types';
import {
  JsonLd,
  generateTouristDestinationSchema,
  getMediaUrl,
} from '@/lib/seo';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import { CountryEditorialLayout } from '@/components/destinations';

interface CountryPageProps {
  params: { locale: string; country: string };
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const country = (await getCountryBySlug(params.country, locale)) as Country | null;

  if (!country) {
    return { title: 'Country Not Found' };
  }

  const dict = await getDictionary(locale);
  const alternates = generateAlternateLanguages(`/${locale}/destinations/${country.slug}`);

  return {
    title: country.metaTitle || `${country.name} - ${dict.destinations.title}`,
    description: country.metaDescription || country.excerpt,
    keywords: country.metaKeywords,
    alternates,
    openGraph: {
      title: country.metaTitle || `${country.name} Travel Guide`,
      description: country.metaDescription || country.excerpt,
      images: country.featuredImage && typeof country.featuredImage === 'object'
        ? [getImageUrl(country.featuredImage.url) || '']
        : undefined,
    },
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  
  // Fetch country and config in parallel
  const [country, config] = await Promise.all([
    getCountryBySlug(params.country, locale) as Promise<Country | null>,
    getCountryDetailConfig(locale) as Promise<CountryDetailConfig | null>,
  ]);

  if (!country) {
    notFound();
  }

  const dict = await getDictionary(locale);

  // Config values with defaults
  const sectionsConfig = config?.sections || {};

  // Fetch cities and itineraries based on config
  const citiesLimit = sectionsConfig.citiesLimit || 20;
  const itinerariesLimit = sectionsConfig.itinerariesLimit || 6;

  const [citiesData, itinerariesData] = await Promise.all([
    sectionsConfig.showCities !== false 
      ? getCitiesByCountry(country.id, { limit: citiesLimit, status: 'published', locale })
      : Promise.resolve({ docs: [] }),
    sectionsConfig.showItineraries !== false
      ? getItineraries({
          limit: itinerariesLimit,
          status: 'published',
          locale,
          where: { countries: { contains: country.id } },
        })
      : Promise.resolve({ docs: [] }),
  ]);

  const cities = citiesData.docs as City[];
  const itineraries = itinerariesData.docs as Itinerary[];

  const imageUrl = getMediaUrl(country.featuredImage);
  const hreflangLinks = generateHreflangLinks(`/${locale}/destinations/${country.slug}`);
  const countryName = country.name?.trim() || country.slug || 'Destination';

  return (
    <>
      {hreflangLinks}
      {config?.schema?.enableJsonLd !== false && (
        <JsonLd
          data={generateTouristDestinationSchema(
            countryName,
            country.excerpt,
            imageUrl
          )}
        />
      )}

      {/* Editorial Layout - Magazine-style country profile */}
      <CountryEditorialLayout
        country={country}
        cities={cities}
        itineraries={itineraries}
        locale={locale}
        dict={dict}
      />
    </>
  );
}
