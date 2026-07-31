import type { GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { ctaFields } from '@/fields/cta'
import { imageRelation } from '@/fields/media'
import { seoFields } from '@/fields/seo'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  admin: {
    group: 'Website',
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
    { name: 'contactHeading', type: 'text', maxLength: 140 },
    { name: 'contactDescription', type: 'textarea' },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'whatsApp', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'mapEmbedURL', type: 'text' },
    { name: 'operationalHours', type: 'array', fields: [{ name: 'label', type: 'text' }, { name: 'hours', type: 'text' }] },
    ctaFields('finalCTA'),
    seoFields,
  ],
}
