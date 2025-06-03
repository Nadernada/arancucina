'use client'

import React, { useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrows'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../EmblaCarouselDotButton'
import { Media } from '../Media'
import { Media as MediaType } from '@/payload-types'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

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
  slideQuote?: string | null | undefined
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, dots, arrows, slidesPerView, slideQuote } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<number | null>(null)
  const [hasDragged, setHasDragged] = useState(false)

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  const handleImageClick = (index: number) => {
    // Only open lightbox if we haven't dragged
    if (!hasDragged) {
      setLightboxImage(index)
      setLightboxOpen(true)
    }
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxImage(null)
  }

  const nextLightboxImage = () => {
    if (lightboxImage !== null && slides) {
      setLightboxImage((lightboxImage + 1) % slides.length)
    }
  }

  const prevLightboxImage = () => {
    if (lightboxImage !== null && slides) {
      setLightboxImage((lightboxImage - 1 + slides.length) % slides.length)
    }
  }
  return (
    <section className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides?.map((slide, index) => (
            <div
              className="embla__slide relative aspect-square group cursor-pointer"
              style={{ flex: `0 0 ${slidesPerView ? 100 / slidesPerView : 100}%` }}
              key={index}
              onClick={() => handleImageClick(index)}
            >
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-500 flex justify-center items-center">
                <p className="text-white text-sm">{slideQuote}</p>
              </div>

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
          <div className="embla__dots gap-2 mt-3">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot rounded-full bg-transparent border border-[#A59D95] !w-3 !h-3 after:w-3 after:h-3 after:bg-transparent after:border after:border-[#A59D95] after:rounded-full'.concat(
                  index === selectedIndex ? ' embla__dot--selected after:bg-[#A59D95]' : '',
                )}
              />
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && lightboxImage !== null && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 text-white hover:bg-white/10 rounded-full w-12 h-12 z-10"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full w-12 h-12"
            onClick={prevLightboxImage}
          >
            ←
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 rounded-full w-12 h-12"
            onClick={nextLightboxImage}
          >
            →
          </Button>

          {/* Lightbox Image */}
          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={(slides?.[lightboxImage]?.image as MediaType)?.url || '/placeholder.svg'}
              alt={(slides?.[lightboxImage]?.image as MediaType)?.alt || ''}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {lightboxImage + 1} / {slides?.length}
          </div>
        </div>
      )}
    </section>
  )
}

export default EmblaCarousel
