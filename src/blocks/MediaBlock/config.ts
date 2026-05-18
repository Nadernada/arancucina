import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'videoThumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Video Thumbnail',
      admin: {
        description: 'Poster image shown before the video is played',
      },
    },
    {
      name: 'showPlayButton',
      type: 'checkbox',
      label: 'Show Play Button',
      defaultValue: false,
    },
    {
      name: 'noContainer',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
