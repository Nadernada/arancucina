import { Block } from 'payload'

export const DesignerBlock: Block = {
  slug: 'DesignerBlock',
  interfaceName: 'DesignerBlock',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ctaText',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaLink',
      type: 'text',
    },
    {
      name: 'theme',
      type: 'select',
      options: [
        {
          label: 'light',
          value: 'light',
        },
        {
          label: 'dark',
          value: 'dark',
        },
      ],
    },
  ],
}
