import type { Field, GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { seoFields } from '@/fields/seo'

const legalPageFields = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', maxLength: 80 },
    { name: 'title', type: 'text', required: true, maxLength: 140 },
    { name: 'summary', type: 'textarea', maxLength: 320 },
    { name: 'updatedAtLabel', type: 'text', maxLength: 80 },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, maxLength: 140 },
        {
          name: 'body',
          type: 'array',
          fields: [{ name: 'paragraph', type: 'textarea', required: true }],
        },
      ],
    },
    seoFields,
  ],
})

export const LegalPages: GlobalConfig = {
  slug: 'legal-pages',
  label: 'Legal Pages',
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
    legalPageFields('terms', 'Terms Page'),
    legalPageFields('privacy', 'Privacy Page'),
    legalPageFields('cookies', 'Cookies Page'),
  ],
}
