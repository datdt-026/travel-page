import { Metadata } from 'next';
import { getCountries, getImageUrl, getCountriesPageConfig } from '@/lib/api';
import { Country, CountriesPageConfig } from '@/types';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import { DynamicHeroSection, HeroConfig } from '@/components/cms';
import CountriesListingClient from './CountriesListingClient';

export const revalidate = 60;

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const pageConfig = await getCountriesPageConfig(locale) as CountriesPageConfig | null;
  const alternates = generateAlternateLanguages(`/${locale}/countries`);

  return {
    title: pageConfig?.seo?.metaTitle || dict.countries?.title || 'Quốc gia',
    description: pageConfig?.seo?.metaDescription || dict.countries?.description || 'Khám phá điểm đến du lịch theo quốc gia.',
    keywords: pageConfig?.seo?.metaKeywords,
    alternates,
  };
}

export default async function CountriesPage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  
  // Fetch page config and data
  const [pageConfig, countriesData] = await Promise.all([
    getCountriesPageConfig(locale) as Promise<CountriesPageConfig | null>,
    getCountries({ limit: 100, status: 'published', locale }),
  ]);
  
  const countries = countriesData.docs as Country[];

  const hreflangLinks = generateHreflangLinks(`/${locale}/countries`);

  // Build hero config from CMS with fallback to first country image
  const defaultHeroImage = countries.length > 0 && countries[0].featuredImage && typeof countries[0].featuredImage === 'object'
    ? { url: countries[0].featuredImage.url }
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
    title: pageConfig?.hero?.title || dict.countries?.title || 'Khám phá quốc gia',
    subtitle: pageConfig?.hero?.subtitle || dict.countries?.description || 'Khám phá các điểm đến đặc sắc trên thế giới',
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
          title: dict.countries?.title || 'Khám phá quốc gia',
          subtitle: dict.countries?.description || 'Khám phá các điểm đến đặc sắc trên thế giới',
        }}
        breadcrumb={{
          homeLabel: dict.common?.home || 'Trang chủ',
          currentLabel: dict.countries?.title || 'Quốc gia',
        }}
      />

      {/* Countries Content with Filters */}
      <CountriesListingClient
        initialCountries={countries}
        locale={locale}
        dict={dict}
        listingConfig={pageConfig?.listing}
        featuredConfig={pageConfig?.featured}
        regionsOverviewConfig={pageConfig?.regionsOverview}
        emptyStateConfig={pageConfig?.emptyState}
      />
    </div>
  );
}
