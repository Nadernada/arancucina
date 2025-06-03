import { cn } from '@/utilities/ui'
import RichText from './RichText'
import type { TwoSectionBlock as TwoSectionBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

type TextWithHeadingProp = Pick<
  NonNullable<TwoSectionBlockProps['columns']>[0],
  'heading' | 'richText' | 'link' | 'headingSize' | 'icon' | 'padding' | 'shortHeading'
> & {
  className?: string
}

export const TextWithHeading = (props: TextWithHeadingProp) => {
  const { heading, richText, link, className, headingSize, icon, padding, shortHeading } = props

  const headingSizeMap = {
    h1: 'text-h1',
    h2: 'text-h2',
    h3: 'text-h3',
    h4: 'text-h4',
  }

  return (
    <div className={cn('flex flex-col gap-10', className)}>
      <div
        className={cn('flex flex-col gap-7', {
          'py-5': headingSize === 'h4',
          'py-16': padding,
          'w-2/3': shortHeading,
        })}
      >
        <div className="flex flex-row justify-start items-center gap-8">
          <h1
            className={cn(
              'font-medium leading-[3rem] uppercase font-bodoni w-full lg:w-4/5 mx-0',
              headingSizeMap[headingSize as keyof typeof headingSizeMap],
              {
                'lg:w-2/3': shortHeading,
              },
            )}
          >
            {heading}
          </h1>
          {icon && <Media resource={icon} imgClassName="w-24 h-24 aspect-square max-w-none" />}
        </div>
        {richText && (
          <RichText data={richText} enableGutter={false} className="w-full lg:w-4/5 mx-0" />
        )}
      </div>
    </div>
  )
}
