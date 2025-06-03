import React from 'react'
import type { ProductIntroBlock as ProductIntroBlockType } from '@/payload-types'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

export const ProductIntroBlock: React.FC<ProductIntroBlockType> = ({
  title,
  description,
  catalogue,
  store,
  materials,
  dimensions,
  finishes,
  type,
}) => {
  return (
    <div
      className={cn('flex flex-row justify-between items-center gap-10 p-16 bg-white container', {
        'flex-col items-start': finishes || dimensions,
      })}
    >
      <div
        className={cn('flex flex-col items-start gap-8 w-1/2', {
          'w-full gap-4': finishes || dimensions || (!materials && !store && !catalogue),
        })}
      >
        {type && <p className="text-[#A59D95] text-base uppercase">{type}</p>}
        <h1 className="font-bodoni text-black text-3xl">{title}</h1>
        <p
          className={cn('font-thin text-gray-500', {
            'w-full': finishes || dimensions || (!materials && !store && !catalogue),
            'w-2/3': !(finishes || dimensions || (!materials && !store && !catalogue)),
          })}
        >
          {description}
        </p>
      </div>

      <div
        className={cn('flex flex-col gap-6 justify-center items-start w-1/2', {
          'flex-row justify-between': finishes || dimensions,
        })}
      >
        {catalogue && (
          <button className="flex flex-row justify-center items-center gap-4">
            <Image src="/images/icons/scarica-catalogo.png" alt="catalogo" width={40} height={40} />
            <p>Download the catalogue</p>
          </button>
        )}
        {store && (
          <button className="flex flex-row justify-center items-center gap-4">
            <Image src="/images/icons/punto-vendita.png" alt="catalogo" width={40} height={40} />
            <p>Store</p>
          </button>
        )}
        {materials && (
          <a href="#materials" className="flex flex-row justify-center items-center gap-4">
            <Image src="/images/icons/materiali.png" alt="catalogo" width={40} height={40} />
            <p>Materials</p>
          </a>
        )}
        {finishes && (
          <a href="#finishes" className="flex flex-row justify-center items-center gap-4">
            <Image src="/images/icons/materiali.png" alt="catalogo" width={40} height={40} />
            <p>Finishes</p>
          </a>
        )}
        {dimensions && (
          <a href="#dimensions" className="flex flex-row justify-center items-center gap-4">
            <Image src="/images/icons/size.png" alt="catalogo" width={40} height={40} />
            <p>Dimensions</p>
          </a>
        )}
      </div>
    </div>
  )
}
