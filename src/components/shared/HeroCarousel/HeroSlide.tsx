import React from 'react'
import Image from 'next/image'

import { MovieUpdateItem } from '@/types'

interface HeroSlideProps {
  movie: MovieUpdateItem
  cdnImage: string
  isActive: boolean
  isPriority: boolean
}

const HeroSlide = ({
  movie,
  cdnImage,
  isActive,
  isPriority,
}: HeroSlideProps) => {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      <div className='absolute inset-0'>
        <Image
          src={`${cdnImage}${movie.poster_url}`}
          alt={movie.name}
          fill
          priority={isPriority}
          className='object-cover'
        />
      </div>
    </div>
  )
}

export default HeroSlide
