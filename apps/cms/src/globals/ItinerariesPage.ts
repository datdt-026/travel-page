import { GlobalConfig } from 'payload/types';

/**
 * Itineraries Page Global Configuration
 * 
 * Configure the /itineraries listing page - Editorial Lookbook Design
 * 
 * Design Philosophy:
 * - Bộ sưu tập hành trình, không phải danh sách tour
 * - Image-led, editorial lookbook style
 * - Stagger layout với nhịp và khoảng trống
 */
export const ItinerariesPage: GlobalConfig = {
  slug: 'itineraries-page',
  label: 'Itineraries Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the Journey Collection page (/itineraries).',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    // ═══════════════════════════════════════════════════════════════════
    // HERO SECTION - Editorial Header with Background
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      admin: {
        description: 'Dark hero with background image.',
      },
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image for hero. Falls back to first itinerary image.',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            description: 'Main title (e.g., "The Journey Collection").',
          },
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Poetic subtitle about the collection.',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          admin: {
            description: 'Small text above title (e.g., "Itineraries").',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // LISTING SETTINGS - Journey Collection
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'listing',
      type: 'group',
      label: 'Collection Settings',
      fields: [
        {
          name: 'showFilters',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show subtle editorial filter bar.',
          },
        },
        {
          name: 'showSearch',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show search input in filter bar.',
            condition: (data, siblingData) => siblingData?.showFilters,
          },
        },
        {
          name: 'searchPlaceholder',
          type: 'text',
          localized: true,
          defaultValue: 'Search journeys...',
          admin: {
            description: 'Placeholder text for search input.',
            condition: (data, siblingData) => siblingData?.showSearch && siblingData?.showFilters,
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // EMPTY STATE
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'emptyState',
      type: 'group',
      label: 'Empty State',
      admin: {
        description: 'Message when no journeys match filters.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'No journeys match your selection',
        },
        {
          name: 'message',
          type: 'textarea',
          localized: true,
          defaultValue: 'Try adjusting your filters to discover more.',
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // SEO
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'Page title for search engines.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Page description for search engines.',
          },
        },
        {
          name: 'metaKeywords',
          type: 'text',
          localized: true,
          admin: {
            description: 'Keywords for SEO (comma-separated).',
          },
        },
      ],
    },
  ],
};

