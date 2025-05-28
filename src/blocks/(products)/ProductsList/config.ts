import { Block } from 'payload'

export const ProductsList: Block = {
  slug: 'ProductsList',
  interfaceName: 'ProductsList',
  fields: [
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: true,
    },
  ],
}
