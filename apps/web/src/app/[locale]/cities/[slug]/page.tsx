import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCityBySlug, getAttractionsByCity, getImageUrl } from '@/lib/api';
import { City, Country, Attraction } from '@/types';
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
  const city = (await getCityBySlug(params.slug, locale)) as City | null;

  if (!city) {
    return { title: 'City Not Found' };
  }

  const alternates = generateAlternateLanguages(`/${locale}/cities/${params.slug}`);

  return {
    title: city.metaTitle || `${city.name} Travel Guide`,
    description: city.metaDescription || city.excerpt,
    keywords: city.metaKeywords,
    alternates,
    openGraph: {
      title: city.metaTitle || `${city.name} Travel Guide`,
      description: city.metaDescription || city.excerpt,
      images:
        city.featuredImage && typeof city.featuredImage === 'object'
          ? [getImageUrl(city.featuredImage.url) || '']
          : undefined,
    },
  };
}

export const revalidate = 60;

export default async function CityPage({ params }: PageProps) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const city = (await getCityBySlug(params.slug, locale)) as City | null;

  if (!city) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const hreflangLinks = generateHreflangLinks(`/${locale}/cities/${params.slug}`);
  const localePath = (path: string) => `/${locale}${path}`;

  const country = city.country as Country;

  const attractionsData = await getAttractionsByCity(city.id, {
    status: 'published',
    limit: 20,
    locale,
  });
  const attractions = attractionsData.docs as Attraction[];

  return (
    <article>
      {hreflangLinks}
      
      {/* Hero Section - Luxury Style */}
      <section className="relative min-h-[80vh] -mt-20 md:-mt-24 flex items-end">
        {city.featuredImage && typeof city.featuredImage === 'object' ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${getImageUrl(city.featuredImage.url)})` }}
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
              <Link href={localePath('/cities')} className="text-accent hover:text-accent transition-colors">
                {dict.cities?.title || 'Cities'}
              </Link>
              {country && (
                <>
                  <span className="text-content-inverse/30">—</span>
                  <Link
                    href={localePath(`/countries/${country.slug}`)}
                    className="text-accent hover:text-accent transition-colors"
                  >
                    {country.name}
                  </Link>
                </>
              )}
              <span className="text-content-inverse/30">—</span>
              <span className="text-content-inverse/60">{city.name}</span>
            </div>
          </nav>
          
          {/* Accent line */}
          <div className="w-16 h-px bg-accent mb-8 opacity-0 animate-fade-in animation-delay-200" />
          
          <h1 className="font-serif font-semibold text-display-lg text-content-inverse mb-6 tracking-wide opacity-0 animate-fade-in-up animation-delay-200">
            {toTitleCase(city.name)}
          </h1>
          
          <p className="text-lg md:text-xl text-content-inverse/70 max-w-2xl leading-relaxed font-light opacity-0 animate-fade-in-up animation-delay-400">
            {city.excerpt}
          </p>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-primary to-transparent" />
      </section>

      {/* Content */}
      <div className="container-wide section-lg">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <RichText content={city.description} className="text-lg text-content-secondary leading-relaxed" />

            {/* Highlights */}
            {city.highlights && city.highlights.length > 0 && (
              <section className="mt-20">
                <h2 className="font-serif text-heading-lg text-content-primary mb-8 tracking-wide">{dict.common.highlights || 'Highlights'}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {city.highlights.map((highlight, index) => (
                    <div key={index} className="p-6 bg-surface-secondary">
                      <h3 className="text-content-primary font-light">{highlight.title}</h3>
                      {highlight.description && (
                        <p className="text-content-muted mt-2 text-sm leading-relaxed">{highlight.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Attractions */}
            {attractions.length > 0 && (
              <section className="mt-20">
                <h2 className="font-serif text-heading-lg text-content-primary mb-8 tracking-wide">
                  {dict.attractions?.thingsToDo || 'Things to Do'} in {city.name}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {attractions.map((attraction) => (
                    <Link
                      key={attraction.id}
                      href={localePath(`/attractions/${attraction.slug}`)}
                      className="group block"
                    >
                      <div className="aspect-[4/3] bg-surface-tertiary relative overflow-hidden">
                        {attraction.featuredImage &&
                          typeof attraction.featuredImage === 'object' && (
                            <div
                              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                              style={{
                                backgroundImage: `url(${getImageUrl(attraction.featuredImage.url)})`,
                              }}
                            />
                          )}
                        <span className="absolute top-4 right-4 bg-surface-primary/90 backdrop-blur-sm px-3 py-1 text-label-sm uppercase">
                          {attraction.category.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="pt-5">
                        <h3 className="font-serif text-heading-md text-content-primary group-hover:text-content-secondary transition-colors">
                          {attraction.name}
                        </h3>
                        <p className="text-content-muted text-sm line-clamp-2 mt-2 leading-relaxed">
                          {attraction.excerpt}
                        </p>
                        {attraction.rating && (
                          <div className="flex items-center mt-3">
                            <span className="text-accent">★</span>
                            <span className="text-sm text-content-secondary ml-1">{attraction.rating}</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Local Tips */}
            {city.localTips && (
              <section className="mt-20">
                <h2 className="font-serif text-heading-lg text-content-primary mb-8 tracking-wide">{dict.cities?.localTips || 'Local Tips'}</h2>
                <div className="bg-surface-secondary p-8">
                  <RichText content={city.localTips} />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-surface-secondary p-8 sticky top-28">
              <h3 className="text-label-md uppercase text-content-muted mb-6">{dict.common.cityInfo || 'City Info'}</h3>
              <dl className="space-y-6">
                {country && (
                  <div>
                    <dt className="text-label-sm uppercase text-content-light mb-1">{dict.common.country || 'Country'}</dt>
                    <dd className="text-content-primary">
                      <Link
                        href={localePath(`/countries/${country.slug}`)}
                        className="hover:text-content-secondary transition-colors"
                      >
                        {country.name}
                      </Link>
                    </dd>
                  </div>
                )}
                {city.population && (
                  <div>
                    <dt className="text-label-sm uppercase text-content-light mb-1">{dict.common.population || 'Population'}</dt>
                    <dd className="text-content-primary">{city.population.toLocaleString()}</dd>
                  </div>
                )}
                {city.bestTimeToVisit && (
                  <div>
                    <dt className="text-label-sm uppercase text-content-light mb-1">{dict.common.bestTimeToVisit || 'Best Time to Visit'}</dt>
                    <dd className="text-content-primary">{city.bestTimeToVisit}</dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
