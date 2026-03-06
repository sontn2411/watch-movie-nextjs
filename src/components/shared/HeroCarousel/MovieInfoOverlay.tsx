import React from 'react'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'

import { MovieUpdateItem } from '@/types'

interface MovieInfoOverlayProps {
  movie: MovieUpdateItem
}

const MovieInfoOverlay = ({ movie }: MovieInfoOverlayProps) => {
  return (
    <div className='absolute inset-0 z-15 pointer-events-none'>
      {/* Left gradient background */}
      <div className='absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent' />

      {/* Content */}
      <div className='absolute bottom-[35%] left-0 px-8 md:px-16 pointer-events-auto max-w-2xl'>
        <h1 className='text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg'>
          {movie.name}
        </h1>
        <p className='text-lg md:text-xl text-white/80 mb-1 drop-shadow-md'>
          {movie.origin_name}
        </p>
        <span className='inline-block text-sm text-white/60 mb-6'>
          {movie.year}
        </span>

        <div className='flex items-center gap-4'>
          <Link
            href={`/phim/${movie.slug}`}
            className='flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg'
          >
            <Icon name='play' className='w-6 h-6' />
            Xem Phim
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MovieInfoOverlay
