import type { GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { linkFields } from '@/fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
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
    { name: 'shortDescription', type: 'textarea', maxLength: 240 },
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
    { name: 'socialLinks', type: 'array', fields: linkFields },
    { name: 'quickLinks', type: 'array', fields: linkFields },
    { name: 'copyrightText', type: 'text' },
    { name: 'termsURL', type: 'text' },
    { name: 'privacyURL', type: 'text' },
  ],
}
