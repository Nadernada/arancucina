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
        },
        {
          name: 'grayText',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
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
