import type { OurValuesBlock as OurValuesBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import Image from 'next/image'

export const OurValuesBlock: React.FC<OurValuesBlockType> = ({ content }) => {
  return (
    <div className="container flex flex-row justify-between px-16 gap-10 items-center">
      {content?.map((item, i) => {
        return (
          <div key={i} className="flex flex-row justify-between items-center gap-12 w-[50%]">
            <div className="flex flex-col justify-center items-start gap-6">
              <h1 className="text-3xl font-bodoni uppercase">{item.title}</h1>
              <p>{item.text}</p>
              <Image src="/images/See-More_Line.png" alt="long-arrow" width={56} height={24} />
            </div>
            <Media resource={item.image} imgClassName="w aspect-square max-w-none" />
          </div>
        )
      })}
    </div>
  )
}
