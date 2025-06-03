'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const pathname = usePathname()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Check if scrolled from top
      setIsScrolled(currentScrollY > 10)

      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down & past threshold - hide header
        setIsVisible(false)
      } else {
        // Scrolling up - show header
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isDrawerOpen])

  useEffect(() => {
    setIsDrawerOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible || isDrawerOpen ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled && !isDrawerOpen
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/20'
          : 'bg-transparent'
      }`}
      {...{ 'data-theme': 'light' }}
    >
      <div className="container z-20">
        <div className="py-8 flex justify-between">
          <Link href="/" className="z-40">
            <Logo
              loading="eager"
              priority="high"
              className={cn(' !z-40', {
                invert: pathname !== '/' || isScrolled,
                'invert-0': isDrawerOpen,
              })}
            />
          </Link>
          <HeaderNav
            data={data}
            isOpen={isDrawerOpen}
            setIsOpen={setIsDrawerOpen}
            isScrolled={isScrolled}
          />
        </div>
      </div>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 h-screen"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </header>
  )
}
