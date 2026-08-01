import type { CollectionConfig } from 'payload'
import { adminsCanDelete, editorsCanWrite, publishedOrAuthenticated } from '@/access/roles'
import { ctaFields } from '@/fields/cta'
import { galleryRelation, imageRelation } from '@/fields/media'
import { publishFields } from '@/fields/publish'
import { seoFields } from '@/fields/seo'
import { setPublishMetadata } from '@/hooks/publish'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featured', 'sortOrder', 'status'],
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
    { name: 'title', type: 'text', required: true, maxLength: 140 },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'eyebrow', type: 'text', maxLength: 80 },
    { name: 'summary', type: 'textarea', required: true, maxLength: 240 },
    { name: 'description', type: 'richText' },
    imageRelation('featuredImage', { required: true }),
    imageRelation('detailImage'),
    ctaFields(),
    { name: 'duration', type: 'text', maxLength: 120 },
    { name: 'location', type: 'text', maxLength: 160 },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true, maxLength: 40 },
        { name: 'label', type: 'text', required: true, maxLength: 80 },
      ],
    },
    {
      name: 'rituals',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, maxLength: 120 },
        { name: 'category', type: 'text', maxLength: 80 },
        { name: 'description', type: 'textarea', maxLength: 240 },
        imageRelation('image'),
        { name: 'duration', type: 'text', maxLength: 80 },
        { name: 'featured', type: 'checkbox', defaultValue: false },
      ],
    },
    galleryRelation(),
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 0, min: 0, index: true },
    ...publishFields,
    seoFields,
  ],
}
