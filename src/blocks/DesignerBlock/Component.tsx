import React from 'react'
import Image from 'next/image'
import type { DesignerBlock as DesignerBlockType, Media } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ArrowRight } from 'lucide-react'

export const DesignerBlock: React.FC<DesignerBlockType> = ({
  name,
  description,
  image,
  ctaText,
  ctaLink,
  theme,
}) => {
  return (
    <div
      className={cn('w-full container p-6 xl:p-24 grid grid-cols-1 lg:grid-cols-2 gap-12', {
        'bg-black': theme === 'dark',
      })}
    >
      <div
        className={cn('flex flex-col gap-8 justify-start items-start', {
          'order-2': theme === 'dark',
        })}
      >
        <h1 className={cn('text-5xl font-bodoni', { 'text-white': theme === 'dark' })}>{name}</h1>
        <p className="text-[#a2a2a2]">{description}</p>
        {/* <div className="flex flex-row gap-4 justify-start items-center hover:opacity-60 transition-colors duration-300 mt-4">
          <a
            href={ctaLink as string}
            className={cn('font-bold flex flex-row gap-2', { 'text-white': theme === 'dark' })}
          >
            {ctaText}
            <ArrowRight />
          </a>
        </div> */}
      </div>
      <div className="flex w-full h-full relative">
        <div className="xl:absolute -top-[60%] left-4  xl:w-[506px] aspect-square overflow-hidden">
          <Image
            src={(image as Media).url as string}
            alt="designer"
            width={506}
            height={506}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
