'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Link } from '@/i18n/routing'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { cn } from '@/utilities/ui'
import { MobileHeaderNav } from './Nav/MobileHeader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import localization from '@/i18n/localization'
import { TypedLocale } from 'payload'
import { useLocale } from 'next-intl'
import Image from 'next/image'

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
      setIsScrolled(currentScrollY > 2)

      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down & past threshold - hide header
        // setIsVisible(false)
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
    <>
      <header
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isVisible || isDrawerOpen ? 'translate-y-0' : '-translate-y-full'
        } ${
          (isScrolled && !isDrawerOpen) || (pathname !== '/en' && pathname !== '/fr')
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
                  invert: (pathname !== '/en' && pathname !== '/fr') || isScrolled,
                  'invert-0': isDrawerOpen,
                })}
              />
            </Link>

            <LocaleSwitcher isScrolled={isScrolled} isDrawerOpen={isDrawerOpen} />
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
            className="fixed inset-0 bg-black/50 z-20 h-screen hidden md:block"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}
      </header>

      <MobileHeaderNav
        data={data}
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        isScrolled={isScrolled}
      />
    </>
  )
}

export function LocaleSwitcher({
  isScrolled,
  isDrawerOpen,
}: {
  isScrolled?: boolean
  isDrawerOpen?: boolean
}) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  const supportedLocales = localization.locales.map((l) => l.code)

  function onSelectChange(value: TypedLocale) {
    startTransition(() => {
      // Get the current path without the locale prefix
      const currentPath = pathname.replace(new RegExp(`^/${locale}`), '')
      // Use router.replace with the new locale
      router.replace(`/${value}${currentPath}`)
    })
  }

  return (
    <div className="md:absolute right-36 top-9">
      <Select onValueChange={onSelectChange} value={locale}>
        <SelectTrigger
          className="w-auto text-sm bg-transparent gap-2 pl-0 md:pl-3 border-none"
          isScrolled={isScrolled!}
          isNavOpen={isDrawerOpen!}
          pathname={pathname}
        >
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {localization.locales
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((locale) => (
              <SelectItem
                value={locale.code}
                key={locale.code}
                className={cn('flex flex-row gap-3 items-center text-xs', {})}
              >
                <div
                  className={cn(
                    'flex flex-row gap-3 items-center text-xs',
                    (isScrolled && !isDrawerOpen) || (pathname !== '/en' && pathname !== '/fr')
                      ? 'text-black'
                      : 'text-white',
                  )}
                >
                  <Image
                    src={`/images/icons/${locale.code}.png`}
                    width={24}
                    height={20}
                    alt={locale.label}
                  />

                  {locale.label}
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
