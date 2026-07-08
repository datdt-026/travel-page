import { GlobalConfig } from 'payload/types';

/**
 * Cities Page Global Configuration
 * 
 * Configure the /cities listing page layout and content.
 */
export const CitiesPage: GlobalConfig = {
  slug: 'cities-page',
  label: 'Cities Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the layout and content of the /cities page.',
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
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'height',
          type: 'select',
          defaultValue: 'medium',
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
          defaultValue: 12,
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
            { label: 'Cards with Map', value: 'map' },
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
              name: 'showCountryFilter',
              type: 'checkbox',
              defaultValue: true,
              label: 'Country Filter',
            },
            {
              name: 'showRegionFilter',
              type: 'checkbox',
              defaultValue: false,
              label: 'Region Filter',
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
          defaultValue: 'Search cities...',
          admin: {
            condition: (data, siblingData) => siblingData?.showSearch,
          },
        },
        {
          name: 'sortOptions',
          type: 'select',
          hasMany: true,
          defaultValue: ['name', 'popular'],
          options: [
            { label: 'Alphabetical (A-Z)', value: 'name' },
            { label: 'Most Popular', value: 'popular' },
            { label: 'Recently Added', value: 'newest' },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // FEATURED CITIES
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'featured',
      type: 'group',
      label: 'Featured Cities',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Popular Cities',
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
          relationTo: 'cities',
          hasMany: true,
          maxRows: 6,
          admin: {
            condition: (data, siblingData) => siblingData?.displayMode === 'manual',
          },
        },
        {
          name: 'limit',
          type: 'number',
          defaultValue: 6,
          min: 1,
          max: 12,
          admin: {
            condition: (data, siblingData) => siblingData?.displayMode === 'auto',
          },
        },
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'grid',
          options: [
            { label: 'Grid', value: 'grid' },
            { label: 'Carousel', value: 'carousel' },
            { label: 'Featured + Grid', value: 'featured-grid' },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // COUNTRIES SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'countriesSection',
      type: 'group',
      label: 'Browse by Country',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Explore by Country',
        },
        {
          name: 'displayStyle',
          type: 'select',
          defaultValue: 'flags',
          options: [
            { label: 'Flags', value: 'flags' },
            { label: 'Cards', value: 'cards' },
            { label: 'List', value: 'list' },
          ],
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
          defaultValue: 'No Cities Found',
        },
        {
          name: 'message',
          type: 'textarea',
          localized: true,
          defaultValue: 'Try adjusting your search or check back later.',
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
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
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
