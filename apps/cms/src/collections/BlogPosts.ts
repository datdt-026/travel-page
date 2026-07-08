import { CollectionConfig } from 'payload/types';

/**
 * BlogPosts Collection
 *
 * Localization: The following fields are localized:
 * - title, content, excerpt (main content)
 * - metaTitle, metaDescription (SEO)
 *
 * Non-localized fields (same across all languages):
 * - slug (URL identifier)
 * - featuredImage (media)
 * - category, author (relationships/categorical)
 * - status, publishedAt (publishing state)
 * - readTime (calculated/factual)
 */
export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'category', 'status', 'publishedAt'],
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
        description: 'URL-friendly identifier (e.g., "top-10-travel-tips"). Same across all languages.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Short summary of the post for previews and SEO.',
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
        description: 'Main image for the blog post.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Travel Tips', value: 'travel-tips' },
        { label: 'Destinations', value: 'destinations' },
        { label: 'Food & Drink', value: 'food-drink' },
        { label: 'Adventure', value: 'adventure' },
        { label: 'Culture', value: 'culture' },
        { label: 'Budget Travel', value: 'budget' },
        { label: 'Eco Travel', value: 'eco-travel' },
        { label: 'Solo Travel', value: 'solo-travel' },
        { label: 'Family Travel', value: 'family-travel' },
        { label: 'Guides', value: 'guides' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'readTime',
      type: 'text',
      admin: {
        description: 'Estimated read time (e.g., "5 min read").',
        position: 'sidebar',
      },
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
            description: 'Custom page title for SEO. Defaults to post title if empty.',
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
        description: 'Date when the post was/will be published.',
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
