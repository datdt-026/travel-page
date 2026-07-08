import { Metadata } from 'next';
import Link from 'next/link';
import { getCities, getCountries, getImageUrl, getCitiesPageConfig } from '@/lib/api';
import { City, Country, CitiesPageConfig } from '@/types';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import { toTitleCase } from '@/i18n/utils';
import { DynamicHeroSection, HeroConfig } from '@/components/cms';
import CitiesListingClient from './CitiesListingClient';

export const revalidate = 60;

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const pageConfig = await getCitiesPageConfig(locale) as CitiesPageConfig | null;
  const alternates = generateAlternateLanguages(`/${locale}/cities`);

  return {
    title: pageConfig?.seo?.metaTitle || dict.cities?.title || 'Thành phố',
    description: pageConfig?.seo?.metaDescription || dict.cities?.description || 'Khám phá điểm đến du lịch theo thành phố.',
    keywords: pageConfig?.seo?.metaKeywords,
    alternates,
  };
}

export default async function CitiesPage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  
  // Fetch page config and data in parallel
  const [pageConfig, citiesData, countriesData] = await Promise.all([
    getCitiesPageConfig(locale) as Promise<CitiesPageConfig | null>,
    getCities({ limit: 100, status: 'published', locale }),
    getCountries({ limit: 100, status: 'published', locale }),
  ]);
  
  const cities = citiesData.docs as City[];
  const countries = countriesData.docs as Country[];

  const hreflangLinks = generateHreflangLinks(`/${locale}/cities`);

  // Build hero config from CMS with fallback to first city image
  const defaultHeroImage = cities.length > 0 && cities[0].featuredImage && typeof cities[0].featuredImage === 'object'
    ? { url: cities[0].featuredImage.url }
    : null;
  
  // Convert CMS backgroundImage to proper format
  const getBackgroundImage = () => {
    const img = pageConfig?.hero?.backgroundImage;
    if (!img) return defaultHeroImage;
    if (typeof img === 'string') return { url: img };
    if (typeof img === 'object' && img !== null && 'url' in img) return { url: img.url };
    return defaultHeroImage;
  };

  const heroConfig: HeroConfig = {
    title: pageConfig?.hero?.title || dict.cities?.title || 'Khám phá thành phố',
    subtitle: pageConfig?.hero?.subtitle || dict.cities?.description || 'Khám phá những thành phố đặc sắc trên thế giới',
    backgroundImage: getBackgroundImage(),
    height: (pageConfig?.hero?.height as 'full' | 'large' | 'medium') || 'medium',
    showBreadcrumb: pageConfig?.hero?.showBreadcrumb !== false,
    breadcrumbLabel: pageConfig?.hero?.breadcrumbLabel,
  };

  return (
    <div>
      {hreflangLinks}
      
      {/* Dynamic Hero Section from CMS */}
      <DynamicHeroSection 
        config={heroConfig}
        fallback={{
          title: dict.cities?.title || 'Khám phá thành phố',
          subtitle: dict.cities?.description || 'Khám phá những thành phố đặc sắc trên thế giới',
        }}
        breadcrumb={{
          homeLabel: dict.common?.home || 'Trang chủ',
          currentLabel: dict.cities?.title || 'Thành phố',
        }}
      />

      {/* Cities Content with Filters */}
      <CitiesListingClient
        initialCities={cities}
        countries={countries}
        locale={locale}
        dict={dict}
        listingConfig={pageConfig?.listing}
        featuredConfig={pageConfig?.featured}
        emptyStateConfig={pageConfig?.emptyState}
      />
    </div>
  );
}
