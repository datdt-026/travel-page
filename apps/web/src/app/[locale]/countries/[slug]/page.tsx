import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCountryBySlug, getCitiesByCountry, getImageUrl } from '@/lib/api';
import { Country, City } from '@/types';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import RichText from '@/components/RichText';
import { toTitleCase } from '@/i18n/utils';

interface PageProps {
  params: { locale: string; slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const country = (await getCountryBySlug(params.slug, locale)) as Country | null;

  if (!country) {
    return { title: 'Country Not Found' };
  }

  const alternates = generateAlternateLanguages(`/${locale}/countries/${params.slug}`);

  return {
    title: country.metaTitle || `${country.name} Travel Guide`,
    description: country.metaDescription || country.excerpt,
    keywords: country.metaKeywords,
    alternates,
    openGraph: {
      title: country.metaTitle || `${country.name} Travel Guide`,
      description: country.metaDescription || country.excerpt,
      images:
        country.featuredImage && typeof country.featuredImage === 'object'
          ? [getImageUrl(country.featuredImage.url) || '']
          : undefined,
    },
  };
}

export const revalidate = 60;

export default async function CountryPage({ params }: PageProps) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const country = (await getCountryBySlug(params.slug, locale)) as Country | null;

  if (!country) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const hreflangLinks = generateHreflangLinks(`/${locale}/countries/${params.slug}`);
  const localePath = (path: string) => `/${locale}${path}`;

  const citiesData = await getCitiesByCountry(country.id, {
    status: 'published',
    limit: 20,
    locale,
  });
  const cities = citiesData.docs as City[];

  const continentNames: Record<string, string> = {
    'africa': 'Africa',
    'asia': 'Asia',
    'europe': 'Europe',
    'north-america': 'North America',
    'oceania': 'Oceania',
    'south-america': 'South America',
  };

  return (
    <article>
      {hreflangLinks}
      
      {/* Hero Section - Quiet Luxury Style */}
      <section className="relative min-h-[80vh] -mt-20 md:-mt-24 flex items-end">
        {country.featuredImage && typeof country.featuredImage === 'object' ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${getImageUrl(country.featuredImage.url)})` }}
            />
            <div className="absolute inset-0 hero-overlay-medium" />
          </>
        ) : (
          <div className="absolute inset-0 bg-surface-dark">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/3 rounded-full blur-3xl animate-float-delayed" />
          </div>
        )}
        
        {/* Hero Content */}
        <div className="relative z-10 container-wide pb-16 pt-32">
          {/* Breadcrumb */}
          <nav className="mb-8 opacity-0 animate-fade-in">
            <div className="flex items-center gap-3 text-label-md uppercase">
              <Link href={localePath('/countries')} className="text-accent/80 hover:text-accent transition-colors">
                {dict.countries?.title || 'Countries'}
              </Link>
              <span className="text-content-inverse/30">—</span>
              <span className="text-content-inverse/60">{country.name}</span>
            </div>
          </nav>
          
          {/* Accent line */}
          <div className="w-16 h-px bg-accent mb-8 opacity-0 animate-fade-in animation-delay-200" />
          
          <h1 className="font-serif font-semibold text-display-lg text-content-inverse mb-6 opacity-0 animate-fade-in-up animation-delay-200">
            {toTitleCase(country.name)}
          </h1>
          
          <p className="text-body-lg text-content-inverse/70 max-w-2xl opacity-0 animate-fade-in-up animation-delay-400">
            {country.excerpt}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-4 mt-8 opacity-0 animate-fade-in-up animation-delay-600">
            <span className="bg-accent/20 backdrop-blur-sm px-6 py-2.5 text-accent text-label-md uppercase border border-accent/30">
              {continentNames[country.continent] || country.continent}
            </span>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-primary to-transparent" />
      </section>

      {/* Content */}
      <div className="container-wide section-lg">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-luxury">
              <RichText content={country.description} />
            </div>

            {/* Cities Section */}
            {cities.length > 0 && (
              <section className="mt-20">
                <h2 className="font-serif text-heading-lg text-content-primary mb-8">
                  {dict.destinations?.cities || 'Cities'} in {country.name}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {cities.map((city) => (
                    <Link
                      key={city.id}
                      href={localePath(`/cities/${city.slug}`)}
                      className="group block"
                    >
                      <div className="aspect-[4/3] bg-surface-tertiary relative overflow-hidden">
                        {city.featuredImage &&
                          typeof city.featuredImage === 'object' && (
                            <div
                              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                              style={{
                                backgroundImage: `url(${getImageUrl(city.featuredImage.url)})`,
                              }}
                            />
                          )}
                      </div>
                      <div className="pt-5">
                        <h3 className="font-serif text-heading-md text-content-primary group-hover:text-accent transition-colors">
                          {city.name}
                        </h3>
                        <p className="text-content-muted text-body-sm line-clamp-2 mt-2">
                          {city.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            {country.gallery && country.gallery.length > 0 && (
              <section className="mt-20">
                <h2 className="font-serif text-heading-lg text-content-primary mb-8">{dict.common.gallery || 'Gallery'}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {country.gallery.map((item, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-surface-tertiary overflow-hidden"
                    >
                      {item.image && typeof item.image === 'object' && (
                        <div
                          className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700"
                          style={{
                            backgroundImage: `url(${getImageUrl(item.image.url)})`,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-surface-secondary border border-border-light p-8 sticky top-28">
              <h3 className="text-label-md uppercase text-content-muted mb-6">{dict.common.quickFacts || 'Quick Facts'}</h3>
              <dl className="space-y-6">
                {country.currency && (
                  <div>
                    <dt className="text-label-sm uppercase text-content-light mb-1">{dict.common.currency || 'Currency'}</dt>
                    <dd className="text-body-md text-content-primary">{country.currency}</dd>
                  </div>
                )}
                {country.language && (
                  <div>
                    <dt className="text-label-sm uppercase text-content-light mb-1">{dict.common.language || 'Language'}</dt>
                    <dd className="text-body-md text-content-primary">{country.language}</dd>
                  </div>
                )}
                {country.timezone && (
                  <div>
                    <dt className="text-label-sm uppercase text-content-light mb-1">{dict.common.timezone || 'Timezone'}</dt>
                    <dd className="text-body-md text-content-primary">{country.timezone}</dd>
                  </div>
                )}
                {country.bestTimeToVisit && (
                  <div>
                    <dt className="text-label-sm uppercase text-content-light mb-1">{dict.common.bestTimeToVisit || 'Best Time to Visit'}</dt>
                    <dd className="text-body-md text-content-primary">{country.bestTimeToVisit}</dd>
                  </div>
                )}
              </dl>

              {/* CTA */}
              <div className="mt-8 pt-8 border-t border-border-light">
                <Link
                  href={localePath(`/itineraries?country=${country.slug}`)}
                  className="btn-primary w-full text-center"
                >
                  {dict.common.viewItineraries || 'View Itineraries'}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
