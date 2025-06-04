import { cn } from '@/utilities/ui'
import { Media } from './Media'
import type { TwoSectionBlock as TwoSectionBlockProps } from '@/payload-types'

type MediaBoxProps = Pick<NonNullable<TwoSectionBlockProps['columns']>[0], 'media'> & {
  className?: string
}

export const MediaBox: React.FC<MediaBoxProps> = ({ media, className }) => {
  return (
    <div className={cn('w-full h-[20rem] lg:h-full relative rounded-sm aspect-video', className)}>
      <Media fill imgClassName="rounded-sm object-cover" priority resource={media} />
    </div>
  )
}
