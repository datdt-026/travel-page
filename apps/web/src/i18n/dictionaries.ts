import { defaultLocale, type Locale } from './config';

// Define dictionary type based on the structure of our JSON files
export type Dictionary = {
  common: {
    siteName: string;
    home: string;
    destinations: string;
    attractions: string;
    itineraries: string;
    blog: string;
    about: string;
    contact: string;
    faq: string;
    search: string;
    viewAll: string;
    readMore: string;
    share: string;
    loading: string;
    error: string;
    notFound: string;
    backHome: string;
    days: string;
    gallery: string;
    quickFacts: string;
    continent: string;
    language: string;
    currency: string;
    timezone: string;
    bestTimeToVisit: string;
    highlights: string;
    cityInfo: string;
    country: string;
    population: string;
    viewItineraries: string;
    duration: string;
    backTo: string;
    noResults: string;
    location: string;
    address: string;
    free: string;
    company?: string;
    partnership?: string;
    resources?: string;
    expertise?: string;
    sustainability?: string;
    caseStudies?: string;
    partners?: string;
    partnerInquiry?: string;
    cities?: string;
    featured?: string;
    explore?: string;
    languageLabel?: string;
  };
  home: {
    heroTitle: string;
    heroDescription: string;
    exploreDestinations: string;
    viewItineraries: string;
    featuredCountries: string;
    featuredCities: string;
    featuredItineraries: string;
  };
  destinations: {
    title: string;
    description: string;
    countries: string;
    cities: string;
    noResults: string;
    popularCities: string;
  };
  attractions: {
    title: string;
    description: string;
    noResults: string;
    thingsToDo: string;
    visitorTips: string;
    visitorInfo: string;
    openingHours: string;
    ticketPrice: string;
    search: string;
    filters: string;
    category: string;
    city: string;
    rating: string;
    allCategories: string;
    allCities: string;
    allRatings: string;
    loadMore: string;
    showing: string;
    of: string;
    clearFilters: string;
    howToExperience?: string;
    practicalNotes?: string;
    alsoInRegion?: string;
    visitDuration?: string;
  };
  itineraries: {
    title: string;
    description: string;
    days: string;
    noResults: string;
    including: string;
    dayByDay: string;
    tripDetails: string;
    difficulty: string;
    budget: string;
    travelStyle: string;
    accommodation: string;
  };
  listing: {
    filters: string;
    clearFilters: string;
    loadMore: string;
    region: string;
    travelStyle: string;
    season: string;
    type: string;
    location: string;
    duration: string;
    pace: string;
    theme: string;
  };
  cities: {
    title: string;
    description: string;
    noResults: string;
    localTips: string;
  };
  countries: {
    title: string;
    description: string;
    noResults: string;
  };
  blog: {
    title: string;
    description: string;
    noResults: string;
    subtitle: string;
    by: string;
    backToBlog: string;
    tags: string;
    writtenBy: string;
    contributor: string;
    published: string;
    readingTime: string;
    category: string;
  };
  about: {
    title: string;
    description: string;
    heroSubtitle?: string;
    intro?: {
      title?: string;
      content?: string;
    };
    story?: {
      eyebrow?: string;
      title?: string;
      content?: string;
      highlight?: string;
    };
    mission?: {
      eyebrow?: string;
      title?: string;
      content?: string;
    };
    values?: {
      eyebrow?: string;
      title?: string;
      curated?: {
        icon?: string;
        title?: string;
        description?: string;
      };
      personal?: {
        icon?: string;
        title?: string;
        description?: string;
      };
      trusted?: {
        icon?: string;
        title?: string;
        description?: string;
      };
      sustainable?: {
        icon?: string;
        title?: string;
        description?: string;
      };
    };
    stats?: {
      travelers?: { number?: string; label?: string };
      destinations?: { number?: string; label?: string };
      years?: { number?: string; label?: string };
      rating?: { number?: string; label?: string };
    };
    whyChoose?: {
      eyebrow?: string;
      title?: string;
      items?: { title?: string; description?: string }[];
    };
    cta?: {
      title?: string;
      subtitle?: string;
      primaryButton?: string;
      secondaryButton?: string;
    };
  };
  contact: {
    title: string;
    description: string;
    subtitle: string;
    sendMessage: string;
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    send: string;
    getInTouch: string;
    emailUs: string;
    office: string;
    hours: string;
    callUs: string;
    yourName: string;
    yourEmail: string;
    subject: string;
    yourMessage: string;
    name: string;
  };
  faq: {
    title: string;
    description: string;
    subtitle: string;
    stillHaveQuestions: string;
    contactUs: string;
    searchPlaceholder: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    explore: string;
    support: string;
    newsletter: string;
    newsletterDescription: string;
    emailPlaceholder: string;
    subscribe: string;
    copyright: string;
    privacyPolicy?: string;
    termsConditions?: string;
    luxuryTravelPartner?: string;
    telephone?: string;
  };
  contactToolbar?: {
    ariaLabel?: string;
    speakWithUs?: string;
    writeToUs?: string;
    sendNote?: string;
    requestCall?: string;
    startConversation?: string;
    openContactOptions?: string;
    close?: string;
    howCanWeHelp?: string;
    readyMessage?: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };
};

// Dictionary cache for performance
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  vi: () => import('./dictionaries/vi.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
};

/**
 * Get dictionary for a specific locale
 * This function should only be called on the server
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale];
  
  // Fallback to the app's default locale if locale is invalid
  if (!loader) {
    console.warn(`Invalid locale "${locale}", falling back to "${defaultLocale}"`);
    return dictionaries[defaultLocale]();
  }
  
  return loader();
}
