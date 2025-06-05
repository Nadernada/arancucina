import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBGBlock as MediaBGBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'
import { useTranslations } from 'next-intl'

type Props = MediaBGBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBGBlock: React.FC<Props> = (props) => {
  const t = useTranslations()

  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        '',

        className,
        'relative px-4 lg:px-24 py-16 lg:py-32',
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn('object-cover -z-10', imgClassName)}
          resource={media}
          src={staticImage}
          fill
        />
      )}

      <div className="flex flex-col lg:flex-row justify-between gap-y-4 items-center container">
        <div className="relative py-6">
          <h1 className="font-bodoni uppercase text-5xl text-[#A59D95] font-normal">
            {t('environment.energy')}
            <br /> <span className="text-white">{t('environment.self-sufficiency')}</span>
          </h1>
          <div className="absolute bottom-0 left-0 lg:-left-12 w-full h-[1px] bg-[#A59D95]"></div>
        </div>
        <p className="text-white text-lg lg:w-2/5">
          {t('environment.text1')}
          <br />
          {t('environment.text2')}
        </p>
      </div>
    </div>
  )
}
