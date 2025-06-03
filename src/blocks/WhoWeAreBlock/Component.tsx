import React from 'react'
import type { WhoWeAre as WhoWeAreBlockType } from '@/payload-types'
import Image from 'next/image'
import { Sections } from './Sections'

export const WhoWeAreBlock: React.FC<WhoWeAreBlockType> = ({ title }) => {
  return <Sections />
}
