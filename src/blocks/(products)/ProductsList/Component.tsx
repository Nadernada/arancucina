import React from 'react'
import type { ProductsList as ProductsListType } from '@/payload-types'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const ProductsList: React.FC<ProductsListType> = ({ products }) => {
  return (
    <div className="flex flex-col gap-16 justify-center items-center my-16">
      {products.map((product) => {
        if (typeof product === 'string') return null
        return (
          <Link
            href={`/products/${product.slug}`}
            key={product.id}
            className="w-full h-[50vh] relative flex flex-col justify-end items-end container p-0 group"
          >
            <div className="w-[90%] bg-black px-16 py-6 translate-y-5 flex justify-start items-center z-[4]">
              <h2 className="text-3xl font-bodoni font-normal text-white">{product.title}</h2>
            </div>
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Media
                imgClassName="object-cover z-0 group-hover:scale-110 transition-all duration-300"
                resource={product.mainImage}
                fill
              />
            </div>
            <div className="inset-0 absolute z-[3] bg-black opacity-0 group-hover:opacity-30 transition-all duration-300 m-3"></div>
          </Link>
        )
      })}
    </div>
  )
}
