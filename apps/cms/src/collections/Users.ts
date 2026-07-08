import { CollectionConfig, Access } from 'payload/types';

// Check if user is an admin
const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin';
};

// Check if user is accessing their own document
const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return {
    id: {
      equals: user.id,
    },
  };
};

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  access: {
    // Only admins can read all users, others can only read themselves
    read: isAdminOrSelf,
    // Only admins can create new users
    create: isAdmin,
    // Admins can update anyone, users can only update themselves
    update: isAdminOrSelf,
    // Only admins can delete users
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Author', value: 'author' },
      ],
      defaultValue: 'author',
      required: true,
    },
  ],
  timestamps: true,
};
