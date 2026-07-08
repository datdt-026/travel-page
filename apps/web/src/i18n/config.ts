/**
 * Internationalization (i18n) Configuration
 * 
 * This file contains all locale settings for the application.
 * Add new languages here - the routing and middleware will automatically adapt.
 */

export const locales = ['vi', 'en', 'fr', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'vi';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  fr: 'Français',
  de: 'Deutsch',
};

// ISO language codes for hreflang tags
export const localeHreflang: Record<Locale, string> = {
  vi: 'vi',
  en: 'en',
  fr: 'fr',
  de: 'de',
};

export const localeOpenGraph: Record<Locale, string> = {
  vi: 'vi_VN',
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
};

// Locale-specific date formatting
export const localeDateFormats: Record<Locale, Intl.DateTimeFormatOptions> = {
  en: { year: 'numeric', month: 'long', day: 'numeric' },
  vi: { year: 'numeric', month: 'long', day: 'numeric' },
  fr: { year: 'numeric', month: 'long', day: 'numeric' },
  de: { year: 'numeric', month: 'long', day: 'numeric' },
};

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get locale from pathname
 * Returns the locale if found in path, otherwise returns undefined
 */
export function getLocaleFromPathname(pathname: string): Locale | undefined {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }
  
  return undefined;
}

/**
 * Remove locale prefix from pathname
 */
export function removeLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  
  if (locale) {
    const newPath = pathname.replace(`/${locale}`, '') || '/';
    return newPath;
  }
  
  return pathname;
}

/**
 * Add locale prefix to pathname
 * All locales get a prefix for URL consistency
 */
export function addLocaleToPathname(pathname: string, locale: Locale): string {
  const cleanPath = removeLocaleFromPathname(pathname);
  
  // Always add locale prefix for all locales
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}
