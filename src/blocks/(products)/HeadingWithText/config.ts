import { Block } from 'payload'

export const HeadingWithText: Block = {
  slug: 'HeadingWithText',
  interfaceName: 'HeadingWithTextBlock',
  fields: [
    {
      name: 'blackText',
      type: 'text',
      localized: true,
    },
    {
      name: 'brownText',
      type: 'text',
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
  ],
}
