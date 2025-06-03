import { Block } from 'payload'
import { TabsBlock } from '../TabsBlock/config'

export const DimensionsBlock: Block = {
  slug: 'DimensionsBlock',
  interfaceName: 'DimensionsBlock',
  fields: [
    {
      name: 'finishes',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'images',
          type: 'blocks',
          blocks: [TabsBlock],
        },
      ],
    },
    {
      name: 'finishesImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'dimensions',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'legend',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
