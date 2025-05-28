import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { cn } from '@/utilities/ui'
import PageClient from './page.client'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { Product } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'kitchens',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    depth: 3,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/kitchens' + slug

  const page: RequiredDataFromCollectionSlug<'kitchens'> | null = await queryPageBySlug({
    slug,
  })

  // We don't use homeStatic here since it's a Page type and not a Kitchen type
  if (!page) {
    return <PayloadRedirects url={url} />
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { title, products } = page

  return (
    <article
      className={cn('pt-16', {
        'pt-0': title,
      })}
    >
      {/* <PageClient /> */}
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="w-full heading-bg flex flex-col justify-center items-center containe px-16 py-6 gap-4">
        <h1 className="text-3xl font-bodoni font-normal text-white">{title}</h1>
      </div>
      <div className="flex flex-col gap-16 justify-center items-center my-16">
        {products.map((product) => {
          if (typeof product === 'string') return null
          return (
            <Link
              href={`/products/${product.slug}`}
              key={product.id}
              className="w-full h-[50vh] relative flex flex-col justify-end items-end container p-0"
            >
              <div className="w-[90%] bg-black px-16 py-8 translate-y-5 flex justify-start items-center z-[2]">
                <h2 className="text-3xl font-bodoni font-normal text-white">{product.title}</h2>
              </div>
              <Media imgClassName="object-cover z-0" resource={product.mainImage} fill />
            </Link>
          )
        })}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'kitchens',
    draft,
    depth: 2,
    limit: 2,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
