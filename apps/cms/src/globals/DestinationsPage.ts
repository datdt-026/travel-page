import { GlobalConfig } from 'payload/types';

/**
 * Destinations Page Global Configuration
 * 
 * This global config allows editors to customize the /destinations page
 * directly from the CMS sidebar without creating any pages.
 * 
 * Accessible at: /api/globals/destinations-page
 * 
 * Synced with ItinerariesPage and AttractionsPage for consistent CMS experience.
 */
export const DestinationsPage: GlobalConfig = {
  slug: 'destinations-page',
  label: 'Destinations Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the layout and content of the /destinations page.',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    // ═══════════════════════════════════════════════════════════════════
    // HERO SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Hero banner background image.',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            description: 'Main title displayed in the hero section.',
          },
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Subtitle or description in the hero section.',
          },
        },
        {
          name: 'height',
          type: 'select',
          defaultValue: 'large',
          options: [
            { label: 'Small (50vh)', value: 'small' },
            { label: 'Medium (70vh)', value: 'medium' },
            { label: 'Large (90vh)', value: 'large' },
          ],
        },
        {
          name: 'overlayStyle',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Light', value: 'light' },
            { label: 'Medium', value: 'medium' },
            { label: 'Heavy', value: 'heavy' },
          ],
          admin: {
            description: 'Overlay style to improve text readability.',
          },
        },
        {
          name: 'contentPosition',
          type: 'select',
          defaultValue: 'bottom-left',
          options: [
            { label: 'Trên - Trái', value: 'top-left' },
            { label: 'Trên - Giữa', value: 'top-center' },
            { label: 'Trên - Phải', value: 'top-right' },
            { label: 'Giữa - Trái', value: 'center-left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Giữa - Phải', value: 'center-right' },
            { label: 'Dưới - Trái', value: 'bottom-left' },
            { label: 'Dưới - Giữa', value: 'bottom-center' },
            { label: 'Dưới - Phải', value: 'bottom-right' },
          ],
          admin: {
            description: 'Vị trí nội dung trong hero banner.',
          },
        },
        {
          name: 'textAlignment',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            description: 'Text alignment within the hero section.',
          },
        },
        {
          name: 'showBreadcrumb',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'breadcrumbLabel',
          type: 'text',
          localized: true,
          admin: {
            description: 'Label for this page in breadcrumb navigation.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // INTRODUCTION SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'introduction',
      type: 'group',
      label: 'Introduction Section',
      admin: {
        description: 'Optional introduction content below the hero.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            description: 'Introduction section heading.',
          },
        },
        {
          name: 'content',
          type: 'richText',
          localized: true,
          admin: {
            description: 'Introduction rich text content.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // LISTING SETTINGS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'listing',
      type: 'group',
      label: 'Listing Settings',
      fields: [
        {
          name: 'itemsPerPage',
          type: 'number',
          defaultValue: 9,
          min: 3,
          max: 24,
        },
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'grid',
          options: [
            { label: 'Grid', value: 'grid' },
            { label: 'List', value: 'list' },
            { label: 'Cards', value: 'cards' },
          ],
        },
        {
          name: 'columns',
          type: 'select',
          defaultValue: '3',
          options: [
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
        },
        {
          name: 'showFilters',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'filterOptions',
          type: 'group',
          admin: {
            condition: (data, siblingData) => siblingData?.showFilters,
          },
          fields: [
            {
              name: 'showContinentFilter',
              type: 'checkbox',
              defaultValue: true,
              label: 'Continent/Region Filter',
            },
            {
              name: 'showTravelStyleFilter',
              type: 'checkbox',
              defaultValue: true,
              label: 'Travel Style Filter',
            },
            {
              name: 'showSeasonFilter',
              type: 'checkbox',
              defaultValue: true,
              label: 'Season Filter',
            },
          ],
        },
        {
          name: 'showSearch',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'searchPlaceholder',
          type: 'text',
          localized: true,
          defaultValue: 'Search destinations...',
          admin: {
            condition: (data, siblingData) => siblingData?.showSearch,
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // FEATURED SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'featured',
      type: 'group',
      label: 'Featured Section',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Featured Destinations',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'displayMode',
          type: 'select',
          defaultValue: 'auto',
          options: [
            { label: 'Auto (Most Popular)', value: 'auto' },
            { label: 'Manual Selection', value: 'manual' },
          ],
        },
        {
          name: 'manualItems',
          type: 'relationship',
          relationTo: 'countries',
          hasMany: true,
          maxRows: 6,
          admin: {
            condition: (data, siblingData) => siblingData?.displayMode === 'manual',
          },
        },
        {
          name: 'limit',
          type: 'number',
          defaultValue: 3,
          min: 1,
          max: 6,
          admin: {
            condition: (data, siblingData) => siblingData?.displayMode === 'auto',
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
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'No Destinations Found',
        },
        {
          name: 'message',
          type: 'textarea',
          localized: true,
          defaultValue: 'Try adjusting your filters or check back later.',
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
            description: 'Custom page title for SEO.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Custom meta description for SEO.',
          },
        },
        {
          name: 'metaKeywords',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
};
