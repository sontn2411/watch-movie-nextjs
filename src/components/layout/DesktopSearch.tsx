'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/components/ui/Icon'
import { useSearch } from '@/hooks/useSearch'
import SearchItem from '@/components/shared/SearchItem'

export default function DesktopSearch() {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    debouncedSearch,
  } = useSearch(5)
  const [showResults, setShowResults] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (debouncedSearch.trim().length > 1) {
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }, [debouncedSearch])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className='relative hidden sm:block' ref={searchRef}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            searchQuery.trim().length > 1 && setShowResults(true)
            setIsFocused(true)
          }}
          onBlur={() => setIsFocused(false)}
          placeholder='Tìm phim...'
          className='w-48 lg:w-64 py-1.5 pl-9 pr-4 text-sm text-white placeholder-white/40 rounded-full border border-white/15 outline-none focus:border-primary focus:w-72 transition-all duration-300 bg-white/[0.07] backdrop-blur-md'
        />
        <Icon
          name='search'
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-colors duration-300 pointer-events-none ${
            isFocused ? 'text-primary' : 'text-white/40'
          }`}
          strokeWidth={2}
        />
        {isLoading && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2'>
            <Icon
              name='loader'
              className='w-3 h-3 text-white/40 animate-spin'
            />
          </div>
        )}
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className='absolute top-full right-0 mt-2 w-80 lg:w-96 p-2 rounded-2xl border border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.4)] bg-[#06060c]/90 backdrop-blur-[20px] overflow-hidden z-50'>
          <div className='max-h-[70vh] overflow-y-auto no-scrollbar'>
            {searchResults.length > 0 ? (
              <div className='flex flex-col gap-1'>
                <div className='px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35'>
                  Kết quả tìm kiếm
                </div>
                {searchResults.map((movie) => (
                  <SearchItem
                    key={movie._id}
                    movie={movie}
                    onClick={() => setShowResults(false)}
                  />
                ))}
                <button
                  onClick={() => {
                    router.push(
                      `/tim-kiem?keyword=${encodeURIComponent(searchQuery)}`,
                    )
                    setShowResults(false)
                  }}
                  className='mt-1 w-full py-2.5 px-4 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all border border-white/5 hover:border-white/15'
                >
                  Xem tất cả kết quả
                </button>
              </div>
            ) : (
              <div className='p-6 text-center italic text-white/40 text-sm'>
                Không tìm thấy phim phù hợp...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
