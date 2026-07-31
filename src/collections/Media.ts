import type { CollectionConfig } from 'payload'
import { authenticatedOnly, editorsCanWrite, publishedOrAuthenticated } from '@/access/roles'
import { validateImageUploadSize } from '@/hooks/upload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'System',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'category', 'updatedAt'],
  },
  access: {
    create: editorsCanWrite,
    read: publishedOrAuthenticated,
    update: editorsCanWrite,
    delete: authenticatedOnly,
  },
  hooks: {
    beforeValidate: [validateImageUploadSize],
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 320,
        height: 240,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      maxLength: 160,
    },
    {
      name: 'caption',
      type: 'textarea',
      maxLength: 240,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Hero', value: 'hero' },
        { label: 'Room', value: 'room' },
        { label: 'Facility', value: 'facility' },
        { label: 'Gallery', value: 'gallery' },
        { label: 'Promotion', value: 'promotion' },
        { label: 'Logo', value: 'logo' },
      ],
    },
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ req, value }) => {
            return value || req.user?.id
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
