import type { GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { ctaFields } from '@/fields/cta'
import { imageRelation } from '@/fields/media'
import { linkFields } from '@/fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
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
    {
      name: 'brand',
      type: 'group',
      fields: [
        imageRelation('logo'),
        { name: 'description', type: 'textarea', maxLength: 320 },
        { name: 'tagline', type: 'text', maxLength: 140 },
      ],
    },
    { name: 'shortDescription', type: 'textarea', maxLength: 240 },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text', maxLength: 40 },
        { name: 'whatsapp', type: 'text', maxLength: 40 },
        { name: 'email', type: 'email' },
        { name: 'address', type: 'textarea' },
      ],
    },
    {
      name: 'contactInformation',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'whatsApp', type: 'text' },
        { name: 'address', type: 'textarea' },
      ],
    },
    {
      name: 'navigationColumns',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, maxLength: 80 },
        {
          name: 'links',
          type: 'array',
          fields: linkFields,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Email', value: 'email' },
            { label: 'Other', value: 'other' },
          ],
        },
        ...linkFields,
      ],
    },
    { name: 'quickLinks', type: 'array', fields: linkFields },
    { name: 'legalLinks', type: 'array', fields: linkFields },
    ctaFields('bookingCta'),
    { name: 'copyrightText', type: 'text' },
    { name: 'termsURL', type: 'text' },
    { name: 'privacyURL', type: 'text' },
  ],
}
