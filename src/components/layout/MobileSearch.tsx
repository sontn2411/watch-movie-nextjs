'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import { useSearch } from '@/hooks/useSearch'
import SearchItem from '@/components/shared/SearchItem'

export default function MobileSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    debouncedSearch,
  } = useSearch(5)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setIsSearchOpen(false)
  }, [pathname])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleNavigateToSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/tim-kiem?keyword=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className='w-8 h-8 rounded-full border border-white/15 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all duration-200 bg-white/6'
      >
        <Icon name='search' className='w-4 h-4 text-white/70' strokeWidth={2} />
      </button>

      {/* Search Overlay */}
      <div
        className={`fixed inset-0 z-60 bg-[#04040a]/95 backdrop-blur-2xl transition-all duration-300 ${
          isSearchOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className='flex flex-col h-full'>
          <div className='p-4 border-b border-white/10 flex items-center gap-3'>
            <form onSubmit={handleSearchSubmit} className='flex-1 relative'>
              <input
                autoFocus={isSearchOpen}
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder='Tìm phim...'
                className='w-full py-2.5 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-primary/50 transition-all'
              />
              <Icon
                name='search'
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                  isFocused ? 'text-primary' : 'text-white/40'
                }`}
              />
              {isLoading && (
                <div className='absolute right-3.5 top-1/2 -translate-y-1/2'>
                  <Icon
                    name='loader'
                    className='w-4 h-4 text-white/40 animate-spin'
                  />
                </div>
              )}
            </form>
            <button
              onClick={() => setIsSearchOpen(false)}
              className='text-white/60 font-medium'
            >
              Hủy
            </button>
          </div>

          <div className='flex-1 overflow-y-auto p-4 no-scrollbar'>
            {searchQuery.trim().length > 1 ? (
              <div className='space-y-4'>
                <div className='text-[10px] font-bold uppercase tracking-widest text-white/30'>
                  Kết quả nhanh
                </div>
                {searchResults.length > 0 ? (
                  <>
                    <div className='flex flex-col gap-2'>
                      {searchResults.map((movie) => (
                        <SearchItem
                          key={movie._id}
                          movie={movie}
                          onClick={() => setIsSearchOpen(false)}
                        />
                      ))}
                    </div>
                    <button
                      onClick={handleNavigateToSearch}
                      className='w-full py-4 text-sm font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-2xl'
                    >
                      Xem tất cả kết quả
                    </button>
                  </>
                ) : (
                  !isLoading && (
                    <div className='py-20 text-center text-white/30 italic text-sm'>
                      Không tìm thấy kết quả...
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className='py-20 text-center'>
                <Icon
                  name='search'
                  className='w-12 h-12 text-white/5 mx-auto mb-4'
                  strokeWidth={1}
                />
                <p className='text-white/20 text-sm font-medium'>
                  Tìm kiếm những bộ phim yêu thích của bạn
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
