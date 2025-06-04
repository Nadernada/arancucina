import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import Image from 'next/image'
import { Media } from '@/payload-types'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white flex flex-col justify-center items-center py-8">
      <div className="container py-8 gap-8 flex flex-col lg:flex-row md:justify-between">
        <div className="flex flex-col justify-center items-start gap-6">
          <Link className="flex items-center" href="/">
            <Logo className="w-[19rem] h-20 max-w-none aspect-auto" />
          </Link>

          <div className="flex flex-row justify-center items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-white hover:underline hover:opacity-90 transition-all duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              className="text-white hover:underline hover:opacity-90 transition-all duration-300"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start md:flex-row gap-4 md:items-center">
          <div className="flex flex-col justify-center items-start gap-7">
            <div className="flex flex-col justify-center items-start gap-6">
              <p className="text-white uppercase">Contacts</p>

              <div className="flex flex-col justify-center items-start gap-1">
                <p className="text-white">ARAN World srl Unipersonale</p>
                <p className="text-white max-w-[20rem]">
                  RABAT-Agdal, 457, Avenue Hassan II, Résidence Mariam, Magasin n° 11
                </p>
                <p className="text-white">01444880676</p>
              </div>
            </div>

            <Link
              className="bg-transparent text-white py-1 px-8 rounded-full border border-white text-sm hover:bg-white hover:text-black transition-all duration-300"
              href="https://reservedarea.aranworld.it/Sud2/login/view/index.php"
              target="_blank"
            >
              Reserved area
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start gap-7">
          <div className="flex flex-col justify-between items-start gap-7">
            <p className="text-white uppercase">Follow Us</p>

            <div className="grid grid-cols-3 gap-y-4 gap-x-10">
              {footerData?.socials?.map(({ link, icon }, i) => {
                return (
                  <Link
                    href={link?.url || ''}
                    key={i}
                    className="hover:scale-110 transition-all duration-300"
                  >
                    <Image
                      src={(icon as Media)?.url || ''}
                      width={24}
                      height={24}
                      alt={(icon as Media)?.alt || ''}
                      className="invert"
                    />
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col justify-center items-start gap-7">
            <p className="text-white uppercase">Catalogues</p>
            <button className="bg-transparent text-white py-1 px-8 rounded-full border border-white text-sm hover:bg-white hover:text-black transition-all duration-300">
              Download the catalog
            </button>
          </div>
        </div>
      </div>
      <p className="text-white">
        © {new Date().getFullYear()} Copyright, all rights reserved. Powered by Hyperbold
      </p>
    </footer>
  )
}
