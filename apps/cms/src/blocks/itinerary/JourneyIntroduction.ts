import { Block } from 'payload/types';

/**
 * Journey Introduction Block
 * 
 * Opening section for an itinerary with editorial-style storytelling.
 * Sets the tone and atmosphere before diving into the journey.
 */
export const JourneyIntroduction: Block = {
  slug: 'intro',
  labels: {
    singular: 'Journey Introduction',
    plural: 'Journey Introductions',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // OPENING STATEMENT
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'openingLine',
      type: 'text',
      localized: true,
      admin: {
        description: 'A compelling opening line to draw readers in.',
      },
    },
    {
      name: 'narrative',
      type: 'richText',
      localized: true,
      admin: {
        description: 'The main introduction narrative. Paint a picture of what awaits.',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // JOURNEY ESSENCE
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'essence',
      type: 'array',
      label: 'Journey Essence',
      maxRows: 4,
      admin: {
        description: 'Key themes or feelings of this journey (max 4).',
      },
      fields: [
        {
          name: 'theme',
          type: 'text',
          localized: true,
          admin: {
            description: 'A word or phrase (e.g., "Serenity", "Ancient Traditions").',
          },
        },
      ],
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // VISUAL
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Large atmospheric image to accompany the introduction.',
      },
    },
    {
      name: 'imageStyle',
      type: 'select',
      defaultValue: 'full-bleed',
      options: [
        { label: 'Full Bleed', value: 'full-bleed' },
        { label: 'Contained', value: 'contained' },
        { label: 'Split with Text', value: 'split' },
      ],
    },
  ],
};
