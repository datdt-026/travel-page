import { GlobalConfig } from 'payload/types';

/**
 * Site Footer Global Configuration
 * 
 * Configure the footer content and links.
 */
export const SiteFooter: GlobalConfig = {
  slug: 'site-footer',
  label: 'Footer',
  admin: {
    group: 'Site Settings',
    description: 'Configure the site footer.',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    // ═══════════════════════════════════════════════════════════════════
    // BRAND SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'brand',
      type: 'group',
      label: 'Brand Section',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Footer logo (optional, uses header logo if not set).',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Brief brand description.',
          },
        },
        {
          name: 'tagline',
          type: 'text',
          localized: true,
          admin: {
            description: 'Brand tagline.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // NAVIGATION COLUMNS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'columns',
      type: 'array',
      label: 'Link Columns',
      maxRows: 4,
      admin: {
        description: 'Footer navigation columns (max 4).',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Column heading.',
          },
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
            {
              name: 'external',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Open in new tab.',
              },
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // NEWSLETTER
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter Section',
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
          name: 'description',
          type: 'text',
          localized: true,
        },
        {
          name: 'placeholder',
          type: 'text',
          localized: true,
          admin: {
            description: 'Email input placeholder text.',
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          localized: true,
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // SOCIAL LINKS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'social',
      type: 'group',
      label: 'Social Links',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Social Media Links',
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Twitter / X', value: 'twitter' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'Pinterest', value: 'pinterest' },
                { label: 'TikTok', value: 'tiktok' },
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
    // CONTACT INFO
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'address',
          type: 'textarea',
          localized: true,
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // BOTTOM BAR
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'bottomBar',
      type: 'group',
      label: 'Bottom Bar',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          localized: true,
          admin: {
            description: 'Copyright text. Use {year} for current year.',
          },
        },
        {
          name: 'legalLinks',
          type: 'array',
          label: 'Legal Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export default SiteFooter;
