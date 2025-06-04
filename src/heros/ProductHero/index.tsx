'use client'

import RichText from '@/components/RichText'
import { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Media } from '@/components/Media'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Page } from '@/payload-types'

export const ProductHero: React.FC<Page['hero']> = ({ images = [], richText }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoPlay = true
  const interval = 5000

  const goToNext = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (images?.length || 1))

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // Match this with the CSS transition duration
  }

  const goToPrevious = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (images?.length || 1)) % (images?.length || 1))

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // Match this with the CSS transition duration
  }

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      goToNext()
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, isTransitioning])

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel container */}
      <div className="relative h-[500px] w-full">
        {images?.map((item, index) => (
          <div
            key={item.id || index}
            className={cn(
              'absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out',
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0',
            )}
          >
            <div className="absolute inset-0 w-full h-full bg-black/20 z-10" />
            {item.image && <Media resource={item.image} imgClassName="z-0 object-cover" fill />}
            {richText && (
              <div className="absolute bottom-[30%] lg:bottom-1/2 left-0 xl:left-48  text-white p-4 max-w-md z-20">
                <RichText className="text-2xl" data={richText} enableGutter={false} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-8 left-0 xl:-left-96 flex xl:items-center xl:justify-center container">
        <button
          onClick={goToPrevious}
          className="z-20 bg-black/80 text-white p-3 rounded-none hover:bg-black/90 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="xl:h-16 xl:w-16 h-10 w-10" />
        </button>
        <button
          onClick={goToNext}
          className=" z-20 bg-black/80 text-white p-3 rounded-none hover:bg-black/90 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="xl:h-16 xl:w-16 h-10 w-10" />
        </button>
      </div>
    </div>
  )
}
