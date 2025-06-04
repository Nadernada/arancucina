import { Block } from 'payload'

export const ParallaxBlock: Block = {
  slug: 'ParallaxBlock',
  interfaceName: 'Parallax Block',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'whiteText',
      type: 'text',
    },
    {
      name: 'brownText',
      type: 'text',
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'large',
      options: [
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Large',
          value: 'large',
        },
      ],
    },
    {
      name: 'noParallax',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
