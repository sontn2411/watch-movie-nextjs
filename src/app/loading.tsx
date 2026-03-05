import React from 'react'

export default function Loading() {
  // Mock 4 movie sections
  const mockSections = Array.from({ length: 4 })
  // Mock 5-6 cards per section
  const mockCards = Array.from({ length: 6 })

  return (
    <div className='flex flex-col w-full min-h-screen pb-12 bg-neutral-950'>
      {/* --- HERO CAROUSEL SKELETON --- */}
      <section className='relative w-full h-screen bg-neutral-900 animate-pulse overflow-hidden'>
        {/* Background gradient overlay */}
        <div className='absolute inset-0 z-10 pointer-events-none'>
          <div className='absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent' />

          {/* Dummy Movie Info Overlay */}
          <div className='absolute bottom-[35%] left-0 px-8 md:px-16 pointer-events-auto max-w-2xl w-full'>
            {/* Title Skeleton */}
            <div className='h-14 md:h-20 bg-neutral-800 rounded-lg w-3/4 mb-4' />
            {/* Subtitle Skeleton */}
            <div className='h-6 bg-neutral-800 rounded-md w-1/2 mb-2' />
            {/* Year Skeleton */}
            <div className='h-4 bg-neutral-800 rounded-md w-16 mb-8' />

            {/* Play Button Skeleton */}
            <div className='h-12 w-40 bg-neutral-200 rounded-lg' />
          </div>
        </div>

        {/* Dummy Thumbnail Indicator */}
        <div className='absolute -bottom-1 right-0 left-0 z-20 w-full px-4 py-4 overflow-hidden'>
          <div className='flex items-center gap-3'>
            {/* 4 Thumbnails */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className='shrink-0 w-48 h-64 bg-neutral-800 rounded-lg border-2 border-transparent'
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- MOVIE SECTIONS SKELETON --- */}
      <div className='flex flex-col gap-10 mt-8'>
        {mockSections.map((_, sectionIndex) => (
          <section
            key={sectionIndex}
            className='px-4 md:px-8 lg:px-16 animate-pulse'
          >
            {/* Section Header */}
            <div className='flex items-center justify-between mb-4'>
              {/* Title Skeleton */}
              <div className='h-8 bg-neutral-800 rounded-lg w-48' />
              {/* "Xem tat ca" link Skeleton */}
              <div className='h-4 bg-neutral-800 rounded-md w-24' />
            </div>

            {/* Horizontal Cards */}
            <div className='flex gap-5 overflow-hidden pb-4'>
              {mockCards.map((__, cardIndex) => (
                <div key={cardIndex} className='shrink-0 w-48'>
                  {/* Poster Skeleton */}
                  <div className='w-full h-64 bg-neutral-800 rounded-lg mb-2' />
                  {/* Info Skeletons */}
                  <div className='h-4 bg-neutral-800 rounded-md w-3/4 mb-1' />
                  <div className='h-3 bg-neutral-800 rounded-md w-1/2' />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
