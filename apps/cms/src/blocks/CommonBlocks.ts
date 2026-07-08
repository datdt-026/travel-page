import { Block } from 'payload/types';

/**
 * CTA Banner Block
 * 
 * Call-to-action banner section for conversions.
 * Can be used for newsletter signups, contact prompts, etc.
 */
export const CTABanner: Block = {
  slug: 'cta-banner',
  labels: {
    singular: 'CTA Banner',
    plural: 'CTA Banners',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'simple',
      options: [
        { label: 'Simple', value: 'simple' },
        { label: 'With Background Image', value: 'image' },
        { label: 'Split (Image + Content)', value: 'split' },
        { label: 'Card Style', value: 'card' },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data, siblingData) => siblingData?.style === 'image' || siblingData?.style === 'split',
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
        },
        {
          name: 'link',
          type: 'text',
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Accent', value: 'accent' },
      ],
    },
  ],
};

/**
 * Newsletter Block
 * 
 * Email newsletter signup section.
 */
export const Newsletter: Block = {
  slug: 'newsletter',
  labels: {
    singular: 'Newsletter Signup',
    plural: 'Newsletter Signups',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'placeholderText',
      type: 'text',
      localized: true,
      defaultValue: 'Enter your email',
    },
    {
      name: 'buttonText',
      type: 'text',
      localized: true,
      defaultValue: 'Subscribe',
    },
    {
      name: 'privacyText',
      type: 'text',
      localized: true,
      admin: {
        description: 'Small text below the form (e.g., "We respect your privacy").',
      },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'inline',
      options: [
        { label: 'Inline', value: 'inline' },
        { label: 'Stacked', value: 'stacked' },
        { label: 'Card', value: 'card' },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'Accent', value: 'accent' },
      ],
    },
  ],
};

/**
 * Image Gallery Block
 * 
 * Configurable image gallery with various layouts.
 */
export const ImageGallery: Block = {
  slug: 'image-gallery',
  labels: {
    singular: 'Image Gallery',
    plural: 'Image Galleries',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'images',
      type: 'array',
      required: true,
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
          name: 'alt',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'Carousel', value: 'carousel' },
        { label: 'Full Width Slider', value: 'slider' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      admin: {
        condition: (data, siblingData) => 
          siblingData?.layout === 'grid' || siblingData?.layout === 'masonry',
      },
    },
    {
      name: 'enableLightbox',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Allow clicking images to view full size.',
      },
    },
  ],
};

/**
 * Featured Items Block
 * 
 * Display featured content from collections.
 */
export const FeaturedItems: Block = {
  slug: 'featured-items',
  labels: {
    singular: 'Featured Items',
    plural: 'Featured Items',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'itemType',
      type: 'select',
      required: true,
      options: [
        { label: 'Countries', value: 'countries' },
        { label: 'Cities', value: 'cities' },
        { label: 'Attractions', value: 'attractions' },
        { label: 'Itineraries', value: 'itineraries' },
        { label: 'Blog Posts', value: 'blog-posts' },
      ],
    },
    {
      name: 'displayMode',
      type: 'select',
      defaultValue: 'auto',
      options: [
        { label: 'Auto (Latest/Featured)', value: 'auto' },
        { label: 'Manual Selection', value: 'manual' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 12,
      admin: {
        condition: (data, siblingData) => siblingData?.displayMode === 'auto',
      },
    },
    {
      name: 'manualItems',
      type: 'relationship',
      relationTo: ['countries', 'cities', 'attractions', 'itineraries', 'blog-posts'],
      hasMany: true,
      admin: {
        condition: (data, siblingData) => siblingData?.displayMode === 'manual',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
        { label: 'List', value: 'list' },
        { label: 'Featured + Grid', value: 'featured-grid' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'showViewAllLink',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'viewAllText',
      type: 'text',
      localized: true,
      defaultValue: 'View All',
      admin: {
        condition: (data, siblingData) => siblingData?.showViewAllLink,
      },
    },
    {
      name: 'viewAllLink',
      type: 'text',
      admin: {
        condition: (data, siblingData) => siblingData?.showViewAllLink,
        description: 'Leave empty to auto-generate link based on item type.',
      },
    },
  ],
};

/**
 * Accordion/FAQ Block
 * 
 * Collapsible content sections.
 */
export const Accordion: Block = {
  slug: 'accordion',
  labels: {
    singular: 'Accordion/FAQ',
    plural: 'Accordions',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          localized: true,
          required: true,
        },
        {
          name: 'defaultOpen',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'allowMultipleOpen',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Allow multiple items to be open at once.',
      },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Bordered', value: 'bordered' },
        { label: 'Cards', value: 'cards' },
      ],
    },
  ],
};
