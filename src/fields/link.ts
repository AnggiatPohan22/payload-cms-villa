import type { Field } from 'payload'

export const linkFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
    maxLength: 80,
  },
  {
    name: 'url',
    type: 'text',
    required: true,
    validate: (value: string | null | undefined) => {
      if (!value) return 'URL is required.'
      return value.startsWith('/') ||
        value.startsWith('http://') ||
        value.startsWith('https://') ||
        value.startsWith('mailto:') ||
        value.startsWith('tel:')
        ? true
        : 'Use a relative URL, HTTP(S), mailto, or tel URL.'
    },
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    defaultValue: false,
  },
]
