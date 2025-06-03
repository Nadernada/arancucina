import React from 'react'
import type { TextImageColBlock as TextImageColBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const TextImageColBlock: React.FC<TextImageColBlockType> = ({ columns }) => {
  return (
    <div className="bg-[#e6e6e6]">
      <div
        className={cn('container p-16 grid grid-cols-2 justify-end', {
          'items-end gap-10': columns?.[1]?.videoAspect,
          'gap-x-8 gap-y-0': columns?.[1]?.closeGrid,
        })}
      >
        {columns?.map((column, index) => (
          <div
            className={cn('flex flex-col gap-8 justify-center mx-auto', {
              'mt-14': (index % 2 !== 0 && !column.videoAspect) || !columns?.[1]?.closeGrid,
              'w-2/3': !column.videoAspect,
              'w-[90%]': column.videoAspect,
              'w-full': columns?.[1]?.closeGrid,
            })}
            key={column.id || index}
          >
            {!columns?.[1]?.closeGrid && (
              <h2
                className={cn('text-black font-bodoni uppercase text-4xl ', {
                  'w-2/3': column.videoAspect,
                })}
              >
                {column.blackText || ''}
                {column.blackText && column.grayText && <br />}
                <span className="text-[#A59D95]">{column.grayText || ''}</span>
              </h2>
            )}
            <p className="text-[#696969] text-lg">{column.description || ''}</p>

            <div
              className={cn('flex w-full relative', {
                'aspect-video': column.videoAspect,
                ' aspect-[1/1.6] ms-4': !column.videoAspect,
              })}
            >
              <Media resource={column.image} imgClassName="object-cover" fill />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
