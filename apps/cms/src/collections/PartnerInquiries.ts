import { CollectionConfig } from 'payload/types';

export const PartnerInquiries: CollectionConfig = {
  slug: 'partner-inquiries',
  admin: {
    useAsTitle: 'companyName',
    group: 'Forms',
    defaultColumns: ['companyName', 'contactName', 'email', 'companyType', 'status', 'createdAt'],
    description: 'B2B partnership inquiry submissions',
  },
  access: {
    // Only admins and editors can read
    read: ({ req: { user } }) => {
      if (!user) return false;
      return ['admin', 'editor'].includes(user.role);
    },
    // Public can create (from frontend)
    create: () => true,
    // Only admins can update/delete
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    // Company Information
    {
      type: 'row',
      fields: [
        {
          name: 'companyName',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'website',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'country',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'companyType',
          type: 'select',
          required: true,
          options: [
            { label: 'Tour Operator', value: 'tour_operator' },
            { label: 'Travel Agency', value: 'travel_agency' },
            { label: 'Online Travel Agency (OTA)', value: 'ota' },
            { label: 'MICE/Events Agency', value: 'mice' },
            { label: 'Corporate Travel', value: 'corporate' },
            { label: 'Luxury Travel Specialist', value: 'luxury' },
            { label: 'Other', value: 'other' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    // Contact Information
    {
      type: 'row',
      fields: [
        {
          name: 'contactName',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'role',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    // Business Details
    {
      name: 'annualVolume',
      type: 'select',
      options: [
        { label: 'Under 100 pax', value: 'under_100' },
        { label: '100-500 pax', value: '100_500' },
        { label: '500-1,000 pax', value: '500_1000' },
        { label: '1,000-5,000 pax', value: '1000_5000' },
        { label: 'Over 5,000 pax', value: 'over_5000' },
        { label: 'New to SE Asia market', value: 'new_market' },
      ],
    },
    {
      name: 'destinationsOfInterest',
      type: 'array',
      fields: [
        {
          name: 'destination',
          type: 'text',
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }: { data: { destination?: string } }) => data?.destination || 'Destination',
        },
      },
    },
    {
      name: 'servicesOfInterest',
      type: 'array',
      fields: [
        {
          name: 'service',
          type: 'text',
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }: { data: { service?: string } }) => data?.service || 'Service',
        },
      },
    },
    // Additional Information
    {
      name: 'partnershipType',
      type: 'select',
      options: [
        { label: 'FIT Partnership', value: 'fit' },
        { label: 'Series Partnership', value: 'series' },
        { label: 'White Label Partnership', value: 'white_label' },
        { label: "Not sure yet - let's discuss", value: 'undecided' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'howDidYouHear',
      type: 'text',
    },
    {
      name: 'locale',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    // Status & Management
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'In Discussion', value: 'in-discussion' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Not Qualified', value: 'not-qualified' },
        { label: 'Converted', value: 'converted' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'High', value: 'high' },
        { label: 'Normal', value: 'normal' },
        { label: 'Low', value: 'low' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Internal notes (not visible to partner)',
      },
    },
  ],
  timestamps: true,
};
