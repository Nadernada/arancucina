import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

export const Designers: CollectionConfig<'designers'> = {
  slug: 'designers',
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'designers',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'designers',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...slugField(),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
