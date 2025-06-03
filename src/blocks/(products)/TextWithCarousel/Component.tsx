import type { TextWithCarousel as TextWithCarouselType } from '@/payload-types'
import ElegantCarousel from '@/components/(products)/Carousel'

export const TextWithCarousel: React.FC<TextWithCarouselType> = ({
  blackText,
  brownText,
  description,
  images,
  reversed,
}) => {
  return (
    <div className="container grid grid-cols-2">
      {blackText && brownText && !reversed && (
        <div className="flex flex-col gap-4 justify-center">
          <h2 className="text-black font-bodoni uppercase text-4xl ">
            {blackText || ''}
            {blackText && brownText && <br />}
            <span className="text-[#A59D95]">{brownText || ''}</span>
          </h2>

          <p className=" text-lg">{description || ''}</p>
        </div>
      )}
      <div className="w-full">
        <ElegantCarousel slides={images} />
      </div>
      {reversed && (
        <div className="flex flex-col gap-4 justify-center">
          <h2 className="text-black font-bodoni uppercase text-4xl ">
            {blackText || ''}
            {blackText && brownText && <br />}
            <span className="text-[#A59D95]">{brownText || ''}</span>
          </h2>

          <p className=" text-lg">{description || ''}</p>
        </div>
      )}
    </div>
  )
}
