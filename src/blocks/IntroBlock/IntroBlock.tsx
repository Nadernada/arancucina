import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const IntroBlock = () => {
  const t = useTranslations('IntroBlock')
  return (
    <div className="container flex flex-col gap-20 p-4 md:p-10 xl:p-16 items-center justify-center relative">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-7 relative">
        <p className="w-full lg:w-1/2 xl:w-2/5 mx-0 z-10 order-2 md:order-1">{t('text')}</p>
        <h1 className="font-medium text-h1 leading-[3rem] uppercase font-bodoni w-full lg:w-2/5 xl:w-2/5 mx-0 z-10 order-1 md:order-2">
          <span className="text-maroon">{t('italian-beauty')}</span>: {t('rooted-in-design')}
        </h1>
        <div className="h-[2px] w-40 bg-black absolute -bottom-10 right-0 z-10"></div>
      </div>
      <Image
        src="/images/back-a2.png"
        alt="Aran World"
        width={500}
        height={500}
        className="absolute bottom-0 right-0 z-0 w-screen"
      />
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-7 relative">
        <h1 className="font-medium text-h1 leading-[3rem] uppercase font-bodoni w-full lg:w-2/5 mx-0 z-10">
          {t('step-into')}: {t('discover-our-collections')}
        </h1>
        <p className="w-full lg:w-1/2 xl:w-2/5 mx-0 z-10">{t('text2')}</p>
        <div className="h-[2px] w-40 bg-black absolute -bottom-5 -left-16 z-10"></div>
      </div>
      {/* <Image
        src="/images/back-a2.png"
        alt="Aran World"
        width={500}
        height={500}
        className="absolute bottom-0 left-0 rotate-180 z-0 w-screen"
      /> */}
    </div>
  )
}
