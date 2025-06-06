import { Block } from 'payload'

export const TextWithCarousel: Block = {
  slug: 'TextWithCarousel',
  interfaceName: 'TextWithCarousel',
  fields: [
    {
      name: 'blackText',
      type: 'text',
      localized: true,
    },
    {
      name: 'brownText',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'reversed',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
