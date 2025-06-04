'use client'

import React, { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import type { Media, ParallaxBlock as ParallaxBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const ParallaxBlock: React.FC<ParallaxBlockType> = ({
  image,
  whiteText,
  brownText,
  size,
  noParallax,
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Create different transform values for each layer
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={ref}
      className={cn('relative w-full overflow-hidden', {
        ' h-[70vh]': size === 'large',
        ' h-[30vh]': size === 'small',
        ' h-[40vh]': size === 'medium',
      })}
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className=" text-center px-4">
          <h2 className="text-white font-bodoni uppercase text-4xl">
            {whiteText || ''}
            {whiteText && brownText && <br />}
            <span className="text-[#A59D95]">{brownText || ''}</span>
          </h2>
        </div>
      </div>

      {/* Background layer - moves slowest */}
      {/* <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
        <Media imgClassName="object-cover z-0" resource={image} fill />
      </motion.div> */}

      {/* Middle layer - moves at medium speed */}
      <div
        className={cn('absolute inset-0 bg-cover bg-no-repeat  z-0', {
          'bg-fixed ': !noParallax,
        })}
        style={{
          backgroundImage: `url('${(image as Media)?.url}')`,
          height: '100%',
          width: '100%',
          backgroundPosition: 'center',
        }}
      />

      {/* Foreground layer - moves fastest */}
      {/* <motion.div className="absolute inset-0 z-2" style={{ y: y3 }}>
        <Media imgClassName="object-cover z-0" resource={image} fill />
      </motion.div> */}
    </section>
  )
}
