import type { MapBlock as MapBlockProps } from '@/payload-types'

export const MapBlock: React.FC<MapBlockProps> = () => {
  return (
    <div className="w-full h-[550px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3661.8211246910973!2d13.988049!3d42.628018000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1331a3683f29794f%3A0xfa4bf1ce9e62666a!2sARAN%20World%20Headquarters%20-%20SITO%2003!5e1!3m2!1sit!2sit!4v1748611663320!5m2!1sit!2sit"
        width={600}
        height={550}
        style={{ border: '0' }}
        className="w-full"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}
