import type { HeadingBlock as HeadingBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const HeadingBlock: React.FC<HeadingBlockType> = ({ title, text, size }) => {
  return (
    <div
      className={cn(
        'w-full heading-bg flex flex-col justify-center items-center containe px-16 py-8 gap-4 mt-16',
        {
          'pb-32': size === 'loose',
        },
      )}
    >
      <h1 className="text-5xl font-bodoni font-normal text-white">{title}</h1>
      {text && <p className="text-white">{text}</p>}
    </div>
  )
}
