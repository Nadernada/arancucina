'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Media as MediaComponent } from '@/components/Media'
import type { TabsBlock, Media } from '@/payload-types'

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
  const [itemsPerView, setItemsPerView] = useState(4)
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
        setItemsPerView(4)
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
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1))
  }

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0))
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
  const slideTransform = `translateX(-${currentIndex * (100 / itemsPerView)}%)`

  // Open lightbox
  const openLightbox = (material: Material) => {
    setSelectedMaterial(material)
  }

  // Close lightbox
  const closeLightbox = () => {
    setSelectedMaterial(null)
  }

  // Calculate number of pages for pagination dots
  const totalPages = Math.ceil(totalSlides / itemsPerView)
  const currentPage = Math.floor(currentIndex / itemsPerView)

  return (
    <div className="relative">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 z-10 h-full rounded-none opacity-70 hover:opacity-100 hover:bg-gray-100/50"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-8 w-8" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <div ref={containerRef} className="w-full overflow-hidden px-10">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              width: `${(totalSlides / itemsPerView) * 100}%`,
              transform: slideTransform,
            }}
          >
            {materials.map((material, index) => (
              <div
                key={material.id}
                className="cursor-pointer"
                style={{ width: `${100 / totalSlides}%` }}
                onClick={() => openLightbox(material)}
              >
                <div className="flex flex-col items-center gap-2 mx-2 relative aspect-square">
                  <MediaComponent imgClassName="object-cover z-0" resource={material.image} fill />
                  {material.image && (
                    <div className="w-full aspect-square rounded-sm shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      <MediaComponent imgClassName="object-cover" resource={material.image} fill />
                    </div>
                  )}
                  <p className="text-center mt-2 text-gray-700">{material.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 z-10 h-full rounded-none opacity-70 hover:opacity-100 hover:bg-gray-100/50"
          onClick={nextSlide}
        >
          <ChevronRight className="h-8 w-8" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      {/* Pagination dots */}
      {totalSlides > itemsPerView && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-gray-700' : 'bg-gray-300'}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={!!selectedMaterial} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="sm:max-w-lg">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 z-10"
              onClick={closeLightbox}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>

            {selectedMaterial && (
              <div className="flex flex-col items-center">
                {selectedMaterial.image && (
                  <div className="w-full aspect-square rounded-md shadow-md overflow-hidden">
                    <MediaComponent
                      imgClassName="object-cover"
                      resource={selectedMaterial.image}
                      fill
                    />
                  </div>
                )}
                {selectedMaterial.title && (
                  <h3 className="text-xl font-medium mt-4">{selectedMaterial.title}</h3>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
