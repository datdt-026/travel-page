import { GlobalConfig } from 'payload/types';

/**
 * About Page Global Configuration
 * 
 * Configure the /about page layout and content.
 */
export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the layout and content of the /about page.',
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
          defaultValue: 'large',
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
          name: 'showAccentLine',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // INTRO SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'intro',
      type: 'group',
      label: 'Intro Section',
      admin: {
        description: 'A short introduction section after the hero.',
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
          defaultValue: 'Your Journey Begins Here',
        },
        {
          name: 'content',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'A brief introduction paragraph.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // STORY SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'story',
      type: 'group',
      label: 'Our Story Section',
      admin: {
        description: 'Tell your company story.',
      },
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
          defaultValue: 'Our Story',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'From Wanderlust to Purpose',
        },
        {
          name: 'content',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'highlight',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'A highlighted quote or statement.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // MISSION SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'mission',
      type: 'group',
      label: 'Mission Section',
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
          defaultValue: 'Our Mission',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'content',
          type: 'richText',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'right',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // VALUES/FEATURES SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'values',
      type: 'group',
      label: 'Values Section',
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
          defaultValue: 'Our Values',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Emoji or icon (e.g., "🌍", "✨").',
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
          name: 'backgroundColor',
          type: 'select',
          defaultValue: 'light',
          options: [
            { label: 'White', value: 'default' },
            { label: 'Light Gray', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // WHY CHOOSE US SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'whyChoose',
      type: 'group',
      label: 'Why Choose Us Section',
      admin: {
        description: 'Highlight reasons to choose your company.',
      },
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
          defaultValue: 'Why Choose Us',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Travel With Confidence',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
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
    // TEAM SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'team',
      type: 'group',
      label: 'Team Section',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Meet Our Team',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'members',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
          fields: [
            {
              name: 'photo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              localized: true,
            },
            {
              name: 'bio',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'socials',
              type: 'group',
              fields: [
                { name: 'linkedin', type: 'text' },
                { name: 'twitter', type: 'text' },
                { name: 'instagram', type: 'text' },
              ],
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // STATS SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'stats',
      type: 'group',
      label: 'Stats Section',
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
            description: 'Background image for the stats section.',
          },
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'number',
              type: 'text',
              required: true,
              admin: {
                description: 'The number (e.g., "500+", "50K").',
              },
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
    // CTA SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action Section',
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
          type: 'textarea',
          localized: true,
        },
        {
          name: 'primaryButtonText',
          type: 'text',
          localized: true,
        },
        {
          name: 'primaryButtonLink',
          type: 'text',
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
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
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
