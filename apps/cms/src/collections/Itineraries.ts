import { CollectionConfig } from 'payload/types';
import { itineraryEditorialBlocks } from '../blocks/itinerary';

/**
 * Itineraries Collection
 * 
 * Localization: The following fields are localized:
 * - title, description, excerpt (main content)
 * - days (array with nested content)
 * - metaTitle, metaDescription, metaKeywords (SEO)
 * 
 * Non-localized fields (same across all languages):
 * - slug (URL identifier)
 * - duration, difficulty, travelStyle (factual/categorical)
 * - countries, cities (relationships)
 * - estimatedBudget (numerical data)
 * - featuredImage (media)
 * - status, publishedAt (publishing state)
 */
export const Itineraries: CollectionConfig = {
  slug: 'itineraries',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'duration', 'status', 'updatedAt'],
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
        description: 'URL-friendly identifier (e.g., "7-days-in-japan"). Same across all languages.',
      },
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
      name: 'duration',
      type: 'number',
      required: true,
      admin: {
        description: 'Number of days',
      },
    },
    {
      name: 'countries',
      type: 'relationship',
      relationTo: 'countries',
      hasMany: true,
    },
    {
      name: 'cities',
      type: 'relationship',
      relationTo: 'cities',
      hasMany: true,
    },
    {
      name: 'difficulty',
      type: 'select',
      options: [
        { label: 'Easy', value: 'easy' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Challenging', value: 'challenging' },
      ],
      defaultValue: 'moderate',
    },
    {
      name: 'travelStyle',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Adventure', value: 'adventure' },
        { label: 'Cultural', value: 'cultural' },
        { label: 'Relaxation', value: 'relaxation' },
        { label: 'Foodie', value: 'foodie' },
        { label: 'Family', value: 'family' },
        { label: 'Romantic', value: 'romantic' },
        { label: 'Budget', value: 'budget' },
        { label: 'Luxury', value: 'luxury' },
        { label: 'Solo', value: 'solo' },
        { label: 'Backpacking', value: 'backpacking' },
      ],
    },
    {
      name: 'estimatedBudget',
      type: 'group',
      fields: [
        {
          name: 'min',
          type: 'number',
        },
        {
          name: 'max',
          type: 'number',
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'USD',
        },
        {
          name: 'notes',
          type: 'text',
        },
      ],
    },
    {
      name: 'days',
      type: 'array',
      required: true,
      localized: true, // Days array is localized for translated content
      fields: [
        {
          name: 'dayNumber',
          type: 'number',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'relationship',
          relationTo: 'cities',
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'activities',
          type: 'array',
          fields: [
            {
              name: 'time',
              type: 'text',
              admin: {
                description: 'e.g., "Morning", "9:00 AM"',
              },
            },
            {
              name: 'activity',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'attraction',
              type: 'relationship',
              relationTo: 'attractions',
            },
            {
              name: 'duration',
              type: 'text',
            },
          ],
        },
        {
          name: 'accommodation',
          type: 'group',
          fields: [
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Hotel', value: 'hotel' },
                { label: 'Hostel', value: 'hostel' },
                { label: 'Airbnb', value: 'airbnb' },
                { label: 'Resort', value: 'resort' },
                { label: 'Camping', value: 'camping' },
                { label: 'Other', value: 'other' },
              ],
            },
            {
              name: 'notes',
              type: 'textarea',
            },
          ],
        },
        {
          name: 'meals',
          type: 'group',
          fields: [
            {
              name: 'breakfast',
              type: 'text',
            },
            {
              name: 'lunch',
              type: 'text',
            },
            {
              name: 'dinner',
              type: 'text',
            },
          ],
        },
      ],
      admin: {
        description: 'Day-by-day itinerary breakdown (legacy format). Use Editorial Sections for new itineraries.',
      },
    },
    // ═══════════════════════════════════════════════════════════════════
    // EDITORIAL SECTIONS (New Storytelling Format)
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'editorialSections',
      type: 'blocks',
      label: 'Editorial Sections',
      blocks: itineraryEditorialBlocks,
      localized: true,
      admin: {
        description: 'Build a narrative, experience-first itinerary using editorial blocks. This replaces the traditional day-by-day format with a luxury travel magazine style.',
      },
    },
    {
      name: 'presentationMode',
      type: 'select',
      defaultValue: 'editorial',
      options: [
        { label: 'Editorial (Story-Driven)', value: 'editorial' },
        { label: 'Classic (Day-by-Day)', value: 'classic' },
      ],
      admin: {
        description: 'Choose how this itinerary is presented. Editorial mode uses the new storytelling format.',
        position: 'sidebar',
      },
    },
    {
      name: 'packingList',
      type: 'array',
      localized: true, // Packing list can be localized
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Clothing', value: 'clothing' },
            { label: 'Electronics', value: 'electronics' },
            { label: 'Toiletries', value: 'toiletries' },
            { label: 'Documents', value: 'documents' },
            { label: 'Gear', value: 'gear' },
            { label: 'Other', value: 'other' },
          ],
        },
      ],
    },
    {
      name: 'tips',
      type: 'richText',
      localized: true, // Tips should be localized
      admin: {
        description: 'General tips for this itinerary',
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
                description: 'SEO title (defaults to title if empty)',
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
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
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
