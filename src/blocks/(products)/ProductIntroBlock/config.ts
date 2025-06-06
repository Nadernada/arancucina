import { Block } from 'payload'

export const ProductIntroBlock: Block = {
  slug: 'ProductIntroBlock',
  interfaceName: 'ProductIntroBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'catalogue',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'materials',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'store',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'type',
      type: 'text',
      localized: true,
    },
    {
      name: 'dimensions',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'finishes',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
