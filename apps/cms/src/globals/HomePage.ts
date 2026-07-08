import { GlobalConfig, Field } from 'payload/types';

/**
 * Reusable Section Styling Fields
 * 
 * These fields allow editors to customize colors for each section.
 * Can be reused across multiple sections for consistency.
 */
const sectionStylingFields: Field[] = [
  {
    name: 'styling',
    type: 'group',
    label: 'Section Styling',
    admin: {
      description: 'Customize colors for this section.',
    },
    fields: [
      {
        name: 'sectionBackground',
        type: 'text',
        label: 'Section Background Color',
        admin: {
          description: 'Background color for the entire section (e.g., #ffffff, rgb(255,255,255), or CSS variable like var(--surface-primary)).',
        },
      },
      {
        name: 'cardBackground',
        type: 'text',
        label: 'Card Background Color',
        admin: {
          description: 'Background color for cards within this section.',
        },
      },
      {
        name: 'cardBorderColor',
        type: 'text',
        label: 'Card Border Color',
        admin: {
          description: 'Border color for cards (optional).',
        },
      },
      {
        name: 'titleColor',
        type: 'text',
        label: 'Title Color',
        admin: {
          description: 'Color for section title/heading text.',
        },
      },
      {
        name: 'subtitleColor',
        type: 'text',
        label: 'Subtitle Color',
        admin: {
          description: 'Color for section subtitle/tagline text.',
        },
      },
      {
        name: 'textColor',
        type: 'text',
        label: 'Body Text Color',
        admin: {
          description: 'Color for body/paragraph text.',
        },
      },
      {
        name: 'cardTitleColor',
        type: 'text',
        label: 'Card Title Color',
        admin: {
          description: 'Color for card titles.',
        },
      },
      {
        name: 'cardTextColor',
        type: 'text',
        label: 'Card Text Color',
        admin: {
          description: 'Color for card body text.',
        },
      },
      {
        name: 'accentColor',
        type: 'text',
        label: 'Accent Color',
        admin: {
          description: 'Color for accent elements like buttons, links, decorative lines.',
        },
      },
      {
        name: 'buttonBackground',
        type: 'text',
        label: 'Button Background Color',
        admin: {
          description: 'Background color for primary buttons.',
        },
      },
      {
        name: 'buttonTextColor',
        type: 'text',
        label: 'Button Text Color',
        admin: {
          description: 'Text color for primary buttons.',
        },
      },
    ],
  },
];

/**
 * Creates styling fields with a custom field name prefix
 * to avoid conflicts when multiple styling groups exist
 */
function createStylingFields(options?: { excludeCardFields?: boolean }): Field[] {
  if (options?.excludeCardFields) {
    return [
      {
        name: 'styling',
        type: 'group',
        label: 'Section Styling',
        admin: {
          description: 'Customize colors for this section.',
        },
        fields: [
          {
            name: 'sectionBackground',
            type: 'text',
            label: 'Section Background Color',
            admin: {
              description: 'Background color for the entire section (e.g., #ffffff, rgb(255,255,255)).',
            },
          },
          {
            name: 'titleColor',
            type: 'text',
            label: 'Title Color',
            admin: {
              description: 'Color for section title/heading text.',
            },
          },
          {
            name: 'subtitleColor',
            type: 'text',
            label: 'Subtitle Color',
            admin: {
              description: 'Color for section subtitle/tagline text.',
            },
          },
          {
            name: 'textColor',
            type: 'text',
            label: 'Body Text Color',
            admin: {
              description: 'Color for body/paragraph text.',
            },
          },
          {
            name: 'accentColor',
            type: 'text',
            label: 'Accent Color',
            admin: {
              description: 'Color for accent elements like decorative lines.',
            },
          },
          {
            name: 'buttonBackground',
            type: 'text',
            label: 'Button Background Color',
            admin: {
              description: 'Background color for primary buttons.',
            },
          },
          {
            name: 'buttonTextColor',
            type: 'text',
            label: 'Button Text Color',
            admin: {
              description: 'Text color for primary buttons.',
            },
          },
        ],
      },
    ];
  }
  return sectionStylingFields;
}

/**
 * Home Page Global Configuration
 * 
 * This global config allows editors to customize the home page
 * content directly from the CMS.
 */
export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the content of the home page.',
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
      admin: {
        description: 'Configure the main hero banner at the top of the page.',
      },
      fields: [
        {
          name: 'mediaType',
          type: 'select',
          defaultValue: 'image',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
          ],
          admin: {
            description: 'Choose between image or video background.',
          },
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Hero background image (recommended: 1920x1080 or larger).',
            condition: (data) => data?.hero?.mediaType !== 'video',
          },
        },
        {
          name: 'backgroundVideo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Hero background video (MP4 format, recommended: 1920x1080, max 15MB).',
            condition: (data) => data?.hero?.mediaType === 'video',
          },
        },
        {
          name: 'videoPoster',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Poster image shown while video loads (optional).',
            condition: (data) => data?.hero?.mediaType === 'video',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            description: 'Main headline (e.g., "Discover the World").',
          },
        },
        {
          name: 'brandName',
          type: 'text',
          localized: true,
          admin: {
            description: 'Brand name displayed prominently.',
          },
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Supporting text below the headline.',
          },
        },
        {
          name: 'ctaText',
          type: 'text',
          localized: true,
          admin: {
            description: 'Call-to-action button text.',
          },
        },
        {
          name: 'ctaLink',
          type: 'text',
          defaultValue: '/destinations',
          admin: {
            description: 'Call-to-action button link.',
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
        ...createStylingFields({ excludeCardFields: true }),
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // BRAND PHILOSOPHY SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'philosophy',
      type: 'group',
      label: 'Brand Philosophy Section',
      admin: {
        description: 'The quiet luxury introduction section.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show this section on the home page.',
          },
        },
        {
          name: 'tagline',
          type: 'text',
          localized: true,
          defaultValue: 'Our Philosophy',
          admin: {
            description: 'Small tagline above the statement.',
          },
        },
        {
          name: 'statement',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Main philosophy statement.',
          },
        },
        {
          name: 'signature',
          type: 'text',
          localized: true,
          admin: {
            description: 'Signature line (e.g., "— The Art of Slow Travel").',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional image for the philosophy section.',
          },
        },
        ...createStylingFields({ excludeCardFields: true }),
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // DESTINATIONS HIGHLIGHT SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'destinations',
      type: 'group',
      label: 'Destinations Highlight Section',
      admin: {
        description: 'Featured destinations grid.',
      },
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
          admin: {
            description: 'Section title.',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'Section subtitle.',
          },
        },
        {
          name: 'ctaText',
          type: 'text',
          localized: true,
          admin: {
            description: 'View all button text.',
          },
        },
        {
          name: 'ctaLink',
          type: 'text',
          defaultValue: '/destinations',
        },
        {
          name: 'featuredCountries',
          type: 'relationship',
          relationTo: 'countries',
          hasMany: true,
          admin: {
            description: 'Select specific countries to feature (leave empty to auto-select).',
          },
        },
        {
          name: 'limit',
          type: 'number',
          defaultValue: 6,
          admin: {
            description: 'Number of countries to show if auto-selecting.',
          },
        },
        ...createStylingFields(),
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // SIGNATURE EXPERIENCES SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'experiences',
      type: 'group',
      label: 'Signature Experiences Section',
      admin: {
        description: 'Featured itineraries showcase.',
      },
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
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'featuredItineraries',
          type: 'relationship',
          relationTo: 'itineraries',
          hasMany: true,
          admin: {
            description: 'Select specific itineraries to feature (leave empty to auto-select).',
          },
        },
        {
          name: 'limit',
          type: 'number',
          defaultValue: 3,
        },
        ...createStylingFields(),
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // TESTIMONIALS SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'testimonials',
      type: 'group',
      label: 'Testimonials Section',
      admin: {
        description: 'Customer testimonials carousel.',
      },
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
          defaultValue: 'Words from Our Travelers',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Testimonials',
          fields: [
            {
              name: 'quote',
              type: 'textarea',
              required: true,
              localized: true,
            },
            {
              name: 'author',
              type: 'text',
              required: true,
            },
            {
              name: 'location',
              type: 'text',
            },
            {
              name: 'trip',
              type: 'text',
              localized: true,
              admin: {
                description: 'Destination/trip name.',
              },
            },
          ],
        },
        ...createStylingFields({ excludeCardFields: true }),
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // SOFT CTA SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action Section',
      admin: {
        description: 'Final call-to-action section.',
      },
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
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'primaryCtaText',
          type: 'text',
          localized: true,
        },
        {
          name: 'primaryCtaLink',
          type: 'text',
          defaultValue: '/contact',
        },
        {
          name: 'secondaryCtaText',
          type: 'text',
          localized: true,
        },
        {
          name: 'secondaryCtaLink',
          type: 'text',
          defaultValue: '/destinations',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image for the CTA section.',
          },
        },
        ...createStylingFields({ excludeCardFields: true }),
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // B2B STATS SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'b2bStats',
      type: 'group',
      label: 'B2B Statistics',
      admin: {
        description: 'Key business statistics to build credibility.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image for the stats section.',
          },
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
              admin: {
                description: 'Statistic number (e.g., "500+", "7+", "98%")',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
            },
          ],
        },
        ...createStylingFields(),
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // B2B VALUE PROPOSITION SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'b2bValueProposition',
      type: 'group',
      label: 'B2B Value Proposition',
      admin: {
        description: 'Hero-style value proposition section for B2B visitors.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable B2B value proposition section.',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Your Partner in Southeast Asia',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Trusted DMC for Discerning Travel Partners',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'highlights',
          type: 'array',
          label: 'Key Highlights',
          maxRows: 4,
          fields: [
            {
              name: 'icon',
              type: 'select',
              options: [
                { label: 'Handshake', value: 'handshake' },
                { label: 'Globe', value: 'globe' },
                { label: 'Shield', value: 'shield' },
                { label: 'Clock', value: 'clock' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          name: 'ctaText',
          type: 'text',
          localized: true,
          defaultValue: 'Explore Partnership',
        },
        {
          name: 'ctaLink',
          type: 'text',
          defaultValue: '/partners',
        },
        {
          name: 'secondaryCtaText',
          type: 'text',
          localized: true,
        },
        {
          name: 'secondaryCtaLink',
          type: 'text',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image for premium variant (cinematic parallax effect).',
          },
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'premium',
          options: [
            { label: 'Premium (Cinematic)', value: 'premium' },
            { label: 'Standard', value: 'standard' },
          ],
          admin: {
            description: 'Choose the design variant.',
          },
        },
        ...createStylingFields(),
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // B2B SERVICES OVERVIEW SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'b2bServicesOverview',
      type: 'group',
      label: 'B2B Services Overview',
      admin: {
        description: 'Quick overview of DMC services for B2B visitors.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'cards',
          options: [
            { label: 'Premium Cards (Staggered)', value: 'cards' },
            { label: 'Horizontal Scroll', value: 'horizontal' },
          ],
          admin: {
            description: 'Choose the design variant.',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Our Expertise',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Comprehensive DMC Solutions',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'services',
          type: 'array',
          label: 'Services',
          maxRows: 6,
          fields: [
            {
              name: 'icon',
              type: 'select',
              options: [
                { label: 'FIT / Individual', value: 'fit' },
                { label: 'Series / Groups', value: 'series' },
                { label: 'MICE / Corporate', value: 'mice' },
                { label: 'Luxury / Private', value: 'luxury' },
                { label: 'Adventure / Active', value: 'adventure' },
                { label: 'Wellness / Spa', value: 'wellness' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
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
              admin: {
                description: 'Service image (for horizontal variant).',
              },
            },
            {
              name: 'stats',
              type: 'group',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  admin: {
                    description: 'Stat value (e.g., "24h", "500+")',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'Stat label',
                  },
                },
              ],
            },
            {
              name: 'features',
              type: 'array',
              maxRows: 6,
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'link',
              type: 'text',
            },
          ],
        },
        ...createStylingFields(),
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // B2B QUICK CREDENTIALS BAR
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'b2bCredentials',
      type: 'group',
      label: 'B2B Quick Credentials',
      admin: {
        description: 'Credentials section showing key stats and certifications.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'floating',
          options: [
            { label: 'Premium Floating Cards', value: 'floating' },
            { label: 'Timeline', value: 'timeline' },
            { label: 'Showcase Grid', value: 'showcase' },
          ],
          admin: {
            description: 'Choose the design variant.',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Our Credentials',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Trusted Excellence',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'items',
          type: 'array',
          label: 'Credentials',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'Statistic', value: 'stat' },
                { label: 'Certification', value: 'certification' },
                { label: 'Award', value: 'award' },
                { label: 'Membership', value: 'membership' },
              ],
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: {
                description: 'The number or name (e.g., "15+", "Travelife")',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
              admin: {
                description: 'Description or tooltip text',
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Logo for certifications/awards',
              },
            },
            {
              name: 'year',
              type: 'text',
            },
          ],
        },
        ...createStylingFields(),
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // B2B PARTNER SHOWCASE SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'b2bPartnerShowcase',
      type: 'group',
      label: 'B2B Partner Showcase',
      admin: {
        description: 'Showcase trusted partners with premium design.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'marquee',
          options: [
            { label: 'Marquee (Infinite Scroll)', value: 'marquee' },
            { label: 'Grid', value: 'grid' },
            { label: 'Featured with Testimonials', value: 'featured' },
          ],
          admin: {
            description: 'Choose the design variant.',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Trusted Worldwide',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Our Global Partners',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image for featured variant.',
          },
        },
        {
          name: 'partners',
          type: 'array',
          label: 'Partners',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'country',
              type: 'text',
            },
            {
              name: 'url',
              type: 'text',
            },
            {
              name: 'testimonial',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Partner testimonial (for featured variant)',
              },
            },
            {
              name: 'representative',
              type: 'text',
              admin: {
                description: 'Name of the representative',
              },
            },
          ],
        },
        {
          name: 'ctaText',
          type: 'text',
          localized: true,
          defaultValue: 'Become a Partner',
        },
        {
          name: 'ctaLink',
          type: 'text',
          defaultValue: '/partners/inquiry',
        },
        ...createStylingFields(),
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // B2B CTA SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'b2bCta',
      type: 'group',
      label: 'B2B Call to Action',
      admin: {
        description: 'Final call-to-action section for B2B visitors.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'cinematic',
          options: [
            { label: 'Cinematic (Full Parallax)', value: 'cinematic' },
            { label: 'Split (Image + Content)', value: 'split' },
            { label: 'Minimal', value: 'minimal' },
          ],
          admin: {
            description: 'Choose the design variant.',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Start Your Partnership',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Ready to Create Extraordinary Journeys Together?',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background image for cinematic/split variant.',
          },
        },
        {
          name: 'primaryButtonText',
          type: 'text',
          localized: true,
          defaultValue: 'Begin the Conversation',
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
        },
        {
          name: 'secondaryButtonLink',
          type: 'text',
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Quick Stats',
          maxRows: 3,
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
        ...createStylingFields({ excludeCardFields: true }),
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // SEO
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
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
          admin: {
            description: 'Comma-separated keywords for SEO.',
          },
        },
      ],
    },
  ],
};

export default HomePage;
