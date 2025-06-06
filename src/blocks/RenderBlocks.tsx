import React, { Fragment } from 'react'

import type { Page, Product } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { TwoSectionBlock } from '@/blocks/TwoSectionBlock/Component'
import { IntroBlock } from '@/blocks/IntroBlock/IntroBlock'
import { CarouselBlock } from '@/blocks/CarouselBlock/Component'
import { DesigersBlock } from '@/blocks/DesigersBlock/Component'
import { OurValuesBlock } from '@/blocks/OurValuesBlock/Component'
import { HeadingBlock } from '@/blocks/HeadingBlock/Component'
import { cn } from '@/utilities/ui'
import { WhoWeAreBlock } from './WhoWeAreBlock/Component'
import { DesignerBlock } from './DesignerBlock/Component'
import { MediaBGBlock } from './MediaBGBlock/Component'
import { ProductIntroBlock } from './(products)/ProductIntroBlock/Component'
import { Carousel } from './(products)/Carousel/Component'
import { HeadingWIthText } from './(products)/HeadingWithText/Component'
import { TabsBlock } from './(products)/TabsBlock/TabsBlock'
import { ParallaxBlock } from './(products)/parallaxBlock/Component'
import { ProductsList } from './(products)/ProductsList/Component'
import { TextWithCarousel } from './(products)/TextWithCarousel/Component'
import { MapBlock } from './MapBlock/Component'
import { DimensionsBlock } from './(products)/DimensionsBlock/Component'
import { CatalogueBlock } from './(products)/CatalogueBlock/Component'
import { TextImageColBlock } from './(products)/TextImageColBlock/Component'
import { TypedLocale } from 'payload'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  twoSectionBlock: TwoSectionBlock,
  introBlock: IntroBlock,
  carouselBlock: CarouselBlock,
  desigersBlock: DesigersBlock,
  ourValuesBlock: OurValuesBlock,
  HeadingBlock: HeadingBlock,
  WhoWeAreBlock: WhoWeAreBlock,
  DesignerBlock: DesignerBlock,
  MediaBGBlock: MediaBGBlock,
  ProductIntroBlock: ProductIntroBlock,
  Carousel: Carousel,
  HeadingWithText: HeadingWIthText,
  TabsBlock: TabsBlock,
  ParallaxBlock: ParallaxBlock,
  ProductsList: ProductsList,
  TextWithCarousel: TextWithCarousel,
  mapBlock: MapBlock,
  DimensionsBlock: DimensionsBlock,
  CatalogueBlock: CatalogueBlock,
  TextImageColBlock: TextImageColBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][] | Product['layout'][0][]
  locale: TypedLocale
}> = (props) => {
  const { blocks, locale } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div
                  className={cn({
                    'my-8 xl:my-16': blockType !== 'HeadingBlock',
                    'mt-16': blockType === 'HeadingBlock',
                    'my-0':
                      blockType === 'MediaBGBlock' ||
                      blockType === 'ParallaxBlock' ||
                      blockType === 'mapBlock' ||
                      blockType === 'content' ||
                      blockType === 'TextImageColBlock',
                  })}
                  key={index}
                >
                  <Block {...(block as any)} locale={locale} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
