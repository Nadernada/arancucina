import { EmblaOptionsType } from 'embla-carousel'
import type { Carousel as CarouselType } from '@/payload-types'
import EmblaCarousel from '@/components/(products)/EmblaCarousel'

export const Carousel: React.FC<CarouselType> = async ({ images, arrows, dots, slidesPerView }) => {
  const options: EmblaOptionsType = { loop: true, align: 'center' }

  return (
    <div className="">
      <EmblaCarousel
        slides={images}
        options={options}
        arrows={arrows}
        dots={dots}
        slidesPerView={slidesPerView}
      />
    </div>
  )
}
