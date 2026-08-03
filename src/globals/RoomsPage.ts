import type { Field, GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { ctaFields } from '@/fields/cta'
import { imageRelation } from '@/fields/media'
import { seoFields } from '@/fields/seo'
import { sectionVisibilityFields } from '@/fields/publish'

const sectionNameField: Field = {
  name: 'sectionName',
  label: 'Section Name in Admin',
  type: 'text',
  admin: {
    description: 'Editable admin label. Keep this aligned with the actual frontend section purpose.',
  },
  maxLength: 100,
}

const section = (name: string, label: string, fields: Field[], description?: string): Field => ({
  name,
  label,
  type: 'group',
  admin: {
    hideGutter: false,
    description,
  },
  fields: [sectionNameField, ...fields, ...sectionVisibilityFields],
})

export const RoomsPage: GlobalConfig = {
  slug: 'rooms-page',
  label: 'Rooms Page',
  admin: {
    group: 'Pages',
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
    section('hero', '01 - Hero', [
      { name: 'heading', type: 'text', required: true, maxLength: 140 },
      { name: 'description', type: 'textarea', maxLength: 320 },
      imageRelation('image'),
    ]),
    section('availabilityBar', '02 - Availability Bar', [
      { name: 'sectionAriaLabel', type: 'text', defaultValue: 'Booking preview', maxLength: 120 },
      { name: 'formAriaLabel', type: 'text', defaultValue: 'Availability search', maxLength: 120 },
      { name: 'checkInLabel', type: 'text', defaultValue: 'Check-in', maxLength: 40 },
      { name: 'checkOutLabel', type: 'text', defaultValue: 'Check-out', maxLength: 40 },
      { name: 'guestsLabel', type: 'text', defaultValue: 'Guests', maxLength: 40 },
      { name: 'promotionLinkLabel', type: 'text', defaultValue: 'Have a promotion code?', maxLength: 80 },
      { name: 'promotionLinkURL', type: 'text', defaultValue: '/reservation' },
      { name: 'submitButtonLabel', type: 'text', defaultValue: 'Check Availability', maxLength: 80 },
      { name: 'submitButtonURL', type: 'text', defaultValue: '/reservation' },
    ]),
    section('roomCollection', '03 - Type of Room', [
      { name: 'eyebrow', type: 'text', maxLength: 80 },
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea', maxLength: 320 },
      { name: 'ratingSymbol', type: 'text', defaultValue: '* * * * *', maxLength: 20 },
      { name: 'startFromLabel', type: 'text', defaultValue: 'Start from', maxLength: 40 },
      { name: 'nightSuffixLabel', type: 'text', defaultValue: '/ night', maxLength: 40 },
      { name: 'statusLabel', type: 'text', defaultValue: 'Status', maxLength: 40 },
      { name: 'depositLabel', type: 'text', defaultValue: 'Deposit', maxLength: 40 },
      { name: 'bedsLabel', type: 'text', defaultValue: 'Beds', maxLength: 40 },
      { name: 'passengerLabel', type: 'text', defaultValue: 'Passenger', maxLength: 40 },
      { name: 'detailButtonLabel', type: 'text', defaultValue: 'View Detail', maxLength: 80 },
      ctaFields('button'),
    ]),
    seoFields,
  ],
}
