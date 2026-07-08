import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeaderWithCMS from '@/components/HeaderWithCMS';
import FooterWithCMS from '@/components/FooterWithCMS';
import ContactToolbarWithCMS from '@/components/ContactToolbarWithCMS';
import NavigationProgress from '@/components/NavigationProgress';
import { locales, isValidLocale, localeOpenGraph } from '@/i18n';
import { getDictionary } from '@/i18n/server';
import type { Locale } from '@/i18n';
import { LocaleProvider } from '@/components/LocaleProvider';

export function generateStaticParams() {
  // Generate params for all locales including default
  // Middleware handles rewriting requests without locale prefix to default locale
  return locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  
  // Validate locale before fetching dictionary
  if (!isValidLocale(locale)) {
    return {};
  }

  const dict = await getDictionary(locale);

  return {
    title: {
      default: `${dict.common.siteName} - ${dict.seo.defaultTitle}`,
      template: `%s | ${dict.common.siteName}`,
    },
    description: dict.seo.defaultDescription,
    openGraph: {
      type: 'website',
      locale: localeOpenGraph[locale],
      siteName: dict.common.siteName,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = params.locale;

  // Validate locale - must be a valid non-default locale
  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dictionary={dict}>
      {/* Navigation Progress Bar - shows loading indicator during page transitions */}
      <NavigationProgress />
      
      <HeaderWithCMS locale={locale} />
      <main className="flex-grow">{children}</main>
      <FooterWithCMS locale={locale} />
      
      {/* Floating Contact Toolbar - fixed right edge on desktop, FAB on mobile */}
      <ContactToolbarWithCMS locale={locale} />
    </LocaleProvider>
  );
}
