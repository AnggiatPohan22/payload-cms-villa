import type { CollectionConfig } from 'payload'
import { adminsCanDelete, editorsCanWrite, publishedOrAuthenticated } from '@/access/roles'
import { imageRelation } from '@/fields/media'
import { publishFields } from '@/fields/publish'
import { setPublishMetadata } from '@/hooks/publish'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'sortOrder', 'status'],
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
    { name: 'title', type: 'text', required: true, maxLength: 120 },
    imageRelation('image', { required: true }),
    { name: 'alt', type: 'text', required: true, maxLength: 160 },
    { name: 'caption', type: 'textarea', maxLength: 240 },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'resort',
      options: [
        { label: 'Resort', value: 'resort' },
        { label: 'Room', value: 'room' },
        { label: 'Facility', value: 'facility' },
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Experience', value: 'experience' },
        { label: 'Surrounding', value: 'surrounding' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 0, min: 0, index: true },
    ...publishFields,
  ],
}
