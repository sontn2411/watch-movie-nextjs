'use client'

import React, { useState, useEffect, useCallback } from 'react'

import { MovieUpdateItem } from '@/types'
import { SLIDE_DURATION } from './constants'
import HeroSlide from './HeroSlide'
import MovieInfoOverlay from './MovieInfoOverlay'
import ThumbnailIndicator from './ThumbnailIndicator'

interface HeroCarouselProps {
  movies: MovieUpdateItem[]
  cdnImage: string
}

const HeroCarousel = ({ movies, cdnImage }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1,
    )
  }, [movies.length])

  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(nextSlide, SLIDE_DURATION)
    return () => clearInterval(interval)
  }, [nextSlide, isHovered])

  if (!movies || movies.length === 0) return null

  return (
    <section
      className='relative w-full group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='bg-header absolute top-0 left-0 right-0 h-full pointer-events-none z-20' />

      {/* Slides */}
      <div className='relative w-full h-screen overflow-hidden'>
        {movies.map((movie, index) => (
          <HeroSlide
            key={movie._id}
            movie={movie}
            cdnImage={cdnImage}
            isActive={index === currentIndex}
            isPriority={index === 0}
          />
        ))}
      </div>

      {/* Movie Info Overlay */}
      <MovieInfoOverlay movie={movies[currentIndex]} />

      {/* Thumbnail Indicator */}
      <ThumbnailIndicator
        movies={movies}
        cdnImage={cdnImage}
        currentIndex={currentIndex}
        isHovered={isHovered}
        onSelect={setCurrentIndex}
      />
    </section>
  )
}

export default HeroCarousel
