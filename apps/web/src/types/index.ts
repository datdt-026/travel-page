// Media type
export interface Media {
  id: string;
  alt: string;
  caption?: string;
  credit?: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: ImageSize;
    card?: ImageSize;
    hero?: ImageSize;
  };
  createdAt: string;
  updatedAt: string;
}

interface ImageSize {
  url: string;
  width: number;
  height: number;
  filename: string;
  mimeType: string;
  filesize: number;
}

// User type
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'author';
  createdAt: string;
  updatedAt: string;
}

// Rich text content type
export interface RichTextContent {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  children?: RichTextContent[];
  url?: string;
  newTab?: boolean;
}

// Country type
export interface Country {
  id: string;
  name: string;
  slug: string;
  continent: 'africa' | 'asia' | 'europe' | 'north-america' | 'oceania' | 'south-america';
  description: RichTextContent[];
  excerpt: string;
  featuredImage: Media | string;
  gallery?: { image: Media | string }[];
  currency?: string;
  language?: string;
  timezone?: string;
  bestTimeToVisit?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// City type
export interface City {
  id: string;
  name: string;
  slug: string;
  country: Country | string;
  description: RichTextContent[];
  excerpt: string;
  featuredImage: Media | string;
  gallery?: { image: Media | string }[];
  population?: number;
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
  highlights?: {
    title: string;
    description?: string;
  }[];
  localTips?: RichTextContent[];
  bestTimeToVisit?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Attraction type
export interface Attraction {
  id: string;
  name: string;
  slug: string;
  city: City | string;
  category:
    | 'landmark'
    | 'museum'
    | 'park'
    | 'beach'
    | 'religious-site'
    | 'entertainment'
    | 'shopping'
    | 'restaurant'
    | 'nature'
    | 'historical'
    | 'adventure'
    | 'other';
  description: RichTextContent[];
  excerpt: string;
  featuredImage: Media | string;
  gallery?: { image: Media | string }[];
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
  address?: string;
  openingHours?: string;
  ticketPrice?: {
    adult?: number;
    child?: number;
    currency?: string;
    notes?: string;
  };
  visitDuration?: string;
  rating?: number;
  tips?: { tip: string }[];
  website?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Itinerary types
export interface ItineraryActivity {
  time?: string;
  activity: string;
  description?: string;
  attraction?: Attraction | string;
  duration?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  city?: City | string;
  description?: RichTextContent[];
  activities?: ItineraryActivity[];
  accommodation?: {
    name?: string;
    type?: 'hotel' | 'hostel' | 'airbnb' | 'resort' | 'camping' | 'other';
    notes?: string;
  };
  meals?: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
}

// ═══════════════════════════════════════════════════════════════════
// EDITORIAL SECTION TYPES (for Editorial Mode itineraries)
// ═══════════════════════════════════════════════════════════════════

// Base interface for all editorial blocks
export interface EditorialSectionBase {
  id?: string;
  blockType: string;
  enabled?: boolean;
}

// Journey Introduction Block
export interface JourneyIntroductionSection extends EditorialSectionBase {
  blockType: 'intro';
  openingLine?: string;
  narrative?: RichTextContent[];
  essence?: { theme: string }[];
  featuredImage?: Media | string;
  imageStyle?: 'full-bleed' | 'contained' | 'split';
}

// Journey Chapter Block
export interface JourneyChapterSection extends EditorialSectionBase {
  blockType: 'chapter';
  chapterTitle: string;
  chapterSubtitle?: string;
  chapterNumber?: number;
  chapterLabel?: string;
  dayNumber?: number;
  dayRangeStart?: number;
  dayRangeEnd?: number;
  timeHint?: string;
  showDayIndicator?: boolean;
  image?: Media | string;
  imagePosition?: 'full-width' | 'left' | 'right' | 'background';
  imageAspectRatio?: 'ratio_21_9' | 'ratio_16_9' | 'ratio_4_3' | 'ratio_1_1' | 'ratio_3_4';
  narrative?: RichTextContent[];
  pullQuote?: string;
  moments?: { time?: string; moment?: string }[];
  location?: {
    city?: City | string;
    customLocation?: string;
  };
}

// Experience Block
export interface ExperienceSection extends EditorialSectionBase {
  blockType: 'experience';
  experienceType: 'culture-heritage' | 'nature-landscape' | 'culinary' | 'local-encounters' | 'wellness' | 'adventure' | 'art-architecture' | 'slow-travel' | 'hidden-gems';
  title?: string;
  introduction?: string;
  experiences: {
    title: string;
    description?: RichTextContent[];
    image?: Media | string;
    atmosphere?: string;
    location?: string;
    attraction?: Attraction | string;
  }[];
  layout?: 'stacked' | 'editorial-grid' | 'masonry' | 'featured-list';
  showDivider?: boolean;
}

// Narrative Interlude Block
export interface NarrativeInterludeSection extends EditorialSectionBase {
  blockType: 'interlude';
  interludeType: 'quote' | 'image' | 'image-caption' | 'reflection' | 'transition';
  quote?: string;
  quoteAttribution?: string;
  image?: Media | string;
  imageHeight?: 'small' | 'medium' | 'large' | 'full';
  reflection?: RichTextContent[]; // RichText field for reflection type
  transitionText?: string; // Text field for transition type
}

// Journey Gallery Block
export interface JourneyGallerySection extends EditorialSectionBase {
  blockType: 'gallery';
  title?: string;
  images: {
    image: Media | string;
    caption?: string;
    featured?: boolean;
  }[];
  layout?: 'editorial' | 'masonry' | 'horizontal' | 'staggered';
  spacing?: 'tight' | 'comfortable' | 'generous';
}

// Practical Essentials Block
export interface PracticalEssentialsSection extends EditorialSectionBase {
  blockType: 'essentials';
  title?: string;
  introduction?: string;
  categories?: {
    categoryType: 'best-time' | 'packing' | 'getting-there' | 'local-tips' | 'climate' | 'cultural-notes' | 'practical';
    title?: string;
    content?: RichTextContent[];
    items?: { item: string }[];
  }[];
  layout?: 'minimal' | 'cards' | 'accordion';
  showIcon?: boolean;
}

// Union type for all editorial sections
export type EditorialSection =
  | JourneyIntroductionSection
  | JourneyChapterSection
  | ExperienceSection
  | NarrativeInterludeSection
  | JourneyGallerySection
  | PracticalEssentialsSection;

export interface Itinerary {
  id: string;
  title: string;
  slug: string;
  description: RichTextContent[];
  excerpt: string;
  featuredImage: Media | string;
  duration: number;
  countries?: (Country | string)[];
  cities?: (City | string)[];
  difficulty?: 'easy' | 'moderate' | 'challenging';
  travelStyle?: (
    | 'adventure'
    | 'cultural'
    | 'relaxation'
    | 'foodie'
    | 'family'
    | 'romantic'
    | 'budget'
    | 'luxury'
    | 'solo'
    | 'backpacking'
  )[];
  estimatedBudget?: {
    min?: number;
    max?: number;
    currency?: string;
    notes?: string;
  };
  days: ItineraryDay[];
  // Editorial Mode fields
  presentationMode?: 'editorial' | 'classic';
  editorialSections?: EditorialSection[];
  packingList?: {
    item: string;
    category?: 'clothing' | 'electronics' | 'toiletries' | 'documents' | 'gear' | 'other';
  }[];
  tips?: RichTextContent[];
  author?: User | string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Blog Post type
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: RichTextContent[];
  featuredImage?: Media | string;
  category:
    | 'travel-tips'
    | 'destinations'
    | 'food-drink'
    | 'adventure'
    | 'culture'
    | 'budget'
    | 'eco-travel'
    | 'solo-travel'
    | 'family-travel'
    | 'guides'
    | 'other';
  author?: User | string;
  readTime?: string;
  tags?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Page type
export interface Page {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: RichTextContent[];
  featuredImage?: Media | string;
  contentBlocks?: {
    blockType: 'text' | 'image' | 'info-card';
    title?: string;
    text?: RichTextContent[];
    image?: Media | string;
    icon?: string;
  }[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Destinations page global configuration
// Synced with ItinerariesPage and AttractionsPage for consistent structure
export interface DestinationsPageConfig {
  hero?: {
    backgroundImage?: Media | string;
    title?: string;
    subtitle?: string;
    height?: 'small' | 'medium' | 'large';
    overlayStyle?: 'none' | 'light' | 'medium' | 'heavy';
    contentPosition?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    textAlignment?: 'left' | 'center' | 'right';
    showBreadcrumb?: boolean;
    breadcrumbLabel?: string;
  };
  introduction?: {
    title?: string;
    content?: RichTextContent[];
  };
  listing?: {
    itemsPerPage?: number;
    layout?: 'grid' | 'list' | 'cards';
    columns?: '2' | '3' | '4';
    showFilters?: boolean;
    showSearch?: boolean;
    searchPlaceholder?: string;
    filterOptions?: {
      showContinentFilter?: boolean;
      showTravelStyleFilter?: boolean;
      showSeasonFilter?: boolean;
    };
  };
  featured?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    displayMode?: 'auto' | 'manual';
    manualItems?: Country[] | string[];
    limit?: number;
  };
  emptyState?: {
    title?: string;
    message?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

// Country layout item for destinations page
// NOTE: This must match the CMS DestinationsPage.countriesSection.countries array item structure
export interface CountryLayoutItem {
  id: string;                   // Unique ID for each layout item from CMS
  country: Country | string;    // Can be populated object or just ID string
  customImage?: Media | string; // Optional custom card image
  customLogo?: Media | string;  // Optional custom logo/flag
  columnSpan: number;           // Grid columns (1-4)
  rowSpan?: number;             // Grid rows (1-3)
  aspectRatio?: 'auto' | '1/1' | '4/3' | '3/2' | '16/9' | '21/9' | '2/3' | '3/4';
  height?: 'auto' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showFlag?: boolean;           // Show flag icon on card
  showExcerpt?: boolean;        // Show country excerpt on card
}

// FAQ type
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  answerRichText?: RichTextContent[];
  category:
    | 'general'
    | 'using-travelsite'
    | 'trip-planning'
    | 'bookings'
    | 'account'
    | 'technical'
    | 'other';
  order: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Section Styling Configuration
// ============================================================================
export interface SectionStyling {
  sectionBackground?: string;
  cardBackground?: string;
  cardBorderColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  textColor?: string;
  cardTitleColor?: string;
  cardTextColor?: string;
  accentColor?: string;
  buttonBackground?: string;
  buttonTextColor?: string;
}

// ============================================================================
// Home Page Global Configuration
// ============================================================================
export interface HomePageConfig {
  hero?: {
    backgroundImage?: Media | string;
    backgroundVideo?: Media | string;
    videoPoster?: Media | string;
    mediaType?: 'image' | 'video';
    tagline?: string;
    title?: string;
    brandName?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    overlayStyle?: 'none' | 'light' | 'medium' | 'heavy';
    contentPosition?: string;
    textAlignment?: 'left' | 'center' | 'right';
    styling?: SectionStyling;
  };
  philosophy?: {
    enabled?: boolean;
    tagline?: string;
    statement?: string;
    signature?: string;
    image?: Media | string;
    styling?: SectionStyling;
  };
  destinations?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    featuredCountries?: (Country | string)[];
    ctaText?: string;
    ctaLink?: string;
    limit?: number;
    styling?: SectionStyling;
  };
  experiences?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    featuredItineraries?: (Itinerary | string)[];
    ctaLabel?: string;
    ctaLink?: string;
    limit?: number;
    styling?: SectionStyling;
  };
  testimonials?: {
    enabled?: boolean;
    title?: string;
    items?: {
      id?: string;
      quote: string;
      author: string;
      location?: string;
      trip?: string;
    }[];
    styling?: SectionStyling;
  };
  cta?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    description?: string;
    primaryCtaText?: string;
    primaryCtaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    backgroundImage?: Media | string;
    styling?: SectionStyling;
  };
  // B2B Stats Section
  b2bStats?: {
    enabled?: boolean;
    backgroundImage?: Media | string;
    items?: {
      number?: string;
      label?: string;
      description?: string;
    }[];
    styling?: SectionStyling;
  };
  // B2B Value Proposition Section
  b2bValueProposition?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    highlights?: {
      icon?: string;
      title?: string;
      description?: string;
    }[];
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    backgroundImage?: Media | string;
    variant?: 'premium' | 'standard';
    styling?: SectionStyling;
  };
  // B2B Services Overview Section
  b2bServicesOverview?: {
    enabled?: boolean;
    variant?: 'cards' | 'horizontal';
    eyebrow?: string;
    title?: string;
    description?: string;
    services?: {
      icon?: string;
      title?: string;
      description?: string;
      image?: Media | string;
      stats?: {
        value?: string;
        label?: string;
      };
      features?: { feature?: string }[];
      link?: string;
    }[];
    styling?: SectionStyling;
  };
  // B2B Quick Credentials Section
  b2bCredentials?: {
    enabled?: boolean;
    variant?: 'floating' | 'timeline' | 'showcase';
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    items?: {
      type?: 'stat' | 'certification' | 'award' | 'membership';
      value?: string;
      label?: string;
      description?: string;
      logo?: Media | string;
      year?: string;
    }[];
    styling?: SectionStyling;
  };
  // B2B Partner Showcase Section (Premium)
  b2bPartnerShowcase?: {
    enabled?: boolean;
    variant?: 'marquee' | 'grid' | 'featured';
    eyebrow?: string;
    title?: string;
    description?: string;
    backgroundImage?: Media | string;
    partners?: {
      logo?: Media | string;
      name?: string;
      country?: string;
      url?: string;
      testimonial?: string;
      representative?: string;
    }[];
    ctaText?: string;
    ctaLink?: string;
    styling?: SectionStyling;
  };
  // B2B CTA Section
  b2bCta?: {
    enabled?: boolean;
    variant?: 'cinematic' | 'split' | 'minimal';
    eyebrow?: string;
    title?: string;
    description?: string;
    backgroundImage?: Media | string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    stats?: {
      value?: string;
      label?: string;
    }[];
    styling?: SectionStyling;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

// ============================================================================
// Site Header Global Configuration
// ============================================================================
export interface SiteHeaderConfig {
  logo?: {
    image?: Media | string;
    lightImage?: Media | string;
    altText?: string;
  };
  navigation?: {
    id?: string;
    label: string;
    link: string;
    openInNewTab?: boolean;
    children?: {
      id?: string;
      label: string;
      link: string;
      description?: string;
      openInNewTab?: boolean;
    }[];
  }[];
  ctaButton?: {
    enabled?: boolean;
    label?: string;
    link?: string;
  };
  settings?: {
    sticky?: boolean;
    transparentOnHero?: boolean;
    showLanguageSwitcher?: boolean;
  };
}

// ============================================================================
// Site Footer Global Configuration
// ============================================================================
export interface SiteFooterConfig {
  brand?: {
    logo?: Media | string;
    description?: string;
  };
  columns?: {
    id?: string;
    title: string;
    links: {
      id?: string;
      label: string;
      link: string;
      openInNewTab?: boolean;
    }[];
  }[];
  newsletter?: {
    enabled?: boolean;
    title?: string;
    description?: string;
    placeholder?: string;
    buttonLabel?: string;
  };
  social?: {
    id?: string;
    platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'pinterest' | 'linkedin' | 'tiktok';
    url: string;
  }[];
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  bottomBar?: {
    copyright?: string;
    legalLinks?: {
      id?: string;
      label: string;
      link: string;
    }[];
  };
}

// ============================================================================
// Page-Specific Global Configurations (CMS)
// ============================================================================

/**
 * Attractions Page Configuration
 */
export interface AttractionsPageConfig {
  hero?: {
    backgroundImage?: Media | string;
    title?: string;
    subtitle?: string;
    height?: 'small' | 'medium' | 'large';
    overlayStyle?: 'light' | 'medium' | 'heavy';
    showBreadcrumb?: boolean;
    breadcrumbLabel?: string;
  };
  listing?: {
    itemsPerPage?: number;
    layout?: 'grid' | 'list' | 'masonry';
    columns?: '2' | '3' | '4';
    showFilters?: boolean;
    showSearch?: boolean;
    searchPlaceholder?: string;
    filterOptions?: {
      showCityFilter?: boolean;
      showCategoryFilter?: boolean;
      showRatingFilter?: boolean;
      showPriceFilter?: boolean;
    };
  };
  categories?: {
    enabled?: boolean;
    title?: string;
    displayStyle?: 'pills' | 'cards' | 'icons';
  };
  featured?: {
    enabled?: boolean;
    title?: string;
    displayMode?: 'auto' | 'manual';
    manualItems?: (Attraction | string)[];
    limit?: number;
  };
  emptyState?: {
    title?: string;
    message?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

/**
 * Cities Page Configuration
 */
export interface CitiesPageConfig {
  hero?: {
    backgroundImage?: Media | string;
    title?: string;
    subtitle?: string;
    height?: 'small' | 'medium' | 'large';
    overlayStyle?: 'light' | 'medium' | 'heavy';
    showBreadcrumb?: boolean;
    breadcrumbLabel?: string;
  };
  listing?: {
    itemsPerPage?: number;
    layout?: 'grid' | 'list' | 'map';
    columns?: '2' | '3' | '4';
    showFilters?: boolean;
    filterOptions?: {
      showCountryFilter?: boolean;
      showRegionFilter?: boolean;
    };
    showSearch?: boolean;
    searchPlaceholder?: string;
    sortOptions?: string[];
  };
  featured?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    displayMode?: 'auto' | 'manual';
    manualItems?: (City | string)[];
    limit?: number;
  };
  countriesSection?: {
    enabled?: boolean;
    title?: string;
    displayStyle?: 'links' | 'cards';
  };
  emptyState?: {
    title?: string;
    message?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

/**
 * Countries Page Configuration
 */
export interface CountriesPageConfig {
  hero?: {
    backgroundImage?: Media | string;
    title?: string;
    subtitle?: string;
    height?: 'small' | 'medium' | 'large';
    overlayStyle?: 'light' | 'medium' | 'heavy';
    showBreadcrumb?: boolean;
    breadcrumbLabel?: string;
  };
  listing?: {
    layout?: 'grid' | 'cards' | 'map';
    columns?: '2' | '3' | '4';
    showSearch?: boolean;
    searchPlaceholder?: string;
    showRegionFilter?: boolean;
    regions?: { id: string; label: string }[];
    showCityCount?: boolean;
    showFlags?: boolean;
  };
  featured?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    displayMode?: 'auto' | 'manual';
    manualItems?: (Country | string)[];
    limit?: number;
    layout?: 'grid' | 'cards' | 'carousel';
  };
  regionsOverview?: {
    enabled?: boolean;
    title?: string;
    displayStyle?: 'cards' | 'map' | 'links';
    items?: {
      regionId: string;
      name: string;
      description?: string;
      image?: { url?: string };
    }[];
  };
  emptyState?: {
    title?: string;
    message?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

/**
 * Itineraries Page Configuration
 */
export interface ItinerariesPageConfig {
  hero?: {
    backgroundImage?: Media | string;
    title?: string;
    subtitle?: string;
    height?: 'small' | 'medium' | 'large';
    overlayStyle?: 'light' | 'medium' | 'heavy';
    showBreadcrumb?: boolean;
    breadcrumbLabel?: string;
  };
  listing?: {
    itemsPerPage?: number;
    layout?: 'grid' | 'list' | 'cards';
    columns?: '2' | '3' | '4';
    showFilters?: boolean;
    showSearch?: boolean;
    searchPlaceholder?: string;
    filterOptions?: {
      showDurationFilter?: boolean;
      showDifficultyFilter?: boolean;
      showStyleFilter?: boolean;
      showCountryFilter?: boolean;
    };
  };
  featured?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    displayMode?: 'auto' | 'manual';
    manualItems?: (Itinerary | string)[];
    limit?: number;
  };
  cta?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundImage?: Media | string;
  };
  emptyState?: {
    title?: string;
    message?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

/**
 * Blog Page Configuration
 */
export interface BlogPageConfig {
  hero?: {
    backgroundImage?: Media | string;
    title?: string;
    subtitle?: string;
    height?: 'small' | 'medium' | 'large';
    overlayStyle?: 'light' | 'medium' | 'heavy';
    showBreadcrumb?: boolean;
    breadcrumbLabel?: string;
  };
  listing?: {
    postsPerPage?: number;
    layout?: 'grid' | 'list' | 'magazine';
    columns?: '2' | '3' | '4';
    showCategories?: boolean;
    showSearch?: boolean;
    showFeaturedSection?: boolean;
    featuredPostsCount?: number;
  };
  emptyState?: {
    title?: string;
    message?: string;
    showCTA?: boolean;
    ctaText?: string;
    ctaLink?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

/**
 * FAQ Page Configuration
 */
export interface FAQPageConfig {
  hero?: {
    backgroundImage?: Media | string;
    title?: string;
    subtitle?: string;
    height?: 'small' | 'medium' | 'large';
    overlayStyle?: 'light' | 'medium' | 'heavy';
    showBreadcrumb?: boolean;
    breadcrumbLabel?: string;
  };
  search?: {
    enabled?: boolean;
    placeholder?: string;
  };
  listing?: {
    showCategories?: boolean;
    style?: 'accordion' | 'cards' | 'list';
    allowMultipleOpen?: boolean;
    expandFirstItem?: boolean;
  };
  contactCta?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundColor?: 'light' | 'dark' | 'accent';
  };
  emptyState?: {
    title?: string;
    message?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

/**
 * About Page Configuration
 */
export interface AboutPageConfig {
  hero?: {
    backgroundImage?: Media | string;
    title?: string;
    subtitle?: string;
    height?: 'small' | 'medium' | 'large';
    overlayStyle?: 'light' | 'medium' | 'heavy';
    showAccentLine?: boolean;
  };
  mission?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    content?: RichTextContent[];
    image?: Media | string;
    imagePosition?: 'left' | 'right';
  };
  values?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    items?: {
      icon?: string;
      title?: string;
      description?: string;
    }[];
    columns?: '2' | '3' | '4';
    backgroundColor?: 'default' | 'light' | 'dark';
  };
  team?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    members?: {
      photo?: Media | string;
      name?: string;
      role?: string;
      bio?: string;
      socials?: {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
      };
    }[];
  };
  stats?: {
    enabled?: boolean;
    items?: {
      number?: string;
      label?: string;
    }[];
    backgroundColor?: 'light' | 'dark' | 'accent';
  };
  cta?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    backgroundImage?: Media | string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

/**
 * Contact Page Configuration
 */
export interface ContactPageConfig {
  hero?: {
    backgroundImage?: Media | string;
    title?: string;
    subtitle?: string;
    height?: 'small' | 'medium' | 'large';
    overlayStyle?: 'light' | 'medium' | 'heavy';
  };
  contactInfo?: {
    sectionTitle?: string;
    email?: {
      icon?: string;
      label?: string;
      value?: string;
      description?: string;
    };
    phone?: {
      icon?: string;
      label?: string;
      value?: string;
      description?: string;
    };
    address?: {
      icon?: string;
      label?: string;
      value?: string;
      mapLink?: string;
    };
    hours?: {
      icon?: string;
      label?: string;
      value?: string;
    };
  };
  form?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    fields?: {
      namePlaceholder?: string;
      emailPlaceholder?: string;
      subjectPlaceholder?: string;
      messagePlaceholder?: string;
      submitButtonText?: string;
    };
    successMessage?: string;
    errorMessage?: string;
  };
  social?: {
    enabled?: boolean;
    title?: string;
    links?: {
      platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok' | 'pinterest';
      url: string;
    }[];
  };
  map?: {
    enabled?: boolean;
    embedUrl?: string;
    height?: 'small' | 'medium' | 'large';
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

// Category labels for display
export const BLOG_CATEGORY_LABELS: Record<BlogPost['category'], string> = {
  'travel-tips': 'Travel Tips',
  destinations: 'Destinations',
  'food-drink': 'Food & Drink',
  adventure: 'Adventure',
  culture: 'Culture',
  budget: 'Budget Travel',
  'eco-travel': 'Eco Travel',
  'solo-travel': 'Solo Travel',
  'family-travel': 'Family Travel',
  guides: 'Guides',
  other: 'Other',
};

export const FAQ_CATEGORY_LABELS: Record<FAQ['category'], string> = {
  general: 'General',
  'using-travelsite': 'Using VietWay',
  'trip-planning': 'Trip Planning',
  bookings: 'Bookings',
  account: 'Account',
  technical: 'Technical',
  other: 'Other',
};

// Attraction category labels
export const ATTRACTION_CATEGORY_LABELS: Record<Attraction['category'], string> = {
  landmark: 'Landmark',
  museum: 'Museum',
  park: 'Park',
  beach: 'Beach',
  'religious-site': 'Religious Site',
  entertainment: 'Entertainment',
  shopping: 'Shopping',
  restaurant: 'Restaurant',
  nature: 'Nature',
  historical: 'Historical',
  adventure: 'Adventure',
  other: 'Other',
};

// Continent labels
export const CONTINENT_LABELS: Record<Country['continent'], string> = {
  africa: 'Africa',
  asia: 'Asia',
  europe: 'Europe',
  'north-america': 'North America',
  oceania: 'Oceania',
  'south-america': 'South America',
};

// Travel style labels
export const TRAVEL_STYLE_LABELS: Record<string, string> = {
  adventure: 'Adventure',
  cultural: 'Cultural',
  relaxation: 'Relaxation',
  foodie: 'Foodie',
  family: 'Family',
  romantic: 'Romantic',
  budget: 'Budget',
  luxury: 'Luxury',
  solo: 'Solo',
  backpacking: 'Backpacking',
};

// Difficulty labels
export const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  challenging: 'Challenging',
};

// ============================================================================
// Detail Page Configurations (CMS)
// ============================================================================

/**
 * Attraction Detail Page Configuration
 */
export interface AttractionDetailConfig {
  hero?: {
    height?: 'small' | 'medium' | 'large' | 'full';
    overlayStyle?: 'none' | 'light' | 'medium' | 'heavy' | 'gradient';
    contentPosition?: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center-left' | 'center' | 'center-right';
    showBreadcrumb?: boolean;
    showCategory?: boolean;
    showRating?: boolean;
    animationStyle?: 'none' | 'fade-in' | 'fade-up' | 'slide-in';
  };
  contentLayout?: {
    layout?: 'sidebar-right' | 'sidebar-left' | 'full-width' | 'centered';
    sidebarWidth?: 'narrow' | 'normal' | 'wide';
    contentMaxWidth?: 'default' | 'narrow' | 'wide' | 'full';
    stickybar?: boolean;
  };
  sections?: {
    showDescription?: boolean;
    showTips?: boolean;
    tipsStyle?: 'cards' | 'list' | 'accordion';
    showGallery?: boolean;
    galleryStyle?: 'grid' | 'masonry' | 'carousel' | 'lightbox';
    galleryColumns?: '2' | '3' | '4';
    showMap?: boolean;
    showRelatedAttractions?: boolean;
    relatedAttractionsLimit?: number;
    showNearbyAttractions?: boolean;
  };
  sidebar?: {
    showVisitorInfo?: boolean;
    showLocation?: boolean;
    showAddress?: boolean;
    showOpeningHours?: boolean;
    showTicketPrice?: boolean;
    showVisitDuration?: boolean;
    showWebsite?: boolean;
    showShareButton?: boolean;
    showBookingCTA?: boolean;
    bookingCtaText?: string;
    bookingCtaLink?: string;
  };
  labels?: {
    visitorTipsTitle?: string;
    galleryTitle?: string;
    visitorInfoTitle?: string;
    relatedTitle?: string;
    nearbyTitle?: string;
  };
  categoryLabels?: {
    category: Attraction['category'];
    label: string;
    icon?: string;
  }[];
  schema?: {
    enableJsonLd?: boolean;
    schemaType?: 'TouristAttraction' | 'LocalBusiness' | 'Museum' | 'Park' | 'Place';
    enableOpenGraph?: boolean;
    enableTwitterCard?: boolean;
    twitterCardType?: 'summary' | 'summary_large_image';
  };
}

/**
 * City Detail Page Configuration
 */
export interface CityDetailConfig {
  hero?: {
    height?: 'small' | 'medium' | 'large' | 'full';
    overlayStyle?: 'none' | 'light' | 'medium' | 'heavy' | 'gradient';
    contentPosition?: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center-left' | 'center' | 'center-right';
    showBreadcrumb?: boolean;
    showCountryName?: boolean;
    showPopulation?: boolean;
    animationStyle?: 'none' | 'fade-in' | 'fade-up' | 'slide-in';
  };
  contentLayout?: {
    layout?: 'sidebar-right' | 'sidebar-left' | 'full-width' | 'centered';
    sidebarWidth?: 'narrow' | 'normal' | 'wide';
    stickybar?: boolean;
  };
  sections?: {
    showDescription?: boolean;
    showHighlights?: boolean;
    highlightsStyle?: 'cards' | 'list' | 'grid' | 'icons';
    showLocalTips?: boolean;
    showGallery?: boolean;
    galleryStyle?: 'grid' | 'masonry' | 'carousel' | 'lightbox';
    galleryColumns?: '2' | '3' | '4';
    showMap?: boolean;
    showAttractions?: boolean;
    attractionsDisplayStyle?: 'by-category' | 'grid' | 'list' | 'cards';
    attractionsLimit?: number;
    showItineraries?: boolean;
    itinerariesLimit?: number;
    showWeather?: boolean;
    showBestTimeToVisit?: boolean;
  };
  sidebar?: {
    showQuickFacts?: boolean;
    showCountryLink?: boolean;
    showPopulation?: boolean;
    showCoordinates?: boolean;
    showBestTimeToVisit?: boolean;
    showShareButton?: boolean;
    showTravelCTA?: boolean;
    travelCtaText?: string;
    travelCtaLink?: string;
  };
  labels?: {
    aboutTitle?: string;
    highlightsTitle?: string;
    localTipsTitle?: string;
    galleryTitle?: string;
    attractionsTitle?: string;
    itinerariesTitle?: string;
    quickFactsTitle?: string;
  };
  categoryLabels?: {
    category: Attraction['category'];
    label: string;
    pluralLabel?: string;
  }[];
  schema?: {
    enableJsonLd?: boolean;
    schemaType?: 'City' | 'Place' | 'TouristDestination';
    enableOpenGraph?: boolean;
    enableTwitterCard?: boolean;
  };
}

/**
 * Country Detail Page Configuration
 */
export interface CountryDetailConfig {
  hero?: {
    height?: 'small' | 'medium' | 'large' | 'full';
    overlayStyle?: 'none' | 'light' | 'medium' | 'heavy' | 'gradient';
    contentPosition?: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center-left' | 'center' | 'center-right';
    showBreadcrumb?: boolean;
    showContinent?: boolean;
    showFlag?: boolean;
    animationStyle?: 'none' | 'fade-in' | 'fade-up' | 'slide-in';
  };
  contentLayout?: {
    layout?: 'sidebar-right' | 'sidebar-left' | 'full-width' | 'centered';
    sidebarWidth?: 'narrow' | 'normal' | 'wide';
    stickybar?: boolean;
  };
  sections?: {
    showDescription?: boolean;
    showGallery?: boolean;
    galleryStyle?: 'grid' | 'masonry' | 'carousel' | 'lightbox';
    galleryColumns?: '2' | '3' | '4';
    showCities?: boolean;
    citiesDisplayStyle?: 'grid' | 'cards' | 'list' | 'map';
    citiesColumns?: '2' | '3' | '4';
    citiesLimit?: number;
    showItineraries?: boolean;
    itinerariesLimit?: number;
    showAttractions?: boolean;
    attractionsLimit?: number;
    showTravelInfo?: boolean;
    showBestTimeToVisit?: boolean;
    showMap?: boolean;
  };
  sidebar?: {
    showQuickFacts?: boolean;
    showContinent?: boolean;
    showCurrency?: boolean;
    showLanguage?: boolean;
    showTimezone?: boolean;
    showBestTimeToVisit?: boolean;
    showCityCount?: boolean;
    showShareButton?: boolean;
    showTravelCTA?: boolean;
    travelCtaText?: string;
    travelCtaLink?: string;
  };
  labels?: {
    aboutTitle?: string;
    citiesTitle?: string;
    galleryTitle?: string;
    itinerariesTitle?: string;
    attractionsTitle?: string;
    travelInfoTitle?: string;
    quickFactsTitle?: string;
    bestTimeTitle?: string;
  };
  continentLabels?: {
    continent: Country['continent'];
    label: string;
  }[];
  schema?: {
    enableJsonLd?: boolean;
    schemaType?: 'Country' | 'Place' | 'TouristDestination';
    enableOpenGraph?: boolean;
    enableTwitterCard?: boolean;
  };
}

/**
 * Itinerary Detail Page Configuration
 */
export interface ItineraryDetailConfig {
  // Presentation Mode
  defaultPresentationMode?: 'editorial' | 'classic';
  
  hero?: {
    height?: 'medium' | 'large' | 'full';
    overlayStyle?: 'none' | 'light' | 'medium' | 'heavy' | 'gradient';
    contentPosition?: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center-left' | 'center' | 'center-right';
    showBreadcrumb?: boolean;
    showDuration?: boolean;
    showDifficulty?: boolean;
    showTravelStyles?: boolean;
    maxTravelStylesInHero?: number;
    animationStyle?: 'none' | 'fade-in' | 'fade-up' | 'slide-in';
  };
  
  // Editorial Layout (for story-driven mode)
  editorialLayout?: {
    layout?: 'full-width' | 'centered-sidebar' | 'magazine';
    sectionSpacing?: 'comfortable' | 'generous' | 'dramatic';
    showTableOfContents?: boolean;
    showProgressIndicator?: boolean;
    showSidebar?: boolean;
    sidebarStyle?: 'minimal' | 'cards';
  };
  
  // Classic Layout (for day-by-day mode)
  contentLayout?: {
    layout?: 'sidebar-right' | 'sidebar-left' | 'full-width' | 'centered';
    sidebarWidth?: 'narrow' | 'normal' | 'wide';
    stickybar?: boolean;
  };
  sections?: {
    showIntroduction?: boolean;
    showDayByDay?: boolean;
    dayByDayStyle?: 'timeline' | 'cards' | 'accordion' | 'tabs';
    showActivities?: boolean;
    activitiesStyle?: 'cards' | 'list' | 'timeline';
    showAccommodation?: boolean;
    showMeals?: boolean;
    showPackingList?: boolean;
    packingListStyle?: 'checklist' | 'categories' | 'grid';
    showTips?: boolean;
    showMap?: boolean;
    showGallery?: boolean;
    showRelatedItineraries?: boolean;
    relatedItinerariesLimit?: number;
  };
  sidebar?: {
    showTripDetails?: boolean;
    showDuration?: boolean;
    showDifficulty?: boolean;
    showBudget?: boolean;
    showCountries?: boolean;
    showCities?: boolean;
    showTravelStyles?: boolean;
    showAuthor?: boolean;
    showShareButton?: boolean;
    showDownloadPDF?: boolean;
    showBookingCTA?: boolean;
    bookingCtaText?: string;
    bookingCtaLink?: string;
    showQuickJump?: boolean;
  };
  labels?: {
    dayByDayTitle?: string;
    tripDetailsTitle?: string;
    packingListTitle?: string;
    tipsTitle?: string;
    accommodationLabel?: string;
    mealsLabel?: string;
    durationLabel?: string;
    difficultyLabel?: string;
    budgetLabel?: string;
    countriesLabel?: string;
    citiesLabel?: string;
    relatedTitle?: string;
    dayLabel?: string;
  };
  difficultyLabels?: {
    difficulty: 'easy' | 'moderate' | 'challenging';
    label: string;
    description?: string;
    color?: string;
  }[];
  travelStyleLabels?: {
    style: string;
    label: string;
    icon?: string;
  }[];
  packingCategoryLabels?: {
    category: 'clothing' | 'electronics' | 'toiletries' | 'documents' | 'gear' | 'other';
    label: string;
    icon?: string;
  }[];
  schema?: {
    enableJsonLd?: boolean;
    schemaType?: 'TravelAction' | 'Trip' | 'Itinerary' | 'Article';
    enableOpenGraph?: boolean;
    enableTwitterCard?: boolean;
  };
}
