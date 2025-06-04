import React from 'react'
import type { HeadingWithTextBlock as HeadingWithTextType } from '@/payload-types'

export const HeadingWIthText: React.FC<HeadingWithTextType> = ({
  blackText,
  brownText,
  description,
}) => {
  return (
    <div className="flex container flex-col gap-4 lg:gap-0 lg:flex-row py-4 lg:py-0 justify-between items-center">
      <h2 className="text-black font-bodoni uppercase text-4xl lg:w-1/3 lg:max-w-[50%]">
        {blackText || ''}
        {blackText && brownText && <br />}
        <span className="text-[#A59D95]">{brownText || ''}</span>
      </h2>

      <p className="text-[#696969] text-lg lg:max-w-[50%] lg:w-1/3">{description || ''}</p>
    </div>
  )
}
