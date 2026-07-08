import { GlobalConfig } from 'payload/types';

/**
 * Itinerary Detail Page Configuration
 * 
 * Configure the layout and display options for individual itinerary detail pages.
 * Supports both Editorial (story-driven) and Classic (day-by-day) presentation modes.
 * 
 * EDITORIAL MODE:
 * - Narrative chapters instead of day numbers
 * - Experience-based grouping
 * - Magazine-style layouts
 * - Image-led storytelling
 * 
 * CLASSIC MODE:
 * - Traditional day-by-day timeline
 * - Structured schedule format
 * - Activity lists
 */
export const ItineraryDetailConfig: GlobalConfig = {
  slug: 'itinerary-detail-config',
  label: 'Itinerary Detail Page',
  admin: {
    group: 'Detail Page Settings',
    description: 'Configure the layout and display options for individual itinerary detail pages.',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    // ═══════════════════════════════════════════════════════════════════
    // PRESENTATION MODE
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'defaultPresentationMode',
      type: 'select',
      label: 'Default Presentation Mode',
      defaultValue: 'editorial',
      options: [
        { label: 'Editorial (Story-Driven)', value: 'editorial' },
        { label: 'Classic (Day-by-Day)', value: 'classic' },
      ],
      admin: {
        description: 'Default presentation mode for itineraries. Individual itineraries can override this.',
      },
    },
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
            { label: 'Medium (70vh)', value: 'medium' },
            { label: 'Large (90vh)', value: 'large' },
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
          name: 'showDuration',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show duration badge in hero.',
          },
        },
        {
          name: 'showDifficulty',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show difficulty badge in hero.',
          },
        },
        {
          name: 'showTravelStyles',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show travel style tags in hero.',
          },
        },
        {
          name: 'maxTravelStylesInHero',
          type: 'number',
          defaultValue: 3,
          min: 1,
          max: 6,
          admin: {
            condition: (data) => data?.hero?.showTravelStyles,
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
    // EDITORIAL LAYOUT (Story-Driven Mode)
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'editorialLayout',
      type: 'group',
      label: 'Editorial Layout',
      admin: {
        description: 'Settings for the editorial (story-driven) presentation mode.',
      },
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'full-width',
          options: [
            { label: 'Full Width (Editorial)', value: 'full-width' },
            { label: 'Centered with Sidebar', value: 'centered-sidebar' },
            { label: 'Magazine (Asymmetric)', value: 'magazine' },
          ],
        },
        {
          name: 'sectionSpacing',
          type: 'select',
          defaultValue: 'generous',
          options: [
            { label: 'Comfortable', value: 'comfortable' },
            { label: 'Generous', value: 'generous' },
            { label: 'Dramatic', value: 'dramatic' },
          ],
        },
        {
          name: 'showTableOfContents',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show a minimal table of contents/chapter navigation.',
          },
        },
        {
          name: 'showProgressIndicator',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show a subtle reading progress indicator.',
          },
        },
        {
          name: 'showSidebar',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show sidebar with trip details (for centered-sidebar layout).',
          },
        },
        {
          name: 'sidebarStyle',
          type: 'select',
          defaultValue: 'minimal',
          options: [
            { label: 'Minimal', value: 'minimal' },
            { label: 'Cards', value: 'cards' },
          ],
          admin: {
            condition: (data) => data?.editorialLayout?.showSidebar,
          },
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════
    // CONTENT LAYOUT (Classic Mode)
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'contentLayout',
      type: 'group',
      label: 'Classic Layout',
      admin: {
        description: 'Settings for the classic (day-by-day) presentation mode.',
      },
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
          name: 'showIntroduction',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showDayByDay',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show day-by-day itinerary section.',
          },
        },
        {
          name: 'dayByDayStyle',
          type: 'select',
          defaultValue: 'timeline',
          options: [
            { label: 'Timeline', value: 'timeline' },
            { label: 'Cards', value: 'cards' },
            { label: 'Accordion', value: 'accordion' },
            { label: 'Tabs', value: 'tabs' },
          ],
          admin: {
            condition: (data) => data?.sections?.showDayByDay,
          },
        },
        {
          name: 'showActivities',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show activities within each day.',
          },
        },
        {
          name: 'activitiesStyle',
          type: 'select',
          defaultValue: 'cards',
          options: [
            { label: 'Cards', value: 'cards' },
            { label: 'List', value: 'list' },
            { label: 'Timeline', value: 'timeline' },
          ],
          admin: {
            condition: (data) => data?.sections?.showActivities,
          },
        },
        {
          name: 'showAccommodation',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show accommodation info for each day.',
          },
        },
        {
          name: 'showMeals',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show meal recommendations.',
          },
        },
        {
          name: 'showPackingList',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'packingListStyle',
          type: 'select',
          defaultValue: 'checklist',
          options: [
            { label: 'Checklist', value: 'checklist' },
            { label: 'Categories', value: 'categories' },
            { label: 'Grid', value: 'grid' },
          ],
          admin: {
            condition: (data) => data?.sections?.showPackingList,
          },
        },
        {
          name: 'showTips',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showMap',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show interactive route map.',
          },
        },
        {
          name: 'showGallery',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'showRelatedItineraries',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'relatedItinerariesLimit',
          type: 'number',
          defaultValue: 3,
          min: 2,
          max: 6,
          admin: {
            condition: (data) => data?.sections?.showRelatedItineraries,
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
          name: 'showTripDetails',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showDuration',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showDifficulty',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showBudget',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showCountries',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showCities',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showTravelStyles',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showAuthor',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'showShareButton',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'showDownloadPDF',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show download itinerary as PDF button.',
          },
        },
        {
          name: 'showBookingCTA',
          type: 'checkbox',
          defaultValue: false,
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
        {
          name: 'showQuickJump',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show quick jump navigation to days.',
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
          name: 'dayByDayTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'tripDetailsTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'packingListTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'tipsTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'accommodationLabel',
          type: 'text',
          localized: true,
        },
        {
          name: 'mealsLabel',
          type: 'text',
          localized: true,
        },
        {
          name: 'durationLabel',
          type: 'text',
          localized: true,
        },
        {
          name: 'difficultyLabel',
          type: 'text',
          localized: true,
        },
        {
          name: 'budgetLabel',
          type: 'text',
          localized: true,
        },
        {
          name: 'countriesLabel',
          type: 'text',
          localized: true,
        },
        {
          name: 'citiesLabel',
          type: 'text',
          localized: true,
        },
        {
          name: 'relatedTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'dayLabel',
          type: 'text',
          localized: true,
          admin: {
            description: 'Label for "Day" (e.g., "Day 1", "Ngày 1").',
          },
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════
    // DIFFICULTY LABELS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'difficultyLabels',
      type: 'array',
      label: 'Difficulty Labels',
      admin: {
        description: 'Customize display labels for difficulty levels.',
      },
      fields: [
        {
          name: 'difficulty',
          type: 'select',
          required: true,
          options: [
            { label: 'Easy', value: 'easy' },
            { label: 'Moderate', value: 'moderate' },
            { label: 'Challenging', value: 'challenging' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Brief description of what this difficulty level means.',
          },
        },
        {
          name: 'color',
          type: 'text',
          admin: {
            description: 'Optional color class or hex code.',
          },
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════
    // TRAVEL STYLE LABELS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'travelStyleLabels',
      type: 'array',
      label: 'Travel Style Labels',
      admin: {
        description: 'Customize display labels for travel styles.',
      },
      fields: [
        {
          name: 'style',
          type: 'select',
          required: true,
          options: [
            { label: 'Adventure', value: 'adventure' },
            { label: 'Cultural', value: 'cultural' },
            { label: 'Relaxation', value: 'relaxation' },
            { label: 'Foodie', value: 'foodie' },
            { label: 'Family', value: 'family' },
            { label: 'Romantic', value: 'romantic' },
            { label: 'Budget', value: 'budget' },
            { label: 'Luxury', value: 'luxury' },
            { label: 'Solo', value: 'solo' },
            { label: 'Backpacking', value: 'backpacking' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Optional emoji or icon class.',
          },
        },
      ],
    },
    // ═══════════════════════════════════════════════════════════════════
    // PACKING CATEGORY LABELS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'packingCategoryLabels',
      type: 'array',
      label: 'Packing Category Labels',
      admin: {
        description: 'Customize display labels for packing list categories.',
      },
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Clothing', value: 'clothing' },
            { label: 'Electronics', value: 'electronics' },
            { label: 'Toiletries', value: 'toiletries' },
            { label: 'Documents', value: 'documents' },
            { label: 'Gear', value: 'gear' },
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
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Optional emoji or icon class.',
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
          defaultValue: 'TravelAction',
          options: [
            { label: 'Travel Action', value: 'TravelAction' },
            { label: 'Trip', value: 'Trip' },
            { label: 'Itinerary', value: 'Itinerary' },
            { label: 'Article', value: 'Article' },
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
