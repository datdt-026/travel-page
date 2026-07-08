import { GlobalConfig } from 'payload/types';
import { HeroBanner } from '../blocks/HeroBanner';
import { ContentSection } from '../blocks/ContentSection';
import { CTABanner, FeaturedItems } from '../blocks/CommonBlocks';

/**
 * Blog Page Global Configuration
 * 
 * Configure the /blog listing page layout and content.
 */
export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  label: 'Blog Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the layout and content of the /blog page.',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    // ═══════════════════════════════════════════════════════════════════
    // HERO SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      admin: {
        description: 'Configure the hero banner at the top of the blog page.',
      },
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Hero background image.',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            description: 'Main title (e.g., "Travel Blog").',
          },
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Subtitle or description.',
          },
        },
        {
          name: 'height',
          type: 'select',
          defaultValue: 'large',
          options: [
            { label: 'Small (50vh)', value: 'small' },
            { label: 'Medium (70vh)', value: 'medium' },
            { label: 'Large (90vh)', value: 'large' },
          ],
        },
        {
          name: 'overlayStyle',
          type: 'select',
          defaultValue: 'medium',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Light', value: 'light' },
            { label: 'Medium', value: 'medium' },
            { label: 'Heavy', value: 'heavy' },
          ],
        },
        {
          name: 'contentPosition',
          type: 'select',
          defaultValue: 'bottom-left',
          options: [
            { label: 'Trên - Trái', value: 'top-left' },
            { label: 'Trên - Giữa', value: 'top-center' },
            { label: 'Trên - Phải', value: 'top-right' },
            { label: 'Giữa - Trái', value: 'center-left' },
            { label: 'Giữa', value: 'center' },
            { label: 'Giữa - Phải', value: 'center-right' },
            { label: 'Dưới - Trái', value: 'bottom-left' },
            { label: 'Dưới - Giữa', value: 'bottom-center' },
            { label: 'Dưới - Phải', value: 'bottom-right' },
          ],
          admin: {
            description: 'Vị trí nội dung trong hero banner.',
          },
        },
        {
          name: 'textAlignment',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            description: 'Text alignment within the hero section.',
          },
        },
        {
          name: 'showBreadcrumb',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'breadcrumbLabel',
          type: 'text',
          localized: true,
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // LISTING SETTINGS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'listing',
      type: 'group',
      label: 'Listing Settings',
      fields: [
        {
          name: 'postsPerPage',
          type: 'number',
          defaultValue: 10,
          min: 3,
          max: 24,
        },
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'grid',
          options: [
            { label: 'Grid', value: 'grid' },
            { label: 'List', value: 'list' },
            { label: 'Magazine (Featured + Grid)', value: 'magazine' },
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
          name: 'showCategories',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show category filter tabs.',
          },
        },
        {
          name: 'showSearch',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show search input.',
          },
        },
        {
          name: 'showFeaturedSection',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show featured posts at the top.',
          },
        },
        {
          name: 'featuredPostsCount',
          type: 'number',
          defaultValue: 3,
          min: 1,
          max: 6,
          admin: {
            condition: (data, siblingData) => siblingData?.showFeaturedSection,
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // EMPTY STATE
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'emptyState',
      type: 'group',
      label: 'Empty State',
      admin: {
        description: 'Content shown when there are no blog posts.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'No Posts Yet',
        },
        {
          name: 'message',
          type: 'textarea',
          localized: true,
          defaultValue: 'Check back soon for new travel stories and tips!',
        },
        {
          name: 'showCTA',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'ctaText',
          type: 'text',
          localized: true,
          admin: {
            condition: (data, siblingData) => siblingData?.showCTA,
          },
        },
        {
          name: 'ctaLink',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.showCTA,
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // SEO
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'metaKeywords',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
};
