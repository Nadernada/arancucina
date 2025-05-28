import EmblaCarousel from '@/components/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import { CollectionSlug, getPayload } from 'payload'
import configPromise from '@/payload.config'

export const CarouselBlock = async ({ relationTo }: { relationTo: CollectionSlug }) => {
  const options: EmblaOptionsType = { loop: true, align: 'center' }

  const payload = await getPayload({ config: configPromise })

  const fetchedDocs = await payload.find({
    collection: relationTo,
    depth: 1,
    limit: 6,
  })

  const content = fetchedDocs.docs

  return (
    <div className="container p-4 md:p-10 lg:p-16">
      <EmblaCarousel slides={content} options={options} />
    </div>
  )
}
