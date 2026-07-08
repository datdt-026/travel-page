import { Block } from 'payload/types';

/**
 * Content Section Block
 * 
 * Flexible content section with various layout options.
 * Can be used for text content, feature grids, testimonials, etc.
 */
export const ContentSection: Block = {
  slug: 'content-section',
  labels: {
    singular: 'Content Section',
    plural: 'Content Sections',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show/hide this section.',
      },
    },
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'Optional HTML ID for anchor linking (e.g., "about-us").',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // SECTION HEADER
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'header',
      type: 'group',
      label: 'Section Header',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          admin: {
            description: 'Small text above the title (e.g., "Our Services").',
          },
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
          name: 'alignment',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      ],
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // CONTENT TYPE
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'contentType',
      type: 'select',
      defaultValue: 'richtext',
      options: [
        { label: 'Rich Text', value: 'richtext' },
        { label: 'Feature Grid', value: 'features' },
        { label: 'Stats/Numbers', value: 'stats' },
        { label: 'Cards Grid', value: 'cards' },
        { label: 'Image + Text', value: 'image-text' },
        { label: 'Quote/Testimonial', value: 'quote' },
      ],
      admin: {
        description: 'Type of content to display in this section.',
      },
    },
    
    // Rich Text Content
    {
      name: 'richTextContent',
      type: 'richText',
      localized: true,
      admin: {
        condition: (data, siblingData) => siblingData?.contentType === 'richtext',
      },
    },
    
    // Feature Grid
    {
      name: 'features',
      type: 'array',
      admin: {
        condition: (data, siblingData) => siblingData?.contentType === 'features',
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Emoji or icon name (e.g., "✈️" or "plane").',
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
          name: 'link',
          type: 'text',
          admin: {
            description: 'Optional link for the feature.',
          },
        },
      ],
    },
    
    // Stats/Numbers
    {
      name: 'stats',
      type: 'array',
      admin: {
        condition: (data, siblingData) => siblingData?.contentType === 'stats',
      },
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          admin: {
            description: 'The number or value (e.g., "500+", "98%").',
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
    
    // Cards Grid
    {
      name: 'cards',
      type: 'array',
      admin: {
        condition: (data, siblingData) => siblingData?.contentType === 'cards',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
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
          name: 'link',
          type: 'text',
        },
        {
          name: 'linkText',
          type: 'text',
          localized: true,
        },
      ],
    },
    
    // Image + Text
    {
      name: 'imageText',
      type: 'group',
      admin: {
        condition: (data, siblingData) => siblingData?.contentType === 'image-text',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          localized: true,
        },
        {
          name: 'ctaText',
          type: 'text',
          localized: true,
        },
        {
          name: 'ctaLink',
          type: 'text',
        },
      ],
    },
    
    // Quote/Testimonial
    {
      name: 'quote',
      type: 'group',
      admin: {
        condition: (data, siblingData) => siblingData?.contentType === 'quote',
      },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'author',
          type: 'text',
          localized: true,
        },
        {
          name: 'authorTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'authorImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // LAYOUT & STYLING
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'layout',
      type: 'group',
      label: 'Layout & Styling',
      fields: [
        {
          name: 'columns',
          type: 'select',
          defaultValue: '3',
          options: [
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
          admin: {
            description: 'Number of columns for grid layouts.',
            condition: (data, siblingData) => 
              ['features', 'stats', 'cards'].includes(data?.contentType),
          },
        },
        {
          name: 'backgroundColor',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default (White)', value: 'default' },
            { label: 'Light Gray', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Accent (Brand Color)', value: 'accent' },
          ],
        },
        {
          name: 'paddingTop',
          type: 'select',
          defaultValue: 'large',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
            { label: 'Extra Large', value: 'xl' },
          ],
        },
        {
          name: 'paddingBottom',
          type: 'select',
          defaultValue: 'large',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
            { label: 'Extra Large', value: 'xl' },
          ],
        },
        {
          name: 'containerWidth',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Narrow', value: 'narrow' },
            { label: 'Default', value: 'default' },
            { label: 'Wide', value: 'wide' },
            { label: 'Full Width', value: 'full' },
          ],
        },
      ],
    },
  ],
};
