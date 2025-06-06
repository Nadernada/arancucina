import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import LeftArrow from '@/../public/images/icons/left-arrow.svg'
import RightArrow from '@/../public/images/icons/right-arrow.svg'
import { cn } from '@/utilities/ui'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

type PropType = ComponentPropsWithRef<'button'>

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, className, ...restProps } = props

  return (
    <button
      className={cn(
        'embla__button embla__button--prev border border-r-0 border-[#A59D95] rounded-l-full',
        className,
      )}
      type="button"
      {...restProps}
    >
      <img src="/images/icons/left-arrow.svg" alt="Previous" className="embla__button__svg" />
      {children}
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, className, ...restProps } = props

  return (
    <button
      className={cn(
        'embla__button embla__button--next border border-l-0 border-[#A59D95] rounded-r-full',
        className,
      )}
      type="button"
      {...restProps}
    >
      <img src="/images/icons/right-arrow.svg" alt="Previous" className="embla__button__svg" />
      {children}
    </button>
  )
}
