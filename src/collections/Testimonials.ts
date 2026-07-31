import type { CollectionConfig } from 'payload'
import { adminsCanDelete, editorsCanWrite, publishedOrAuthenticated } from '@/access/roles'
import { publishFields } from '@/fields/publish'
import { setPublishMetadata } from '@/hooks/publish'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    group: 'Content',
    useAsTitle: 'guestName',
    defaultColumns: ['guestName', 'guestLocation', 'rating', 'featured', 'status'],
  },
  access: {
    create: editorsCanWrite,
    read: publishedOrAuthenticated,
    update: editorsCanWrite,
    delete: adminsCanDelete,
  },
  hooks: {
    beforeChange: [setPublishMetadata],
  },
  fields: [
    { name: 'guestName', type: 'text', required: true, maxLength: 120 },
    { name: 'guestLocation', type: 'text', maxLength: 120 },
    { name: 'rating', type: 'number', min: 1, max: 5, required: true },
    { name: 'review', type: 'textarea', required: true },
    { name: 'source', type: 'text', maxLength: 80 },
    { name: 'sourceURL', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 0, min: 0, index: true },
    ...publishFields,
  ],
}
