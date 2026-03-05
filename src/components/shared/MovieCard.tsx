'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { FilmItem } from '@/types/movies'
import MovieHoverCard from './MovieHoverCard'

type HoverAlignment = 'left' | 'center' | 'right'

const HOVER_CARD_WIDTH = 384 // w-96

interface MovieCardProps {
  movie: FilmItem
  cdnImage: string
}

const MovieCard = ({ movie, cdnImage }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  // showCard stays true until the exit animation finishes
  const [showCard, setShowCard] = useState(false)
  const [alignment, setAlignment] = useState<HoverAlignment>('center')
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)

    // Calculate alignment BEFORE showing card to avoid viewport clipping
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const cardCenter = rect.left + rect.width / 2
      const halfCard = HOVER_CARD_WIDTH / 2

      if (cardCenter - halfCard < 0) {
        setAlignment('left') // clip on left → open to the right
      } else if (cardCenter + halfCard > window.innerWidth) {
        setAlignment('right') // clip on right → open to the left
      } else {
        setAlignment('center')
      }
    }

    hoverTimeout.current = setTimeout(() => {
      setShowCard(true)
      setIsHovered(true)
    }, 200)
  }

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setIsHovered(false)
    // showCard stays true → card stays in DOM for exit animation
  }

  return (
    <div
      ref={containerRef}
      className='relative group w-48'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/phim/${movie.slug}`} className='block relative rounded-lg'>
        {/* Poster */}
        <div className='relative w-48 h-64 bg-neutral-800 rounded-lg overflow-hidden'>
          <Image
            src={`${cdnImage}/uploads/movies/${movie.thumb_url}`}
            alt={movie.name}
            fill
            className='object-cover'
            sizes='192px'
          />

          {/* Badges */}
          <div className='absolute top-1.5 left-1.5 flex flex-col'>
            {movie.quality && (
              <div>
                <span className='px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded'>
                  {movie.quality}
                </span>
              </div>
            )}
            {movie.lang && (
              <div>
                <span className='px-1.5 py-0.5 text-[10px] font-medium bg-black/70 text-white rounded backdrop-blur-sm'>
                  {movie.lang}
                </span>
              </div>
            )}
          </div>

          {movie.episode_current && (
            <div className='absolute bottom-0 inset-x-0 px-2 py-1.5 bg-linear-to-t from-black/80 to-transparent'>
              <span className='text-[10px] font-medium text-white/90'>
                {movie.episode_current}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className='mt-2 px-1'>
          <h3 className='text-sm font-medium text-white truncate'>
            {movie.name}
          </h3>
          <p className='text-xs text-white/50 truncate'>
            {movie.origin_name} • {movie.year}
          </p>
        </div>
      </Link>

      {/* Expanded Hover Card. Kept in DOM until exit animation finishes. */}
      {showCard && (
        <MovieHoverCard
          movie={movie}
          cdnImage={cdnImage}
          alignment={alignment}
          isVisible={isHovered}
          onHidden={() => setShowCard(false)}
        />
      )}
    </div>
  )
}

export default MovieCard
