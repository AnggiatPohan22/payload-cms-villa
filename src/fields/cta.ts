import type { Field } from 'payload'

export const ctaFields = (name = 'cta'): Field => ({
  name,
  type: 'group',
  fields: [
    {
      name: 'label',
      type: 'text',
      maxLength: 80,
    },
    {
      name: 'url',
      type: 'text',
      validate: (value: string | null | undefined) => {
        if (!value) return true
        return value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://')
          ? true
          : 'Use a relative URL or a valid HTTP(S) URL.'
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Text', value: 'text' },
      ],
    },
  ],
})
