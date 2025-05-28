import React from 'react'
import type { WhoWeAre as WhoWeAreBlockType } from '@/payload-types'
import Image from 'next/image'

export const WhoWeAreBlock: React.FC<WhoWeAreBlockType> = ({ title }) => {
  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-24 justify-center items-center container">
      <div className="flex flex-row justify-center items-center gap-12">
        <div className="flex flex-col justify-start gap-6 items-end">
          <h1 className="uppercase text-4xl font-bodoni w-4/5">
            100% <span className="text-[#A59D95]">Made in Italy</span>
          </h1>

          <p className="text-[#A59D95] w-4/5">
            The company is now a solid and well-known reality. Attention to design, constant
            research on the quality of materials, study, comparison, always accepting the challenge,
            reliability and functionality are all included in each project and this makes each
            product an innovative result that combines the tradition of Made in Italy with
            technology.
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full h-full justify-center items-center">
        <Image
          src="/images/131_z_lh-bg-banner-full2.jpg"
          alt="whoWeAre"
          width={506}
          height={506}
          className="w-full h-full"
        />
      </div>

      <div className="flex flex-col w-full h-full justify-center items-center">
        <Image
          src="/images/132_z_Aran-chi-siamo-2.jpg"
          alt="whoWeAre"
          width={506}
          height={506}
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-12">
        <div className="flex flex-col justify-start gap-6 items-start">
          <h1 className="uppercase text-4xl text-[#A59D95] font-bodoni w-3/5">
            A fascinating <span className="text-black">story</span>
          </h1>

          <p className="text-[#A59D95] w-4/5">
            The creation and development of the ARAN Cucine brand is really fascinating. The
            protagonist Renzo Rastelli is a self-made man. He started taking care of kitchens when
            he was 20 years old and everybody knew him as a footballer. Rastelli founded Newform
            Cucine and his vocation was from the beginning to conquer the foreign market. His career
            progression was extremely fast: in the early 2000s Rastelli took a leading role in the
            ARAN Cucine business and the success came from the brilliant idea of the flatpack which
            makes it possible to load in one single container more than 40 kitchens. Right from the
            beginning, whilst mantaining the production department in the area of Zona Industriale
            di Atri, in Abruzzi, the attitude was global.
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-12">
        <div className="flex flex-col justify-start gap-6 items-end">
          <h1 className="uppercase text-4xl font-bodoni w-4/5">
            The excellence <span className="text-[#A59D95]">of italian Know-How</span>
          </h1>

          <p className="text-[#A59D95] w-4/5">
            High-quality craftsmanship school, avant-garde technology and innovative design are the
            symbol of a tradition that has always belonged to our land. Italian know-how is a
            precious talent, an inheritance, that we cultivate everyday with extreme passion. For
            us, designing a kitchen is not just manufacturing furniture but creating a space where
            people can experience unique motions with their family and friends.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full h-full justify-center items-center">
        <Image
          src="/images/133_z_lh-bg-banner-full4.jpg"
          alt="whoWeAre"
          width={506}
          height={506}
          className="w-full h-full"
        />
      </div>

      <div className="flex flex-col w-full h-full justify-center items-center">
        <Image
          src="/images/134_z_lh-bg-banner-full5.jpg"
          alt="whoWeAre"
          width={506}
          height={506}
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-12">
        <div className="flex flex-col justify-start gap-6 items-start">
          <h1 className="uppercase text-4xl font-bodoni w-3/5">
            Our Strength <span className="text-[#A59D95]">is human value</span>
          </h1>

          <p className="text-[#A59D95] w-4/5">
            The set of values of ARAN Cucine brand is solid, well structured and recognisable.
            Attention o the real needs of families from all over the world, first of all. A strong
            inclination toward empathy to identify with customers and their needs through a varied,
            attractive and colourful offer. Company vision consist in dreaming that ARAN kitchen
            might bring moments of happiness in world homes, giving experience of conviviality in an
            ambience close to your needs and even more beautiful.
          </p>
        </div>
      </div>
    </div>
  )
}
