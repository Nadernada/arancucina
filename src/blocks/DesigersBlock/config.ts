import type { Block } from 'payload'

export const DesigersBlock: Block = {
  slug: 'desigersBlock',
  interfaceName: 'DesigersBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'designers',
      relationTo: 'designers',
      type: 'relationship',
      hasMany: true,
    },
  ],
}
