import { Block } from 'payload'

export const HeadingWithText: Block = {
  slug: 'HeadingWithText',
  interfaceName: 'HeadingWithTextBlock',
  fields: [
    {
      name: 'blackText',
      type: 'text',
    },
    {
      name: 'brownText',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
}
