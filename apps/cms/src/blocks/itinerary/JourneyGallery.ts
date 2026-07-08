import { Block } from 'payload/types';

/**
 * Journey Gallery Block
 * 
 * Editorial-style image gallery that tells a visual story.
 * Designed for atmospheric, magazine-quality presentation.
 */
export const JourneyGallery: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Journey Gallery',
    plural: 'Journey Galleries',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // GALLERY HEADER
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional gallery title (e.g., "Moments from the Journey").',
      },
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // IMAGES
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 2,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Make this image larger in the grid.',
          },
        },
      ],
    },
    
    // ═══════════════════════════════════════════════════════════════════
    // LAYOUT
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'editorial',
      options: [
        { label: 'Editorial Grid', value: 'editorial' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'Horizontal Scroll', value: 'horizontal' },
        { label: 'Staggered', value: 'staggered' },
      ],
    },
    {
      name: 'spacing',
      type: 'select',
      defaultValue: 'comfortable',
      options: [
        { label: 'Tight', value: 'tight' },
        { label: 'Comfortable', value: 'comfortable' },
        { label: 'Generous', value: 'generous' },
      ],
    },
  ],
};
