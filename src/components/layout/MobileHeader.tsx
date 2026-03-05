'use client'

import React, { useEffect, useState } from 'react'
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

interface MobileHeaderProps {
  categories: ItemData[]
  nations: ItemData[]
}

const MobileHeader = ({ categories, nations }: MobileHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<
    'danh-sach' | 'category' | 'nation'
  >('danh-sach')

  useEffect(() => {
    if (pathname.startsWith('/the-loai')) {
      setActiveSection('category')
    } else if (pathname.startsWith('/quoc-gia')) {
      setActiveSection('nation')
    } else {
      setActiveSection('danh-sach')
    }
  }, [pathname])

  return (
    <>
      <header className='fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#06060c]/80 backdrop-blur-[20px] backdrop-saturate-150'>
        {/* Top shimmer */}
        <div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent' />

        <div className='w-full px-4 py-3 flex items-center justify-between'>
          {/* Logo */}
          <Link
            href='/'
            className='text-xl font-bold tracking-tighter text-primary'
          >
            WATCH<span className='text-white'>MOV</span>
          </Link>

          <div className='flex items-center gap-2'>
            {/* Search icon */}
            <button className='w-8 h-8 rounded-full border border-white/15 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all duration-200 bg-white/6'>
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
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </button>

            {/* Menu toggle */}
            <button
              className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all duration-200 ${isMenuOpen ? 'bg-white/12' : 'bg-white/6'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className='w-4 h-4 text-white/70'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen glass drawer */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 bg-[#04040a]/93 backdrop-blur-xl ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsMenuOpen(false)
        }}
      >
        <div
          className={`h-full flex flex-col pt-16 transition-transform duration-300 ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          {/* Tab switcher */}
          <div className='px-4 pt-4 pb-2'>
            <div className='flex rounded-xl p-1 gap-1 border border-white/10 bg-white/6'>
              {(['danh-sach', 'category', 'nation'] as const).map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer border border-transparent ${
                    activeSection === section
                      ? 'text-white shadow-sm bg-white/12 border-white/18!'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {section === 'danh-sach'
                    ? 'Danh Sách'
                    : section === 'category'
                      ? 'Thể loại'
                      : 'Quốc gia'}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className='flex-1 overflow-y-auto px-4 py-2'>
            <div className='grid grid-cols-2 gap-1'>
              {(activeSection === 'danh-sach'
                ? DANH_SACH_ITEMS
                : activeSection === 'category'
                  ? categories
                  : nations
              ).map((item) => {
                const basePathSnippet =
                  activeSection === 'danh-sach'
                    ? 'danh-sach'
                    : activeSection === 'category'
                      ? 'the-loai'
                      : 'quoc-gia'
                const href = `/${basePathSnippet}/${item.slug}`
                const isActive = pathname === href
                return (
                  <Link
                    key={item._id}
                    href={href}
                    className={`text-sm px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer truncate border ${
                      isActive
                        ? 'text-primary bg-primary/10 border-primary/20 font-semibold'
                        : 'text-white/65 hover:text-white hover:bg-white/8 border-white/6'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileHeader
