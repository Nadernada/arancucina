import Image from 'next/image'

export const IntroBlock = () => {
  return (
    <div className="container flex flex-col gap-20 p-4 md:p-10 lg:p-16 items-center justify-center relative">
      <div className="flex flex-row items-center justify-between w-full gap-7 relative">
        <p className="w-full lg:w-2/5 mx-0 z-10">
          Every day, ARAN Cucine creates elegant and functional spaces shaped around the pace of
          everyday life. The kitchen becomes the heart of the home, a place where relationships grow
          and memories take form. Design and tradition; authenticity, talent and passion. These are
          the values behind the quality that defines ARAN Cucine around the world. Our kitchens are
          not simply built. They are crafted with intention, shaped by Italian expertise, and made
          to bring meaning to the way people live.
        </p>
        <h1 className="font-medium text-h1 leading-[3rem] uppercase font-bodoni w-full lg:w-2/5 mx-0 z-10">
          <span className="text-maroon">ITALIAN BEAUTY:</span> ROOTED IN DESIGN, GUIDED BY RESEARCH,
          INSPIRED BY PASSION.
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
      <div className="flex flex-row items-center justify-between w-full gap-7 relative">
        <h1 className="font-medium text-h1 leading-[3rem] uppercase font-bodoni w-full lg:w-2/5 mx-0 z-10">
          STEP INTO ARAN WORLD: DISCOVER OUR COLLECTIONS
        </h1>
        <p className="w-full lg:w-2/5 mx-0 z-10">
          The exclusive ability to reinterpret spaces is revealed through a unique and dedicated
          style, to furnish every environment with extreme sartorial care and attention to every
          detail, from the kitchen to the living area, including the wardrobes in the sleeping area
          and the bathroom accessories. A perfect research that makes each product a real element of
          interior architecture.
        </p>
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
