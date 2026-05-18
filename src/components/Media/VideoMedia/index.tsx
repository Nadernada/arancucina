'use client'

import { cn } from '@/utilities/ui'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import type { Props as MediaProps } from '../types'
import type { Media as MediaType } from '@/payload-types'

import { getClientSideURL } from '@/utilities/getURL'
import RichText from '@/components/RichText'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName, videoThumbnail, showPlayButton } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(!showPlayButton)

  const mediaResource = resource && typeof resource === 'object' ? resource : null

  const thumbnail =
    videoThumbnail && typeof videoThumbnail === 'object' ? (videoThumbnail as MediaType) : null
  const posterURL = thumbnail?.url ? `${getClientSideURL()}${thumbnail.url}` : undefined

  const caption = mediaResource?.caption

  const handlePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    } else {
      video.play()
      setIsPlaying(true)
    }

    onClick?.()
  }, [isPlaying, onClick])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onEnded = () => setIsPlaying(false)
    video.addEventListener('ended', onEnded)
    return () => video.removeEventListener('ended', onEnded)
  }, [])

  if (mediaResource) {
    const { filename } = mediaResource

    return (
      <div
        className={cn('relative w-full h-full', showPlayButton && 'cursor-pointer group')}
        onClick={showPlayButton ? handlePlay : undefined}
      >
        <video
          className={cn('w-full h-full object-cover', videoClassName)}
          autoPlay={!showPlayButton}
          controls={false}
          loop
          muted
          playsInline
          ref={videoRef}
          poster={posterURL}
        >
          <source src={`${getClientSideURL()}/api/media/file/${filename}`} />
        </video>

        {/* Play button overlay */}
        {showPlayButton && (
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
              isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100',
            )}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/90 transition-colors duration-200 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 md:w-10 md:h-10 text-black ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Caption overlay */}
        {caption && !isPlaying && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 md:px-6 md:py-5 w-full flex items-center justify-center">
            <RichText
              data={caption}
              enableGutter={false}
              className="text-white text-sm md:text-lg [&_p]:text-white [&_p]:font-semibold [&_p]:m-0"
            />
          </div>
        )}
      </div>
    )
  }

  return null
}
