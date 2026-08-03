import type { Field, GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { ctaFields } from '@/fields/cta'
import { imageRelation } from '@/fields/media'
import { sectionVisibilityFields } from '@/fields/publish'

const buttonFields = (name = 'button'): Field => ({
  name,
  type: 'group',
  label: 'Button',
  fields: [
    { name: 'label', type: 'text', maxLength: 80 },
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
    { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
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

const sectionNameField: Field = {
  name: 'sectionName',
  label: 'Section Name in Admin',
  type: 'text',
  admin: {
    description:
      'Editable label for staff/admin only. Use this to match the visible frontend section purpose without changing code structure.',
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

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
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
      { name: 'eyebrow', type: 'text', maxLength: 80 },
      { name: 'heading', type: 'text', required: true, maxLength: 140 },
      { name: 'description', type: 'textarea', maxLength: 320 },
      imageRelation('backgroundImage', { required: true }),
      ctaFields('primaryCTA'),
      ctaFields('secondaryCTA'),
      { name: 'overlayIntensity', type: 'number', defaultValue: 40, min: 0, max: 90 },
    ]),
    section('bookingPreview', '02 - Booking Preview Bar', [
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
    section('introduction', '03 - Ocean-side Comfort Intro', [
      { name: 'eyebrow', type: 'text', maxLength: 80 },
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea' },
      imageRelation('image'),
    ]),
    section('signatureExperiences', '04 - Signature Experiences', [
      { name: 'eyebrow', type: 'text', maxLength: 80 },
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea' },
      { name: 'selectedServices', type: 'relationship', relationTo: 'services', hasMany: true },
      buttonFields(),
    ]),
    section('typeOfRooms', '05 - Type of Room', [
      { name: 'eyebrow', type: 'text', maxLength: 80 },
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea' },
      { name: 'selectedRooms', type: 'relationship', relationTo: 'rooms', hasMany: true },
    ]),
    section(
      'testimonialNote',
      '06 - Testimonial Note',
      [
        {
          name: 'note',
          type: 'textarea',
          defaultValue:
            'Frontend testimonial section is intentionally not editable from CMS yet. It will be connected later to Google Reviews or another review platform.',
          admin: {
            readOnly: true,
            description:
              'This keeps the Home CMS section order aligned with frontend while avoiding a temporary manual testimonial source.',
          },
        },
      ],
      'Placeholder note only. This frontend section will use Google Reviews or another review platform later.',
    ),
    section('journalPreview', '07 - Latest Journal Preview', [
      { name: 'eyebrow', type: 'text', maxLength: 80 },
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea' },
      { name: 'selectedArticles', type: 'relationship', relationTo: 'blog', hasMany: true },
      buttonFields(),
    ]),
    section('contactPreview', '08 - Contact Us Preview', [
      { name: 'eyebrow', type: 'text', maxLength: 80 },
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea' },
      { name: 'locationHeading', type: 'text', maxLength: 120 },
      { name: 'address', type: 'textarea' },
      { name: 'emailLabel', type: 'text', defaultValue: 'Email:', maxLength: 40 },
      { name: 'email', type: 'email' },
      { name: 'phoneLabel', type: 'text', defaultValue: 'Call directly:', maxLength: 40 },
      { name: 'phone', type: 'text', maxLength: 40 },
      { name: 'mapEmbedURL', type: 'text' },
    ]),
  ],
}
