import { CollectionConfig } from 'payload/types';

/**
 * Case Studies Collection
 * 
 * Operational case references for B2B travel partners.
 * NOT marketing success stories — these are editorial, operational documents
 * used by partners, procurement teams, and sales leads.
 * 
 * Localization: The following fields are localized:
 * - title, summary, overview (main content)
 * - deliveryApproach, responsiblePractices, learnings (operational details)
 * - measurableResults (context text)
 * - metaTitle, metaDescription (SEO)
 * 
 * Non-localized fields (same across all languages):
 * - slug (URL identifier)
 * - destination, region (geographical reference)
 * - featuredImage (media)
 * - featured, order, status (publishing state)
 */
export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'destination', 'status', 'featured', 'order', 'updatedAt'],
    description: 'Operational case references demonstrating real-world execution in specific destinations.',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // ═══════════════════════════════════════════════════════════════════
    // CORE IDENTIFICATION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
      localized: true,
      admin: {
        description: 'Editorial title — should convey the operational scope, not marketing spin.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "mekong-delta-series-operations"). Same across all languages.',
      },
    },

    // ═══════════════════════════════════════════════════════════════════
    // GEOGRAPHICAL CONTEXT
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'destination',
      type: 'text',
      required: true,
      admin: {
        description: 'Primary destination or location (e.g., "Northern Vietnam", "Mekong Delta").',
      },
    },
    {
      name: 'region',
      type: 'text',
      admin: {
        description: 'Broader region if applicable (e.g., "Southeast Asia", "Indochina").',
      },
    },
    {
      name: 'countries',
      type: 'relationship',
      relationTo: 'countries',
      hasMany: true,
      admin: {
        description: 'Link to country records for cross-referencing.',
      },
    },

    // ═══════════════════════════════════════════════════════════════════
    // OPENING CONTEXT (Above the fold)
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 300,
      localized: true,
      admin: {
        description: 'Short editorial summary (2-3 lines). Sets context, not hype.',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Large contextual image — real travel photography, natural light, no posing.',
      },
    },

    // ═══════════════════════════════════════════════════════════════════
    // CASE OVERVIEW
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'overview',
      type: 'group',
      label: 'Case Overview',
      admin: {
        description: 'What this case represents and the travel context.',
      },
      fields: [
        {
          name: 'caseContext',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'What this case study represents — the operational challenge or opportunity.',
          },
        },
        {
          name: 'journeyType',
          type: 'text',
          localized: true,
          admin: {
            description: 'Type of journey (e.g., "Multi-day cultural series", "FIT operations", "MICE program").',
          },
        },
        {
          name: 'duration',
          type: 'text',
          admin: {
            description: 'Duration context (e.g., "12 months", "24 departures/year", "Ongoing since 2019").',
          },
        },
        {
          name: 'operatingEnvironment',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Operating environment details — terrain, seasons, infrastructure, local conditions.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // DELIVERY APPROACH
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'deliveryApproach',
      type: 'array',
      label: 'Delivery Approach',
      localized: true,
      admin: {
        description: 'How the experience was executed — partner selection, operations, quality management.',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          admin: {
            description: 'Section heading (e.g., "Partner Selection", "Group Flow", "Risk Management").',
          },
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Detailed explanation of this aspect of delivery.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // RESPONSIBLE PRACTICES
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'responsiblePractices',
      type: 'array',
      label: 'Responsible Practices Applied',
      localized: true,
      admin: {
        description: 'Sustainability and responsible tourism practices applied in this case.',
      },
      fields: [
        {
          name: 'practice',
          type: 'text',
          required: true,
          admin: {
            description: 'Practice name (e.g., "Local Employment", "Waste Reduction", "Community Benefit").',
          },
        },
        {
          name: 'application',
          type: 'textarea',
          required: true,
          admin: {
            description: 'How this practice was specifically applied in this case.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // MEASURABLE RESULTS
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'measurableResults',
      type: 'array',
      label: 'Measurable Results',
      required: true,
      minRows: 1,
      maxRows: 5,
      admin: {
        description: '3-5 concrete, credible outcomes with metrics and context.',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'The metric value (e.g., "98%", "500+", "24", "4.8/5").',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'What this metric represents (e.g., "Guest satisfaction rating").',
          },
        },
        {
          name: 'context',
          type: 'text',
          localized: true,
          admin: {
            description: 'Scope or timeframe (e.g., "across 120 departures", "over 12 months").',
          },
        },
        {
          name: 'measurementMethod',
          type: 'text',
          localized: true,
          admin: {
            description: 'Optional: How this was measured (e.g., "Post-trip survey", "Partner audit").',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // LEARNINGS & CONTINUITY
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'learnings',
      type: 'group',
      label: 'Learnings & Continuity',
      admin: {
        description: 'What was learned and how it informs future operations.',
      },
      fields: [
        {
          name: 'keyLearnings',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'What was learned from this case.',
          },
        },
        {
          name: 'futureApplication',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'How this case informs future operations and improvements.',
          },
        },
        {
          name: 'continuousImprovement',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Ongoing refinements or adaptations based on this experience.',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // RELATED CONTENT
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'relatedCaseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      maxRows: 3,
      admin: {
        description: 'Related case studies (max 3). Will display as text links, not cards.',
      },
    },
    {
      name: 'relatedItineraries',
      type: 'relationship',
      relationTo: 'itineraries',
      hasMany: true,
      admin: {
        description: 'Related itineraries for cross-referencing.',
      },
    },

    // ═══════════════════════════════════════════════════════════════════
    // PUBLISHING & ORDERING
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this case study prominently on listing pages.',
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Display order (lower numbers appear first).',
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
        description: 'Publishing status.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Publication date.',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },

    // ═══════════════════════════════════════════════════════════════════
    // SEO
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      admin: {
        description: 'Search engine optimization settings.',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          localized: true,
          admin: {
            description: 'Override the default page title for search engines.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          localized: true,
          maxLength: 160,
          admin: {
            description: 'Short description for search results (max 160 characters).',
          },
        },
        {
          name: 'metaKeywords',
          type: 'text',
          localized: true,
          admin: {
            description: 'Comma-separated keywords.',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Social sharing image (defaults to featured image if not set).',
          },
        },
      ],
    },
  ],

  // Hooks for automatic slug generation and date management
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-set publishedAt when status changes to published
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
};
