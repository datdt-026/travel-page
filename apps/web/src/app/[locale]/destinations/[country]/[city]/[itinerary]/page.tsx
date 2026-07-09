import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getCountryBySlug,
  getCityBySlug,
  getItineraryBySlug,
  getImageUrl,
} from '@/lib/api';
import { Country, City, Itinerary, ItineraryDay, Attraction } from '@/types';
import {
  JsonLd,
  generateTouristTripSchema,
} from '@/lib/seo';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import Breadcrumb from '@/components/Breadcrumb';
import HeroSection from '@/components/HeroSection';
import RichText from '@/components/RichText';

interface ItineraryPageProps {
  params: { locale: string; country: string; city: string; itinerary: string };
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: ItineraryPageProps): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const [country, city, itinerary] = await Promise.all([
    getCountryBySlug(params.country, locale) as Promise<Country | null>,
    getCityBySlug(params.city, locale) as Promise<City | null>,
    getItineraryBySlug(params.itinerary, locale) as Promise<Itinerary | null>,
  ]);

  if (!country || !city || !itinerary) {
    return { title: 'Itinerary Not Found' };
  }

  const dict = await getDictionary(locale);
  const alternates = generateAlternateLanguages(
    `/${locale}/destinations/${country.slug}/${city.slug}/${itinerary.slug}`
  );
  const countryName = country.name?.trim() || country.slug || 'Destination';
  const cityName = city.name?.trim() || city.slug || 'City';
  const itineraryTitle = itinerary.title?.trim() || itinerary.slug || 'Itinerary';

  return {
    title: itinerary.metaTitle || `${itineraryTitle} - ${cityName}, ${countryName}`,
    description: itinerary.metaDescription || itinerary.excerpt,
    keywords: itinerary.metaKeywords,
    alternates,
    openGraph: {
      title: itinerary.metaTitle || itineraryTitle,
      description: itinerary.metaDescription || itinerary.excerpt,
      images: itinerary.featuredImage && typeof itinerary.featuredImage === 'object'
        ? [getImageUrl(itinerary.featuredImage.url) || '']
        : undefined,
    },
  };
}

function DayCard({ 
  day, 
  countrySlug, 
  localePath,
  dict 
}: { 
  day: ItineraryDay; 
  countrySlug: string;
  localePath: (path: string) => string;
  dict: any;
}) {
  const cityObj = typeof day.city === 'object' ? day.city : null;

  return (
    <div className="bg-surface-primary border border-border-light overflow-hidden">
      {/* Editorial style header - no blue background */}
      <div className="px-6 py-4 border-b border-border-light flex items-center justify-between">
        <span className="text-xs tracking-[0.2em] uppercase text-accent font-medium">
          {dict.itineraries?.day || 'Day'} {day.dayNumber}
        </span>
        {cityObj && (
          <Link
            href={localePath(`/destinations/${countrySlug}/${cityObj.slug}`)}
            className="text-content-muted hover:text-content-primary text-sm transition-colors"
          >
            📍 {cityObj.name}
          </Link>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-serif text-2xl font-light text-content-primary mb-4">{day.title}</h3>

        {day.description && day.description.length > 0 && (
          <div className="prose prose-sm mb-4">
            <RichText content={day.description} />
          </div>
        )}

        {/* Activities */}
        {day.activities && day.activities.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">{dict.itineraries?.activities || 'Activities'}</h4>
            <ul className="space-y-3">
              {day.activities.map((activity, index) => {
                const attractionObj =
                  typeof activity.attraction === 'object'
                    ? activity.attraction
                    : null;

                return (
                  <li key={index} className="flex gap-3 items-start">
                    <span className="text-primary-600 font-medium min-w-[60px]">
                      {activity.time || '—'}
                    </span>
                    <div>
                      <span className="font-medium">
                        {attractionObj ? (
                          <Link
                            href={localePath(`/attractions/${(attractionObj as Attraction).slug}`)}
                            className="text-primary-600 hover:underline"
                          >
                            {activity.activity}
                          </Link>
                        ) : (
                          activity.activity
                        )}
                      </span>
                      {activity.description && (
                        <p className="text-sm text-gray-600 mt-0.5">
                          {activity.description}
                        </p>
                      )}
                      {activity.duration && (
                        <span className="text-xs text-gray-500">
                          {dict.common.duration || 'Duration'}: {activity.duration}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Meals */}
        {day.meals && (day.meals.breakfast || day.meals.lunch || day.meals.dinner) && (
          <div className="mb-4 bg-orange-50 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 mb-2">🍽️ {dict.itineraries?.meals || 'Meals'}</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              {day.meals.breakfast && (
                <div>
                  <span className="text-orange-600 font-medium">{dict.itineraries?.breakfast || 'Breakfast'}</span>
                  <p className="text-gray-700">{day.meals.breakfast}</p>
                </div>
              )}
              {day.meals.lunch && (
                <div>
                  <span className="text-orange-600 font-medium">{dict.itineraries?.lunch || 'Lunch'}</span>
                  <p className="text-gray-700">{day.meals.lunch}</p>
                </div>
              )}
              {day.meals.dinner && (
                <div>
                  <span className="text-orange-600 font-medium">{dict.itineraries?.dinner || 'Dinner'}</span>
                  <p className="text-gray-700">{day.meals.dinner}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Accommodation */}
        {day.accommodation?.name && (
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-1">🏨 {dict.itineraries?.accommodation || 'Accommodation'}</h4>
            <p className="text-gray-700">
              {day.accommodation.name}
              {day.accommodation.type && (
                <span className="text-sm text-gray-500 ml-2">
                  ({day.accommodation.type})
                </span>
              )}
            </p>
            {day.accommodation.notes && (
              <p className="text-sm text-gray-600 mt-1">{day.accommodation.notes}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default async function ItineraryDetailPage({ params }: ItineraryPageProps) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const [country, city, itinerary] = await Promise.all([
    getCountryBySlug(params.country, locale) as Promise<Country | null>,
    getCityBySlug(params.city, locale) as Promise<City | null>,
    getItineraryBySlug(params.itinerary, locale) as Promise<Itinerary | null>,
  ]);

  if (!country || !city || !itinerary) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const hreflangLinks = generateHreflangLinks(
    `/${locale}/destinations/${country.slug}/${city.slug}/${itinerary.slug}`
  );
  const localePath = (path: string) => `/${locale}${path}`;
  const countryName = country.name?.trim() || country.slug || 'Destination';
  const cityName = city.name?.trim() || city.slug || 'City';
  const itineraryTitle = itinerary.title?.trim() || itinerary.slug || 'Itinerary';

  const breadcrumbs = [
    { name: dict.destinations.title, url: localePath('/destinations') },
    { name: countryName, url: localePath(`/destinations/${country.slug}`) },
    { name: cityName, url: localePath(`/destinations/${country.slug}/${city.slug}`) },
    {
      name: itineraryTitle,
      url: localePath(`/destinations/${country.slug}/${city.slug}/${itinerary.slug}`),
    },
  ];

  const difficultyColors: Record<string, string> = {
    easy: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    challenging: 'bg-red-100 text-red-800',
  };

  return (
    <>
      {hreflangLinks}
      <JsonLd data={generateTouristTripSchema(itinerary, country, city)} />

      <HeroSection
        title={itineraryTitle}
        subtitle={`${itinerary.duration} ${dict.common.days || 'days'} - ${cityName}, ${countryName}`}
        image={itinerary.featuredImage}
        size="md"
      >
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          {itinerary.difficulty && (
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${difficultyColors[itinerary.difficulty] || 'bg-gray-100'}`}>
              {itinerary.difficulty}
            </span>
          )}
          {itinerary.travelStyle?.map((style) => (
            <span
              key={style}
              className="px-3 py-1 rounded-full text-sm bg-white/20 text-white capitalize"
            >
              {style}
            </span>
          ))}
        </div>
      </HeroSection>

      <div className="container-main py-8">
        <Breadcrumb items={breadcrumbs} className="mb-8" />

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Introduction */}
            {itinerary.description && (
              <section className="prose prose-lg max-w-none mb-12">
                <RichText content={itinerary.description} />
              </section>
            )}

            {/* Day by Day */}
            <section>
              <h2 className="text-3xl font-bold mb-8">{dict.itineraries?.dayByDay || 'Day-by-Day Itinerary'}</h2>
              <div className="space-y-6">
                {itinerary.days?.map((day, index) => (
                  <DayCard 
                    key={index} 
                    day={day} 
                    countrySlug={country.slug}
                    localePath={localePath}
                    dict={dict}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">{dict.itineraries?.tripDetails || 'Trip Details'}</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-gray-500">{dict.common.duration || 'Duration'}</dt>
                  <dd className="font-medium">{itinerary.duration} {dict.common.days || 'days'}</dd>
                </div>
                {itinerary.difficulty && (
                  <div>
                    <dt className="text-sm text-gray-500">{dict.itineraries?.difficulty || 'Difficulty'}</dt>
                    <dd className="font-medium capitalize">{itinerary.difficulty}</dd>
                  </div>
                )}
                {itinerary.estimatedBudget?.min && itinerary.estimatedBudget?.max && (
                  <div>
                    <dt className="text-sm text-gray-500">{dict.itineraries?.budget || 'Budget'}</dt>
                    <dd className="font-medium">
                      {itinerary.estimatedBudget.currency || 'USD'} {itinerary.estimatedBudget.min} - {itinerary.estimatedBudget.max}
                    </dd>
                  </div>
                )}
              </dl>

              {/* Travel Styles */}
              {itinerary.travelStyle && itinerary.travelStyle.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-bold mb-3">{dict.itineraries?.travelStyle || 'Travel Style'}</h4>
                  <div className="flex flex-wrap gap-2">
                    {itinerary.travelStyle.map((style) => (
                      <span
                        key={style}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm capitalize"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Links */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <Link
                  href={localePath(`/destinations/${country.slug}/${city.slug}`)}
                  className="block text-primary-600 hover:underline"
                >
                  ← {dict.common.backTo || 'Back to'} {city.name}
                </Link>
                <Link
                  href={localePath('/itineraries')}
                  className="block text-primary-600 hover:underline"
                >
                  {dict.common.viewAll} {dict.itineraries?.title || 'Itineraries'}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
