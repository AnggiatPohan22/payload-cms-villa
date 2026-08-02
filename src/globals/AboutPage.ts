import type { GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { ctaFields } from '@/fields/cta'
import { galleryRelation, imageRelation } from '@/fields/media'
import { seoFields } from '@/fields/seo'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
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
    { name: 'heroHeading', type: 'text', required: true, maxLength: 140 },
    { name: 'heroDescription', type: 'textarea', maxLength: 320 },
    imageRelation('heroImage'),
    { name: 'introductionHeading', type: 'text', maxLength: 140 },
    { name: 'introductionContent', type: 'richText' },
    { name: 'storyContent', type: 'richText' },
    galleryRelation('supportingImages'),
    {
      name: 'values',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    ctaFields('finalCTA'),
    seoFields,
  ],
}
