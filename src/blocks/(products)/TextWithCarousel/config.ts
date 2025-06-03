import { Block } from 'payload'

export const TextWithCarousel: Block = {
  slug: 'TextWithCarousel',
  interfaceName: 'TextWithCarousel',
  fields: [
    {
      name: 'blackText',
      type: 'text',
    },
    {
      name: 'brownText',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
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
