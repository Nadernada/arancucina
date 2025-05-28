import type { Metadata } from 'next'

import type { Media, Page, Post, Config, Kitchen } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Kitchen> | null
}): Promise<Metadata> => {
  const { doc } = args

  let metaImage: Media | Config['db']['defaultIDType'] | null | undefined = undefined
  let metaTitle: string | null | undefined = undefined
  let metaDescription: string | null | undefined = undefined

  // Handle Page and Post types
  if (doc && 'meta' in doc) {
    metaImage = doc.meta?.image
    metaTitle = doc.meta?.title
    metaDescription = doc.meta?.description
  }
  // Handle Kitchen type
  else if (doc && 'models' in doc) {
    metaImage = doc?.models?.mainImage
    metaTitle = doc?.models?.title
    metaDescription = doc?.models?.title // Using title as description since Kitchen doesn't have a dedicated description field
  }

  const ogImage = getImageURL(metaImage)

  const title = metaTitle
    ? metaTitle + ' | Payload Website Template'
    : 'Payload Website Template'

  return {
    description: metaDescription,
    openGraph: mergeOpenGraph({
      description: metaDescription || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
