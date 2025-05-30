import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'mapBlock',
  interfaceName: 'MapBlock',
  fields: [
    {
      name: 'text',
      type: 'text',
    },
  ],
}
