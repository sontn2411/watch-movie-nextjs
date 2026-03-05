'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ItemData } from '@/types/movies'
import { SLUG_TITLES } from '@/services/movieService'

const DANH_SACH_ITEMS: ItemData[] = Object.entries(SLUG_TITLES).map(
  ([slug, name]) => ({
    _id: slug,
    name,
    slug,
  }),
)

interface DropdownMenuProps {
  label: string
  items: ItemData[]
  basePath: string
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2.5}
    className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='m19 9-7 7-7-7' />
  </svg>
)

const DropdownMenu = ({ label, items, basePath }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  const isActive = pathname.startsWith(`/${basePath}`)

  return (
    <div
      ref={ref}
      className='relative'
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button
        className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
          open || isActive
            ? 'text-white bg-white/10 border border-white/20'
            : 'text-white/70 hover:text-white border border-transparent hover:border-white/15 hover:bg-white/8'
        }`}
      >
        {label}
        <ChevronIcon open={open} />
      </button>

      {/* Dropdown — pt-2 bridges the gap so mouse can reach the panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 transition-all duration-250 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        {/* Glass panel */}
        <div
          className='relative rounded-2xl border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.4)] overflow-hidden bg-[#06060c]/82 backdrop-blur-[20px] backdrop-saturate-150'
          style={{
            minWidth: label === 'Thể loại' ? '520px' : '380px',
          }}
        >
          {/* Subtle top shimmer */}
          <div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent' />

          <div className='p-4'>
            {/* Label */}
            <p className='text-[10px] font-bold uppercase tracking-[0.18em] text-white/35 mb-3 px-1'>
              {label}
            </p>

            {/* Grid */}
            <div
              className={`grid gap-0.5 ${label === 'Thể loại' ? 'grid-cols-4' : 'grid-cols-3'}`}
            >
              {items.map((item) => {
                const href = `/${basePath}/${item.slug}`
                const isItemActive = pathname === href
                return (
                  <Link
                    key={item._id}
                    href={href}
                    className={`text-[13px] px-2.5 py-2 rounded-lg transition-all duration-150 truncate cursor-pointer ${
                      isItemActive
                        ? 'text-primary bg-primary/10 font-semibold'
                        : 'text-white/65 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Subtle bottom shimmer */}
          <div className='absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent' />
        </div>
      </div>
    </div>
  )
}

interface DesktopHeaderProps {
  categories: ItemData[]
  nations: ItemData[]
}

const DesktopHeader = ({ categories, nations }: DesktopHeaderProps) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className='fixed top-0 left-0 right-0 z-50'>
      {/* Glass bar */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? 'shadow-[0_4px_24px_rgba(0,0,0,0.4)] bg-[#06060c]/82 backdrop-blur-[20px] backdrop-saturate-150'
            : 'bg-linear-to-b from-black/75 to-transparent'
        }`}
      >
        <div className='w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5'>
          {/* Logo */}
          <Link
            href='/'
            className='text-2xl font-bold tracking-tighter text-primary shrink-0'
          >
            WATCH<span className='text-white'>MOV</span>
          </Link>

          {/* Nav */}
          <nav className='hidden md:flex items-center gap-1'>
            <DropdownMenu
              label='Danh Sách'
              items={DANH_SACH_ITEMS}
              basePath='danh-sach'
            />
            <DropdownMenu
              label='Thể loại'
              items={categories}
              basePath='the-loai'
            />
            <DropdownMenu
              label='Quốc gia'
              items={nations}
              basePath='quoc-gia'
            />
          </nav>

          {/* Right actions */}
          <div className='flex items-center gap-3'>
            {/* Search — glass pill */}
            <div className='relative hidden sm:block'>
              <input
                type='text'
                placeholder='Tìm phim...'
                className='w-48 lg:w-64 py-1.5 pl-9 pr-4 text-sm text-white placeholder-white/40 rounded-full border border-white/15 outline-none focus:w-72 focus:border-white/30 transition-all duration-300 bg-white/[0.07] backdrop-blur-md'
              />
              <svg
                className='absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>

            {/* Avatar button — glass circle */}
            <button className='w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/10 transition-all duration-200 cursor-pointer bg-white/[0.07] backdrop-blur-md'>
              <svg
                className='w-4 h-4 text-white/70'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DesktopHeader
