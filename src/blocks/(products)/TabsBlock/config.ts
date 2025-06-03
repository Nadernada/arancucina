import { Block } from 'payload'

export const TabsBlock: Block = {
  slug: 'TabsBlock',
  interfaceName: 'Tabs Block',
  fields: [
    {
      name: 'category',
      type: 'array',
      fields: [
        {
          name: 'tabName',
          type: 'text',
        },
        {
          name: 'finishes',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'padding',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
