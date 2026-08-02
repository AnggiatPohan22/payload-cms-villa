import type { CollectionConfig } from 'payload'
import { adminsOnly, superAdminsOnly } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    group: 'Settings',
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
  },
  access: {
    create: superAdminsOnly,
    read: adminsOnly,
    update: ({ req }) => {
      if (req.user?.role === 'super-admin') return true
      return {
        role: {
          not_equals: 'super-admin',
        },
      }
    },
    delete: ({ req }) => {
      if (req.user?.role === 'super-admin') return true
      return {
        role: {
          not_equals: 'super-admin',
        },
      }
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 120,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      access: {
        update: ({ req }) => req.user?.role === 'super-admin',
      },
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
