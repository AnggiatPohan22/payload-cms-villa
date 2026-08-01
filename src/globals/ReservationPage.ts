import type { GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { ctaFields } from '@/fields/cta'
import { imageRelation } from '@/fields/media'
import { seoFields } from '@/fields/seo'

export const ReservationPage: GlobalConfig = {
  slug: 'reservation-page',
  label: 'Reservation Page',
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
    { name: 'heroEyebrow', type: 'text', maxLength: 80 },
    { name: 'heroHeading', type: 'text', required: true, maxLength: 140 },
    { name: 'heroDescription', type: 'textarea', maxLength: 320 },
    imageRelation('heroImage'),
    {
      name: 'searchPreview',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, maxLength: 80 },
        { name: 'value', type: 'text', required: true, maxLength: 40 },
        { name: 'detail', type: 'text', maxLength: 80 },
      ],
    },
    {
      name: 'bookingBenefits',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true, maxLength: 120 }],
    },
    {
      name: 'roomDetails',
      type: 'array',
      fields: [
        { name: 'room', type: 'relationship', relationTo: 'rooms', required: true },
        { name: 'reviews', type: 'text', maxLength: 80 },
        { name: 'availabilityLabel', type: 'text', maxLength: 80 },
        { name: 'deposit', type: 'text', maxLength: 80 },
        { name: 'beds', type: 'text', maxLength: 80 },
        { name: 'passenger', type: 'text', maxLength: 80 },
        { name: 'breakfast', type: 'text', maxLength: 80 },
        { name: 'selected', type: 'checkbox', defaultValue: false },
        { name: 'badge', type: 'text', maxLength: 80 },
      ],
    },
    {
      name: 'overview',
      type: 'group',
      fields: [
        { name: 'arrival', type: 'text', maxLength: 120 },
        { name: 'departure', type: 'text', maxLength: 120 },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'room', type: 'relationship', relationTo: 'rooms' },
            { name: 'roomCount', type: 'text', maxLength: 40 },
            { name: 'passenger', type: 'text', maxLength: 40 },
            { name: 'subtotal', type: 'text', maxLength: 80 },
          ],
        },
        { name: 'total', type: 'text', maxLength: 80 },
      ],
    },
    ctaFields('whatsAppCTA'),
    seoFields,
  ],
}
