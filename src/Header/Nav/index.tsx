'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Media } from '@/components/Media'
import { X } from 'lucide-react'

export const HeaderNav: React.FC<{
  data: HeaderType
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  isScrolled: boolean
}> = ({ data, isOpen, setIsOpen, isScrolled }) => {
  const navItems = data?.navItems || []
  const path = usePathname()

  return (
    <div className="z-30">
      {' '}
      {/* Add relative here */}
      <button className="absolute top-12 right-24 z-40" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <X
            width={24}
            height={24}
            className={cn('w-5 text-black transition-all duration-300', {})}
          />
        ) : (
          <Image
            src="/images/hamMenu.svg"
            alt="Search"
            width={24}
            height={24}
            className={cn('w-5 text-primary transition-all duration-300', {
              'invert ': !isScrolled && !isOpen,
              'invert-0': isScrolled || isOpen,
            })}
          />
        )}
      </button>
      <nav
        className={cn(
          'flex flex-col h-screen w-fit py-12 bg-white absolute top-0 gap-12 items-center justify-center transition-all duration-300 overflow-visible ',
          {
            '-right-0': isOpen,
            '-right-full': !isOpen,
          },
        )}
      >
        <div className="flex-1 flex flex-col justify-center items-center">
          {navItems.map(({ link, sublinks }, i) => {
            return (
              <div key={i} className="group z-20 py-6 w-full ">
                {' '}
                {/* Add relative here */}
                <CMSLink
                  key={i}
                  {...link}
                  appearance="link"
                  className={cn('text-md hover:text-black  px-16', {
                    'text-black': path === link.url,
                    'text-gray-500': path !== link.url,
                  })}
                />
                {sublinks && sublinks?.length > 0 && (
                  <div className="absolute h-screen w-full hidden  group-hover:right-full right-0 top-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:flex flex-col justify-center items-end gap-6 bg-black text-white  z-0 p-16">
                    {sublinks?.map(({ link, types }, j) => (
                      <div
                        key={j}
                        className="group/sublink flex flex-col justify-center items-end" // Add relative here
                      >
                        <CMSLink
                          {...link}
                          appearance="link"
                          className={cn('text-base hover:text-white whitespace-nowrap block mb-1', {
                            'text-white': path === link.url,
                            'text-gray-300': path !== link.url,
                          })}
                        />
                        {types && types.length > 0 && (
                          <div
                            className="
                               opacity-0 
                              group-hover/sublink:opacity-100
                              transition-all duration-300 ease-in-out 
                              mt-2 invisible group-hover/sublink:visible pl-4 h-0 group-hover/sublink:h-auto flex flex-col justify-center items-end !static
                            "
                          >
                            {types.map((type, k) => {
                              return (
                                <div key={k} className="group/sublink-link">
                                  {' '}
                                  {/* Add key and relative here */}
                                  <CMSLink
                                    {...type.link}
                                    appearance="link"
                                    className={cn(
                                      'text-xs hover:text-white whitespace-nowrap block mb-1 w-full stati',
                                      {
                                        'text-gray-500': path === type.link.url,
                                        'text-gray-300': path !== type.link.url,
                                      },
                                    )}
                                  />
                                  <div
                                    className="absolute top-0 right-0 group-hover/sublink-link:right-full"
                                    style={{ position: 'absolute' }}
                                  >
                                    <div className=" h-screen w-[30vw] hidden relative right-0 top-0 opacity-0 group-hover/sublink-link:opacity-100 transition-all duration-300 group-hover/sublink-link:flex flex-col justify-end items-start gap-6 bg-black text-white  z-0 p-12">
                                      <Media
                                        resource={type.image}
                                        imgClassName="object-cover "
                                        fill
                                      />
                                      <div className="fixed inset-0 bg-black/50 z-20 h-full w-full" />
                                      <p className="text-2xl font-bodoni text-white z-50">
                                        {type.link.label}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
