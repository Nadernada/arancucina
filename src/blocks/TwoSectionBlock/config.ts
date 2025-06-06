import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'blockType',
    type: 'select',
    defaultValue: 'text',
    options: [
      {
        label: 'Text',
        value: 'text',
      },
      {
        label: 'Media',
        value: 'media',
      },
    ],
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    localized: true,
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'media',
    type: 'upload',
    admin: {
      condition: (_, { blockType }) => blockType === 'media',
    },
    relationTo: 'media',
    required: true,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  {
    name: 'heading',
    type: 'text',
    localized: true,
  },
  {
    name: 'headingSize',
    type: 'select',
    defaultValue: 'h1',
    options: [
      {
        label: 'H1',
        value: 'h1',
      },
      {
        label: 'H2',
        value: 'h2',
      },
      {
        label: 'H3',
        value: 'h3',
      },
      {
        label: 'H4',
        value: 'h4',
      },
    ],
  },
  {
    name: 'icon',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'padding',
    type: 'checkbox',
  },
  {
    name: 'shortHeading',
    type: 'checkbox',
    defaultValue: false,
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const TwoSectionBlock: Block = {
  slug: 'twoSectionBlock',
  interfaceName: 'TwoSectionBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },

    {
      name: 'container',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
