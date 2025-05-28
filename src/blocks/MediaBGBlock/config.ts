import type { Block } from 'payload'

export const MediaBGBlock: Block = {
  slug: 'MediaBGBlock',
  interfaceName: 'MediaBGBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
