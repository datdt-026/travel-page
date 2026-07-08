import { GlobalConfig } from 'payload/types';

/**
 * Site Header Global Configuration
 * 
 * Configure the main navigation and header elements.
 */
export const SiteHeader: GlobalConfig = {
  slug: 'site-header',
  label: 'Header',
  admin: {
    group: 'Site Settings',
    description: 'Configure the site header and navigation.',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    // ═══════════════════════════════════════════════════════════════════
    // LOGO
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'logo',
      type: 'group',
      label: 'Logo',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Logo image (recommended: SVG or transparent PNG).',
          },
        },
        {
          name: 'imageLight',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Light version of logo for dark backgrounds.',
          },
        },
        {
          name: 'text',
          type: 'text',
          admin: {
            description: 'Text to display if no logo image (brand name).',
          },
        },
        {
          name: 'altText',
          type: 'text',
          localized: true,
          admin: {
            description: 'Alt text for the logo image.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // MAIN NAVIGATION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'navigation',
      type: 'array',
      label: 'Main Navigation',
      admin: {
        description: 'Configure the main navigation links.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Link text.',
          },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            description: 'Link URL (e.g., /destinations, /about).',
          },
        },
        {
          name: 'highlight',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Highlight this link (e.g., with accent color).',
          },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            description: 'Optional dropdown menu items.',
          },
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
              name: 'description',
              type: 'text',
              localized: true,
              admin: {
                description: 'Optional description for mega menu.',
              },
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // CTA BUTTON
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button',
      admin: {
        description: 'Call-to-action button in header (e.g., Contact).',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show the CTA button in header.',
          },
        },
        {
          name: 'label',
          type: 'text',
          localized: true,
          admin: {
            description: 'Button text (e.g., Contact, Get Started).',
          },
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '/contact',
          admin: {
            description: 'Button link URL.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // SETTINGS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'settings',
      type: 'group',
      label: 'Settings',
      fields: [
        {
          name: 'showLanguageSwitcher',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show the language switcher.',
          },
        },
        {
          name: 'sticky',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Make header sticky on scroll.',
          },
        },
        {
          name: 'transparent',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Transparent header on hero sections.',
          },
        },
      ],
    },
  ],
};

export default SiteHeader;
