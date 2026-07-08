import { CollectionConfig } from 'payload/types';

/**
 * Attractions Collection
 * 
 * Localization: The following fields are localized:
 * - name, description, excerpt (main content)
 * - tips (visitor tips array)
 * - openingHours, address (can be different per locale)
 * - metaTitle, metaDescription, metaKeywords (SEO)
 * 
 * Non-localized fields (same across all languages):
 * - slug (URL identifier)
 * - city, category (relationships/categorical)
 * - coordinates, ticketPrice, rating (factual data)
 * - featuredImage, gallery (media)
 * - website (external link)
 * - status, publishedAt (publishing state)
 */
export const Attractions: CollectionConfig = {
  slug: 'attractions',
  admin: {
    useAsTitle: 'name',
    group: 'Destinations',
    defaultColumns: ['name', 'slug', 'city', 'category', 'updatedAt'],
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
        description: 'URL-friendly identifier (e.g., "eiffel-tower"). Same across all languages.',
      },
    },
    {
      name: 'city',
      type: 'relationship',
      relationTo: 'cities',
      required: true,
      hasMany: false,
      index: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Landmark', value: 'landmark' },
        { label: 'Museum', value: 'museum' },
        { label: 'Park', value: 'park' },
        { label: 'Beach', value: 'beach' },
        { label: 'Religious Site', value: 'religious-site' },
        { label: 'Entertainment', value: 'entertainment' },
        { label: 'Shopping', value: 'shopping' },
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Nature', value: 'nature' },
        { label: 'Historical', value: 'historical' },
        { label: 'Adventure', value: 'adventure' },
        { label: 'Other', value: 'other' },
      ],
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
      name: 'address',
      type: 'textarea',
      localized: true, // Can be formatted differently per locale
    },
    {
      name: 'openingHours',
      type: 'textarea',
      localized: true, // Opening hours text can be localized
      admin: {
        description: 'Opening hours information',
      },
    },
    {
      name: 'ticketPrice',
      type: 'group',
      fields: [
        {
          name: 'adult',
          type: 'number',
        },
        {
          name: 'child',
          type: 'number',
        },
        {
          name: 'currency',
          type: 'text',
        },
        {
          name: 'notes',
          type: 'text',
        },
      ],
    },
    {
      name: 'visitDuration',
      type: 'text',
      admin: {
        description: 'Recommended visit duration (e.g., "2-3 hours")',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      admin: {
        step: 0.1,
        description: 'Average rating (0-5)',
      },
    },
    {
      name: 'tips',
      type: 'array',
      localized: true, // Tips should be localized
      fields: [
        {
          name: 'tip',
          type: 'textarea',
          required: true,
        },
      ],
      admin: {
        description: 'Visitor tips and advice',
      },
    },
    {
      name: 'website',
      type: 'text',
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
