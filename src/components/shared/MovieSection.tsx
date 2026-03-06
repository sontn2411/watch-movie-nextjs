'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'

import 'swiper/css'

import { FilmItem } from '@/types/movies'
import MovieCard from './MovieCard'
import Icon from '@/components/ui/Icon'

const CARD_WIDTH = 192 // w-48 = 192px
const CARD_GAP = 20 // spaceBetween

interface MovieSectionProps {
  title: string
  slug: string
  movies: FilmItem[]
  cdnImage: string
}

const NavButton = ({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-30 w-10 h-1/2 flex items-center justify-center rounded-xl bg-black text-white shadow-lg hover:bg-black/90 hover:scale-110 transition-all duration-200 ${
      direction === 'prev' ? 'left-4' : 'right-4'
    }`}
  >
    {direction === 'prev' ? (
      <Icon name='chevron-left' className='w-4 h-4' strokeWidth={2.5} />
    ) : (
      <Icon name='chevron-right' className='w-4 h-4' strokeWidth={2.5} />
    )}
  </button>
)

const MovieSection = ({ title, slug, movies, cdnImage }: MovieSectionProps) => {
  const swiperRef = useRef<SwiperClass | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  if (!movies || movies.length === 0) return null

  const getVisibleCount = () => {
    const swiper = swiperRef.current
    if (!swiper) return 5
    return Math.floor(swiper.width / (CARD_WIDTH + CARD_GAP))
  }

  const handlePrev = () => {
    const swiper = swiperRef.current
    if (!swiper) return
    swiper.slideTo(Math.max(0, swiper.activeIndex - getVisibleCount()))
  }

  const handleNext = () => {
    const swiper = swiperRef.current
    if (!swiper) return
    swiper.slideTo(swiper.activeIndex + getVisibleCount())
  }

  return (
    <section>
      {/* Header */}
      <div className='flex items-center justify-between mb-4 px-16'>
        <h2 className='text-xl md:text-2xl font-bold text-white'>{title}</h2>
        <Link
          href={`/danh-sach/${slug}`}
          className='text-sm text-white/60 hover:text-white transition-colors duration-200'
        >
          Xem tất cả →
        </Link>
      </div>

      {/* Swiper + Navigation */}
      <div className='px-16 relative'>
        {!isBeginning && <NavButton direction='prev' onClick={handlePrev} />}
        <div className='relative pb-10 py-12 -my-12 overflow-hidden'>
          <Swiper
            slidesPerView='auto'
            spaceBetween={CARD_GAP}
            speed={500}
            onSwiper={(s) => {
              swiperRef.current = s
              setIsEnd(s.isEnd)
            }}
            onSlideChange={(s) => {
              setIsBeginning(s.isBeginning)
              setIsEnd(s.isEnd)
            }}
            className='overflow-visible!'
            style={{ overflow: 'visible' }}
          >
            {movies.map((movie) => (
              <SwiperSlide
                key={movie._id}
                className='w-48! h-auto! overflow-visible!'
              >
                <MovieCard movie={movie} cdnImage={cdnImage} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {!isEnd && <NavButton direction='next' onClick={handleNext} />}
      </div>
    </section>
  )
}

export default MovieSection
