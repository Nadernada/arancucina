import type { Block } from 'payload'

export const CarouselBlock: Block = {
  slug: 'carouselBlock',
  interfaceName: 'CarouselBlock',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
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
      name: 'relationTo',
      type: 'select',
      defaultValue: 'testimonials',
      label: 'Collections To Show',
      options: [
        {
          label: 'kitchens',
          value: 'kitchens',
        },
        {
          label: 'complements',
          value: 'complements',
        },
      ],
    },
  ],
}
