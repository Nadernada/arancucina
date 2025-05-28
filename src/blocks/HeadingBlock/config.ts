import { Block } from 'payload'

export const HeadingBlock: Block = {
  slug: 'HeadingBlock',
  interfaceName: 'Heading Block',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'size',
      type: 'select',
      options: [
        {
          value: 'small',
          label: 'small',
        },
        {
          value: 'loose',
          label: 'loose',
        },
      ],
    },
    {
      name: 'text',
      type: 'text',
    },
  ],
}
