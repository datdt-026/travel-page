import React from 'react';
import { Metadata } from 'next';
import { locales, localeHreflang, type Locale, addLocaleToPathname } from '@/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelsite.com';

/**
 * Generate alternate language links for metadata
 * Used for Next.js Metadata API
 */
export function generateAlternateLanguages(currentPath: string): Metadata['alternates'] {
  // Remove locale prefix if present to get the base path
  const pathWithoutLocale = currentPath.replace(/^\/(en|vi|fr|de)/, '') || '/';
  
  const languages: Record<string, string> = {};
  
  locales.forEach((locale) => {
    const localizedPath = addLocaleToPathname(pathWithoutLocale, locale);
    
    languages[localeHreflang[locale]] = `${SITE_URL}${localizedPath}`;
  });

  // Add x-default pointing to default locale
  languages['x-default'] = `${SITE_URL}${addLocaleToPathname(pathWithoutLocale, locales[0])}`;

  return {
    canonical: `${SITE_URL}${currentPath}`,
    languages,
  };
}

/**
 * Generate hreflang link tags for SEO
 * Returns a React component with link tags for the document head
 */
export function generateHreflangLinks(currentPath: string): React.ReactNode {
  // Remove locale prefix if present to get the base path
  const pathWithoutLocale = currentPath.replace(/^\/(en|vi|fr|de)/, '') || '/';

  const links = locales.map((locale) => {
    const localizedPath = addLocaleToPathname(pathWithoutLocale, locale);
    
    const href = `${SITE_URL}${localizedPath}`;
    
    return (
      <link
        key={locale}
        rel="alternate"
        hrefLang={localeHreflang[locale]}
        href={href}
      />
    );
  });

  // Add x-default
  links.push(
    <link
      key="x-default"
      rel="alternate"
      hrefLang="x-default"
      href={`${SITE_URL}${addLocaleToPathname(pathWithoutLocale, locales[0])}`}
    />
  );

  return <>{links}</>;
}

/**
 * Create a localized canonical URL
 */
export function createLocalizedCanonicalUrl(path: string, locale: Locale): string {
  const localizedPath = addLocaleToPathname(path, locale);
  return `${SITE_URL}${localizedPath}`;
}

/**
 * Get all localized URLs for a given path
 * Useful for sitemaps
 */
export function getAllLocalizedUrls(basePath: string): Array<{ locale: Locale; url: string }> {
  return locales.map((locale) => ({
    locale,
    url: createLocalizedCanonicalUrl(basePath, locale),
  }));
}

/**
 * Generate structured data with localized content
 */
export function generateLocalizedWebsiteSchema(locale: Locale, siteName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    description,
    url: SITE_URL,
    inLanguage: localeHreflang[locale],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
