import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { DesigersBlock as DesignersBlockType } from '@/payload-types'
import { DesignersShowcase } from './DesignersShowcase'
import type { Designer } from '@/payload-types'

export const DesigersBlock: React.FC<DesignersBlockType> = async ({ title }) => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'designers',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      image: true,
    },
  })

  return <DesignersShowcase designers={docs as Designer[]} />
}
