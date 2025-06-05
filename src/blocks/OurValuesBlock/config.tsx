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
          localized: true,
        },
        {
          name: 'text',
          type: 'text',
          localized: true,
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
