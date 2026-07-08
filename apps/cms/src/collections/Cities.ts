import { CollectionConfig } from 'payload/types';

/**
 * Cities Collection
 * 
 * Localization: The following fields are localized:
 * - name, description, excerpt (main content)
 * - highlights (title and description within)
 * - localTips (content)
 * - metaTitle, metaDescription, metaKeywords (SEO)
 * 
 * Non-localized fields (same across all languages):
 * - slug (URL identifier)
 * - country (relationship)
 * - population, coordinates (factual data)
 * - featuredImage, gallery (media)
 * - status, publishedAt (publishing state)
 */
export const Cities: CollectionConfig = {
  slug: 'cities',
  admin: {
    useAsTitle: 'name',
    group: 'Destinations',
    defaultColumns: ['name', 'slug', 'country', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
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
        description: 'URL-friendly identifier (e.g., "new-york-city"). Same across all languages.',
      },
    },
    {
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
      required: true,
      hasMany: false,
      index: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      localized: true,
      admin: {
        description: 'Short description for cards and meta descriptions (max 300 chars)',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'population',
      type: 'number',
    },
    {
      name: 'coordinates',
      type: 'group',
      fields: [
        {
          name: 'latitude',
          type: 'number',
        },
        {
          name: 'longitude',
          type: 'number',
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      localized: true, // Array itself is localized
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
      admin: {
        description: 'Key highlights or must-see things in this city',
      },
    },
    {
      name: 'localTips',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Local tips and insider knowledge',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              admin: {
                description: 'SEO title (defaults to name if empty)',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              maxLength: 160,
              localized: true,
              admin: {
                description: 'SEO description (max 160 chars)',
              },
            },
            {
              name: 'metaKeywords',
              type: 'text',
              localized: true,
              admin: {
                description: 'Comma-separated keywords',
              },
            },
          ],
        },
      ],
    },
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
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  timestamps: true,
};
