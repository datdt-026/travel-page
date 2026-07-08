import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isValidLocale } from '@/i18n/config';

// Paths that should not be processed by i18n middleware
const PUBLIC_FILE_REGEX = /\.(.*)$/;
const EXCLUDED_PATHS = ['/_next', '/api', '/media', '/favicon.ico', '/robots.txt', '/sitemap.xml'];

/**
 * Get the preferred locale from the request
 * Priority: URL path > Cookie > Accept-Language header > default
 */
function getPreferredLocale(request: NextRequest): string {
  // Check for locale cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    const preferredLocales = acceptLanguage
      .split(',')
      .map((lang) => {
        const [locale] = lang.trim().split(';');
        return locale.split('-')[0];
      })
      .filter(isValidLocale);

    if (preferredLocales.length > 0) {
      return preferredLocales[0];
    }
  }

  return defaultLocale;
}

/**
 * Check if the pathname should be excluded from i18n processing
 */
function shouldExcludePath(pathname: string): boolean {
  // Check for public files (with extensions)
  if (PUBLIC_FILE_REGEX.test(pathname)) {
    return true;
  }

  // Check for excluded paths
  return EXCLUDED_PATHS.some((path) => pathname.startsWith(path));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip excluded paths
  if (shouldExcludePath(pathname)) {
    return NextResponse.next();
  }

  // Check if the pathname starts with a locale
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If we have a locale in the pathname
  if (pathnameLocale) {
    // ALL locales (including default) stay in URL for consistency
    // This prevents redirect loops when switching languages
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', pathnameLocale, { 
      path: '/', 
      maxAge: 60 * 60 * 24 * 365 // 1 year
    });
    return response;
  }

  // No locale in pathname - redirect to add locale prefix
  const preferredLocale = getPreferredLocale(request);
  
  // Redirect to add locale prefix (always, even for default locale)
  return NextResponse.redirect(
    new URL(`/${preferredLocale}${pathname === '/' ? '' : pathname}`, request.url)
  );
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
