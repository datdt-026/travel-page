import { defaultLocale } from '@/i18n';
import { getRandomMockImageSrc } from '@/assets/mockImages';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';

interface MediaLike {
  url?: string | null;
  sizes?: Record<string, { url?: string | null } | undefined> | null;
}

/**
 * Helper function to get the full image URL
 * Handles cases where the URL might already include the full domain
 */
export function getImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (
    url.includes('placeholder.png') ||
    url.endsWith('/media/null') ||
    url.endsWith('/media/undefined') ||
    url === 'null' ||
    url === 'undefined'
  ) {
    return getRandomMockImageSrc();
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/_next/') || url.startsWith('/assets/')) {
    return url;
  }
  return `${CMS_URL}${url}`;
}

export function getMediaImageUrl(
  image: MediaLike | string | null | undefined,
  preferredSizes: string[] = []
): string | undefined {
  if (!image) return undefined;
  if (typeof image === 'string') return getImageUrl(image);

  const sizedUrl = preferredSizes
    .map((size) => image.sizes?.[size]?.url)
    .find(Boolean);

  return getImageUrl(sizedUrl || image.url || undefined);
}

interface FetchOptions {
  limit?: number;
  page?: number;
  status?: string;
  where?: Record<string, unknown>;
  depth?: number;
  locale?: string;
  fallbackLocale?: string | boolean;
}

interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

async function fetchFromCMS<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<PaginatedResponse<T>> {
  const { 
    limit = 10, 
    page = 1, 
    status, 
    where, 
    depth = 2,
    locale,
    fallbackLocale = true 
  } = options;

  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    depth: depth.toString(),
  });

  // Add locale parameter for Payload CMS localization
  if (locale) {
    params.append('locale', locale);
    if (fallbackLocale === true) {
      params.append('fallback-locale', defaultLocale);
    } else if (typeof fallbackLocale === 'string') {
      params.append('fallback-locale', fallbackLocale);
    }
  }

  if (status) {
    params.append('where[status][equals]', status);
  }

  if (where) {
    Object.entries(where).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value as Record<string, unknown>).forEach(
          ([operator, operatorValue]) => {
            params.append(`where[${key}][${operator}]`, String(operatorValue));
          }
        );
      } else {
        params.append(`where[${key}][equals]`, String(value));
      }
    });
  }

  const url = `${CMS_URL}/api/${endpoint}?${params.toString()}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${endpoint}:`, res.status, res.statusText);
      return {
        docs: [],
        totalDocs: 0,
        limit,
        totalPages: 0,
        page,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      };
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return {
      docs: [],
      totalDocs: 0,
      limit,
      totalPages: 0,
      page,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  }
}

async function fetchOneFromCMS<T>(
  endpoint: string,
  slug: string,
  depth = 2,
  locale?: string
): Promise<T | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    depth: depth.toString(),
    limit: '1',
  });

  // Add locale parameter for Payload CMS localization
  if (locale) {
    params.append('locale', locale);
    params.append('fallback-locale', defaultLocale);
  }

  const url = `${CMS_URL}/api/${endpoint}?${params.toString()}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch ${endpoint}/${slug}:`,
        res.status,
        res.statusText
      );
      return null;
    }

    const data = await res.json();
    return data.docs?.[0] || null;
  } catch (error) {
    console.error(`Error fetching ${endpoint}/${slug}:`, error);
    return null;
  }
}

// Countries
export function getCountries(options?: FetchOptions) {
  return fetchFromCMS('countries', options);
}

export function getCountryBySlug(slug: string, locale?: string) {
  return fetchOneFromCMS('countries', slug, 2, locale);
}

// Cities
export function getCities(options?: FetchOptions) {
  return fetchFromCMS('cities', options);
}

export function getCityBySlug(slug: string, locale?: string) {
  return fetchOneFromCMS('cities', slug, 2, locale);
}

export function getCitiesByCountry(countryId: string, options?: FetchOptions) {
  return fetchFromCMS('cities', {
    ...options,
    where: { country: { equals: countryId } },
  });
}

// Attractions
export function getAttractions(options?: FetchOptions) {
  return fetchFromCMS('attractions', options);
}

export function getAttractionBySlug(slug: string, locale?: string) {
  return fetchOneFromCMS('attractions', slug, 2, locale);
}

export function getAttractionsByCity(cityId: string, options?: FetchOptions) {
  return fetchFromCMS('attractions', {
    ...options,
    where: { city: { equals: cityId } },
  });
}

// Itineraries
export function getItineraries(options?: FetchOptions) {
  return fetchFromCMS('itineraries', options);
}

export function getItineraryBySlug(slug: string, locale?: string) {
  return fetchOneFromCMS('itineraries', slug, 3, locale);
}

// ============================================================================
// Blog Posts
// ============================================================================

/**
 * Fetch published blog posts with pagination
 * 
 * Example REST API query:
 * GET /api/blog-posts?where[status][equals]=published&limit=10&page=1&depth=2&locale=en
 */
export function getBlogPosts(options?: FetchOptions) {
  return fetchFromCMS('blog-posts', {
    ...options,
    status: options?.status ?? 'published',
  });
}

/**
 * Fetch a single blog post by slug
 * 
 * Example REST API query:
 * GET /api/blog-posts?where[slug][equals]=my-post-slug&depth=2&limit=1&locale=en
 */
export function getBlogPostBySlug(slug: string, locale?: string) {
  return fetchOneFromCMS('blog-posts', slug, 2, locale);
}

// ============================================================================
// Pages
// ============================================================================

/**
 * Fetch published pages
 * 
 * Example REST API query:
 * GET /api/pages?where[status][equals]=published&depth=2&locale=en
 */
export function getPages(options?: FetchOptions) {
  return fetchFromCMS('pages', {
    ...options,
    status: options?.status ?? 'published',
  });
}

/**
 * Fetch a single page by slug (e.g., "about", "contact")
 * 
 * Example REST API query:
 * GET /api/pages?where[slug][equals]=about&depth=2&limit=1&locale=en
 */
export function getPageBySlug(slug: string, locale?: string) {
  return fetchOneFromCMS('pages', slug, 2, locale);
}

/**
 * Fetch destinations page global configuration
 * Returns the global config for /destinations page layout
 * 
 * Example REST API query:
 * GET /api/globals/destinations-page?depth=3&locale=en
 */
export async function getDestinationsPageConfig(locale?: string) {
  const params = new URLSearchParams({
    depth: '3',
  });

  if (locale) {
    params.append('locale', locale);
    params.append('fallback-locale', defaultLocale);
  }

  const url = `${CMS_URL}/api/globals/destinations-page?${params.toString()}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Failed to fetch destinations config:', res.status, res.statusText);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching destinations config:', error);
    return null;
  }
}

// ============================================================================
// FAQs
// ============================================================================

/**
 * Fetch published FAQs sorted by category and order
 * 
 * Example REST API query:
 * GET /api/faqs?where[status][equals]=published&depth=1&locale=en&sort=order
 */
export function getFAQs(options?: FetchOptions) {
  return fetchFromCMS('faqs', {
    ...options,
    status: options?.status ?? 'published',
    limit: options?.limit ?? 100, // Get all FAQs by default
  });
}

/**
 * Fetch FAQs grouped by category
 * Returns FAQs organized into category groups for easier rendering
 */
export async function getFAQsGroupedByCategory(locale?: string): Promise<{
  categories: {
    category: string;
    label: string;
    faqs: { id: string; question: string; answer: string }[];
  }[];
}> {
  const response = await getFAQs({ locale, limit: 100 });
  
  const categoryLabels: Record<string, string> = locale === 'vi'
    ? {
        general: 'Chung',
        'using-travelsite': 'Sử dụng VietWay',
        'trip-planning': 'Lên kế hoạch chuyến đi',
        bookings: 'Đặt dịch vụ',
        account: 'Tài khoản',
        technical: 'Kỹ thuật',
        other: 'Khác',
      }
    : {
        general: 'General',
        'using-travelsite': 'Using VietWay',
        'trip-planning': 'Trip Planning',
        bookings: 'Bookings',
        account: 'Account',
        technical: 'Technical',
        other: 'Other',
      };
  
  // Group FAQs by category
  const grouped = response.docs.reduce(
    (acc: Record<string, { question: string; answer: string; order: number; id: string }[]>, faq) => {
      const typedFaq = faq as { id: string; category: string; question: string; answer: string; order: number };
      const cat = typedFaq.category || 'general';
      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push({
        id: typedFaq.id,
        question: typedFaq.question,
        answer: typedFaq.answer,
        order: typedFaq.order ?? 0,
      });
      return acc;
    },
    {}
  );
  
  // Sort FAQs within each category by order
  const categories = Object.entries(grouped)
    .map(([category, faqs]) => ({
      category,
      label: categoryLabels[category] || category,
      faqs: faqs.sort((a, b) => a.order - b.order),
    }))
    .filter((cat) => cat.faqs.length > 0);
  
  return { categories };
}

// ============================================================================
// Global Configurations (HomePage, SiteHeader, SiteFooter)
// ============================================================================

/**
 * Helper function to fetch global configuration from CMS
 * Globals are singleton documents, so we fetch them by slug directly
 */
async function fetchGlobalFromCMS<T>(
  slug: string,
  options: { depth?: number; locale?: string } = {}
): Promise<T | null> {
  const { depth = 3, locale } = options;

  const params = new URLSearchParams({
    depth: depth.toString(),
  });

  if (locale) {
    params.append('locale', locale);
    params.append('fallback-locale', defaultLocale);
  }

  const url = `${CMS_URL}/api/globals/${slug}?${params.toString()}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch global ${slug}:`, res.status, res.statusText);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching global ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch home page global configuration
 * Returns hero, philosophy, destinations, experiences, testimonials, cta, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/home-page?depth=3&locale=en
 */
export async function getHomePageConfig(locale?: string) {
  return fetchGlobalFromCMS('home-page', { locale, depth: 3 });
}

/**
 * Fetch site header global configuration
 * Returns logo, navigation, ctaButton, and settings
 * 
 * Example REST API query:
 * GET /api/globals/site-header?depth=2&locale=en
 */
export async function getSiteHeaderConfig(locale?: string) {
  return fetchGlobalFromCMS('site-header', { locale, depth: 2 });
}

/**
 * Fetch site footer global configuration
 * Returns brand, columns, newsletter, social, contact, and bottomBar settings
 * 
 * Example REST API query:
 * GET /api/globals/site-footer?depth=2&locale=en
 */
export async function getSiteFooterConfig(locale?: string) {
  return fetchGlobalFromCMS('site-footer', { locale, depth: 2 });
}

// ============================================================================
// Page-specific Global Configurations
// ============================================================================

/**
 * Fetch blog page global configuration
 * Returns hero, listing, emptyState, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/blog-page?depth=3&locale=en
 */
export async function getBlogPageConfig(locale?: string) {
  return fetchGlobalFromCMS('blog-page', { locale, depth: 3 });
}

/**
 * Fetch about page global configuration
 * Returns hero, mission, values, team, stats, cta, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/about-page?depth=3&locale=en
 */
export async function getAboutPageConfig(locale?: string) {
  return fetchGlobalFromCMS('about-page', { locale, depth: 3 });
}

/**
 * Fetch contact page global configuration
 * Returns hero, contactInfo, form, social, map, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/contact-page?depth=3&locale=en
 */
export async function getContactPageConfig(locale?: string) {
  return fetchGlobalFromCMS('contact-page', { locale, depth: 3 });
}

/**
 * Fetch FAQ page global configuration
 * Returns hero, search, listing, contactCta, emptyState, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/faq-page?depth=3&locale=en
 */
export async function getFAQPageConfig(locale?: string) {
  return fetchGlobalFromCMS('faq-page', { locale, depth: 3 });
}

/**
 * Fetch itineraries page global configuration
 * Returns hero, listing, featured, cta, emptyState, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/itineraries-page?depth=3&locale=en
 */
export async function getItinerariesPageConfig(locale?: string) {
  return fetchGlobalFromCMS('itineraries-page', { locale, depth: 3 });
}

/**
 * Fetch attractions page global configuration
 * Returns hero, listing, categories, featured, emptyState, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/attractions-page?depth=3&locale=en
 */
export async function getAttractionsPageConfig(locale?: string) {
  return fetchGlobalFromCMS('attractions-page', { locale, depth: 3 });
}

/**
 * Fetch cities page global configuration
 * Returns hero, listing, featured, countriesSection, emptyState, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/cities-page?depth=3&locale=en
 */
export async function getCitiesPageConfig(locale?: string) {
  return fetchGlobalFromCMS('cities-page', { locale, depth: 3 });
}

/**
 * Fetch countries page global configuration
 * Returns hero, listing, featured, regionsOverview, emptyState, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/countries-page?depth=3&locale=en
 */
export async function getCountriesPageConfig(locale?: string) {
  return fetchGlobalFromCMS('countries-page', { locale, depth: 3 });
}

// ============================================================================
// Detail Page Global Configurations
// ============================================================================

/**
 * Fetch attraction detail page global configuration
 * Returns hero, contentLayout, sections, sidebar, labels, categoryLabels, and schema settings
 * 
 * Example REST API query:
 * GET /api/globals/attraction-detail-config?depth=2&locale=en
 */
export async function getAttractionDetailConfig(locale?: string) {
  return fetchGlobalFromCMS('attraction-detail-config', { locale, depth: 2 });
}

/**
 * Fetch city detail page global configuration
 * Returns hero, contentLayout, sections, sidebar, labels, categoryLabels, and schema settings
 * 
 * Example REST API query:
 * GET /api/globals/city-detail-config?depth=2&locale=en
 */
export async function getCityDetailConfig(locale?: string) {
  return fetchGlobalFromCMS('city-detail-config', { locale, depth: 2 });
}

/**
 * Fetch country detail page global configuration
 * Returns hero, contentLayout, sections, sidebar, labels, continentLabels, and schema settings
 * 
 * Example REST API query:
 * GET /api/globals/country-detail-config?depth=2&locale=en
 */
export async function getCountryDetailConfig(locale?: string) {
  return fetchGlobalFromCMS('country-detail-config', { locale, depth: 2 });
}

/**
 * Fetch itinerary detail page global configuration
 * Returns hero, contentLayout, sections, sidebar, labels, difficultyLabels, travelStyleLabels, and schema settings
 * 
 * Example REST API query:
 * GET /api/globals/itinerary-detail-config?depth=2&locale=en
 */
export async function getItineraryDetailConfig(locale?: string) {
  return fetchGlobalFromCMS('itinerary-detail-config', { locale, depth: 2 });
}

// ============================================================================
// B2B Page Global Configurations
// ============================================================================

/**
 * Fetch expertise page global configuration
 * Returns hero, services, coverage, capacity, quality, whyUs, cta, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/expertise-page?depth=3&locale=en
 */
export async function getExpertisePageConfig(locale?: string) {
  return fetchGlobalFromCMS('expertise-page', { locale, depth: 3 });
}

/**
 * Fetch sustainability page global configuration
 * Returns hero, philosophy, certifications, initiatives, practices, supplierStandards, impact, cta, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/sustainability-page?depth=3&locale=en
 */
export async function getSustainabilityPageConfig(locale?: string) {
  return fetchGlobalFromCMS('sustainability-page', { locale, depth: 3 });
}

/**
 * Fetch case studies page global configuration
 * Returns hero, intro, partnerLogos, caseStudies, testimonials, partnershipTypes, cta, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/case-studies-page?depth=3&locale=en
 */
export async function getCaseStudiesPageConfig(locale?: string) {
  return fetchGlobalFromCMS('case-studies-page', { locale, depth: 3 });
}

/**
 * Fetch partners page global configuration
 * Returns hero, valueProposition, partnershipModels, process, credentials, stats, testimonialHighlight, inquiryCta, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/partners-page?depth=3&locale=en
 */
export async function getPartnersPageConfig(locale?: string) {
  return fetchGlobalFromCMS('partners-page', { locale, depth: 3 });
}

/**
 * Fetch partner inquiry page global configuration
 * Returns hero, form, success, sidebar, and seo settings
 * 
 * Example REST API query:
 * GET /api/globals/partner-inquiry-page?depth=3&locale=en
 */
export async function getPartnerInquiryPageConfig(locale?: string) {
  return fetchGlobalFromCMS('partner-inquiry-page', { locale, depth: 3 });
}

// ============================================================================
// Case Studies Collection API
// ============================================================================

/**
 * Fetch all case studies with optional filtering
 * 
 * Example REST API query:
 * GET /api/case-studies?depth=2&locale=en&where[status][equals]=published
 */
export async function getCaseStudies(options: FetchOptions = {}) {
  return fetchFromCMS('case-studies', {
    depth: 2,
    ...options,
  });
}

/**
 * Fetch a single case study by slug
 * 
 * Example REST API query:
 * GET /api/case-studies?depth=3&locale=en&where[slug][equals]=northern-vietnam-fit-operations
 */
export async function getCaseStudyBySlug(slug: string, locale?: string) {
  const response = await fetchFromCMS('case-studies', {
    depth: 3,
    locale,
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return response.docs?.[0] || null;
}

/**
 * Fetch featured case studies
 * 
 * Example REST API query:
 * GET /api/case-studies?depth=2&locale=en&where[featured][equals]=true&where[status][equals]=published&sort=order
 */
export async function getFeaturedCaseStudies(locale?: string, limit: number = 3) {
  return fetchFromCMS('case-studies', {
    depth: 2,
    locale,
    status: 'published',
    where: { featured: { equals: true } },
    limit,
  });
}

