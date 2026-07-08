import { CollectionConfig } from 'payload/types';

/**
 * FAQs Collection
 *
 * Frequently Asked Questions collection.
 *
 * Localization: The following fields are localized:
 * - question, answer (main content)
 *
 * Non-localized fields (same across all languages):
 * - category (categorical)
 * - order (display order)
 * - status (publishing state)
 */
export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    group: 'Content',
    defaultColumns: ['question', 'category', 'order', 'status'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Plain text answer to the question.',
      },
    },
    {
      name: 'answerRichText',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Optional rich text answer (use this for formatted answers with links, etc.).',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Using TravelSite', value: 'using-travelsite' },
        { label: 'Trip Planning', value: 'trip-planning' },
        { label: 'Bookings', value: 'bookings' },
        { label: 'Account', value: 'account' },
        { label: 'Technical', value: 'technical' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Display order within category (lower numbers appear first).',
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
  ],
};
