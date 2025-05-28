'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import type { ParallaxBlock as ParallaxBlockType } from '@/payload-types'
import { Media } from '@/components/Media'

export const ParallaxBlock: React.FC<ParallaxBlockType> = ({ image, whiteText, brownText }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Create different transform values for each layer
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={ref} className="relative h-[50vh] w-full overflow-hidden">
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
      <motion.div className="absolute inset-0 z-1" style={{ y: y2 }}>
        <Media imgClassName="object-cover z-0" resource={image} fill />
      </motion.div>

      {/* Foreground layer - moves fastest */}
      {/* <motion.div className="absolute inset-0 z-2" style={{ y: y3 }}>
        <Media imgClassName="object-cover z-0" resource={image} fill />
      </motion.div> */}
    </section>
  )
}
