import type { GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { imageRelation } from '@/fields/media'
import { seoFields } from '@/fields/seo'

export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  label: 'Blog Page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
    update: authenticatedOnly,
  },
  versions: {
    drafts: true,
    max: 20,
  },
  fields: [
    { name: 'heroEyebrow', type: 'text', maxLength: 80 },
    { name: 'heroHeading', type: 'text', required: true, maxLength: 160 },
    { name: 'heroDescription', type: 'textarea', maxLength: 320 },
    imageRelation('heroImage'),
    { name: 'introHeading', type: 'text', maxLength: 140 },
    { name: 'introDescription', type: 'textarea', maxLength: 320 },
    { name: 'listingHeading', type: 'text', maxLength: 140 },
    { name: 'listingDescription', type: 'textarea', maxLength: 320 },
    seoFields,
  ],
}
