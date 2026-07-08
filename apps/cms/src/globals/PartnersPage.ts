import { GlobalConfig } from 'payload/types';

/**
 * Partners Page Global Configuration
 * 
 * B2B-focused page serving as the main entry point for potential partners.
 * Showcases value proposition, partnership models, and inquiry flow.
 */
export const PartnersPage: GlobalConfig = {
  slug: 'partners-page',
  label: 'Partners Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the /partners page - main B2B entry point.',
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
          defaultValue: 'Partner With Us',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          defaultValue: 'Your trusted destination management partner in Southeast Asia',
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
          name: 'ctaText',
          type: 'text',
          localized: true,
          defaultValue: 'Start Partnership Inquiry',
        },
        {
          name: 'ctaLink',
          type: 'text',
          defaultValue: '/partners/inquiry',
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // VALUE PROPOSITION SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'valueProposition',
      type: 'group',
      label: 'Value Proposition',
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
          defaultValue: 'Why Partner With Us',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Your Success Is Our Mission',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Subtitle/description text for the value proposition section',
          },
        },
        {
          name: 'benefits',
          type: 'array',
          label: 'Partner Benefits',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Professional image for this benefit (optional)',
              },
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Fallback icon/emoji if no image',
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
          ],
        },
        {
          name: 'sectionImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Large background/featured image for the value proposition section',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // PARTNERSHIP MODELS SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'partnershipModels',
      type: 'group',
      label: 'Partnership Models',
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
          defaultValue: 'How We Work Together',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Partnership Models',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'models',
          type: 'array',
          label: 'Models',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Professional image representing this partnership model',
              },
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Fallback icon/emoji if no image',
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
              dbName: 'pp_model_features',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'idealFor',
              type: 'text',
              localized: true,
              admin: {
                description: 'Ideal for (e.g., "Tour operators with regular series")',
              },
            },
          ],
        },
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'cards',
          options: [
            { label: 'Cards Grid', value: 'cards' },
            { label: 'Alternating Layout', value: 'alternating' },
          ],
          admin: {
            description: 'Layout style for partnership models display',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // ONBOARDING PROCESS SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'process',
      type: 'group',
      label: 'Onboarding Process',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'sectionImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image for the process section (optional)',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Getting Started',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'How We Start Working Together',
        },
        {
          name: 'steps',
          type: 'array',
          label: 'Process Steps',
          fields: [
            {
              name: 'number',
              type: 'text',
              defaultValue: '01',
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
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // CREDENTIALS SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'credentials',
      type: 'group',
      label: 'Credentials & Downloads',
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
          defaultValue: 'Due Diligence',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Our Credentials',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'downloads',
          type: 'array',
          label: 'Downloadable Documents',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'requiresContact',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Require contact form submission to access',
              },
            },
          ],
        },
        {
          name: 'certifications',
          type: 'array',
          label: 'Certification Logos',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'name',
              type: 'text',
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // KEY STATS SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'stats',
      type: 'group',
      label: 'Key Statistics',
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
          defaultValue: 'Our Track Record',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Proven Results',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Statistics',
          fields: [
            {
              name: 'number',
              type: 'text',
              required: true,
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
          defaultValue: [
            { number: '7+', label: 'Years Experience', description: 'Operating since 2019' },
            { number: '50+', label: 'Active Partners', description: 'Worldwide' },
            { number: '6', label: 'Destinations', description: 'Across Southeast Asia' },
            { number: '24/7', label: 'Support', description: 'For active bookings' },
          ],
        },
        {
          name: 'backgroundColor',
          type: 'select',
          defaultValue: 'dark',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Accent', value: 'accent' },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // TESTIMONIAL HIGHLIGHT
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'testimonialHighlight',
      type: 'group',
      label: 'Partner Testimonial Highlight',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'quote',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'authorName',
          type: 'text',
        },
        {
          name: 'authorRole',
          type: 'text',
        },
        {
          name: 'companyName',
          type: 'text',
        },
        {
          name: 'companyLogo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'linkText',
          type: 'text',
          localized: true,
          defaultValue: 'View More Partner Stories',
        },
        {
          name: 'linkUrl',
          type: 'text',
          defaultValue: '/case-studies',
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // INQUIRY CTA SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'inquiryCta',
      type: 'group',
      label: 'Inquiry Call to Action',
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
          defaultValue: 'Ready to Start?',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          defaultValue: 'Tell us about your business and how we can work together.',
        },
        {
          name: 'primaryButtonText',
          type: 'text',
          localized: true,
          defaultValue: 'Submit Partnership Inquiry',
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
          defaultValue: 'Schedule a Call',
        },
        {
          name: 'secondaryButtonLink',
          type: 'text',
          admin: {
            description: 'Calendly or scheduling link',
          },
        },
        {
          name: 'contactEmail',
          type: 'text',
          defaultValue: 'partners@voyager.travel',
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
