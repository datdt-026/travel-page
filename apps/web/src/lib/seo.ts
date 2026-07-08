import { Metadata } from 'next';
import React from 'react';
import { Country, City, Itinerary, Attraction, Media } from '@/types';
import { getMediaImageUrl } from './api';

const SITE_NAME = 'VietWay';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelsite.com';

// ============================================================================
// Types
// ============================================================================

export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: { url: string; width?: number; height?: number; alt?: string }[];
    type?: 'website' | 'article';
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// ============================================================================
// Metadata Helpers
// ============================================================================

export function generateMetadata(options: SEOMetadata): Metadata {
  const {
    title,
    description,
    canonical,
    openGraph,
    robots = { index: true, follow: true },
  } = options;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      url: canonical,
      siteName: SITE_NAME,
      type: openGraph?.type || 'website',
      images: openGraph?.images,
    },
    twitter: {
      card: 'summary_large_image',
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      images: openGraph?.images?.map((img) => img.url),
    },
    robots: {
      index: robots.index,
      follow: robots.follow,
    },
  };
}

export function getMediaUrl(media: Media | string | undefined): string | undefined {
  return getMediaImageUrl(media);
}

export function createCanonicalUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// ============================================================================
// Page-specific Metadata Generators
// ============================================================================

export function generateCountryMetadata(country: Country): Metadata {
  const imageUrl = getMediaUrl(country.featuredImage);
  const canonical = createCanonicalUrl(`/destinations/${country.slug}`);

  return generateMetadata({
    title: country.metaTitle || `${country.name} Travel Guide - Things to Do & Places to Visit`,
    description:
      country.metaDescription ||
      country.excerpt ||
      `Explore ${country.name}: discover top attractions, cities, travel tips, and plan your perfect trip.`,
    canonical,
    openGraph: {
      type: 'website',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: `${country.name} travel destination`,
            },
          ]
        : undefined,
    },
  });
}

export function generateCityMetadata(city: City, country: Country): Metadata {
  const imageUrl = getMediaUrl(city.featuredImage);
  const canonical = createCanonicalUrl(`/destinations/${country.slug}/${city.slug}`);

  return generateMetadata({
    title: city.metaTitle || `${city.name}, ${country.name} - Travel Guide & Attractions`,
    description:
      city.metaDescription ||
      city.excerpt ||
      `Plan your visit to ${city.name}, ${country.name}. Find top attractions, local tips, and travel information.`,
    canonical,
    openGraph: {
      type: 'website',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: `${city.name}, ${country.name}`,
            },
          ]
        : undefined,
    },
  });
}

export function generateItineraryMetadata(
  itinerary: Itinerary,
  city?: City,
  country?: Country
): Metadata {
  const imageUrl = getMediaUrl(itinerary.featuredImage);
  const locationPath = country && city 
    ? `/destinations/${country.slug}/${city.slug}/${itinerary.slug}`
    : `/itineraries/${itinerary.slug}`;
  const canonical = createCanonicalUrl(locationPath);

  return generateMetadata({
    title:
      itinerary.metaTitle ||
      `${itinerary.title} - ${itinerary.duration} Day Itinerary`,
    description:
      itinerary.metaDescription ||
      itinerary.excerpt ||
      `Discover our ${itinerary.duration}-day itinerary: ${itinerary.title}. Day-by-day guide with activities, tips, and recommendations.`,
    canonical,
    openGraph: {
      type: 'article',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: itinerary.title,
            },
          ]
        : undefined,
    },
  });
}

export function generateAttractionMetadata(attraction: Attraction): Metadata {
  const imageUrl = getMediaUrl(attraction.featuredImage);
  const canonical = createCanonicalUrl(`/attractions/${attraction.slug}`);
  const city = typeof attraction.city === 'object' ? attraction.city : null;
  const country = city && typeof city.country === 'object' ? city.country : null;

  const locationString = [city?.name, country?.name].filter(Boolean).join(', ');

  return generateMetadata({
    title:
      attraction.metaTitle ||
      `${attraction.name}${locationString ? ` - ${locationString}` : ''} | Visitor Guide`,
    description:
      attraction.metaDescription ||
      attraction.excerpt ||
      `Visit ${attraction.name}${locationString ? ` in ${locationString}` : ''}. Opening hours, ticket prices, tips, and essential visitor information.`,
    canonical,
    openGraph: {
      type: 'article',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: attraction.name,
            },
          ]
        : undefined,
    },
  });
}

export function generateBlogMetadata(
  title: string,
  description: string,
  slug: string,
  imageUrl?: string
): Metadata {
  const canonical = createCanonicalUrl(`/blog/${slug}`);

  return generateMetadata({
    title: `${title} | ${SITE_NAME} Blog`,
    description,
    canonical,
    openGraph: {
      type: 'article',
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
  });
}

// ============================================================================
// JSON-LD Schema Generators
// ============================================================================

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateTouristDestinationSchema(
  name: string,
  description: string,
  imageUrl?: string,
  geo?: { latitude?: number; longitude?: number }
): object {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    description,
  };

  if (imageUrl) {
    schema.image = imageUrl;
  }

  if (geo?.latitude && geo?.longitude) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    };
  }

  return schema;
}

export function generateTouristTripSchema(
  itinerary: Itinerary,
  country?: Country,
  city?: City
): object {
  const imageUrl = getMediaUrl(itinerary.featuredImage);
  const destinations: string[] = [];

  if (country) destinations.push(country.name);
  if (city) destinations.push(city.name);

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: itinerary.title,
    description: itinerary.excerpt,
    image: imageUrl,
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: itinerary.duration,
      itemListElement: itinerary.days?.map((day, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: day.title,
        description: `Day ${day.dayNumber}: ${day.title}`,
      })),
    },
    touristType: itinerary.travelStyle?.map((style) =>
      style.charAt(0).toUpperCase() + style.slice(1)
    ),
    ...(destinations.length > 0 && {
      touristDestination: destinations.map((dest) => ({
        '@type': 'TouristDestination',
        name: dest,
      })),
    }),
  };
}

export function generateTouristAttractionSchema(attraction: Attraction): object {
  const imageUrl = getMediaUrl(attraction.featuredImage);
  const city = typeof attraction.city === 'object' ? attraction.city : null;
  const country = city && typeof city.country === 'object' ? city.country : null;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: attraction.name,
    description: attraction.excerpt,
  };

  if (imageUrl) {
    schema.image = imageUrl;
  }

  if (attraction.coordinates?.latitude && attraction.coordinates?.longitude) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: attraction.coordinates.latitude,
      longitude: attraction.coordinates.longitude,
    };
  }

  if (attraction.address) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: attraction.address,
      addressLocality: city?.name,
      addressCountry: country?.name,
    };
  }

  if (attraction.openingHours) {
    schema.openingHours = attraction.openingHours;
  }

  if (attraction.rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: attraction.rating,
      bestRating: 5,
    };
  }

  return schema;
}

export function generateOrganizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://twitter.com/travelsite',
      'https://facebook.com/travelsite',
      'https://instagram.com/travelsite',
    ],
  };
}

export function generateWebsiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ============================================================================
// JSON-LD Component Helper
// ============================================================================

export function JsonLd({ data }: { data: object | object[] }): React.ReactElement {
  const jsonLdArray = Array.isArray(data) ? data : [data];

  return React.createElement(
    React.Fragment,
    null,
    ...jsonLdArray.map((item: object, index: number) =>
      React.createElement('script', {
        key: index,
        type: 'application/ld+json',
        dangerouslySetInnerHTML: { __html: JSON.stringify(item) },
      })
    )
  );
}
