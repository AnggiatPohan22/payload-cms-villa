import type { Field, GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { imageRelation } from '@/fields/media'
import { seoFields } from '@/fields/seo'
import { sectionVisibilityFields } from '@/fields/publish'

const buttonFields = (name: string, label = 'Button'): Field => ({
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

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
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
    section('contactInquiry', '02 - Contact Inquiry', [
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea' },
      { name: 'locationLabel', type: 'text', defaultValue: 'Villa Location', maxLength: 80 },
      { name: 'locationText', type: 'textarea' },
      { name: 'whatsAppLabel', type: 'text', defaultValue: 'WhatsApp Concierge', maxLength: 80 },
      { name: 'whatsAppText', type: 'textarea' },
      { name: 'emailLabel', type: 'text', defaultValue: 'Reservations', maxLength: 80 },
      { name: 'emailText', type: 'textarea' },
      { name: 'conciergeAriaLabel', type: 'text', defaultValue: 'Concierge assistance', maxLength: 120 },
      { name: 'conciergeHeading', type: 'text', defaultValue: 'Concierge Assistance', maxLength: 120 },
      buttonFields('button'),
      { name: 'phone', type: 'text' },
      { name: 'email', type: 'email' },
      { name: 'whatsApp', type: 'text' },
      { name: 'address', type: 'textarea' },
    ]),
    section('contactForm', '03 - Contact Form', [
      { name: 'ariaLabel', type: 'text', defaultValue: 'Contact inquiry', maxLength: 120 },
      { name: 'heading', type: 'text', defaultValue: 'Send an Inquiry', maxLength: 120 },
      { name: 'description', type: 'textarea' },
      { name: 'nameLabel', type: 'text', defaultValue: 'Name', maxLength: 40 },
      { name: 'namePlaceholder', type: 'text', defaultValue: 'Your full name', maxLength: 120 },
      { name: 'emailLabel', type: 'text', defaultValue: 'Email', maxLength: 40 },
      { name: 'emailPlaceholder', type: 'text', defaultValue: 'email@example.com', maxLength: 120 },
      { name: 'subjectLabel', type: 'text', defaultValue: 'Subject', maxLength: 40 },
      { name: 'subjectOptionOne', type: 'text', defaultValue: 'General Inquiry', maxLength: 80 },
      { name: 'subjectOptionTwo', type: 'text', defaultValue: 'Availability Request', maxLength: 80 },
      { name: 'subjectOptionThree', type: 'text', defaultValue: 'Villa Services', maxLength: 80 },
      { name: 'subjectOptionFour', type: 'text', defaultValue: 'Special Request', maxLength: 80 },
      { name: 'messageLabel', type: 'text', defaultValue: 'Message', maxLength: 40 },
      { name: 'messagePlaceholder', type: 'textarea' },
      { name: 'submitButtonLabel', type: 'text', defaultValue: 'Submit Inquiry', maxLength: 80 },
      { name: 'submittingButtonLabel', type: 'text', defaultValue: 'Opening WhatsApp...', maxLength: 80 },
      { name: 'whatsAppMessageIntro', type: 'textarea' },
    ]),
    section('mapSection', '04 - Map Section', [
      { name: 'heading', type: 'text', defaultValue: 'A Hidden Gem', maxLength: 120 },
      { name: 'description', type: 'textarea' },
      { name: 'locationHeading', type: 'text', maxLength: 120 },
      { name: 'mapTitle', type: 'text', maxLength: 120 },
      { name: 'mapEmbedURL', type: 'text' },
      buttonFields('button'),
    ]),
    section('quote', '05 - Quote', [
      { name: 'ariaLabel', type: 'text', defaultValue: 'Villa Ceningan quote', maxLength: 120 },
      { name: 'text', type: 'textarea' },
    ]),
    seoFields,
  ],
}
