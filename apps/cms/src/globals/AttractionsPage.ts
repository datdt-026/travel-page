import { GlobalConfig } from 'payload/types';

/**
 * Attractions Page Global Configuration
 * 
 * Configure the /attractions listing page - Editorial Curated Design
 * 
 * Design Philosophy:
 * - Trang này là tuyển tập những nơi chốn đã được chọn lọc
 * - Editorial style với dark header và curated gallery
 * - Không phải directory hay listicle
 */
export const AttractionsPage: GlobalConfig = {
  slug: 'attractions-page',
  label: 'Attractions Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the Curated Places page (/attractions).',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    // ═══════════════════════════════════════════════════════════════════
    // HERO SECTION - Editorial Image Header
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      admin: {
        description: 'Editorial hero with full-bleed image and overlays.',
      },
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Hero background image (recommended: 1920x1080 or larger).',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            description: 'Main title (e.g., "Curated Places").',
          },
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Context text - explain what this collection is about.',
          },
        },
        {
          name: 'note',
          type: 'text',
          localized: true,
          admin: {
            description: 'Small eyebrow text above title (e.g., "The Collection").',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // LISTING SETTINGS - Curated Gallery
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'listing',
      type: 'group',
      label: 'Gallery Settings',
      fields: [
        {
          name: 'maxItems',
          type: 'number',
          defaultValue: 12,
          min: 6,
          max: 30,
          admin: {
            description: 'Maximum places to show before "View full collection" button.',
          },
        },
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
          defaultValue: 'Search places...',
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
        description: 'Message when no places match filters.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'No places match your selection',
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

