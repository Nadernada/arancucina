'use client'

import type React from 'react'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Media } from '@/payload-types'

export default function Carousel({
  slides: carouselImages,
}: {
  slides:
    | { image?: string | Media | null | undefined; id?: string | null | undefined }[]
    | null
    | undefined
}) {
  const [translateX, setTranslateX] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startTranslateX, setStartTranslateX] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const itemsPerView = 1
  const maxTranslateX = 0
  const minTranslateX = carouselImages
    ? -((carouselImages.length - itemsPerView) * (100 / itemsPerView))
    : 0

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setHasDragged(false)
    setStartX(e.clientX)
    setStartTranslateX(translateX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const deltaX = e.clientX - startX

    // Mark as dragged if moved more than 5 pixels
    if (Math.abs(deltaX) > 5) {
      setHasDragged(true)
    }

    const newTranslateX = startTranslateX + (deltaX / (carouselRef.current?.offsetWidth || 1)) * 100
    setTranslateX(Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateX)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      setIsDragging(true)
      setHasDragged(false)
      setStartX(e.touches[0].clientX)
      setStartTranslateX(translateX)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      if (!isDragging) return

      const deltaX = e.touches[0].clientX - (startX ?? 0)

      // Mark as dragged if moved more than 5 pixels
      if (Math.abs(deltaX) > 5) {
        setHasDragged(true)
      }

      const newTranslateX =
        startTranslateX + (deltaX / (carouselRef.current?.offsetWidth || 1)) * 100
      setTranslateX(Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateX)))
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

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
    if (lightboxImage !== null && carouselImages) {
      setLightboxImage((lightboxImage + 1) % carouselImages.length)
    }
  }

  const prevLightboxImage = () => {
    if (lightboxImage !== null && carouselImages) {
      setLightboxImage((lightboxImage - 1 + carouselImages.length) % carouselImages.length)
    }
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()

      const deltaX = e.clientX - startX

      // Mark as dragged if moved more than 5 pixels
      if (Math.abs(deltaX) > 5) {
        setHasDragged(true)
      }

      const newTranslateX =
        startTranslateX + (deltaX / (carouselRef.current?.offsetWidth || 1)) * 100
      setTranslateX(Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateX)))
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, startX, startTranslateX, minTranslateX, maxTranslateX])

  // Calculate progress for the indicator
  const progress = Math.abs(translateX / minTranslateX) * 100

  return (
    <>
      <div className="relative w-full bg-white">
        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Images Grid */}
          <div
            ref={carouselRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex gap-6"
              style={{
                transform: `translateX(${translateX}%)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
              }}
            >
              {carouselImages?.map((image, index) => (
                <div
                  key={image.id}
                  className="flex-shrink-0 w-[calc(100%-10rem)] relative group cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={(image.image as Media)?.url || '/placeholder.svg'}
                      alt={(image.image as Media)?.alt || ''}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                      draggable={false}
                    />
                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-7xl mx-auto px-6 mt-8">
          <div className="w-full h-1 bg-gray-200  overflow-hidden relative">
            <div
              className="absolute h-full w-32 bg-gray-800 rounded-full"
              style={{
                left: `calc(${progress}% - ${(progress / 100) * 128}px)`,
                transition: isDragging ? 'none' : 'left 0.3s ease-out',
              }}
            />
          </div>
        </div>
      </div>

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
              src={(carouselImages?.[lightboxImage]?.image as Media)?.url || '/placeholder.svg'}
              alt={(carouselImages?.[lightboxImage]?.image as Media)?.alt || ''}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {lightboxImage + 1} / {carouselImages?.length}
          </div>
        </div>
      )}
    </>
  )
}
