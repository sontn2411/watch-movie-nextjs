import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { FilmItem } from '@/types/movies'

type HoverAlignment = 'left' | 'center' | 'right'

interface MovieHoverCardProps {
  movie: FilmItem
  cdnImage: string
  alignment?: HoverAlignment
  isVisible?: boolean
  onHidden?: () => void
}

// Map alignment to Tailwind position + transform-origin
const alignmentConfig: Record<
  HoverAlignment,
  { posClass: string; originClass: string }
> = {
  left: { posClass: 'left-0', originClass: 'origin-top-left' },
  center: {
    posClass: 'left-1/2 -translate-x-1/2',
    originClass: 'origin-top',
  },
  right: { posClass: 'right-0', originClass: 'origin-top-right' },
}

const MovieHoverCard = ({
  movie,
  cdnImage,
  alignment = 'center',
  isVisible = true,
  onHidden,
}: MovieHoverCardProps) => {
  // 'visible' drives the CSS transition classes
  const [visible, setVisible] = useState(false)
  const { posClass, originClass } = alignmentConfig[alignment]

  const { category, lang, quality, time, type } = movie

  // Enter: tiny delay so DOM renders hidden state before transition starts
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  // Exit: defer setVisible to avoid calling setState synchronously in an effect
  useEffect(() => {
    if (isVisible) return
    const t = setTimeout(() => setVisible(false), 0)
    return () => clearTimeout(t)
  }, [isVisible])

  // After the CSS transition ends, notify the parent to unmount
  const handleTransitionEnd = () => {
    if (!visible && onHidden) {
      onHidden()
    }
  }

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      style={{
        background:
          'linear-gradient(160deg, #1e1b2e 0%, #18181b 55%, #0f1923 100%)',
      }}
      className={`absolute z-50 w-96 h-auto min-h-[350px] -top-[30px] rounded-2xl shadow-2xl overflow-hidden pointer-events-auto transition-all duration-300 ${posClass} ${originClass} ${
        visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}
    >
      {/* Ambient accent glow */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-600/10 blur-2xl' />
        <div className='absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-blue-600/10 blur-2xl' />
      </div>
      <Link
        href={`/phim/${movie.slug}`}
        className='block w-full h-full cursor-pointer'
      >
        {/* Top Image + Gradient Background */}
        <div className='relative w-full h-52' style={{ background: '#1e1b2e' }}>
          <Image
            src={`${cdnImage}/uploads/movies/${movie.poster_url}`}
            alt={movie.name}
            fill
            className='object-cover object-top'
            sizes='240px'
          />
          {/* Blend image into the dark gradient card background */}
          <div
            className='absolute inset-0 pointer-events-none'
            style={{
              background:
                'linear-gradient(to top, #18181b 0%, #18181b40 40%, transparent 100%)',
            }}
          />
        </div>

        {/* Content Section */}
        <div className='px-4 pb-4 -mt-6 relative z-10'>
          {/* Title */}
          <h3 className='text-base font-bold text-white leading-snug mb-2.5 drop-shadow-md line-clamp-2'>
            {movie.name}
          </h3>

          {/* Row 1: Badges — quality · type · lang */}
          <div className='flex items-center flex-wrap gap-1.5 mb-2'>
            {quality && (
              <span className='text-[11px] font-semibold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-1.5 py-0.5 rounded-sm'>
                {quality}
              </span>
            )}
            {type && (
              <span className='text-[11px] font-medium text-sky-300 bg-sky-400/15 border border-sky-400/25 px-1.5 py-0.5 rounded-sm uppercase'>
                {type === 'series' ? 'Bộ' : type === 'single' ? 'Lẻ' : type}
              </span>
            )}
            {lang && (
              <span className='text-[11px] font-medium text-violet-300 bg-violet-500/15 border border-violet-400/25 px-1.5 py-0.5 rounded-sm'>
                {lang}
              </span>
            )}
            <span className='text-[11px] text-white/50 bg-white/10 px-1.5 py-0.5 rounded-sm'>
              {movie.episode_current || 'Full'}
            </span>
          </div>

          {/* Row 2: Time · Year */}
          <div className='flex items-center gap-2 mb-2.5 text-[11px] text-white/50'>
            {time && (
              <>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={1.8}
                  className='w-3 h-3 shrink-0'
                >
                  <circle cx='12' cy='12' r='10' />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 6v6l3.5 3.5'
                  />
                </svg>
                <span>{time}</span>
                <span className='text-white/25'>·</span>
              </>
            )}
            <span>{movie.year}</span>
          </div>

          {/* Row 3: Categories */}
          {category && category.length > 0 && (
            <div className='flex items-center flex-wrap gap-1.5 mb-3'>
              {category.slice(0, 4).map((cat) => (
                <span
                  key={cat.id}
                  className='text-[11px] text-white/60 bg-white/8 border border-white/10 px-1.5 py-0.5 rounded-sm hover:text-white/90 transition-colors'
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className='border-t border-white/8 mb-3' />

          {/* Action Buttons */}
          <div className='flex items-center gap-2'>
            {/* Play Button - full width with label */}
            <button className='flex-1 h-9 rounded-full bg-white flex items-center justify-center gap-1.5 hover:bg-gray-200 transition-colors'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='black'
                className='w-4 h-4 ml-0.5 shrink-0'
              >
                <path
                  fillRule='evenodd'
                  d='M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-[13px] font-semibold text-black'>
                Xem ngay
              </span>
            </button>
            {/* Add Button - fixed size */}
            <button className='w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors shrink-0'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='white'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 4.5v15m7.5-7.5h-15'
                />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MovieHoverCard
