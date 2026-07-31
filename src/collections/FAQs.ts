import type { CollectionConfig } from 'payload'
import { adminsCanDelete, editorsCanWrite, publishedOrAuthenticated } from '@/access/roles'
import { publishFields } from '@/fields/publish'
import { setPublishMetadata } from '@/hooks/publish'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    group: 'Content',
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'sortOrder', 'status'],
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
    { name: 'question', type: 'text', required: true, maxLength: 160 },
    { name: 'answer', type: 'textarea', required: true },
    { name: 'category', type: 'text', defaultValue: 'general', maxLength: 80, index: true },
    { name: 'sortOrder', type: 'number', defaultValue: 0, min: 0, index: true },
    ...publishFields,
  ],
}
