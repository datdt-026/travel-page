import { CollectionConfig } from 'payload/types';

/**
 * Pages Collection
 *
 * Generic pages collection for static content like About, Contact, etc.
 *
 * Localization: The following fields are localized:
 * - title, content, excerpt (main content)
 * - metaTitle, metaDescription (SEO)
 *
 * Non-localized fields (same across all languages):
 * - slug (URL identifier)
 * - featuredImage (media)
 * - status, publishedAt (publishing state)
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "about", "contact"). Same across all languages.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short summary or subtitle for the page.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero or featured image for the page.',
      },
    },
    // Content Blocks - Additional flexible content sections
    {
      name: 'contentBlocks',
      type: 'array',
      label: 'Content Blocks',
      admin: {
        description: 'Optional additional content blocks for the page.',
      },
      fields: [
        {
          name: 'blockType',
          type: 'select',
          required: true,
          options: [
            { label: 'Text Block', value: 'text' },
            { label: 'Image Block', value: 'image' },
            { label: 'Info Card', value: 'info-card' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            condition: (data, siblingData) =>
              siblingData?.blockType === 'text' || siblingData?.blockType === 'info-card',
          },
        },
        {
          name: 'text',
          type: 'richText',
          localized: true,
          admin: {
            condition: (data, siblingData) =>
              siblingData?.blockType === 'text' || siblingData?.blockType === 'info-card',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) =>
              siblingData?.blockType === 'image' || siblingData?.blockType === 'info-card',
          },
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Emoji or icon character for info cards.',
            condition: (data, siblingData) => siblingData?.blockType === 'info-card',
          },
        },
      ],
    },
    // SEO Fields Group
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'Custom page title for SEO. Defaults to page title if empty.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Custom meta description. Defaults to excerpt if empty.',
          },
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
    // Publishing Fields
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Date when the page was/will be published.',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-set publishedAt when status changes to published
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
};
