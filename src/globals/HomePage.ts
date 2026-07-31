import type { Field, GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { ctaFields } from '@/fields/cta'
import { imageRelation } from '@/fields/media'
import { sectionVisibilityFields } from '@/fields/publish'

const section = (name: string, fields: Field[]): Field => ({
  name,
  type: 'group',
  admin: {
    hideGutter: false,
  },
  fields: [...fields, ...sectionVisibilityFields],
})

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
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
    section('hero', [
      { name: 'eyebrow', type: 'text', maxLength: 80 },
      { name: 'heading', type: 'text', required: true, maxLength: 140 },
      { name: 'description', type: 'textarea', maxLength: 320 },
      imageRelation('backgroundImage', { required: true }),
      ctaFields('primaryCTA'),
      ctaFields('secondaryCTA'),
      { name: 'overlayIntensity', type: 'number', defaultValue: 40, min: 0, max: 90 },
    ]),
    section('introduction', [
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea' },
      imageRelation('image'),
      ctaFields(),
    ]),
    section('featuredRooms', [
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea' },
      { name: 'selectedRooms', type: 'relationship', relationTo: 'rooms', hasMany: true },
    ]),
    section('facilitiesOverview', [
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea' },
      { name: 'selectedFacilities', type: 'relationship', relationTo: 'facilities', hasMany: true },
    ]),
    section('galleryPreview', [
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea' },
      { name: 'selectedGalleryItems', type: 'relationship', relationTo: 'gallery', hasMany: true },
      ctaFields(),
    ]),
    section('promotionSection', [
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea' },
      { name: 'selectedPromotions', type: 'relationship', relationTo: 'promotions', hasMany: true },
    ]),
    section('finalCTA', [
      { name: 'heading', type: 'text', maxLength: 140 },
      { name: 'description', type: 'textarea' },
      { name: 'buttonLabel', type: 'text', maxLength: 80 },
      { name: 'buttonURL', type: 'text' },
      imageRelation('backgroundImage'),
    ]),
  ],
}
