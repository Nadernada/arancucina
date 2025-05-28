import React from 'react'
import type { HeadingWithTextBlock as HeadingWithTextType } from '@/payload-types'

export const HeadingWIthText: React.FC<HeadingWithTextType> = ({
  blackText,
  brownText,
  description,
}) => {
  return (
    <div className="flex container flex-row justify-between items-center">
      <h2 className="text-black font-bodoni uppercase text-4xl w-1/3 max-w-[50%]">
        {blackText || ''}
        {blackText && brownText && <br />}
        <span className="text-[#A59D95]">{brownText || ''}</span>
      </h2>

      <p className="text-[#A59D95] text-lg max-w-[50%] w-1/3">{description || ''}</p>
    </div>
  )
}
