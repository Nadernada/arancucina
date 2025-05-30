import React from 'react'

import type { TwoSectionBlock as TwoSectionBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { TextWithHeading } from '@/components/TextWithHeading'
import { MediaBox } from '@/components/MediaBox'

export const TwoSectionBlock: React.FC<TwoSectionBlockProps> = (props) => {
  const { columns, clearBg } = props

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
    <div className="container p-0">
      <div
        className={cn(
          'grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16 rounded-md p-4 md:p-10 lg:p-16 transition-all duration-300',
          {
            'py-16': Object.keys(columns?.[0] || {}).includes('media'),
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
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[props.size!]}`, {
                  'md:col-span-2': props.size !== 'full',
                })}
                key={index}
              />
            )
          })}
      </div>
    </div>
  )
}
