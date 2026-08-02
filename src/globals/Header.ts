import type { GlobalConfig } from 'payload'
import { authenticatedOnly } from '@/access/roles'
import { imageRelation } from '@/fields/media'
import { linkFields } from '@/fields/link'

const allowedPages = [
  { label: 'Home', value: '/' },
  { label: 'About', value: '/about' },
  { label: 'About Us', value: '/about-us' },
  { label: 'Villa', value: '/villa' },
  { label: 'Rooms', value: '/rooms' },
  { label: 'Reservation', value: '/reservation' },
  { label: 'Facilities', value: '/facilities' },
  { label: 'Services', value: '/services' },
  { label: 'Gallery', value: '/gallery' },
  { label: 'Blog', value: '/blog' },
  { label: 'Promotions', value: '/promotions' },
  { label: 'Contact', value: '/contact' },
]

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: {
    group: 'Settings',
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
    imageRelation('logo'),
    {
      name: 'navigationItems',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, maxLength: 80 },
        { name: 'pageURL', type: 'select', required: true, options: allowedPages },
        { name: 'active', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: linkFields,
    },
  ],
}
