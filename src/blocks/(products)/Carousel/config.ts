import type { Block } from 'payload'

export const Carousel: Block = {
  slug: 'Carousel',
  interfaceName: 'Carousel',
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
      name: 'button',
      type: 'text',
    },
    {
      name: 'buttonLink',
      type: 'text',
    },
    {
      name: 'arrows',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'dots',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'slidesPerView',
      type: 'number',
      defaultValue: 3,
    },
  ],
}
