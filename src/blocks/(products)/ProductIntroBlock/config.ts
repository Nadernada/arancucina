import { Block } from 'payload'

export const ProductIntroBlock: Block = {
  slug: 'ProductIntroBlock',
  interfaceName: 'ProductIntroBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
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
