import { CollectionConfig } from 'payload/types';

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'email',
    group: 'Forms',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    description: 'Contact form submissions from the website',
  },
  access: {
    // Only admins and editors can read submissions
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
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Replied', value: 'replied' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Internal notes about this submission',
      },
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      defaultValue: 'website',
    },
  ],
  timestamps: true,
};
