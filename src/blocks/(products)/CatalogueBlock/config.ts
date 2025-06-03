import { Block } from 'payload'

export const CatalogueBlock: Block = {
  slug: 'CatalogueBlock',
  interfaceName: 'Catalogue Block',
  fields: [
    {
      name: 'pdf',
      type: 'upload',
      relationTo: 'files',
    },
  ],
}
