import React from 'react'
import type { ProductIntroBlock as ProductIntroBlockType } from '@/payload-types'
import Image from 'next/image'

export const ProductIntroBlock: React.FC<ProductIntroBlockType> = ({
  title,
  description,
  catalogue,
  store,
  materials,
}) => {
  return (
    <div className="flex flex-row justify-between items-center p-16 bg-white container">
      <div className="flex flex-col items-start gap-8 w-1/2">
        <h1 className="font-bodoni text-black text-3xl">{title}</h1>
        <p className="w-2/3">{description}</p>
      </div>

      <div className="flex flex-col gap-6 justify-center items-start w-1/2">
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
      </div>
    </div>
  )
}
