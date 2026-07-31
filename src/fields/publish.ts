import type { Field } from 'payload'

export const publishFields: Field[] = [
  {
    name: 'status',
    type: 'select',
    required: true,
    defaultValue: 'draft',
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Published', value: 'published' },
    ],
    admin: {
      position: 'sidebar',
    },
  },
  {
    name: 'publishedAt',
    type: 'date',
    admin: {
      date: {
        pickerAppearance: 'dayAndTime',
      },
      position: 'sidebar',
    },
  },
  {
    name: 'updatedBy',
    type: 'relationship',
    relationTo: 'users',
    admin: {
      position: 'sidebar',
      readOnly: true,
    },
  },
]

export const sectionVisibilityFields: Field[] = [
  {
    name: 'active',
    type: 'checkbox',
    defaultValue: true,
  },
  {
    name: 'sortOrder',
    type: 'number',
    defaultValue: 0,
    min: 0,
  },
]
