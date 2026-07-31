import type { CollectionConfig } from 'payload'
import { adminsCanDelete, editorsCanWrite, publishedOrAuthenticated } from '@/access/roles'
import { imageRelation } from '@/fields/media'
import { publishFields } from '@/fields/publish'
import { seoFields } from '@/fields/seo'
import { setPublishMetadata } from '@/hooks/publish'

export const Promotions: CollectionConfig = {
  slug: 'promotions',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featured', 'startDate', 'endDate', 'status'],
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
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 120 },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'shortDescription', type: 'textarea', required: true, maxLength: 240 },
    { name: 'description', type: 'richText' },
    imageRelation('desktopImage', { required: true }),
    imageRelation('mobileImage'),
    { name: 'ctaLabel', type: 'text', maxLength: 80 },
    { name: 'ctaURL', type: 'text' },
    { name: 'promoCode', type: 'text', maxLength: 40 },
    { name: 'startDate', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'endDate', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 0, min: 0, index: true },
    ...publishFields,
    seoFields,
  ],
}
