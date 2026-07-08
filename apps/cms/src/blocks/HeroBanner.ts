import { Block } from 'payload/types';

/**
 * Hero Banner Block
 * 
 * Reusable hero/banner section that can be configured for any page.
 * Supports different styles, heights, overlays, and content positioning.
 */
export const HeroBanner: Block = {
  slug: 'hero-banner',
  labels: {
    singular: 'Hero Banner',
    plural: 'Hero Banners',
  },
  fields: [
    // ═══════════════════════════════════════════════════════════════════
    // VISUAL SETTINGS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero background image (recommended: 1920x1080 or larger).',
      },
    },
    {
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional background video (MP4 format recommended).',
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
        { label: 'Gradient Bottom', value: 'gradient-bottom' },
        { label: 'Gradient Left', value: 'gradient-left' },
      ],
      admin: {
        description: 'Overlay style to improve text readability.',
      },
    },
    {
      name: 'height',
      type: 'select',
      defaultValue: 'large',
      options: [
        { label: 'Small (40vh)', value: 'small' },
        { label: 'Medium (60vh)', value: 'medium' },
        { label: 'Large (80vh)', value: 'large' },
        { label: 'Full Screen (100vh)', value: 'full' },
        { label: 'Auto (content-based)', value: 'auto' },
      ],
      admin: {
        description: 'Height of the hero banner.',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // CONTENT
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      admin: {
        description: 'Small text above the title (e.g., category, label).',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        description: 'Main headline text.',
      },
    },
    {
      name: 'titleSize',
      type: 'select',
      defaultValue: 'large',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Extra Large', value: 'xl' },
      ],
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
      name: 'showBreadcrumb',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show breadcrumb navigation in hero.',
      },
    },
    {
      name: 'breadcrumbLabel',
      type: 'text',
      localized: true,
      admin: {
        description: 'Custom breadcrumb label for this page.',
        condition: (data, siblingData) => siblingData?.showBreadcrumb,
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // CTA BUTTONS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'ctas',
      type: 'array',
      label: 'Call to Action Buttons',
      maxRows: 3,
      admin: {
        description: 'Add up to 3 CTA buttons.',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            description: 'URL or path (e.g., /destinations, https://example.com)',
          },
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (Filled)', value: 'primary' },
            { label: 'Secondary (Outline)', value: 'secondary' },
            { label: 'Ghost (Text Only)', value: 'ghost' },
          ],
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // LAYOUT OPTIONS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'contentPosition',
      type: 'select',
      defaultValue: 'bottom-left',
      options: [
        { label: 'Top Left', value: 'top-left' },
        { label: 'Top Center', value: 'top-center' },
        { label: 'Top Right', value: 'top-right' },
        { label: 'Center Left', value: 'center-left' },
        { label: 'Center', value: 'center' },
        { label: 'Center Right', value: 'center-right' },
        { label: 'Bottom Left', value: 'bottom-left' },
        { label: 'Bottom Center', value: 'bottom-center' },
        { label: 'Bottom Right', value: 'bottom-right' },
      ],
      admin: {
        description: 'Position of the text content within the hero.',
      },
    },
    {
      name: 'textAlignment',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: 'Auto (follow position)', value: 'auto' },
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        description: 'Text alignment override. Auto follows content position.',
      },
    },
    {
      name: 'contentMaxWidth',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Small (max-w-xl)', value: 'small' },
        { label: 'Medium (max-w-2xl)', value: 'medium' },
        { label: 'Large (max-w-4xl)', value: 'large' },
        { label: 'Full Width', value: 'full' },
      ],
    },
    {
      name: 'showAccentLine',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show decorative accent line above content.',
      },
    },
    {
      name: 'enableParallax',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable parallax scrolling effect on background.',
      },
    },
    {
      name: 'enableAnimation',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable fade-in animations for content.',
      },
    },
  ],
};
