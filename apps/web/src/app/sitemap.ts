import { MetadataRoute } from 'next';
import { getCountries, getCities, getAttractions, getItineraries } from '@/lib/api';
import { locales, addLocaleToPathname, type Locale } from '@/i18n';
import { Country, City, Attraction, Itinerary } from '@/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelsite.com';

/**
 * Generate sitemap with all localized URLs
 * Each URL includes alternates for all supported languages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all content
  const [countriesData, citiesData, attractionsData, itinerariesData] = await Promise.all([
    getCountries({ limit: 1000, status: 'published' }),
    getCities({ limit: 1000, status: 'published' }),
    getAttractions({ limit: 1000, status: 'published' }),
    getItineraries({ limit: 1000, status: 'published' }),
  ]);

  const countries = countriesData.docs as Country[];
  const cities = citiesData.docs as City[];
  const attractions = attractionsData.docs as Attraction[];
  const itineraries = itinerariesData.docs as Itinerary[];

  // Helper to create localized URL
  const createUrl = (path: string, locale: Locale): string => {
    return `${SITE_URL}${addLocaleToPathname(path, locale)}`;
  };

  // Helper to create alternates object for a path
  const createAlternates = (path: string): Record<string, string> => {
    const alternates: Record<string, string> = {};
    locales.forEach((locale) => {
      alternates[locale] = createUrl(path, locale);
    });
    return alternates;
  };

  // Static pages
  const staticPages = [
    '/',
    '/destinations',
    '/attractions',
    '/itineraries',
    '/cities',
    '/about',
    '/contact',
    '/faq',
    '/blog',
  ];

  const staticEntries = staticPages.flatMap((path) =>
    locales.map((locale) => ({
      url: createUrl(path, locale),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1 : 0.8,
      alternates: {
        languages: createAlternates(path),
      },
    }))
  );

  // Country pages
  const countryEntries = countries.flatMap((country) => {
    const path = `/destinations/${country.slug}`;
    return locales.map((locale) => ({
      url: createUrl(path, locale),
      lastModified: new Date(country.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: createAlternates(path),
      },
    }));
  });

  // City pages
  const cityEntries = cities.flatMap((city) => {
    const path = `/cities/${city.slug}`;
    return locales.map((locale) => ({
      url: createUrl(path, locale),
      lastModified: new Date(city.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: createAlternates(path),
      },
    }));
  });

  // Attraction pages
  const attractionEntries = attractions.flatMap((attraction) => {
    const path = `/attractions/${attraction.slug}`;
    return locales.map((locale) => ({
      url: createUrl(path, locale),
      lastModified: new Date(attraction.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: createAlternates(path),
      },
    }));
  });

  // Itinerary pages
  const itineraryEntries = itineraries.flatMap((itinerary) => {
    const path = `/itineraries/${itinerary.slug}`;
    return locales.map((locale) => ({
      url: createUrl(path, locale),
      lastModified: new Date(itinerary.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: createAlternates(path),
      },
    }));
  });

  return [
    ...staticEntries,
    ...countryEntries,
    ...cityEntries,
    ...attractionEntries,
    ...itineraryEntries,
  ];
}
