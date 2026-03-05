import React from 'react'
import Link from 'next/link'

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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path
                fillRule='evenodd'
                d='M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z'
                clipRule='evenodd'
              />
            </svg>
            Xem Phim
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MovieInfoOverlay
