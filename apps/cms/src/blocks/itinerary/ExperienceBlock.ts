import { Block } from 'payload/types';

/**
 * Experience Block
 * 
 * Groups content by experience type rather than time.
 * Focuses on feeling, atmosphere, and depth of experience.
 * 
 * Categories:
 * - Culture & Heritage
 * - Nature & Landscape
 * - Culinary Moments
 * - Local Encounters
 * - Wellness & Retreat
 * - Adventure & Discovery
 */
export const ExperienceBlock: Block = {
  slug: 'experience',
  labels: {
    singular: 'Experience Block',
    plural: 'Experience Blocks',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // EXPERIENCE TYPE
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'experienceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Culture & Heritage', value: 'culture-heritage' },
        { label: 'Nature & Landscape', value: 'nature-landscape' },
        { label: 'Culinary Moments', value: 'culinary' },
        { label: 'Local Encounters', value: 'local-encounters' },
        { label: 'Wellness & Retreat', value: 'wellness' },
        { label: 'Adventure & Discovery', value: 'adventure' },
        { label: 'Art & Architecture', value: 'art-architecture' },
        { label: 'Slow Travel', value: 'slow-travel' },
        { label: 'Hidden Gems', value: 'hidden-gems' },
      ],
      admin: {
        description: 'Category of experience. This determines the visual treatment.',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // EXPERIENCE HEADER
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        description: 'Custom title. If empty, uses experience type label.',
      },
    },
    {
      name: 'introduction',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Brief introduction to this type of experience in the journey.',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // EXPERIENCE ITEMS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'experiences',
      type: 'array',
      label: 'Experiences',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Experience title (e.g., "Tea Ceremony in a Private Garden").',
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          admin: {
            description: 'Evocative description of the experience.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'atmosphere',
          type: 'text',
          localized: true,
          admin: {
            description: 'One-line atmosphere descriptor (e.g., "Quiet, contemplative, intimate").',
          },
        },
        {
          name: 'location',
          type: 'text',
          localized: true,
          admin: {
            description: 'Where this experience takes place.',
          },
        },
        {
          name: 'attraction',
          type: 'relationship',
          relationTo: 'attractions',
          admin: {
            description: 'Optional link to attraction.',
          },
        },
      ],
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // LAYOUT OPTIONS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'stacked',
      options: [
        { label: 'Stacked (One per row)', value: 'stacked' },
        { label: 'Editorial Grid', value: 'editorial-grid' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'Featured + List', value: 'featured-list' },
      ],
    },
    {
      name: 'showDivider',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show subtle divider between experiences.',
      },
    },
  ],
};
