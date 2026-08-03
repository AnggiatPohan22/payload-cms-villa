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

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
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
      imageRelation('image'),
      { name: 'scrollCueLabel', type: 'text', defaultValue: 'Scroll to our story', maxLength: 120 },
    ]),
    section('story', '02 - Our Story', [
      { name: 'eyebrow', type: 'text', maxLength: 80 },
      { name: 'heading', type: 'text', maxLength: 140 },
      {
        name: 'paragraphs',
        type: 'array',
        fields: [{ name: 'text', type: 'textarea', required: true }],
      },
      imageRelation('image'),
    ]),
    section('principles', '03 - Principles', [
      { name: 'eyebrow', type: 'text', maxLength: 80 },
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea', maxLength: 320 },
      {
        name: 'items',
        type: 'array',
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea' },
          imageRelation('image'),
        ],
      },
    ]),
    section('team', '04 - Team', [
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'quote', type: 'textarea', maxLength: 320 },
      {
        name: 'members',
        type: 'array',
        fields: [
          { name: 'name', type: 'text', required: true, maxLength: 100 },
          { name: 'role', type: 'text', maxLength: 100 },
          { name: 'description', type: 'textarea', maxLength: 260 },
          imageRelation('image'),
        ],
      },
    ]),
    section('finalCTA', '05 - Final CTA', [
      { name: 'heading', type: 'text', maxLength: 140 },
      imageRelation('image'),
      ctaFields('button'),
    ]),
    seoFields,
  ],
}
