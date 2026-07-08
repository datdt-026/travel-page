import { GlobalConfig } from 'payload/types';

/**
 * Sustainability Page Global Configuration
 * 
 * B2B-focused page demonstrating sustainability through actions,
 * certifications, and measurable impact - critical for EU/AU/US partners.
 */
export const SustainabilityPage: GlobalConfig = {
  slug: 'sustainability-page',
  label: 'Sustainability Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the /sustainability page - demonstrating responsible tourism practices.',
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
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Sustainability & Responsibility',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          defaultValue: 'Our commitment to responsible tourism and sustainable operations',
        },
        {
          name: 'height',
          type: 'select',
          defaultValue: 'medium',
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
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // PHILOSOPHY SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'philosophy',
      type: 'group',
      label: 'Sustainability Philosophy',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Our Commitment',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Sustainability Philosophy',
        },
        {
          name: 'statement',
          type: 'richText',
          localized: true,
          admin: {
            description: 'Main sustainability commitment statement',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // CERTIFICATIONS SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'certifications',
      type: 'group',
      label: 'Certifications & Memberships',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Verified Standards',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Certifications & Memberships',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'items',
          type: 'array',
          label: 'Certifications',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
            },
            {
              name: 'year',
              type: 'text',
              admin: {
                description: 'Year certified or joined',
              },
            },
            {
              name: 'link',
              type: 'text',
              admin: {
                description: 'Link to certification or organization website',
              },
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // INITIATIVES SECTION — Place-Driven Editorial Approach
    // ═══════════════════════════════════════════════════════════════════
    // Design philosophy: Each initiative is anchored to a specific place
    // and described through its operational reality—how it integrates into
    // actual travel experiences. Avoids NGO/CSR tone; aims for editorial,
    // travel-magazine clarity.
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'initiatives',
      type: 'group',
      label: 'Our Initiatives',
      admin: {
        description: 'Place-driven sustainability initiatives. Each initiative should be anchored to a geographic context and describe real travel operations.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show/hide the entire initiatives section on the page',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'What We Do',
          admin: {
            description: 'Small label above the section title. Keep minimal (e.g., "What We Do", "On the Ground").',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Our Initiatives',
          admin: {
            description: 'Main section heading. Should feel editorial, not promotional.',
          },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Initiatives',
          labels: {
            singular: 'Initiative',
            plural: 'Initiatives',
          },
          admin: {
            description: 'Each initiative represents a place-based sustainability effort tied to real travel operations.',
            components: {
              RowLabel: ({ data }: { data?: Record<string, any> }) => data?.title || 'New Initiative',
            },
          },
          fields: [
            // ─────────────────────────────────────────────────────────────
            // Core Identity
            // ─────────────────────────────────────────────────────────────
            {
              name: 'title',
              type: 'text',
              label: 'Initiative Title',
              localized: true,
              required: true,
              admin: {
                description: 'Clear, specific name. E.g., "Homestay Development Program" not "Community Support".',
              },
            },
            {
              name: 'location',
              type: 'text',
              label: 'Location / Region',
              localized: true,
              required: true,
              admin: {
                description: 'Geographic anchor. Format: "Region · Sub-region" (e.g., "Northern Vietnam · Sapa Highlands", "Central Highlands · Kon Tum Province").',
                placeholder: 'Northern Vietnam · Sapa Highlands',
              },
            },
            // ─────────────────────────────────────────────────────────────
            // Editorial Content
            // ─────────────────────────────────────────────────────────────
            {
              name: 'description',
              type: 'textarea',
              label: 'Editorial Description',
              localized: true,
              required: true,
              admin: {
                description: 'Short editorial copy (2-3 lines). Describe what this initiative does and why it matters to travel operations. Avoid jargon and marketing speak.',
                rows: 3,
              },
            },
            {
              name: 'opApproach',
              type: 'array',
              label: 'Operational Approach',
              labels: {
                singular: 'Approach',
                plural: 'Approaches',
              },
              minRows: 1,
              maxRows: 3,
              admin: {
                description: 'How this initiative integrates into actual travel operations. Max 3 concise bullets. Focus on tangible actions.',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  label: 'Approach',
                  localized: true,
                  required: true,
                  admin: {
                    description: 'Concise operational detail. E.g., "Guests stay in family-run guesthouses, revenue shared 70/30"',
                    placeholder: 'Guides trained locally, reducing transport emissions',
                  },
                },
              ],
            },
            // ─────────────────────────────────────────────────────────────
            // Management
            // ─────────────────────────────────────────────────────────────
            {
              name: 'order',
              type: 'number',
              label: 'Display Order',
              required: true,
              defaultValue: 0,
              admin: {
                description: 'Lower numbers appear first. Use increments of 10 (10, 20, 30) to allow easy reordering.',
                step: 1,
              },
            },
            {
              name: 'status',
              type: 'select',
              label: 'Status',
              required: true,
              defaultValue: 'active',
              options: [
                { label: 'Active — Visible on site', value: 'active' },
                { label: 'Archived — Hidden but preserved', value: 'archived' },
              ],
              admin: {
                description: 'Archive initiatives to hide them without losing content. Useful for seasonal or paused programs.',
              },
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // RESPONSIBLE TOURISM PRACTICES SECTION
    // ═══════════════════════════════════════════════════════════════════
    // Design philosophy: Practice-as-discipline approach. Each practice
    // represents an operational standard embedded in how tours are designed
    // and delivered. Editorial tone—no cards, no icons, no green clichés.
    // Layout: craft handbook / internal operating standard / premium editorial.
    // NOTE: Field name shortened to 'opStandards' to avoid PostgreSQL 63-char limit.
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'opStandards',
      type: 'group',
      label: 'Responsible Tourism Practices',
      admin: {
        description: 'Editorial section showcasing operational disciplines. Each practice should read like an internal standard, not marketing copy.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show/hide the entire Responsible Practices section',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Operating Standards',
          admin: {
            description: 'Small label above section. Keep minimal and professional (e.g., "Operating Standards", "Our Disciplines").',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Responsible Tourism Practices',
          admin: {
            description: 'Main section heading. Should feel authoritative, not promotional.',
          },
        },
        {
          name: 'introduction',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Optional 1-2 sentence introduction. Frame practices as operational disciplines, not marketing claims. Leave empty for a cleaner, more editorial feel.',
            rows: 2,
          },
        },
        {
          name: 'contextImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Context Image',
          admin: {
            description: 'Optional single photograph representing field operations (guides, paths, villages, landscapes). Acts as atmospheric context, not content. Recommended: natural light, slight desaturation, no heavy contrast. Safe to omit.',
          },
        },
        {
          name: 'practices',
          type: 'array',
          label: 'Practices',
          labels: {
            singular: 'Practice',
            plural: 'Practices',
          },
          minRows: 1,
          maxRows: 8,
          admin: {
            description: 'Each practice is an operational discipline. Aim for 4-6 practices. Quality over quantity.',
            components: {
              RowLabel: ({ data }: { data?: Record<string, any> }) => data?.title || 'New Practice',
            },
          },
          fields: [
            // ─────────────────────────────────────────────────────────────
            // Core Content
            // ─────────────────────────────────────────────────────────────
            {
              name: 'title',
              type: 'text',
              label: 'Practice Title',
              localized: true,
              required: true,
              admin: {
                description: 'Clear, specific discipline name. E.g., "Guide Development" not "Staff Training". Avoid generic terms.',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              localized: true,
              required: true,
              admin: {
                description: 'Editorial copy (2-3 lines max). Explain what this discipline means operationally. Avoid jargon, marketing speak, and NGO tone.',
                rows: 3,
              },
            },
            // ─────────────────────────────────────────────────────────────
            // Operational Details — "In Practice" bullets
            // ─────────────────────────────────────────────────────────────
            {
              name: 'details',
              type: 'array',
              label: 'In Practice',
              labels: {
                singular: 'Detail',
                plural: 'Details',
              },
              minRows: 1,
              maxRows: 3,
              admin: {
                description: 'Concrete operational details showing how this discipline manifests. Max 3 bullets. Be specific.',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  label: 'Detail',
                  localized: true,
                  required: true,
                  admin: {
                    description: 'Concise operational fact. E.g., "All guides complete 40-hour certification annually" or "Supplier audits conducted quarterly"',
                    placeholder: 'Specific operational detail...',
                  },
                },
              ],
            },
            // ─────────────────────────────────────────────────────────────
            // Management & Ordering
            // ─────────────────────────────────────────────────────────────
            {
              name: 'order',
              type: 'number',
              label: 'Display Order',
              required: true,
              defaultValue: 0,
              admin: {
                description: 'Lower numbers appear first. Use increments of 10 (10, 20, 30) for easy reordering.',
                step: 1,
              },
            },
            {
              name: 'status',
              type: 'select',
              label: 'Status',
              required: true,
              defaultValue: 'active',
              options: [
                { label: 'Active — Visible on site', value: 'active' },
                { label: 'Inactive — Hidden but preserved', value: 'inactive' },
              ],
              admin: {
                description: 'Set to Inactive to hide without deleting. Useful for seasonal adjustments or updates in progress.',
              },
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // LEGACY PRACTICES SECTION (Deprecated)
    // Keep for data migration compatibility. Will be removed in future.
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'practices',
      type: 'group',
      label: 'Practices (Legacy)',
      admin: {
        description: '⚠️ DEPRECATED: Use "Responsible Tourism Practices" section above. This section is kept for backward compatibility.',
        condition: (data) => {
          // Only show if legacy data exists
          return data?.practices?.categories?.length > 0;
        },
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
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
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'categories',
          type: 'array',
          label: 'Practice Categories',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
            },
            {
              name: 'icon',
              type: 'text',
            },
            {
              name: 'color',
              type: 'select',
              options: [
                { label: 'Emerald (Green)', value: 'emerald' },
                { label: 'Blue', value: 'blue' },
                { label: 'Amber (Gold)', value: 'amber' },
                { label: 'Rose', value: 'rose' },
                { label: 'Purple', value: 'purple' },
              ],
            },
            {
              name: 'practices',
              type: 'array',
              label: 'Practices',
              fields: [
                { name: 'icon', type: 'text' },
                { name: 'title', type: 'text', localized: true },
                { name: 'description', type: 'textarea', localized: true },
                { name: 'details', type: 'textarea', localized: true },
                { name: 'impact', type: 'text', localized: true },
              ],
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // SUPPLIER STANDARDS SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'supplierStandards',
      type: 'group',
      label: 'Supplier Standards',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Supply Chain',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Partner & Supplier Standards',
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
        },
        {
          name: 'criteria',
          type: 'array',
          label: 'Selection Criteria',
          fields: [
            {
              name: 'text',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // IMPACT METRICS SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'impact',
      type: 'group',
      label: 'Impact Metrics',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'eyebrow',
          type: 'text',
          localized: true,
          defaultValue: 'Our Impact',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Measurable Results',
        },
        {
          name: 'year',
          type: 'text',
          admin: {
            description: 'Reporting year (e.g., "2025")',
          },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Measurable Results',
          labels: {
            singular: 'Result',
            plural: 'Results',
          },
          admin: {
            description: 'Each result should present verifiable data with clear context. Vertical, text-first layout—no dashboard-style metrics.',
            components: {
              RowLabel: ({ data }: { data?: Record<string, any> }) => data?.label || 'New Result',
            },
          },
          fields: [
            {
              name: 'number',
              type: 'text',
              label: 'Quantitative Value',
              required: true,
              admin: {
                description: 'The numeric figure with units. E.g., "500+ tons", "15 communities", "80%". Keep precise and verifiable.',
                placeholder: '500+ tons',
              },
            },
            {
              name: 'label',
              type: 'text',
              label: 'Metric Title',
              localized: true,
              required: true,
              admin: {
                description: 'Clear, descriptive title for this metric. E.g., "Carbon Offset Annually", "Communities Supported".',
                placeholder: 'Carbon Offset Annually',
              },
            },
            {
              name: 'description',
              type: 'text',
              label: 'Context Line',
              localized: true,
              admin: {
                description: 'Short explanatory line providing context or timeframe. E.g., "Verified through Gold Standard offsets since 2022".',
                placeholder: 'Verified through Gold Standard offsets since 2022',
              },
            },
            {
              name: 'measurementMethod',
              type: 'array',
              label: 'How This Is Measured',
              labels: {
                singular: 'Method',
                plural: 'Methods',
              },
              minRows: 0,
              maxRows: 3,
              admin: {
                description: 'Optional: 1–3 short bullets explaining measurement methodology. Adds credibility without being promotional.',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  label: 'Method',
                  localized: true,
                  required: true,
                  admin: {
                    description: 'Concise measurement detail. E.g., "Calculated per-trip using DEFRA emission factors"',
                    placeholder: 'Third-party audited annually',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'reportDownload',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Annual sustainability report PDF (optional)',
          },
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // CTA SECTION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action',
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
          defaultValue: 'Partner With a Responsible Operator',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'primaryButtonText',
          type: 'text',
          localized: true,
          defaultValue: 'Discuss Partnership',
        },
        {
          name: 'primaryButtonLink',
          type: 'text',
          defaultValue: '/partners/inquiry',
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
