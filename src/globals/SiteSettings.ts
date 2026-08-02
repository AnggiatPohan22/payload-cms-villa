import type { GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { imageRelation } from '@/fields/media'
import { seoFields } from '@/fields/seo'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
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
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Villa Resort' },
    { name: 'shortDescription', type: 'textarea', maxLength: 240 },
    imageRelation('logoDark', { label: 'Logo Dark' }),
    imageRelation('logoLight', { label: 'Logo Light' }),
    imageRelation('favicon'),
    { name: 'defaultSEOTitle', type: 'text', maxLength: 70 },
    { name: 'defaultSEODescription', type: 'textarea', maxLength: 170 },
    imageRelation('defaultOpenGraphImage', { label: 'Default Open Graph Image' }),
    { name: 'contactEmail', type: 'email' },
    { name: 'phone', type: 'text', maxLength: 40 },
    { name: 'whatsAppNumber', type: 'text', maxLength: 40 },
    { name: 'address', type: 'textarea' },
    { name: 'googleMapsURL', type: 'text' },
    { name: 'instagramURL', type: 'text' },
    { name: 'facebookURL', type: 'text' },
    { name: 'youTubeURL', type: 'text' },
    { name: 'bookingURL', type: 'text' },
    { name: 'defaultLocale', type: 'text', defaultValue: 'en', maxLength: 8 },
    { name: 'timezone', type: 'text', defaultValue: 'Asia/Makassar' },
    seoFields,
  ],
}
