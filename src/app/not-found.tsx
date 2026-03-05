'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className='min-h-[calc(100vh-80px)] flex items-center justify-center p-6 relative overflow-hidden bg-[#06060c]'>
      {/* 
        ========================================
        Interactive Ambient Background Orbs
        ======================================== 
      */}
      <div
        className='absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full mix-blend-screen opacity-20 pointer-events-none transition-transform duration-700 ease-out'
        style={{
          background:
            'radial-gradient(circle, var(--primary) 0%, transparent 60%)',
          filter: 'blur(80px)',
          transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
        }}
      />
      <div
        className='absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full mix-blend-screen opacity-20 pointer-events-none transition-transform duration-1000 ease-out'
        style={{
          background: 'radial-gradient(circle, #a855f7 0%, transparent 60%)',
          filter: 'blur(60px)',
          transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)`,
        }}
      />

      {/* Floating cute space objects */}
      <div
        className='absolute top-[15%] left-[15%] w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-bounce pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.1)]'
        style={{
          animationDuration: '4s',
          transform: `translate(${mousePosition.x * 1.2}px, ${mousePosition.y * 1.2}px)`,
        }}
      />
      <div
        className='absolute bottom-[20%] right-[15%] w-16 h-16 rotate-45 bg-linear-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-md rounded-2xl animate-bounce pointer-events-none shadow-[0_0_20px_rgba(255,255,255,0.05)]'
        style={{
          animationDuration: '6s',
          animationDelay: '1s',
          transform: `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * -0.8}px)`,
        }}
      />
      <div
        className='absolute top-[30%] right-[25%] w-6 h-6 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm animate-pulse pointer-events-none'
        style={{
          animationDuration: '3s',
          animationDelay: '0.5s',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      />

      {/* 
        ========================================
        Glassmorphism Card with 3D floating effect
        ======================================== 
      */}
      <div
        className='relative z-10 max-w-lg w-full rounded-[3rem] p-10 md:p-14 text-center flex flex-col items-center overflow-hidden transition-transform duration-500 ease-out'
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * -0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
        }}
      >
        {/* Deep layered glass effect */}
        <div className='absolute inset-0 bg-white/4 backdrop-blur-[32px] border border-white/10 rounded-[3rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] pointer-events-none' />

        {/* Subtle noise texture overlay for realism */}
        <div
          className='absolute inset-0 opacity-[0.015] pointer-events-none'
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className='relative z-20 flex flex-col items-center w-full'>
          {/* Cute Ghost SVG */}
          <div className='relative mb-10 group cursor-pointer'>
            <div className='absolute inset-0 bg-primary/30 blur-2xl rounded-full transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-125 group-hover:bg-primary/50' />
            <div
              className='relative z-10 animate-bounce'
              style={{ animationDuration: '4s' }}
            >
              <svg
                className='w-32 h-32 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-110'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                {/* Custom Cute Character Component */}
                <path
                  d='M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z'
                  className='text-white/90 fill-white/10'
                />

                {/* Wide cute eyes */}
                <circle cx='8.5' cy='11.5' r='1.5' fill='white' stroke='none' />
                <circle
                  cx='15.5'
                  cy='11.5'
                  r='1.5'
                  fill='white'
                  stroke='none'
                />

                {/* Sparkle traces */}
                <path
                  d='M4 4l1.5 1.5M19 4l-1.5 1.5M2 10h1M21 10h1'
                  stroke='rgba(255,255,255,0.5)'
                  strokeWidth='1'
                />

                {/* Cute blush marks */}
                <ellipse
                  cx='6'
                  cy='13'
                  rx='1.5'
                  ry='1.2'
                  fill='var(--primary)'
                  fillOpacity='0.6'
                  stroke='none'
                />
                <ellipse
                  cx='18'
                  cy='13'
                  rx='1.5'
                  ry='1.2'
                  fill='var(--primary)'
                  fillOpacity='0.6'
                  stroke='none'
                />

                {/* Little mouth detail */}
                <path
                  d='M11 14q1 1 2 0'
                  stroke='white'
                  strokeWidth='1'
                  fill='none'
                />
              </svg>
            </div>
          </div>

          <div className='relative'>
            {/* Massive 404 Text */}
            <h1
              className='text-7xl md:text-9xl font-black mb-1 tracking-tighter text-transparent bg-clip-text drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.4) 50%, var(--primary) 100%)',
              }}
            >
              404
            </h1>
            <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-primary/40 blur-[10px] rounded-full' />
          </div>

          <h2 className='text-2xl md:text-3xl font-bold text-white mt-6 mb-3 tracking-tight'>
            Ui da! Lạc đường rồi...
          </h2>

          <p className='text-white/60 text-base mb-10 max-w-xs mx-auto leading-relaxed'>
            Có vẻ như trang bạn đang tìm kiếm đã cất cánh bay vào vũ trụ hoặc
            không còn tồn tại nữa.
          </p>

          <Link
            href='/'
            className='group w-full max-w-[260px] relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_var(--primary)] active:scale-[0.98] cursor-pointer ring-1 ring-white/10'
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#fff',
            }}
          >
            {/* Glow sweep effect on button */}
            <div className='absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none' />

            <span className='relative z-10 flex items-center gap-2.5 text-[15px]'>
              <svg
                className='w-5 h-5 text-primary group-hover:-translate-x-1 transition-transform duration-300'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='m15 18-6-6 6-6' />
              </svg>
              Tàu Không Gian Về Nhà
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
