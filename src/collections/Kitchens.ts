import { CollectionConfig } from 'payload'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Kitchens: CollectionConfig<'kitchens'> = {
  slug: 'kitchens',
  access: {
    read: () => true,
  },
  admin: {
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'kitchens',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'kitchens',
        req,
      }),
  },
  fields: [
    {
      name: 'models',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'slug',
          type: 'text',
        },
        {
          name: 'mainImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'thumbImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: true,
    },
    {
      name: 'title',
      type: 'text',
    },
    ...slugField(),
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
      fields: [
        OverviewField({
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
          imagePath: 'meta.image',
        }),
        MetaTitleField({
          hasGenerateFn: true,
        }),
        MetaImageField({
          relationTo: 'media',
        }),

        MetaDescriptionField({}),
        PreviewField({
          // if the `generateUrl` function is configured
          hasGenerateFn: true,

          // field paths to match the target field for data
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
        }),
      ],
    },
  ],
}
