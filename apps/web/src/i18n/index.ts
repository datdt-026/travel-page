// Client-safe exports (can be used in both client and server components)
export { locales, defaultLocale, localeNames, localeHreflang, localeOpenGraph, isValidLocale } from './config';
export type { Locale } from './config';
export { getLocaleFromPathname, removeLocaleFromPathname, addLocaleToPathname } from './config';
export { formatMessage } from './utils';

// Type-only export from dictionaries (doesn't pull in runtime code)
export type { Dictionary } from './dictionaries';

// Server-only exports - import directly from '@/i18n/server' in server components
// getDictionary is exported from './server' to avoid 'server-only' in client bundles
