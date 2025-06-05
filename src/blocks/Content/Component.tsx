'use client'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Link } from '@/i18n/routing'
import { ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const pathname = usePathname()

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }
  return (
    <div className=" mt-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, title } = col

            return (
              <div
                className={cn(`col-span-4 space-y-6 p-10 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                  'bg-black':
                    index % 2 === 0 &&
                    pathname !== '/fr/environment' &&
                    pathname !== '/en/environment',
                })}
                key={index}
              >
                {title && (
                  <h2
                    className={cn('text-2xl font-bold font-bodoni', {
                      'text-white':
                        index % 2 === 0 &&
                        pathname !== '/fr/environment' &&
                        pathname !== '/en/environment',
                    })}
                  >
                    {title}
                  </h2>
                )}

                {pathname !== '/fr/environment' && pathname !== '/en/environment' && (
                  <div
                    className={cn('h-[3px] w-1/3 bg-black', {
                      'bg-white': index % 2 === 0,
                    })}
                  ></div>
                )}
                {richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className={cn('', {
                      'text-white':
                        index % 2 === 0 &&
                        pathname !== '/fr/environment' &&
                        pathname !== '/en/environment',
                      'text-center text-[#a59d95] lg:w-2/3':
                        pathname === '/fr/environment' || pathname === '/en/environment',
                    })}
                  />
                )}

                {enableLink && (
                  <Link
                    href={link?.url || ''}
                    className={cn('flex items-center gap-2', {
                      'invert ':
                        index % 2 === 0 &&
                        pathname !== '/fr/environment' &&
                        pathname !== '/en/environment',
                    })}
                  >
                    {link?.label || ''}
                    <ArrowRight />
                  </Link>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
