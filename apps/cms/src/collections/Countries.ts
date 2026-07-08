import { CollectionConfig } from 'payload/types';

/**
 * Countries Collection
 * 
 * Localization: The following fields are localized:
 * - name, description, excerpt (main content)
 * - bestTimeToVisit (can vary by language)
 * - metaTitle, metaDescription, metaKeywords (SEO)
 * 
 * Non-localized fields (same across all languages):
 * - slug (URL identifier - keeps URLs consistent)
 * - continent, currency, language, timezone (factual data)
 * - featuredImage, gallery (media)
 * - status, publishedAt (publishing state)
 */
export const Countries: CollectionConfig = {
  slug: 'countries',
  admin: {
    useAsTitle: 'name',
    group: 'Destinations',
    defaultColumns: ['name', 'slug', 'continent', 'updatedAt'],
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
      localized: true, // Localized for translations
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      // NOT localized - keeps URLs consistent across languages
      admin: {
        description: 'URL-friendly identifier (e.g., "united-states"). Same across all languages.',
      },
    },
    {
      name: 'continent',
      type: 'select',
      required: true,
      // NOT localized - factual data
      options: [
        { label: 'Africa', value: 'africa' },
        { label: 'Asia', value: 'asia' },
        { label: 'Europe', value: 'europe' },
        { label: 'North America', value: 'north-america' },
        { label: 'Oceania', value: 'oceania' },
        { label: 'South America', value: 'south-america' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true, // Localized for translations
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      localized: true, // Localized for translations
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
      name: 'currency',
      type: 'text',
      admin: {
        description: 'e.g., USD, EUR, JPY',
      },
    },
    {
      name: 'language',
      type: 'text',
      admin: {
        description: 'Primary language spoken',
      },
    },
    {
      name: 'timezone',
      type: 'text',
    },
    {
      name: 'bestTimeToVisit',
      type: 'textarea',
      localized: true, // Can vary by language for cultural context
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
              localized: true, // SEO titles should be localized
              admin: {
                description: 'SEO title (defaults to name if empty)',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              maxLength: 160,
              localized: true, // SEO descriptions should be localized
              admin: {
                description: 'SEO description (max 160 chars)',
              },
            },
            {
              name: 'metaKeywords',
              type: 'text',
              localized: true, // Keywords should be localized
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
