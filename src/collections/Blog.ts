import type { CollectionConfig } from 'payload'
import { adminsCanDelete, editorsCanWrite, publishedOrAuthenticated } from '@/access/roles'
import { imageRelation } from '@/fields/media'
import { publishFields } from '@/fields/publish'
import { seoFields } from '@/fields/seo'
import { setPublishMetadata } from '@/hooks/publish'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    group: 'Posts',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'featured', 'sortOrder', 'status'],
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
    { name: 'title', type: 'text', required: true, maxLength: 160 },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'category', type: 'text', required: true, maxLength: 80, index: true },
    { name: 'excerpt', type: 'textarea', required: true, maxLength: 260 },
    { name: 'content', type: 'richText' },
    imageRelation('featuredImage', { required: true }),
    { name: 'readTime', type: 'text', maxLength: 40 },
    { name: 'articleDate', type: 'date' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'curatorChoice', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 0, min: 0, index: true },
    ...publishFields,
    seoFields,
  ],
}
