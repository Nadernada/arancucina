'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrows'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Image from 'next/image'
import { DataFromCollectionSlug, CollectionSlug } from 'payload'
import Link from 'next/link'

const TWEEN_FACTOR_BASE = 0.52

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type PropType = {
  slides: DataFromCollectionSlug<CollectionSlug>[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])
  const tweenParentNodes = useRef<HTMLElement[]>([])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__slide__number') as HTMLElement
    })
    tweenParentNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenScale = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    const slideCount = emblaApi.slideNodes().length
    const selectedIndex = emblaApi.selectedScrollSnap()

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap?.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        // Handle looping adjustments
        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)
              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress)
              } else if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            }
          })
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
        const scale = numberWithinRange(tweenValue, 0.75, 1).toFixed(3)
        const tweenNode = tweenNodes.current[slideIndex]
        const tweenParentNode = tweenParentNodes.current[slideIndex]

        // 🎯 Calculate relative position in loop-aware way
        const diff = (slideIndex - selectedIndex + slideCount) % slideCount
        const isPrev = diff === slideCount - 1
        const isNext = diff === 1
        const isCurrent = slideIndex === selectedIndex

        let transform = `scale(${scale})`
        let zIndex = 1

        if (isCurrent) {
          transform = `scale(${scale})`
          zIndex = 3
        } else if (isPrev) {
          transform = `translateX(46%) scale(${scale})`
        } else if (isNext) {
          transform = `translateX(-46%) scale(${scale})`
        }
        if (tweenNode && tweenParentNode) {
          tweenNode.style.transform = transform
          tweenParentNode.style.zIndex = zIndex.toString()
        }
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenScale(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale)
  }, [emblaApi, tweenScale])

  return (
    <div className="embla">
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className="hidden sm:flex"
          />
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {slides.map((item, index) => (
                <Link
                  className="embla__slide cursor-pointer"
                  key={index}
                  href={(item as { slug: string }).slug}
                >
                  <div className="embla__slide__number relative overflow-hidden rounded-none">
                    <h4 className="absolute bottom-2 left-2 md:left-6 text-white font-bodoni text-[1rem] md:text-[1.5rem] lg:text-[2rem] uppercase font-normal z-20">
                      {(item as { models: { title: string } }).models.title}
                    </h4>

                    <div className="w-full h-full relative">
                      <Image
                        src={
                          (item as { models: { thumbImage: { url: string } } }).models.thumbImage
                            .url
                        }
                        alt={(item as { models: { title: string } }).models.title}
                        width={1920}
                        height={1080}
                        className="w-full h-full absolute object-cover inset-0 "
                      />
                      <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-black opacity-80 z-10"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className="hidden sm:flex"
          />
        </div>

        {/* Mobile navigation buttons */}
        <div className="flex justify-center gap-4 mt-4 sm:hidden">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div className="embla__dots gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot !bg-gray-300'.concat(
                index === selectedIndex ? ' embla__dot--selected' : '',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
