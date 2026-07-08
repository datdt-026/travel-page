import { GlobalConfig } from 'payload/types';

/**
 * City Detail Page Configuration
 * 
 * Configure the layout and display options for individual city detail pages.
 */
export const CityDetailConfig: GlobalConfig = {
  slug: 'city-detail-config',
  label: 'City Detail Page',
  admin: {
    group: 'Detail Page Settings',
    description: 'Configure the layout and display options for individual city detail pages.',
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
          name: 'height',
          type: 'select',
          defaultValue: 'large',
          options: [
            { label: 'Small (50vh)', value: 'small' },
            { label: 'Medium (70vh)', value: 'medium' },
            { label: 'Large (80vh)', value: 'large' },
            { label: 'Full Screen (100vh)', value: 'full' },
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
            { label: 'Gradient', value: 'gradient' },
          ],
        },
        {
          name: 'contentPosition',
          type: 'select',
          defaultValue: 'bottom-left',
          options: [
            { label: 'Bottom Left', value: 'bottom-left' },
            { label: 'Bottom Center', value: 'bottom-center' },
            { label: 'Bottom Right', value: 'bottom-right' },
            { label: 'Center Left', value: 'center-left' },
            { label: 'Center', value: 'center' },
            { label: 'Center Right', value: 'center-right' },
          ],
        },
        {
          name: 'showBreadcrumb',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showCountryName',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show country name in hero subtitle.',
          },
        },
        {
          name: 'showPopulation',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show population info in hero.',
          },
        },
        {
          name: 'animationStyle',
          type: 'select',
          defaultValue: 'fade-up',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Fade In', value: 'fade-in' },
            { label: 'Fade Up', value: 'fade-up' },
            { label: 'Slide In', value: 'slide-in' },
          ],
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════
    // CONTENT LAYOUT
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'contentLayout',
      type: 'group',
      label: 'Content Layout',
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'sidebar-right',
          options: [
            { label: 'Sidebar Right (Default)', value: 'sidebar-right' },
            { label: 'Sidebar Left', value: 'sidebar-left' },
            { label: 'Full Width', value: 'full-width' },
            { label: 'Centered', value: 'centered' },
          ],
        },
        {
          name: 'sidebarWidth',
          type: 'select',
          defaultValue: 'normal',
          options: [
            { label: 'Narrow', value: 'narrow' },
            { label: 'Normal', value: 'normal' },
            { label: 'Wide', value: 'wide' },
          ],
        },
        {
          name: 'stickybar',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════
    // SECTIONS DISPLAY
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'sections',
      type: 'group',
      label: 'Sections Display',
      fields: [
        {
          name: 'showDescription',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showHighlights',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show city highlights section.',
          },
        },
        {
          name: 'highlightsStyle',
          type: 'select',
          defaultValue: 'cards',
          options: [
            { label: 'Cards', value: 'cards' },
            { label: 'List', value: 'list' },
            { label: 'Grid', value: 'grid' },
            { label: 'Icons', value: 'icons' },
          ],
          admin: {
            condition: (data) => data?.sections?.showHighlights,
          },
        },
        {
          name: 'showLocalTips',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showGallery',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'galleryStyle',
          type: 'select',
          defaultValue: 'grid',
          options: [
            { label: 'Grid', value: 'grid' },
            { label: 'Masonry', value: 'masonry' },
            { label: 'Carousel', value: 'carousel' },
            { label: 'Lightbox Grid', value: 'lightbox' },
          ],
          admin: {
            condition: (data) => data?.sections?.showGallery,
          },
        },
        {
          name: 'galleryColumns',
          type: 'select',
          defaultValue: '3',
          options: [
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
          admin: {
            condition: (data) => data?.sections?.showGallery,
          },
        },
        {
          name: 'showMap',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showAttractions',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show attractions in this city.',
          },
        },
        {
          name: 'attractionsDisplayStyle',
          type: 'select',
          defaultValue: 'by-category',
          options: [
            { label: 'By Category', value: 'by-category' },
            { label: 'Grid', value: 'grid' },
            { label: 'List', value: 'list' },
            { label: 'Cards', value: 'cards' },
          ],
          admin: {
            condition: (data) => data?.sections?.showAttractions,
          },
        },
        {
          name: 'attractionsLimit',
          type: 'number',
          defaultValue: 12,
          min: 4,
          max: 24,
          admin: {
            condition: (data) => data?.sections?.showAttractions,
          },
        },
        {
          name: 'showItineraries',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show related itineraries.',
          },
        },
        {
          name: 'itinerariesLimit',
          type: 'number',
          defaultValue: 4,
          min: 2,
          max: 8,
          admin: {
            condition: (data) => data?.sections?.showItineraries,
          },
        },
        {
          name: 'showWeather',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show weather widget (requires API integration).',
          },
        },
        {
          name: 'showBestTimeToVisit',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════
    // SIDEBAR CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'sidebar',
      type: 'group',
      label: 'Sidebar Configuration',
      fields: [
        {
          name: 'showQuickFacts',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showCountryLink',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showPopulation',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showCoordinates',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'showBestTimeToVisit',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showShareButton',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showTravelCTA',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show travel planning CTA.',
          },
        },
        {
          name: 'travelCtaText',
          type: 'text',
          localized: true,
          admin: {
            condition: (data) => data?.sidebar?.showTravelCTA,
          },
        },
        {
          name: 'travelCtaLink',
          type: 'text',
          admin: {
            condition: (data) => data?.sidebar?.showTravelCTA,
          },
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════
    // LABELS & TEXT CUSTOMIZATION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'labels',
      type: 'group',
      label: 'Labels & Text',
      fields: [
        {
          name: 'aboutTitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'Custom title for about section (e.g., "About {cityName}").',
          },
        },
        {
          name: 'highlightsTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'localTipsTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'galleryTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'attractionsTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'itinerariesTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'quickFactsTitle',
          type: 'text',
          localized: true,
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════
    // ATTRACTION CATEGORY LABELS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'categoryLabels',
      type: 'array',
      label: 'Attraction Category Labels',
      admin: {
        description: 'Customize labels for attraction categories shown on city page.',
      },
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Landmark', value: 'landmark' },
            { label: 'Museum', value: 'museum' },
            { label: 'Park', value: 'park' },
            { label: 'Beach', value: 'beach' },
            { label: 'Religious Site', value: 'religious-site' },
            { label: 'Entertainment', value: 'entertainment' },
            { label: 'Shopping', value: 'shopping' },
            { label: 'Restaurant', value: 'restaurant' },
            { label: 'Nature', value: 'nature' },
            { label: 'Historical', value: 'historical' },
            { label: 'Adventure', value: 'adventure' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'pluralLabel',
          type: 'text',
          localized: true,
          admin: {
            description: 'Plural form of the label.',
          },
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════
    // SCHEMA & SEO SETTINGS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'schema',
      type: 'group',
      label: 'Schema & SEO Settings',
      fields: [
        {
          name: 'enableJsonLd',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'schemaType',
          type: 'select',
          defaultValue: 'City',
          options: [
            { label: 'City', value: 'City' },
            { label: 'Place', value: 'Place' },
            { label: 'Tourist Destination', value: 'TouristDestination' },
          ],
          admin: {
            condition: (data) => data?.schema?.enableJsonLd,
          },
        },
        {
          name: 'enableOpenGraph',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'enableTwitterCard',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
};
