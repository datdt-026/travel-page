import { Block } from 'payload/types';

/**
 * Practical Essentials Block
 * 
 * Elegant presentation of practical travel information.
 * Designed to be unobtrusive and support the editorial narrative
 * while providing necessary planning details.
 */
export const PracticalEssentials: Block = {
  slug: 'essentials',
  labels: {
    singular: 'Practical Essentials',
    plural: 'Practical Essentials',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // HEADER
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'Before You Go',
      admin: {
        description: 'Section title (e.g., "Before You Go", "Essentials").',
      },
    },
    {
      name: 'introduction',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Brief intro text.',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // ESSENTIAL CATEGORIES
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'categories',
      type: 'array',
      fields: [
        {
          name: 'categoryType',
          type: 'select',
          required: true,
          options: [
            { label: 'Best Time to Visit', value: 'best-time' },
            { label: 'What to Pack', value: 'packing' },
            { label: 'Getting There', value: 'getting-there' },
            { label: 'Local Tips', value: 'local-tips' },
            { label: 'Climate & Weather', value: 'climate' },
            { label: 'Cultural Notes', value: 'cultural-notes' },
            { label: 'Practical Information', value: 'practical' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            description: 'Custom title (overrides default category title).',
          },
        },
        {
          name: 'content',
          type: 'richText',
          localized: true,
        },
        {
          name: 'items',
          type: 'array',
          admin: {
            description: 'List items (for packing lists, tips, etc.).',
          },
          fields: [
            {
              name: 'item',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // LAYOUT
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'minimal',
      options: [
        { label: 'Minimal', value: 'minimal' },
        { label: 'Cards', value: 'cards' },
        { label: 'Accordion', value: 'accordion' },
      ],
    },
    {
      name: 'showIcon',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show category icons.',
      },
    },
  ],
};
