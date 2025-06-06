'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  title,
  subtitle,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative flex items-center justify-center text-white" data-theme="dark">
      {richText && (
        <div className="container mb-8 z-10 relative flex items-center justify-center">
          <div className="max-w-[36.5rem] md:text-center">
            {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex md:justify-center gap-4">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      )}
      <div className="min-h-[100vh] w-full select-none">
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="-z-10 object-cover"
            htmlElement="div"
            className="w-full h-full object-cover absolute inset-0"
            priority
            resource={media}
          />
        )}

        <div className="w-full h-full absolute z-[1] bg-black/30 inset-0" />

        <div className="flex flex-col gap-4 justify-center items-center inset-0 absolute w-full h-full z-[2] p-6 md:p-0">
          <h1 className="text-6xl uppercase font-bold font-bodoni md:w-[80%] lg:w-2/3 xl:w-1/2 text-center">
            {title}
          </h1>
          <h2 className="text-xl text-center font-thin ">{subtitle}</h2>
        </div>
      </div>
    </div>
  )
}
