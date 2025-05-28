import { Block } from 'payload'

export const OurValuesBlock: Block = {
  slug: 'ourValuesBlock',
  interfaceName: 'OurValuesBlock',
  fields: [
    {
      name: 'content',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
