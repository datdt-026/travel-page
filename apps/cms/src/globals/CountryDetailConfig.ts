import { GlobalConfig } from 'payload/types';

/**
 * Country Detail Page Configuration
 * 
 * Configure the layout and display options for individual country detail pages.
 */
export const CountryDetailConfig: GlobalConfig = {
  slug: 'country-detail-config',
  label: 'Country Detail Page',
  admin: {
    group: 'Detail Page Settings',
    description: 'Configure the layout and display options for individual country detail pages.',
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
          name: 'showContinent',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show continent badge in hero.',
          },
        },
        {
          name: 'showFlag',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show country flag in hero.',
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
          name: 'showCities',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show cities in this country.',
          },
        },
        {
          name: 'citiesDisplayStyle',
          type: 'select',
          defaultValue: 'grid',
          options: [
            { label: 'Grid', value: 'grid' },
            { label: 'Cards', value: 'cards' },
            { label: 'List', value: 'list' },
            { label: 'Map', value: 'map' },
          ],
          admin: {
            condition: (data) => data?.sections?.showCities,
          },
        },
        {
          name: 'citiesColumns',
          type: 'select',
          defaultValue: '2',
          options: [
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
          admin: {
            condition: (data) => data?.sections?.showCities,
          },
        },
        {
          name: 'citiesLimit',
          type: 'number',
          defaultValue: 20,
          min: 4,
          max: 50,
          admin: {
            condition: (data) => data?.sections?.showCities,
          },
        },
        {
          name: 'showItineraries',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'itinerariesLimit',
          type: 'number',
          defaultValue: 6,
          min: 3,
          max: 12,
          admin: {
            condition: (data) => data?.sections?.showItineraries,
          },
        },
        {
          name: 'showAttractions',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show top attractions in this country.',
          },
        },
        {
          name: 'attractionsLimit',
          type: 'number',
          defaultValue: 6,
          min: 3,
          max: 12,
          admin: {
            condition: (data) => data?.sections?.showAttractions,
          },
        },
        {
          name: 'showTravelInfo',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show practical travel information section.',
          },
        },
        {
          name: 'showBestTimeToVisit',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showMap',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show country map.',
          },
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
          name: 'showContinent',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showCurrency',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showLanguage',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showTimezone',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showBestTimeToVisit',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showCityCount',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show number of cities in this country.',
          },
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
            description: 'Custom title for about section (e.g., "About {countryName}").',
          },
        },
        {
          name: 'citiesTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'galleryTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'itinerariesTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'attractionsTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'travelInfoTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'quickFactsTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'bestTimeTitle',
          type: 'text',
          localized: true,
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════
    // CONTINENT LABELS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'continentLabels',
      type: 'array',
      label: 'Continent Labels',
      admin: {
        description: 'Customize display labels for each continent.',
      },
      fields: [
        {
          name: 'continent',
          type: 'select',
          required: true,
          options: [
            { label: 'Africa', value: 'africa' },
            { label: 'Asia', value: 'asia' },
            { label: 'Europe', value: 'europe' },
            { label: 'North America', value: 'north-america' },
            { label: 'Oceania', value: 'oceania' },
            { label: 'South America', value: 'south-america' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
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
          defaultValue: 'Country',
          options: [
            { label: 'Country', value: 'Country' },
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
