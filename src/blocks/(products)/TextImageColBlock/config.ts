import { Block } from 'payload'

export const TextImageColBlock: Block = {
  slug: 'TextImageColBlock',
  interfaceName: 'TextImageColBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      fields: [
        {
          name: 'blackText',
          type: 'text',
          localized: true,
        },
        {
          name: 'grayText',
          type: 'text',
          localized: true,
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
          name: 'videoAspect',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'closeGrid',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
