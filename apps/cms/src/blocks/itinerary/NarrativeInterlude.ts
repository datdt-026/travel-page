import { Block } from 'payload/types';

/**
 * Narrative Interlude Block
 * 
 * A breathing space between chapters or experiences.
 * Can feature a quote, atmospheric image, or reflective text.
 * Adds editorial rhythm to the storytelling.
 */
export const NarrativeInterlude: Block = {
  slug: 'interlude',
  labels: {
    singular: 'Narrative Interlude',
    plural: 'Narrative Interludes',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // INTERLUDE TYPE
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'interludeType',
      type: 'select',
      required: true,
      options: [
        { label: 'Pull Quote', value: 'quote' },
        { label: 'Full Image', value: 'image' },
        { label: 'Image + Caption', value: 'image-caption' },
        { label: 'Reflective Text', value: 'reflection' },
        { label: 'Location Transition', value: 'transition' },
      ],
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // QUOTE CONTENT
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'quote',
      type: 'textarea',
      localized: true,
      admin: {
        condition: (data, siblingData) => 
          siblingData?.interludeType === 'quote' || 
          siblingData?.interludeType === 'image-caption',
        description: 'The quote or caption text.',
      },
    },
    {
      name: 'quoteAttribution',
      type: 'text',
      localized: true,
      admin: {
        condition: (data, siblingData) => siblingData?.interludeType === 'quote',
        description: 'Optional attribution (e.g., "Local proverb").',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // IMAGE
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data, siblingData) => 
          siblingData?.interludeType === 'image' || 
          siblingData?.interludeType === 'image-caption',
      },
    },
    {
      name: 'imageHeight',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Full Screen', value: 'full' },
      ],
      admin: {
        condition: (data, siblingData) => 
          siblingData?.interludeType === 'image' || 
          siblingData?.interludeType === 'image-caption',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // REFLECTIVE TEXT
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'reflection',
      type: 'richText',
      localized: true,
      admin: {
        condition: (data, siblingData) => siblingData?.interludeType === 'reflection',
        description: 'A moment of reflection between journey segments.',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // TRANSITION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'transitionText',
      type: 'text',
      localized: true,
      admin: {
        condition: (data, siblingData) => siblingData?.interludeType === 'transition',
        description: 'Brief transition text (e.g., "From coast to mountains...").',
      },
    },
  ],
};
