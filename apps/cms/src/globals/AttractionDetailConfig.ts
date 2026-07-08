import { GlobalConfig } from 'payload/types';

/**
 * Attraction Detail Page Configuration
 * 
 * Configure the layout and display options for individual attraction detail pages.
 * This allows editors to customize how attraction information is displayed
 * without modifying the code.
 */
export const AttractionDetailConfig: GlobalConfig = {
  slug: 'attraction-detail-config',
  label: 'Attraction Detail Page',
  admin: {
    group: 'Detail Page Settings',
    description: 'Configure the layout and display options for individual attraction detail pages.',
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
          admin: {
            description: 'Height of the hero section.',
          },
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
          admin: {
            description: 'Overlay style for the hero image.',
          },
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
          admin: {
            description: 'Show breadcrumb navigation in hero.',
          },
        },
        {
          name: 'showCategory',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show category badge in hero.',
          },
        },
        {
          name: 'showRating',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show rating in hero.',
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
          admin: {
            description: 'Animation style for hero content.',
          },
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
          admin: {
            description: 'Overall layout structure of the content area.',
          },
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
          name: 'contentMaxWidth',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Narrow', value: 'narrow' },
            { label: 'Wide', value: 'wide' },
            { label: 'Full', value: 'full' },
          ],
        },
        {
          name: 'stickybar',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Make sidebar sticky on scroll.',
          },
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
          admin: {
            description: 'Show main description section.',
          },
        },
        {
          name: 'showTips',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show visitor tips section.',
          },
        },
        {
          name: 'tipsStyle',
          type: 'select',
          defaultValue: 'cards',
          options: [
            { label: 'Cards', value: 'cards' },
            { label: 'List', value: 'list' },
            { label: 'Accordion', value: 'accordion' },
          ],
          admin: {
            condition: (data) => data?.sections?.showTips,
          },
        },
        {
          name: 'showGallery',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show photo gallery section.',
          },
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
          admin: {
            description: 'Show location map (if coordinates available).',
          },
        },
        {
          name: 'showRelatedAttractions',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show related attractions section.',
          },
        },
        {
          name: 'relatedAttractionsLimit',
          type: 'number',
          defaultValue: 3,
          min: 2,
          max: 6,
          admin: {
            condition: (data) => data?.sections?.showRelatedAttractions,
          },
        },
        {
          name: 'showNearbyAttractions',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show nearby attractions in same city.',
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
          name: 'showVisitorInfo',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show visitor information card.',
          },
        },
        {
          name: 'showLocation',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showAddress',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showOpeningHours',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showTicketPrice',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showVisitDuration',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showWebsite',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showShareButton',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show social share buttons.',
          },
        },
        {
          name: 'showBookingCTA',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show booking/reserve button.',
          },
        },
        {
          name: 'bookingCtaText',
          type: 'text',
          localized: true,
          admin: {
            condition: (data) => data?.sidebar?.showBookingCTA,
          },
        },
        {
          name: 'bookingCtaLink',
          type: 'text',
          admin: {
            condition: (data) => data?.sidebar?.showBookingCTA,
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
          name: 'visitorTipsTitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'Custom title for visitor tips section.',
          },
        },
        {
          name: 'galleryTitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'Custom title for gallery section.',
          },
        },
        {
          name: 'visitorInfoTitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'Custom title for visitor info sidebar.',
          },
        },
        {
          name: 'relatedTitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'Custom title for related attractions section.',
          },
        },
        {
          name: 'nearbyTitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'Custom title for nearby attractions section.',
          },
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════
    // CATEGORY DISPLAY SETTINGS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'categoryLabels',
      type: 'array',
      label: 'Category Label Customization',
      admin: {
        description: 'Customize display labels for each attraction category.',
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
          admin: {
            description: 'Display label for this category.',
          },
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Optional emoji or icon class for this category.',
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
          admin: {
            description: 'Enable JSON-LD structured data for SEO.',
          },
        },
        {
          name: 'schemaType',
          type: 'select',
          defaultValue: 'TouristAttraction',
          options: [
            { label: 'Tourist Attraction', value: 'TouristAttraction' },
            { label: 'Local Business', value: 'LocalBusiness' },
            { label: 'Museum', value: 'Museum' },
            { label: 'Park', value: 'Park' },
            { label: 'Place', value: 'Place' },
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
        {
          name: 'twitterCardType',
          type: 'select',
          defaultValue: 'summary_large_image',
          options: [
            { label: 'Summary', value: 'summary' },
            { label: 'Summary Large Image', value: 'summary_large_image' },
          ],
          admin: {
            condition: (data) => data?.schema?.enableTwitterCard,
          },
        },
      ],
    },
  ],
};
