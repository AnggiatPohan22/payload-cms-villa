import type { Field } from 'payload'

export const imageRelation = (
  name: string,
  options: { required?: boolean; label?: string } = {},
): Field => ({
  name,
  type: 'upload',
  relationTo: 'media',
  required: options.required,
  label: options.label,
})

export const galleryRelation = (name = 'gallery'): Field => ({
  name,
  type: 'array',
  labels: {
    singular: 'Gallery Image',
    plural: 'Gallery Images',
  },
  fields: [
    imageRelation('image', { required: true }),
    {
      name: 'alt',
      type: 'text',
      required: true,
      maxLength: 160,
    },
    {
      name: 'caption',
      type: 'textarea',
      maxLength: 240,
    },
  ],
})
