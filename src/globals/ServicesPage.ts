import type { Field, GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { imageRelation } from '@/fields/media'
import { seoFields } from '@/fields/seo'
import { sectionVisibilityFields } from '@/fields/publish'

const buttonFields = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
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
  ],
})

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

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Services Page',
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
      { name: 'scrollCueLabel', type: 'text', defaultValue: 'Scroll to services', maxLength: 120 },
    ]),
    section('intro', '02 - Intro', [
      { name: 'eyebrow', type: 'text', maxLength: 80 },
      { name: 'heading', type: 'textarea', maxLength: 360 },
      { name: 'description', type: 'textarea', maxLength: 320 },
    ]),
    section('signatureServices', '03 - Signature Services', [
      { name: 'ariaLabel', type: 'text', defaultValue: 'Signature services', maxLength: 120 },
    ]),
    section('tailoredMoment', '04 - Tailored Moment', [
      { name: 'metaLabelOne', type: 'text', defaultValue: 'Island route', maxLength: 80 },
      { name: 'metaLabelTwo', type: 'text', defaultValue: 'Concierge timing', maxLength: 80 },
    ]),
    section('finalCTA', '05 - Final CTA', [
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea', maxLength: 320 },
      buttonFields('primary', 'Primary Button'),
      buttonFields('secondary', 'Secondary Button'),
    ]),
    seoFields,
  ],
}
