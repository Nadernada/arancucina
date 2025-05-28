import type { Block } from 'payload'

export const IntroBlock: Block = {
  slug: 'introBlock',
  interfaceName: 'IntroBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
    },
  ],
}
