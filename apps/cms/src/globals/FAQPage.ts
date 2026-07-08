import { GlobalConfig } from 'payload/types';

/**
 * FAQ Page Global Configuration
 * 
 * Configure the /faq page layout and content.
 */
export const FAQPage: GlobalConfig = {
  slug: 'faq-page',
  label: 'FAQ Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the layout and content of the /faq page.',
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
          name: 'showBreadcrumb',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'breadcrumbLabel',
          type: 'text',
          localized: true,
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // SEARCH SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'search',
      type: 'group',
      label: 'Search Settings',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'placeholder',
          type: 'text',
          localized: true,
          defaultValue: 'Search frequently asked questions...',
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // LISTING SETTINGS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'listing',
      type: 'group',
      label: 'FAQ Listing Settings',
      fields: [
        {
          name: 'showCategories',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Group FAQs by category.',
          },
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'accordion',
          options: [
            { label: 'Accordion', value: 'accordion' },
            { label: 'Cards', value: 'cards' },
            { label: 'Simple List', value: 'list' },
          ],
        },
        {
          name: 'allowMultipleOpen',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Allow multiple FAQs to be open at once.',
            condition: (data, siblingData) => siblingData?.style === 'accordion',
          },
        },
        {
          name: 'expandFirstItem',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Automatically expand the first FAQ item.',
            condition: (data, siblingData) => siblingData?.style === 'accordion',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // CONTACT CTA
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'contactCta',
      type: 'group',
      label: 'Contact CTA Section',
      admin: {
        description: 'CTA shown at the bottom for users who need more help.',
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
          defaultValue: "Still have questions?",
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          defaultValue: "Can't find the answer you're looking for? Our team is here to help.",
        },
        {
          name: 'buttonText',
          type: 'text',
          localized: true,
          defaultValue: 'Contact Us',
        },
        {
          name: 'buttonLink',
          type: 'text',
          defaultValue: '/contact',
        },
        {
          name: 'backgroundColor',
          type: 'select',
          defaultValue: 'light',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Accent', value: 'accent' },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // EMPTY STATE
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'emptyState',
      type: 'group',
      label: 'Empty State',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'No FAQs Yet',
        },
        {
          name: 'message',
          type: 'textarea',
          localized: true,
          defaultValue: 'Check back soon or contact us directly with your questions.',
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
