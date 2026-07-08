import { getCountries, getCities, getDestinationsPageConfig } from '@/lib/api';
import { Country, City, DestinationsPageConfig, Media } from '@/types';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import { DestinationsEditorialClient } from '@/components/destinations';

export const revalidate = 60;

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const config = await getDestinationsPageConfig(locale) as DestinationsPageConfig | null;
  const alternates = generateAlternateLanguages(`/${locale}/destinations`);

  return {
    title: config?.seo?.metaTitle || config?.hero?.title || dict.destinations.title,
    description: config?.seo?.metaDescription || config?.hero?.subtitle || dict.destinations.description,
    keywords: config?.seo?.metaKeywords,
    alternates,
  };
}

export default async function DestinationsPage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  
  // Fetch page config and countries in parallel
  const [config, countriesData, citiesData] = await Promise.all([
    getDestinationsPageConfig(locale) as Promise<DestinationsPageConfig | null>,
    getCountries({ limit: 100, status: 'published', locale }),
    getCities({ limit: 100, status: 'published', locale }),
  ]);
  
  const countries = countriesData.docs as Country[];
  const cities = citiesData.docs as City[];

  const hreflangLinks = generateHreflangLinks(`/${locale}/destinations`);
  
  // Hero configuration from CMS
  const heroConfig = config?.hero ? {
    title: config.hero.title,
    subtitle: config.hero.subtitle,
    backgroundImage: config.hero.backgroundImage && typeof config.hero.backgroundImage === 'object'
      ? config.hero.backgroundImage as Media
      : countries[0]?.featuredImage as Media | undefined,
  } : {
    backgroundImage: countries[0]?.featuredImage as Media | undefined,
  };

  return (
    <div>
      {hreflangLinks}
      
      {/* Editorial Design - Magazine-style destinations */}
      <DestinationsEditorialClient
        initialCountries={countries}
        initialCities={cities}
        locale={locale}
        dict={dict}
        heroConfig={heroConfig}
        listingConfig={config?.listing}
        featuredConfig={config?.featured}
        emptyStateConfig={config?.emptyState}
      />
    </div>
  );
}
