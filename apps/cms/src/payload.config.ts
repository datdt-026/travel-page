import path from 'path';
import dotenv from 'dotenv';

// Load env before other imports that might need it
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';

// Server-only plugin - will be mocked in webpack for admin bundle
import { cloudStoragePlugin } from './plugins/cloudflareR2';

// Collections
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Countries } from './collections/Countries';
import { Cities } from './collections/Cities';
import { Attractions } from './collections/Attractions';
import { Itineraries } from './collections/Itineraries';
import { BlogPosts } from './collections/BlogPosts';
import { Pages } from './collections/Pages';
import { FAQs } from './collections/FAQs';
import { CaseStudies } from './collections/CaseStudies';
import { ContactSubmissions } from './collections/ContactSubmissions';
import { PartnerInquiries } from './collections/PartnerInquiries';

// Globals
import { 
  DestinationsPage,
  HomePage,
  SiteHeader,
  SiteFooter,
  BlogPage,
  AboutPage,
  ContactPage,
  FAQPage,
  ItinerariesPage,
  AttractionsPage,
  CitiesPage,
  CountriesPage,
  // Detail page configurations
  AttractionDetailConfig,
  CityDetailConfig,
  CountryDetailConfig,
  ItineraryDetailConfig,
  // B2B-focused pages
  ExpertisePage,
  SustainabilityPage,
  CaseStudiesPage,
  PartnersPage,
  PartnerInquiryPage,
} from './globals';

/**
 * Localization Configuration
 * 
 * Supported locales for the CMS. The first locale is the default.
 * To add a new language:
 * 1. Add the locale code to this array
 * 2. Add corresponding translations in the frontend dictionaries
 * 3. Run database migrations if needed (Payload handles schema updates)
 */
const locales = [
  { label: 'English', code: 'en' },
  { label: 'Tiếng Việt', code: 'vi' },
  { label: 'Français', code: 'fr' },
  { label: 'Deutsch', code: 'de' },
];

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Travel CMS',
    },
    webpack: (config) => {
      // Fix for cloud-storage plugin - exclude Node.js modules from client bundle
      return {
        ...config,
        resolve: {
          ...config.resolve,
          fallback: {
            ...config.resolve?.fallback,
            fs: false,
            os: false,
            util: false,
            path: false,
            stream: false,
            crypto: false,
            child_process: false,
            net: false,
            tls: false,
          },
          alias: {
            ...config.resolve?.alias,
            // Mock the R2 plugin file on client - it's server-only
            [path.resolve(__dirname, './plugins/cloudflareR2')]: path.resolve(__dirname, './mocks/empty.js'),
          },
        },
      };
    },
  },
  editor: slateEditor({}),
  
  // Localization configuration
  localization: {
    locales: locales.map(l => l.code),
    defaultLocale: 'en',
    fallback: true, // Enable fallback to default locale
  },
  
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/travel_cms',
    },
    // Keep migrations as the default, but allow local bootstrap when the
    // legacy drizzle-kit migration dependency is unavailable from npm.
    push: process.env.PAYLOAD_DB_PUSH === 'true',
  }),
  collections: [
    Users,
    Media,
    Countries,
    Cities,
    Attractions,
    Itineraries,
    BlogPosts,
    Pages,
    FAQs,
    CaseStudies,
    ContactSubmissions,
    PartnerInquiries,
  ],
  globals: [
    // Site-wide settings
    SiteHeader,
    SiteFooter,
    // Page configurations
    HomePage,
    DestinationsPage,
    BlogPage,
    AboutPage,
    ContactPage,
    FAQPage,
    ItinerariesPage,
    AttractionsPage,
    CitiesPage,
    CountriesPage,
    // Detail page configurations
    AttractionDetailConfig,
    CityDetailConfig,
    CountryDetailConfig,
    ItineraryDetailConfig,
    // B2B-focused pages
    ExpertisePage,
    SustainabilityPage,
    CaseStudiesPage,
    PartnersPage,
    PartnerInquiryPage,
  ],
  plugins: [
    cloudStoragePlugin,
  ].filter(Boolean),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [
    'http://localhost:3000',
    process.env.NEXT_PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  csrf: [
    'http://localhost:3000',
    process.env.NEXT_PUBLIC_SITE_URL || '',
  ].filter(Boolean),
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
});
