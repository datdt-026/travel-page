import { GlobalConfig } from 'payload/types';

/**
 * Case Studies Page Global Configuration
 * 
 * B2B-focused page showcasing partner success stories,
 * client testimonials, and project references.
 */
export const CaseStudiesPage: GlobalConfig = {
  slug: 'case-studies-page',
  label: 'Case Studies Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the /case-studies page - partner success stories and references.',
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
          defaultValue: 'Case Studies',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          defaultValue: 'Success stories from our partners around the world',
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
    // INTRO SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'intro',
      type: 'group',
      label: 'Introduction',
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
          defaultValue: 'Trusted by Partners Worldwide',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // PARTNER LOGOS SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'partnerLogos',
      type: 'group',
      label: 'Partner Logos',
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
          defaultValue: 'Partners We Work With',
        },
        {
          name: 'logos',
          type: 'array',
          label: 'Client/Partner Logos',
          admin: {
            description: 'Logos of agencies, operators, and partners (with permission)',
          },
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Company name (for alt text)',
              },
            },
            {
              name: 'country',
              type: 'text',
            },
            {
              name: 'link',
              type: 'text',
              admin: {
                description: 'Optional link to partner website',
              },
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // FEATURED CASE STUDIES
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'caseStudies',
      type: 'group',
      label: 'Featured Case Studies',
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
          defaultValue: 'Success Stories',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Featured Case Studies',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Optional introductory text below the title',
          },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Case Studies',
          admin: {
            description: 'Featured case studies displayed on the page. For full case study content, use the Case Studies collection.',
          },
          fields: [
            {
              name: 'slug',
              type: 'text',
              admin: {
                description: 'URL slug for linking to full case study page (e.g., "northern-vietnam-fit-operations"). Leave empty if no detail page exists.',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Hero image for the case study card',
              },
            },
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Case study title',
              },
            },
            {
              name: 'destination',
              type: 'text',
              localized: true,
              admin: {
                description: 'Destination or region (e.g., "Northern Vietnam", "Mekong Delta")',
              },
            },
            {
              name: 'deliverySummary',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Short 2-3 sentence operational description of how this was executed',
              },
            },
            {
              name: 'metrics',
              type: 'array',
              label: 'Key Metrics',
              maxRows: 3,
              admin: {
                description: 'Up to 3 measurable outcomes',
              },
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g., "500+", "98%", "2hr"',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  required: true,
                  admin: {
                    description: 'e.g., "FIT bookings handled", "satisfaction rating"',
                  },
                },
              ],
            },
            {
              name: 'partnerName',
              type: 'text',
              admin: {
                description: 'Partner company name (can be anonymized: "European Tour Operator")',
              },
            },
            {
              name: 'partnerCountry',
              type: 'text',
              admin: {
                description: 'Partner country (e.g., "Germany", "Australia")',
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Feature this case study prominently',
              },
            },
            {
              name: 'featuredOrder',
              type: 'number',
              admin: {
                description: 'Display order for featured case studies (1, 2, 3)',
              },
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // PARTNER STATEMENTS (Lightweight Trust Signal)
    // ═══════════════════════════════════════════════════════════════════
    // 
    // Design Rationale:
    // - This section acts as a trust signal, not content focus
    // - Maximum 2-3 statements for scannability
    // - Operational and professional tone only
    // - Supports rotation over time via order + status fields
    // 
    // Credibility Enhancements:
    // - Partner role provides source clarity
    // - Optional monochrome logo for quiet validation
    // - Review context establishes authenticity
    //
    {
      name: 'partnerStatements',
      type: 'group',
      label: 'Partner Statements',
      admin: {
        description: 'Lightweight trust reinforcement section — max 2-3 short quotes with credibility context',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show the "What Our Partners Say" section',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'What Our Partners Say',
          admin: {
            description: 'Section heading (kept minimal for editorial feel)',
          },
        },
        {
          name: 'reviewContext',
          type: 'text',
          localized: true,
          admin: {
            description: 'Source authenticity line (e.g., "Feedback collected during annual partner review · 2024")',
          },
        },
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'horizontal',
          options: [
            { label: 'Horizontal (side-by-side)', value: 'horizontal' },
            { label: 'Vertical (stacked)', value: 'vertical' },
          ],
          admin: {
            description: 'Layout style for the statements',
          },
        },
        {
          name: 'statements',
          type: 'array',
          label: 'Partner Statements',
          maxRows: 3,
          admin: {
            description: 'Keep to 2-3 statements. Short, operational quotes only.',
            initCollapsed: false,
          },
          fields: [
            {
              name: 'quote',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                description: '1-2 sentences. Operational tone. No superlatives.',
              },
            },
            {
              name: 'partnerRole',
              type: 'text',
              admin: {
                description: 'Role or function (e.g., "Operations Director", "Product Manager")',
              },
            },
            {
              name: 'partnerType',
              type: 'text',
              required: true,
              admin: {
                description: 'Partner type (e.g., "Inbound Operator", "DMC", "Hotel Group")',
              },
            },
            {
              name: 'region',
              type: 'text',
              admin: {
                description: 'Market or region (e.g., "Europe", "Southeast Asia")',
              },
            },
            {
              name: 'partnerLogo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Optional. Rendered monochrome and small. Must not dominate.',
              },
            },
            {
              name: 'order',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Display order (lower numbers first)',
              },
            },
            {
              name: 'status',
              type: 'select',
              defaultValue: 'published',
              options: [
                { label: 'Published', value: 'published' },
                { label: 'Hidden', value: 'hidden' },
              ],
              admin: {
                description: 'Use Hidden to rotate quotes over time without deleting',
              },
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // LEGACY: PARTNER TESTIMONIALS (Deprecated)
    // ═══════════════════════════════════════════════════════════════════
    // Keeping for backward compatibility - use partnerStatements instead
    {
      name: 'testimonials',
      type: 'group',
      label: 'Partner Testimonials (Legacy)',
      admin: {
        description: 'DEPRECATED: Use Partner Statements section above. This section may be removed in a future update.',
        condition: (data) => Boolean(data?.testimonials?.items?.length),
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Partner Feedback',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'What Our Partners Say',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Testimonials',
          fields: [
            {
              name: 'quote',
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'authorName',
              type: 'text',
              required: true,
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
              name: 'companyCountry',
              type: 'text',
            },
            {
              name: 'companyLogo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // PARTNERSHIP TYPES
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'partnershipTypes',
      type: 'group',
      label: 'Types of Partnerships',
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
          defaultValue: 'How We Collaborate',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Partnership Models',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Partnership Types',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Brand/Partner Logo',
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Fallback Icon (emoji)',
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
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Join Our Partner Network',
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
          defaultValue: 'Become a Partner',
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
          defaultValue: 'Request References',
        },
        {
          name: 'secondaryButtonLink',
          type: 'text',
          defaultValue: '/contact',
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
