import { GlobalConfig } from 'payload/types';

/**
 * Partner Inquiry Page Global Configuration
 * 
 * B2B-qualified contact form for partnership inquiries.
 * Captures company details, partnership type, and qualification data.
 */
export const PartnerInquiryPage: GlobalConfig = {
  slug: 'partner-inquiry-page',
  label: 'Partner Inquiry Page',
  admin: {
    group: 'Page Settings',
    description: 'Configure the /partners/inquiry page - B2B lead capture form.',
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
          defaultValue: 'Start a Conversation',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          localized: true,
          defaultValue: "We're interested in learning about your business and exploring how we can work together.",
        },
        {
          name: 'height',
          type: 'select',
          defaultValue: 'small',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // FORM CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'form',
      type: 'group',
      label: 'Form Configuration',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          defaultValue: 'Partnership Inquiry',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          defaultValue: 'Please tell us about your company and how we can work together. Our team will review your inquiry and respond within 2 business days.',
        },

        // Company Fields
        {
          name: 'companyFields',
          type: 'group',
          label: 'Company Information Fields',
          fields: [
            {
              name: 'companyName',
              type: 'group',
              label: 'Company Name',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'Company Name' },
                { name: 'placeholder', type: 'text', localized: true, defaultValue: 'Your company name' },
                { name: 'required', type: 'checkbox', defaultValue: true },
              ],
            },
            {
              name: 'website',
              type: 'group',
              label: 'Website',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'Website' },
                { name: 'placeholder', type: 'text', localized: true, defaultValue: 'https://yourcompany.com' },
                { name: 'required', type: 'checkbox', defaultValue: false },
              ],
            },
            {
              name: 'country',
              type: 'group',
              label: 'Country',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'Country' },
                { name: 'placeholder', type: 'text', localized: true, defaultValue: 'Country/Region' },
                { name: 'required', type: 'checkbox', defaultValue: true },
              ],
            },
            {
              name: 'companyType',
              type: 'group',
              label: 'Company Type',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'Company Type' },
                { name: 'required', type: 'checkbox', defaultValue: true },
                {
                  name: 'options',
                  type: 'array',
                  label: 'Options',
                  dbName: 'piq_company_type_opts',
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', localized: true, required: true },
                  ],
                  defaultValue: [
                    { value: '', label: 'Select company type...' },
                    { value: 'tour_operator', label: 'Tour Operator' },
                    { value: 'travel_agency', label: 'Travel Agency' },
                    { value: 'ota', label: 'Online Travel Agency (OTA)' },
                    { value: 'mice', label: 'MICE/Events Agency' },
                    { value: 'corporate', label: 'Corporate Travel' },
                    { value: 'luxury', label: 'Luxury Travel Specialist' },
                    { value: 'other', label: 'Other' },
                  ],
                },
              ],
            },
          ],
        },

        // Contact Fields
        {
          name: 'contactFields',
          type: 'group',
          label: 'Contact Information Fields',
          fields: [
            {
              name: 'contactName',
              type: 'group',
              label: 'Contact Name',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'Contact Name' },
                { name: 'placeholder', type: 'text', localized: true, defaultValue: 'Your name' },
                { name: 'required', type: 'checkbox', defaultValue: true },
              ],
            },
            {
              name: 'email',
              type: 'group',
              label: 'Email',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'Business Email' },
                { name: 'placeholder', type: 'text', localized: true, defaultValue: 'your@company.com' },
                { name: 'required', type: 'checkbox', defaultValue: true },
              ],
            },
            {
              name: 'phone',
              type: 'group',
              label: 'Phone',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'Phone' },
                { name: 'placeholder', type: 'text', localized: true, defaultValue: '+1 234 567 8900' },
                { name: 'required', type: 'checkbox', defaultValue: false },
              ],
            },
            {
              name: 'role',
              type: 'group',
              label: 'Role',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'Your Role' },
                { name: 'required', type: 'checkbox', defaultValue: false },
                {
                  name: 'options',
                  type: 'array',
                  label: 'Options',
                  dbName: 'piq_role_opts',
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', localized: true, required: true },
                  ],
                  defaultValue: [
                    { value: '', label: 'Select role...' },
                    { value: 'owner', label: 'Owner/CEO' },
                    { value: 'director', label: 'Director' },
                    { value: 'product_manager', label: 'Product Manager' },
                    { value: 'operations', label: 'Operations' },
                    { value: 'sales', label: 'Sales' },
                    { value: 'other', label: 'Other' },
                  ],
                },
              ],
            },
          ],
        },

        // Business Fields
        {
          name: 'businessFields',
          type: 'group',
          label: 'Business Information Fields',
          fields: [
            {
              name: 'annualVolume',
              type: 'group',
              label: 'Annual Volume',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'Annual Passenger Volume to SE Asia' },
                { name: 'required', type: 'checkbox', defaultValue: true },
                {
                  name: 'options',
                  type: 'array',
                  label: 'Options',
                  dbName: 'piq_volume_opts',
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', localized: true, required: true },
                  ],
                  defaultValue: [
                    { value: '', label: 'Select volume...' },
                    { value: 'under_100', label: 'Under 100 pax' },
                    { value: '100_500', label: '100-500 pax' },
                    { value: '500_1000', label: '500-1,000 pax' },
                    { value: '1000_5000', label: '1,000-5,000 pax' },
                    { value: 'over_5000', label: 'Over 5,000 pax' },
                    { value: 'new_market', label: 'New to SE Asia market' },
                  ],
                },
              ],
            },
            {
              name: 'destinationsOfInterest',
              type: 'group',
              label: 'Destinations of Interest',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'Destinations of Interest' },
                { name: 'required', type: 'checkbox', defaultValue: true },
                {
                  name: 'options',
                  type: 'array',
                  label: 'Options',
                  dbName: 'piq_dest_opts',
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', localized: true, required: true },
                  ],
                  defaultValue: [
                    { value: 'vietnam', label: 'Vietnam' },
                    { value: 'cambodia', label: 'Cambodia' },
                    { value: 'laos', label: 'Laos' },
                    { value: 'thailand', label: 'Thailand' },
                    { value: 'myanmar', label: 'Myanmar' },
                    { value: 'multi_country', label: 'Multi-Country Itineraries' },
                  ],
                },
              ],
            },
            {
              name: 'servicesOfInterest',
              type: 'group',
              label: 'Services of Interest',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'Services of Interest' },
                { name: 'required', type: 'checkbox', defaultValue: false },
                {
                  name: 'options',
                  type: 'array',
                  label: 'Options',
                  dbName: 'piq_svc_opts',
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', localized: true, required: true },
                  ],
                  defaultValue: [
                    { value: 'fit', label: 'FIT/Tailor-Made' },
                    { value: 'groups', label: 'Group Tours' },
                    { value: 'mice', label: 'MICE/Events' },
                    { value: 'luxury', label: 'Luxury Travel' },
                    { value: 'adventure', label: 'Adventure/Active' },
                    { value: 'cultural', label: 'Cultural Experiences' },
                    { value: 'cruise', label: 'Cruise & Shore Excursions' },
                  ],
                },
              ],
            },
          ],
        },

        // Additional Fields
        {
          name: 'additionalFields',
          type: 'group',
          label: 'Additional Fields',
          fields: [
            {
              name: 'partnershipType',
              type: 'group',
              label: 'Partnership Type',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'Partnership Interest' },
                { name: 'required', type: 'checkbox', defaultValue: false },
                {
                  name: 'options',
                  type: 'array',
                  label: 'Options',
                  dbName: 'piq_partner_type_opts',
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', localized: true, required: true },
                  ],
                  defaultValue: [
                    { value: '', label: 'Select partnership type...' },
                    { value: 'fit', label: 'FIT Partnership' },
                    { value: 'series', label: 'Series Partnership' },
                    { value: 'white_label', label: 'White Label Partnership' },
                    { value: 'undecided', label: "Not sure yet - let's discuss" },
                  ],
                },
              ],
            },
            {
              name: 'message',
              type: 'group',
              label: 'Message',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'Tell us about your needs' },
                { name: 'placeholder', type: 'text', localized: true, defaultValue: 'Share any specific requirements, questions, or how you envision our collaboration...' },
                { name: 'required', type: 'checkbox', defaultValue: false },
              ],
            },
            {
              name: 'howDidYouHear',
              type: 'group',
              label: 'How Did You Hear About Us',
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'How did you hear about us?' },
                {
                  name: 'options',
                  type: 'array',
                  label: 'Options',
                  dbName: 'piq_hear_opts',
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', localized: true, required: true },
                  ],
                  defaultValue: [
                    { value: '', label: 'Select...' },
                    { value: 'search', label: 'Search Engine' },
                    { value: 'referral', label: 'Partner Referral' },
                    { value: 'trade_show', label: 'Trade Show/Event' },
                    { value: 'social', label: 'Social Media' },
                    { value: 'industry', label: 'Industry Publication' },
                    { value: 'other', label: 'Other' },
                  ],
                },
              ],
            },
          ],
        },

        // Submit Button
        {
          name: 'submitButton',
          type: 'group',
          label: 'Submit Button',
          fields: [
            { name: 'text', type: 'text', localized: true, defaultValue: 'Submit Inquiry' },
            { name: 'loadingText', type: 'text', localized: true, defaultValue: 'Submitting...' },
          ],
        },

        // Success Message
        {
          name: 'successMessage',
          type: 'group',
          label: 'Success Message',
          fields: [
            { name: 'title', type: 'text', localized: true, defaultValue: 'Thank You!' },
            { name: 'description', type: 'textarea', localized: true, defaultValue: 'We have received your partnership inquiry. Our team will review your information and respond within 2 business days.' },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════════
    // SIDEBAR INFO
    // ═══════════════════════════════════════════════════════════════════
    {
      name: 'sidebar',
      type: 'group',
      label: 'Sidebar Information',
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
          defaultValue: 'Why Partner With Us?',
        },
        {
          name: 'benefits',
          type: 'array',
          label: 'Benefits',
          dbName: 'piq_sidebar_benefits',
          fields: [
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Icon/emoji for the benefit (e.g., ⚡, 🤝)',
              },
            },
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
            },
          ],
          defaultValue: [
            { icon: '', title: 'Quick Response', description: 'Quotes within 24 hours for standard requests' },
            { icon: '', title: 'Dedicated Support', description: 'Personal account manager for all partners' },
            { icon: '', title: 'Competitive Pricing', description: 'Volume-based rates and special promotions' },
            { icon: '', title: 'Quality Guaranteed', description: 'Rigorous supplier standards and service quality' },
          ],
        },
        {
          name: 'contact',
          type: 'group',
          label: 'Contact Information',
          fields: [
            { name: 'title', type: 'text', localized: true, defaultValue: 'Direct Contact' },
            { name: 'email', type: 'text', defaultValue: 'partners@voyager.travel' },
            { name: 'phone', type: 'text', defaultValue: '+84 28 1234 5678' },
            { name: 'responseTime', type: 'text', localized: true, defaultValue: 'We respond within 2 business days' },
          ],
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
