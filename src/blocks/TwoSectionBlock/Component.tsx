import React from 'react'

import type { TwoSectionBlock as TwoSectionBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { TextWithHeading } from '@/components/TextWithHeading'
import { MediaBox } from '@/components/MediaBox'

export const TwoSectionBlock: React.FC<TwoSectionBlockProps> = (props) => {
  const { columns, container } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  const colsTypes = {
    text: TextWithHeading,
    media: MediaBox,
  }

  return (
    <div className={cn('p-0', { 'container ': !container })}>
      <div
        className={cn(
          'grid grid-cols-4 lg:grid-cols-12 lg:gap-y-8 gap-y-2 gap-x-16 rounded-md p-4 md:p-10 xl:p-16 transition-all duration-300',
          {
            'py-0 md:py-16': Object.keys(columns?.[0] || {}).includes('media'),
            '!px-0': container,
          },
        )}
      >
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const props = col
            const Col = colsTypes[col.blockType as keyof typeof colsTypes]
            return (
              <Col
                {...props}
                className={cn(
                  `col-span-4 lg:col-span-${colsSpanClasses[props.size!]} justify-center items-center`,
                  {
                    'md:col-span-2': props.size !== 'full' && !container,
                    'lg:col-span-6 justify-center': props.shortHeading,
                  },
                )}
                key={index}
              />
            )
          })}
      </div>
    </div>
  )
}
