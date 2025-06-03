'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Media as MediaComponent } from '@/components/Media'
import type { TabsBlock, Media } from '@/payload-types'
import { cn } from '@/utilities/ui'
import Image from 'next/image'

interface Material {
  id?: string
  title?: string
  image?: Media | null
}

interface MaterialCarouselProps {
  materials: Material[]
}

export default function MaterialCarousel({ materials }: MaterialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(8)
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<number | null>(null)

  // Update items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 768) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3)
      } else {
        setItemsPerView(8)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate total number of slides
  const totalSlides = materials.length

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  // Calculate visible items with circular logic
  const getVisibleItems = () => {
    const items = []
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % totalSlides
      items.push(materials[index])
    }
    return items
  }

  // Calculate transform position for sliding effect
  const slideTransform = `translateX(-${currentIndex * (100 / (totalSlides / itemsPerView))}%)`

  useEffect(() => {
    const maxIndex = Math.max(0, materials.length - itemsPerView)
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [itemsPerView, materials.length, currentIndex])

  const maxIndex = Math.max(0, Math.floor(totalSlides / itemsPerView))

  // Calculate number of pages for pagination dots
  const totalPages = Math.ceil(totalSlides / itemsPerView)
  const currentPage = Math.floor(currentIndex / itemsPerView)

  const goToPage = (pageIndex: number) => {
    const newIndex = Math.min(pageIndex * itemsPerView, maxIndex)
    setCurrentIndex(newIndex)
  }

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < maxIndex

  const handleImageClick = (index: number) => {
    // Only open lightbox if we haven't dragged
    setLightboxImage(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxImage(null)
  }

  const nextLightboxImage = () => {
    if (lightboxImage !== null && materials) {
      setLightboxImage((lightboxImage + 1) % materials.length)
    }
  }

  const prevLightboxImage = () => {
    if (lightboxImage !== null && materials) {
      setLightboxImage((lightboxImage - 1 + materials.length) % materials.length)
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center">
        {totalSlides > itemsPerView && (
          <Button
            variant="ghost"
            size="icon"
            className=" left-0 z-10 h-full rounded-none opacity-70 hover:opacity-100 hover:bg-gray-100/50"
            onClick={prevSlide}
            disabled={!canGoPrev}
          >
            <ChevronLeft className="h-8 w-8" />
            <span className="sr-only">Previous slide</span>
          </Button>
        )}

        <div
          ref={containerRef}
          className={cn('w-full overflow-hidden ', totalSlides > itemsPerView && 'px-0')}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out w-fit"
            style={{
              width: `fit-content`,
              transform: slideTransform,
            }}
          >
            {materials.map((material, index) => (
              <div
                key={material.id}
                className="cursor-pointer"
                style={{ width: `${100 / totalSlides}%` }}
                onClick={() => handleImageClick(index)}
              >
                <div className="flex flex-col items-center gap-2 mx-2 aspect-square">
                  {material.image && (
                    <div className="relative w-32 h-32 aspect-square shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      <MediaComponent imgClassName="object-cover" resource={material.image} fill />
                    </div>
                  )}
                  <p className="text-center mt-2 text-gray-700">{material.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalSlides > itemsPerView && (
          <Button
            variant="ghost"
            size="icon"
            className=" right-0 z-10 h-full rounded-none opacity-70 hover:opacity-100 hover:bg-gray-100/50"
            onClick={nextSlide}
            disabled={!canGoNext}
          >
            <ChevronRight className="h-8 w-8" />
            <span className="sr-only">Next slide</span>
          </Button>
        )}
      </div>

      {/* Pagination dots */}
      {totalSlides > itemsPerView && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-gray-700' : 'bg-gray-300'}`}
              onClick={() => goToPage(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
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
              src={(materials?.[lightboxImage]?.image as Media)?.url || '/placeholder.svg'}
              alt={(materials?.[lightboxImage]?.image as Media)?.alt || ''}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {lightboxImage + 1} / {materials?.length}
          </div>
        </div>
      )}
    </div>
  )
}
