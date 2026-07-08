import { GlobalConfig } from 'payload/types';

/**
 * Countries Page Global Configuration
 * 
 * Configure the /countries listing page layout and content.
 */
export const CountriesPage: GlobalConfig = {
  slug: 'countries-page',
  label: 'Countries Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the layout and content of the /countries page.',
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
          name: 'layout',
          type: 'select',
          defaultValue: 'grid',
          options: [
            { label: 'Grid', value: 'grid' },
            { label: 'Cards', value: 'cards' },
            { label: 'World Map', value: 'map' },
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
          name: 'showSearch',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'searchPlaceholder',
          type: 'text',
          localized: true,
          defaultValue: 'Search countries...',
          admin: {
            condition: (data, siblingData) => siblingData?.showSearch,
          },
        },
        {
          name: 'showRegionFilter',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'regions',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.showRegionFilter,
            description: 'Customize regions. Leave empty for auto-detection.',
          },
          fields: [
            {
              name: 'id',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'showCityCount',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show number of cities per country.',
          },
        },
        {
          name: 'showFlags',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show country flags on cards.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // FEATURED COUNTRIES
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'featured',
      type: 'group',
      label: 'Featured Countries',
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
          defaultValue: 'Top Destinations',
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
            { label: 'Auto (Most Cities)', value: 'auto' },
            { label: 'Manual Selection', value: 'manual' },
          ],
        },
        {
          name: 'manualItems',
          type: 'relationship',
          relationTo: 'countries',
          hasMany: true,
          maxRows: 8,
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
          defaultValue: 'cards',
          options: [
            { label: 'Grid', value: 'grid' },
            { label: 'Large Cards', value: 'cards' },
            { label: 'Hero Carousel', value: 'carousel' },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // REGIONS OVERVIEW
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'regionsOverview',
      type: 'group',
      label: 'Regions Overview',
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
          defaultValue: 'Explore by Region',
        },
        {
          name: 'displayStyle',
          type: 'select',
          defaultValue: 'cards',
          options: [
            { label: 'Cards with Images', value: 'cards' },
            { label: 'Interactive Map', value: 'map' },
            { label: 'Text Links', value: 'links' },
          ],
        },
        {
          name: 'items',
          type: 'array',
          admin: {
            description: 'Customize region display.',
          },
          fields: [
            {
              name: 'regionId',
              type: 'text',
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
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
          defaultValue: 'No Countries Found',
        },
        {
          name: 'message',
          type: 'textarea',
          localized: true,
          defaultValue: 'Check back soon as we add more destinations!',
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
