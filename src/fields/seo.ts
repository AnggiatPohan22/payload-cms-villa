import type { Field } from 'payload'
import { imageRelation } from './media'

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      maxLength: 70,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 170,
    },
    imageRelation('openGraphImage', { label: 'Open Graph Image' }),
    {
      name: 'canonicalURL',
      type: 'text',
      validate: (value: string | null | undefined) => {
        if (!value) return true
        return value.startsWith('http://') || value.startsWith('https://')
          ? true
          : 'Canonical URL must be a valid HTTP(S) URL.'
      },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'noFollow',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
