'use client'

import type { DimensionsBlock as DimensionsBlockType } from '@/payload-types'
import { TabsBlock } from '../TabsBlock/TabsBlock'
import { cn } from '@/utilities/ui'
import { ArrowRight } from 'lucide-react'
import { Media } from '@/components/Media'

export const DimensionsBlock: React.FC<DimensionsBlockType> = ({
  finishes,
  dimensions,
  legend,
  finishesImage,
}) => {
  const blockComponents = {
    TabsBlock: TabsBlock,
  }

  return (
    <div className="container flex flex-col lg:flex-row gap-4 justify-between items-center">
      <div className="flex flex-col gap-6 justify-start items-start flex-1">
        <h1 className="text-3xl font-bodoni font-normal text-white">FINISHES</h1>
        {finishes &&
          finishes?.map((finish) => (
            <div key={finish.id} className="flex flex-col gap-6 justify-start items-start w-full">
              {finish.images?.map((block, index) => {
                const { blockType } = block

                if (blockType && blockType in blockComponents) {
                  const Block = blockComponents[blockType]

                  if (Block) {
                    return (
                      <div key={index} className="flex flex-col justify-start items-start w-full">
                        {finish.title && (
                          <p className="text-[#A59D95] text-lg font-bodoni">{finish.title}</p>
                        )}
                        <Block {...(block as any)} />
                      </div>
                    )
                  }
                }
                return null
              })}
            </div>
          ))}
        {finishesImage && <Media resource={finishesImage} imgClassName="w-full" />}
        {!finishes && !finishesImage && (
          <p className="italic font-xs">
            For the range of finishes, refer to the Imperial price list and / or photographic
            catalog.
          </p>
        )}
      </div>
      <div className="flex flex-col gap-6 justify-start items-start bg-[#d1d3d4] p-6 lg:w-1/3">
        <h1 className="text-3xl font-bodoni font-normal text-black uppercase">Dimensions</h1>
        {/* <button onClick={() => {}} className="flex items-center gap-2 text-sm font-bold">
          <p>See the legend</p>
          <ArrowRight />
        </button> */}
        <Media resource={dimensions} imgClassName="w-full" />
      </div>
    </div>
  )
}
