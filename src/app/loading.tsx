'use client'

import React from 'react'

export default function Loading() {
  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-[#06060c] animate-in fade-in duration-500'>
      {/* Background Orbs */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-50' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] mix-blend-screen opacity-50' />

      <div className='relative flex flex-col items-center gap-8'>
        {/* Logo Section */}
        <div className='flex flex-col items-center'>
          <div className='text-4xl md:text-5xl font-bold tracking-tighter animate-pulse-slow'>
            <span className='text-primary'>WATCH</span>
            <span className='text-white'>MOV</span>
          </div>
          <div
            className='mt-2 h-0.5 w-12 bg-primary rounded-full animate-shimmer'
            style={{
              backgroundImage:
                'linear-gradient(90deg, transparent, white, transparent)',
              backgroundSize: '200% 100%',
            }}
          />
        </div>

        {/* Loader Spinner */}
        <div className='relative w-16 h-16'>
          {/* Inner ring */}
          <div className='absolute inset-0 rounded-full border-2 border-white/5' />
          {/* Animated segment */}
          <div className='absolute inset-0 rounded-full border-t-2 border-r-2 border-primary animate-[spin_2s_linear_infinite]' />

          {/* Subtle Glow */}
          <div className='absolute inset-0 rounded-full bg-primary/10 blur-xl animate-pulse' />
        </div>

        {/* Text */}
        <p className='text-white/40 text-sm font-medium tracking-[0.2em] uppercase animate-pulse'>
          Đang tải trải nghiệm...
        </p>
      </div>
    </div>
  )
}
