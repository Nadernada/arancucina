'use client'

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrows'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../EmblaCarouselDotButton'
import { Media } from '../Media'
import { Media as MediaType } from '@/payload-types'

type SlideType = {
  image?: string | MediaType | null | undefined
  id?: string | null | undefined
}

type PropType = {
  slides: SlideType[] | null | undefined
  options?: EmblaOptionsType
  dots?: boolean | null | undefined
  arrows?: boolean | null | undefined
  slidesPerView?: number | null | undefined
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, dots, arrows, slidesPerView } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  console.log(slidesPerView)

  return (
    <section className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides?.map((slide, index) => (
            <div
              className="embla__slide relative aspect-square"
              style={{ flex: `0 0 ${slidesPerView ? 100 / slidesPerView : 100}%` }}
              key={index}
            >
              <Media resource={slide.image} imgClassName="object-cover z-0" fill />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls !mt-0">
        {arrows && (
          <div className="embla__buttons absolute bottom-0 left-[50%] -translate-x-1/2 flex justify-center items-center">
            <PrevButton
              onClick={onPrevButtonClick}
              className="bg-black aspect-square w-12 h-12 flex justify-center items-center"
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              className="bg-black aspect-square w-12 h-12 flex justify-center items-center"
              disabled={nextBtnDisabled}
            />
          </div>
        )}

        {dots && (
          <div className="embla__dots gap-2">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot rounded-full !bg-transparent border border-[#A59D95] !w-3 !h-3 after:w-3 after:h-3 after:bg-transparent after:border after:border-[#A59D95] after:rounded-full'.concat(
                  index === selectedIndex ? ' embla__dot--selected after:bg-[#A59D95]' : '',
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default EmblaCarousel
