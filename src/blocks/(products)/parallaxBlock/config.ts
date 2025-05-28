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
  ],
}
