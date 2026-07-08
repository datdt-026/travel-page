import { GlobalConfig } from 'payload/types';

/**
 * Contact Page Global Configuration
 * 
 * Configure the /contact page layout and content.
 */
export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the layout and content of the /contact page.',
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
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // CONTACT INFO
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          localized: true,
          defaultValue: 'Get in Touch',
        },
        {
          name: 'email',
          type: 'group',
          fields: [
            {
              name: 'icon',
              type: 'text',
              defaultValue: '✉️',
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              defaultValue: 'Email Us',
            },
            {
              name: 'value',
              type: 'text',
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'phone',
          type: 'group',
          fields: [
            {
              name: 'icon',
              type: 'text',
              defaultValue: '📞',
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              defaultValue: 'Call Us',
            },
            {
              name: 'value',
              type: 'text',
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'address',
          type: 'group',
          fields: [
            {
              name: 'icon',
              type: 'text',
              defaultValue: '📍',
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              defaultValue: 'Visit Us',
            },
            {
              name: 'value',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'mapLink',
              type: 'text',
              admin: {
                description: 'Google Maps or similar link.',
              },
            },
          ],
        },
        {
          name: 'hours',
          type: 'group',
          fields: [
            {
              name: 'icon',
              type: 'text',
              defaultValue: '🕐',
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              defaultValue: 'Business Hours',
            },
            {
              name: 'value',
              type: 'textarea',
              localized: true,
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // CONTACT FORM
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'form',
      type: 'group',
      label: 'Contact Form',
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
          defaultValue: 'Send Us a Message',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'fields',
          type: 'group',
          fields: [
            {
              name: 'namePlaceholder',
              type: 'text',
              localized: true,
              defaultValue: 'Your Name',
            },
            {
              name: 'emailPlaceholder',
              type: 'text',
              localized: true,
              defaultValue: 'Your Email',
            },
            {
              name: 'subjectPlaceholder',
              type: 'text',
              localized: true,
              defaultValue: 'Subject',
            },
            {
              name: 'messagePlaceholder',
              type: 'text',
              localized: true,
              defaultValue: 'Your Message',
            },
            {
              name: 'submitButtonText',
              type: 'text',
              localized: true,
              defaultValue: 'Send Message',
            },
          ],
        },
        {
          name: 'successMessage',
          type: 'textarea',
          localized: true,
          defaultValue: 'Thank you for your message! We will get back to you soon.',
        },
        {
          name: 'errorMessage',
          type: 'textarea',
          localized: true,
          defaultValue: 'Something went wrong. Please try again.',
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // SOCIAL LINKS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'social',
      type: 'group',
      label: 'Social Media',
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
          defaultValue: 'Follow Us',
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Twitter/X', value: 'twitter' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'Pinterest', value: 'pinterest' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // MAP SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'map',
      type: 'group',
      label: 'Map Section',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'embedUrl',
          type: 'text',
          admin: {
            description: 'Google Maps embed URL.',
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'height',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'Small (300px)', value: 'small' },
            { label: 'Medium (400px)', value: 'medium' },
            { label: 'Large (500px)', value: 'large' },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.enabled,
          },
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
