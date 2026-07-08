import { GlobalConfig } from 'payload/types';

/**
 * Expertise Page Global Configuration
 * 
 * B2B-focused page showcasing company capabilities, services,
 * destination coverage, and operational capacity.
 */
export const ExpertisePage: GlobalConfig = {
  slug: 'expertise-page',
  label: 'Expertise Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the /expertise page - showcasing B2B capabilities.',
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
          defaultValue: 'Our Expertise',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          defaultValue: 'Comprehensive destination management services across Southeast Asia',
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
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // SERVICES SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'services',
      type: 'group',
      label: 'Services Section',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'What We Do',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Comprehensive DMC Services',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'items',
          type: 'array',
          label: 'Service Categories',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Professional image for this service (recommended: 800x600)',
              },
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Fallback icon/emoji if no image is provided',
              },
            },
            {
              name: 'title',
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
              name: 'features',
              type: 'array',
              label: 'Key Features',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'cards',
          options: [
            { label: 'Cards Grid', value: 'cards' },
            { label: 'Featured + Grid', value: 'featured' },
          ],
          admin: {
            description: 'Layout style for services display',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // DESTINATION COVERAGE SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'coverage',
      type: 'group',
      label: 'Destination Coverage',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Where We Operate',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Destination Coverage',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'regions',
          type: 'array',
          label: 'Regions',
          fields: [
            {
              name: 'name',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'countries',
              type: 'text',
              localized: true,
              admin: {
                description: 'List of countries in this region',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Brief description of this region/destination',
              },
            },
            {
              name: 'highlights',
              type: 'array',
              label: 'Highlights',
              admin: {
                description: 'Key highlights of this destination',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'keyAttractions',
              type: 'array',
              label: 'Key Attractions',
              admin: {
                description: 'Notable attractions in this region',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'bestTime',
              type: 'text',
              localized: true,
              admin: {
                description: 'Best time to visit (e.g., "March to May, September to November")',
              },
            },
            {
              name: 'travelStyles',
              type: 'array',
              label: 'Travel Styles',
              admin: {
                description: 'Suitable travel styles for this destination',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'localTeam',
              type: 'text',
              localized: true,
              admin: {
                description: 'Information about local team (e.g., "15+ local experts")',
              },
            },
            {
              name: 'languages',
              type: 'array',
              label: 'Languages',
              admin: {
                description: 'Languages spoken by local team',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'highlighted',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Highlight as primary destination',
              },
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // OPERATIONAL CAPACITY SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'capacity',
      type: 'group',
      label: 'Operational Capacity',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image for this section',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Our Capacity',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Operational Excellence',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Capacity Metrics',
          fields: [
            {
              name: 'number',
              type: 'text',
              required: true,
              admin: {
                description: 'The metric (e.g., "50+", "24/7")',
              },
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // QUALITY ASSURANCE SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'quality',
      type: 'group',
      label: 'Quality & Safety',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Quality Assurance',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Our Commitments',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'items',
          type: 'array',
          label: 'Quality Initiatives',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Featured image for this initiative (recommended: 800x600)',
              },
            },
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Detailed description of this initiative',
              },
            },
            {
              name: 'linkText',
              type: 'text',
              localized: true,
              defaultValue: 'View this project',
              admin: {
                description: 'Button/link text',
              },
            },
            {
              name: 'linkUrl',
              type: 'text',
              admin: {
                description: 'URL for the link button (optional)',
              },
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // WHY CHOOSE US SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'whyUs',
      type: 'group',
      label: 'Why Choose Us',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image for this section',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Why Partner With Us',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Optional description text below the title',
          },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Differentiators',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Card background/featured image',
              },
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Icon key (expertise, response, dedicated, pricing, quality, sustainable) or emoji',
              },
            },
            {
              name: 'title',
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
              name: 'details',
              type: 'array',
              label: 'Detail Points',
              admin: {
                description: 'Additional detail points shown on hover/expand',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'stat',
              type: 'text',
              admin: {
                description: 'Statistic value (e.g., "50+", "<24h", "1:1")',
              },
            },
            {
              name: 'statLabel',
              type: 'text',
              localized: true,
              admin: {
                description: 'Label for the statistic (e.g., "Local Partners", "Quote Time")',
              },
            },
          ],
        },
        {
          name: 'ctaText',
          type: 'text',
          localized: true,
          defaultValue: 'Begin Partnership Inquiry',
          admin: {
            description: 'Call-to-action button text',
          },
        },
        {
          name: 'ctaLink',
          type: 'text',
          defaultValue: '/partners/inquiry',
          admin: {
            description: 'Call-to-action button link',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // CTA SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image for this section',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Ready to Partner?',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'primaryButtonText',
          type: 'text',
          localized: true,
          defaultValue: 'Start a Partnership',
        },
        {
          name: 'primaryButtonLink',
          type: 'text',
          defaultValue: '/partners/inquiry',
        },
        {
          name: 'secondaryButtonText',
          type: 'text',
          localized: true,
          defaultValue: 'Download Credentials',
        },
        {
          name: 'secondaryButtonLink',
          type: 'text',
          defaultValue: '/about/credentials',
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
