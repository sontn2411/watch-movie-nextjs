'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

import { MovieUpdateItem } from '@/types'
import { SLIDE_DURATION, THUMB_WIDTH, THUMB_GAP } from './constants'

interface ThumbnailIndicatorProps {
  movies: MovieUpdateItem[]
  cdnImage: string
  currentIndex: number
  isHovered: boolean
  onSelect: (index: number) => void
}

const ThumbnailIndicator = ({
  movies,
  cdnImage,
  currentIndex,
  isHovered,
  onSelect,
}: ThumbnailIndicatorProps) => {
  const [translateX, setTranslateX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll active thumbnail into view without calling setState in the effect body
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const containerWidth = container.clientWidth
    const padding = 16

    const activeLeft = currentIndex * (THUMB_WIDTH + THUMB_GAP)
    const activeRight = activeLeft + THUMB_WIDTH

    setTranslateX((prev) => {
      const visibleLeft = -prev
      const visibleRight = -prev + containerWidth - padding * 2
      if (activeRight > visibleRight || activeLeft < visibleLeft) {
        return -activeLeft
      }
      return prev
    })
  }, [currentIndex])

  return (
    <>
      <div
        ref={containerRef}
        className='absolute -bottom-1 right-0 left-0 z-20 w-full px-4 py-4 overflow-x-hidden'
      >
        <div
          className='flex items-center gap-3 transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {movies.map((movie, index) => (
            <button
              key={movie._id}
              onClick={() => onSelect(index)}
              className={`relative shrink-0 transition-all duration-300 w-48 h-64 rounded-lg overflow-hidden border-2 ${
                index === currentIndex
                  ? 'border-white scale-110 shadow-lg shadow-black/50'
                  : 'border-transparent hover:border-white/50 opacity-80 hover:opacity-100'
              }`}
            >
              <Image
                src={`${cdnImage}${movie.poster_url || movie.thumb_url}`}
                alt={movie.name}
                fill
                className='object-cover'
              />
              {index === currentIndex && (
                <div className='absolute bottom-0 left-0 right-0 h-1 bg-black/30'>
                  <div
                    key={currentIndex}
                    className='h-full bg-white'
                    style={{
                      animation: isHovered
                        ? 'none'
                        : `progressFill ${SLIDE_DURATION}ms linear forwards`,
                    }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </>
  )
}

export default ThumbnailIndicator
