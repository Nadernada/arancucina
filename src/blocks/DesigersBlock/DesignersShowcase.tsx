'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { Designer } from '@/payload-types'
import type { Media as MediaType } from '@/payload-types'
import { NextButton } from '@/components/EmblaCarouselArrows'
import { useTranslations } from 'next-intl'

const AUTOPLAY_INTERVAL = 5000
const ANIMATION_DURATION = 800

export const DesignersShowcase = ({ designers }: { designers: Designer[] }) => {
  const [activeDesignerIndex, setActiveDesignerIndex] = useState(0)
  const [startIndex, setStartIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState('next') // "next" or "prev"
  const [autoplay, setAutoplay] = useState(true)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const t = useTranslations('Designers')

  // Track previous and current designers for animation
  const [previousDesigner, setPreviousDesigner] = useState(designers[0])
  const [currentDesigner, setCurrentDesigner] = useState(designers[0])

  const visibleDesigners = designers.slice(startIndex, startIndex + 3)

  // Function to advance to next slide with looping
  const handleNext = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setSlideDirection('next')

    // Store current designer before changing
    setPreviousDesigner(designers[activeDesignerIndex])

    // Calculate next indices with looping
    let nextStartIndex = startIndex + 1
    let nextActiveIndex = activeDesignerIndex + 1

    // Loop back to beginning if we reach the end
    if (nextStartIndex > designers.length - 3) {
      nextStartIndex = 0
    }

    if (nextActiveIndex >= designers.length) {
      nextActiveIndex = 0
    }

    setStartIndex(nextStartIndex)
    setActiveDesignerIndex(nextActiveIndex)
    setCurrentDesigner(designers[nextActiveIndex])

    // Reset autoplay timer when manually navigating
    resetAutoplayTimer()
  }

  const handleThumbnailClick = (designerIndex: number) => {
    if (isAnimating) return

    setIsAnimating(true)
    setSlideDirection(designerIndex > activeDesignerIndex ? 'next' : 'prev')

    // Store current designer before changing
    setPreviousDesigner(designers[activeDesignerIndex])

    setActiveDesignerIndex(designerIndex)
    setCurrentDesigner(designers[designerIndex])

    // Reset autoplay timer when manually navigating
    resetAutoplayTimer()
  }

  // Toggle autoplay
  const toggleAutoplay = () => {
    setAutoplay((prev) => !prev)
  }

  // Reset autoplay timer
  const resetAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }

    if (autoplay) {
      autoplayTimerRef.current = setTimeout(handleNext, AUTOPLAY_INTERVAL)
    }
  }

  // Set up autoplay
  useEffect(() => {
    if (autoplay && !isAnimating) {
      autoplayTimerRef.current = setTimeout(handleNext, AUTOPLAY_INTERVAL)
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current)
      }
    }
  }, [autoplay, isAnimating])

  // Reset animation state after transition completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, ANIMATION_DURATION)

    return () => clearTimeout(timer)
  }, [startIndex, activeDesignerIndex])

  return (
    <div className="container mx-auto px-4 py-12 xl:py-24">
      <div className="mb-16">
        <h1 className="text-4xl xl:text-6xl font-light tracking-tight uppercase font-bodoni">
          {t('the-names-that-make')}
          <br />
          {t('the-difference')}
        </h1>
        <div className="w-24 h-0.5 bg-black mt-6"></div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 md:gap-16">
        {/* Featured designer image with enhanced animation */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative !aspect-video lg:aspect-square w-11/12 lg:w-full overflow-hidden">
            {/* Previous image (animating out) */}
            {isAnimating && (
              <div
                className={`absolute inset-0 z-10 transition-all duration-800 ease-in-out ${
                  slideDirection === 'next' ? 'animate-slide-out-left' : 'animate-slide-out-right'
                }`}
              >
                <Image
                  src={(previousDesigner?.image as MediaType)?.url || '/placeholder.svg'}
                  alt={(previousDesigner?.image as MediaType)?.alt || ''}
                  fill
                  className="object-cover grayscale lg:aspect-square aspect-video"
                />
              </div>
            )}

            {/* Current image (animating in) */}
            <div
              className={`absolute inset-0 z-0 ${
                isAnimating
                  ? slideDirection === 'next'
                    ? 'animate-slide-in-right'
                    : 'animate-slide-in-left'
                  : ''
              }`}
            >
              <Image
                src={(currentDesigner?.image as MediaType)?.url || '/placeholder.svg'}
                alt={(currentDesigner?.image as MediaType)?.alt || ''}
                fill
                className="object-cover grayscale lg:aspect-square aspect-video"
                priority
              />
            </div>
          </div>

          {/* Arrow button positioned on right center */}
          <div className="absolute top-1/2 right-[2%] lg:left-full transform -translate-y-1/2 z-10">
            <NextButton onClick={handleNext} />
          </div>
        </div>

        {/* Designer info and carousel */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex justify-between lg:justify-end lg:mb-8">
            <p className="text-lg text-gray-700 mb-12 block lg:hidden">
              Visionary creators crafting timeless pieces
            </p>
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 border-gray-300 hover:bg-transparent hover:text-black"
            >
              {t('about-designers')}
            </Button>
          </div>

          <p className="text-lg text-gray-700 mb-12 hidden lg:block">{t('visionary')}</p>

          {/* Thumbnails carousel with enhanced animation */}
          <div className="flex flex-col gap-8">
            <div className="flex gap-4 overflow-hidden">
              {visibleDesigners.map((designer, index) => {
                const designerIndex = designers.findIndex((d) => d.id === designer.id)
                return (
                  <div
                    key={designer.id}
                    className={`relative aspect-[1/1.2] w-32 cursor-pointer ${
                      isAnimating ? 'animate-thumbnail-exit' : 'animate-thumbnail-enter'
                    } ${activeDesignerIndex === designerIndex ? 'ring-2 ring-black' : 'opacity-90 hover:opacity-100'}`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both',
                    }}
                    onClick={() => handleThumbnailClick(designerIndex)}
                  >
                    <Image
                      src={(designer.image as MediaType).url || '/placeholder.svg'}
                      alt={(designer.image as MediaType).alt || ''}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div className="mt-10 md:mt-16">
            <p className="text-base text-gray-700 leading-relaxed">{t('description')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
