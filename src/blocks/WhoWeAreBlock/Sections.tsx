'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const Sections = () => {
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([])
  const t = useTranslations('WhoWeAreBlock')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      parallaxRefs.current.forEach((ref, index) => {
        if (ref) {
          const speed = 0.15 + index * 0.03
          if (typeof window !== 'undefined') {
            if (window.innerWidth > 1024) {
              ref.style.transform = `translateY(${(scrollY * speed) / 2}px)`
            }
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-24 justify-center items-center container">
      <div className="flex flex-row justify-center items-center gap-12">
        <div className="flex flex-col justify-start gap-6 items-center lg:items-end">
          <h1 className="uppercase text-4xl font-bodoni lg:w-4/5">
            100% <span className="text-[#A59D95]">Made in Italy</span>
          </h1>

          <p className="text-[#A59D95] lg:w-4/5 text-center lg:text-left">
            {t('company-description')}
          </p>
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex flex-col w-full h-full justify-center items-center"
          ref={(el) => {
            parallaxRefs.current[0] = el
          }}
        >
          <Image
            src="/images/131_z_lh-bg-banner-full2.jpg"
            alt="whoWeAre"
            width={506}
            height={506}
            className="w-full h-full scale-150"
          />
        </div>
      </div>

      <div className="overflow-hidden hidden lg:block">
        <div
          className="flex flex-col w-full h-full justify-center items-center"
          ref={(el) => {
            parallaxRefs.current[1] = el
          }}
        >
          <Image
            src="/images/132_z_Aran-chi-siamo-2.jpg"
            alt="whoWeAre"
            width={506}
            height={506}
            className="w-full h-full scale-150"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-12">
        <div className="flex flex-col justify-start gap-6 items-center lg:items-start">
          <h1 className="uppercase text-4xl text-[#A59D95] font-bodoni lg:w-3/5 text-center lg:text-left">
            {t('a-fascinating-history')}
            <span className="text-black">{t('story')}</span>
          </h1>

          <p className="text-[#A59D95] lg:w-4/5 text-center lg:text-left">{t('company-history')}</p>
        </div>
      </div>

      <div className="overflow-hidden block lg:hidden">
        <div
          className="flex flex-col w-full h-full justify-center items-center"
          ref={(el) => {
            parallaxRefs.current[1] = el
          }}
        >
          <Image
            src="/images/132_z_Aran-chi-siamo-2.jpg"
            alt="whoWeAre"
            width={506}
            height={506}
            className="w-full h-full scale-150"
          />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-12">
        <div className="flex flex-col justify-start gap-6 items-center lg:items-start">
          <h1 className="uppercase text-4xl font-bodoni lg:w-3/5 text-center lg:text-left">
            {t('the-excellence')}
            <span className="text-[#A59D95]">{t('of-italian-know-how')}</span>
          </h1>

          <p className="text-[#A59D95] lg:w-4/5 text-center lg:text-left">{t('know-how-text')}</p>
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex flex-col w-full h-full justify-center items-center"
          ref={(el) => {
            parallaxRefs.current[2] = el
          }}
        >
          <Image
            src="/images/133_z_lh-bg-banner-full4.jpg"
            alt="whoWeAre"
            width={506}
            height={506}
            className="w-full h-full scale-[1.4]"
          />
        </div>
      </div>
      <div className="overflow-hidden hidden lg:block">
        <div
          className="flex flex-col w-full h-full justify-center items-center"
          ref={(el) => {
            parallaxRefs.current[3] = el
          }}
        >
          <Image
            src="/images/134_z_lh-bg-banner-full5.jpg"
            alt="whoWeAre"
            width={506}
            height={506}
            className="w-full h-full scale-[1.4]"
          />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-12">
        <div className="flex flex-col justify-start gap-6 items-center lg:items-start">
          <h1 className="uppercase text-4xl font-bodoni lg:w-3/5 text-center lg:text-left">
            {t('our-strength')} <span className="text-[#A59D95]">{t('is-human-value')}</span>
          </h1>

          <p className="text-[#A59D95] lg:w-4/5 text-center lg:text-left">{t('strength-text')}</p>
        </div>
      </div>
      <div className="overflow-hidden block lg:hidden">
        <div
          className="flex flex-col w-full h-full justify-center items-center"
          ref={(el) => {
            parallaxRefs.current[3] = el
          }}
        >
          <Image
            src="/images/134_z_lh-bg-banner-full5.jpg"
            alt="whoWeAre"
            width={506}
            height={506}
            className="w-full h-full scale-[1.4]"
          />
        </div>
      </div>
    </div>
  )
}
