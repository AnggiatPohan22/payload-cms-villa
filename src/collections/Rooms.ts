import type { CollectionConfig } from 'payload'
import { adminsCanDelete, editorsCanWrite, publishedOrAuthenticated } from '@/access/roles'
import { galleryRelation, imageRelation } from '@/fields/media'
import { publishFields } from '@/fields/publish'
import { seoFields } from '@/fields/seo'
import { setPublishMetadata } from '@/hooks/publish'

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  admin: {
    group: 'Accommodation',
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
    { name: 'title', type: 'text', required: true, maxLength: 120 },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'category', type: 'text', maxLength: 80 },
    { name: 'shortDescription', type: 'textarea', required: true, maxLength: 240 },
    { name: 'description', type: 'richText' },
    imageRelation('featuredImage', { required: true }),
    imageRelation('heroImage'),
    galleryRelation(),
    { name: 'amenities', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
    { name: 'inclusions', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
    { name: 'standards', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
    {
      name: 'experiences',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, maxLength: 120 },
        { name: 'description', type: 'textarea', maxLength: 240 },
        imageRelation('image'),
      ],
    },
    { name: 'capacity', type: 'number', min: 1 },
    { name: 'capacityLabel', type: 'text', maxLength: 80 },
    { name: 'bedType', type: 'text', maxLength: 80 },
    { name: 'roomSize', type: 'text', maxLength: 80 },
    { name: 'view', type: 'text', maxLength: 120 },
    { name: 'startingPrice', type: 'number', min: 0 },
    { name: 'currency', type: 'text', defaultValue: 'IDR', maxLength: 3 },
    { name: 'rateNote', type: 'text', maxLength: 120 },
    { name: 'reviewsLabel', type: 'text', maxLength: 80 },
    { name: 'availabilityLabel', type: 'text', maxLength: 80 },
    { name: 'depositLabel', type: 'text', maxLength: 80 },
    { name: 'passengerLabel', type: 'text', maxLength: 80 },
    { name: 'bestFor', type: 'textarea', maxLength: 240 },
    { name: 'bookingURL', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 0, min: 0, index: true },
    ...publishFields,
    seoFields,
  ],
}
