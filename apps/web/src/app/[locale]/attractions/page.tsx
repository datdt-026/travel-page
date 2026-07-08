import { Metadata } from 'next';
import { getAttractions, getCities, getAttractionsPageConfig, getImageUrl } from '@/lib/api';
import { Attraction, City, Media } from '@/types';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import CuratedPlacesClient from './CuratedPlacesClient';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * /ATTRACTIONS — THE CURATED PLACES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Design Philosophy: Quiet cultural travel editorial
 * 
 * Trang này là TUYỂN TẬP những nơi chốn đã được chọn lọc,
 * không phải danh sách "tất cả điểm tham quan".
 * 
 * Cảm giác khi mở:
 * "Đây là những nơi đáng hiểu, không chỉ đáng ghé."
 * 
 * Visual Language:
 * - Image-led nhưng TRẦM
 * - Attraction như object trong triển lãm
 * - Nhiều khoảng trống
 * - Ít nhưng chọn
 * 
 * GIỐNG: museum catalogue, cultural editorial
 * KHÔNG GIỐNG: directory, listicle
 */

export const revalidate = 60;

interface Props {
  params: { locale: string };
}

// Type for Attractions Page CMS Config
interface AttractionsPageConfig {
  hero?: {
    backgroundImage?: string | Media;
    title?: string;
    subtitle?: string;
    note?: string;
  };
  listing?: {
    maxItems?: number;
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
  const pageConfig = await getAttractionsPageConfig(locale) as AttractionsPageConfig | null;
  const alternates = generateAlternateLanguages(`/${locale}/attractions`);

  return {
    title: pageConfig?.seo?.metaTitle || pageConfig?.hero?.title || dict.attractions?.title || 'Địa điểm chọn lọc',
    description: pageConfig?.seo?.metaDescription || pageConfig?.hero?.subtitle || 
      dict.attractions?.description || 'Những địa điểm được chọn lọc để bạn hiểu sâu hơn về điểm đến.',
    keywords: pageConfig?.seo?.metaKeywords,
    alternates,
  };
}

export default async function AttractionsPage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  
  // Fetch page config and data in parallel
  const [pageConfig, attractionsData, citiesData] = await Promise.all([
    getAttractionsPageConfig(locale) as Promise<AttractionsPageConfig | null>,
    getAttractions({ limit: 50, status: 'published', locale }),
    getCities({ limit: 100, status: 'published', locale }),
  ]);
  
  const attractions = attractionsData.docs as Attraction[];
  const cities = citiesData.docs as City[];

  const hreflangLinks = generateHreflangLinks(`/${locale}/attractions`);

  // Extract hero image URL
  const heroImage = pageConfig?.hero?.backgroundImage
    ? typeof pageConfig.hero.backgroundImage === 'object'
      ? getImageUrl(pageConfig.hero.backgroundImage.url)
      : pageConfig.hero.backgroundImage
    : undefined;

  // Configuration from CMS
  const config = {
    heroImage,
    pageTitle: pageConfig?.hero?.title,
    pageContext: pageConfig?.hero?.subtitle,
    pageNote: pageConfig?.hero?.note,
    maxItems: pageConfig?.listing?.maxItems || 12,
    showFilters: pageConfig?.listing?.showFilters !== false,
    showSearch: pageConfig?.listing?.showSearch !== false,
    searchPlaceholder: pageConfig?.listing?.searchPlaceholder,
  };

  return (
    <main className="attractions-page bg-surface-primary min-h-screen">
      {hreflangLinks}
      
      {/* Editorial Attractions Listing */}
      <CuratedPlacesClient
        attractions={attractions}
        cities={cities}
        locale={locale}
        config={config}
        dict={dict}
      />
    </main>
  );
}
