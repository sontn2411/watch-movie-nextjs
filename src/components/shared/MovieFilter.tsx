'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { ItemData } from '@/types/movies'

interface MovieFilterProps {
  categories: ItemData[]
  nations: ItemData[]
  slug: string
  hideCategory?: boolean
}

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 25 }, (_, i) => currentYear - i)

export default function MovieFilter({
  categories,
  nations,
  slug,
  hideCategory = false,
}: MovieFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  const activeCategory = searchParams.get('category') || ''
  const activeCountry = searchParams.get('country') || ''
  const activeYear = searchParams.get('year') || ''

  const hasFilters = activeCategory || activeCountry || activeYear

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (params.get(key) === value) {
        params.delete(key)
      } else {
        params.set(key, value)
      }

      params.delete('page')

      startTransition(() => {
        router.push(`/danh-sach/${slug}?${params.toString()}`)
      })
    },
    [searchParams, slug, router],
  )

  const clearAll = useCallback(() => {
    startTransition(() => {
      router.push(`/danh-sach/${slug}`)
    })
    setIsOpen(false)
  }, [slug, router])

  const renderFilterContent = () => (
    <>
      {!hideCategory && (
        <>
          <FilterRow label='Thể loại'>
            {categories.map((item) => (
              <Chip
                key={item._id}
                label={item.name}
                active={item.slug === activeCategory}
                onClick={() => updateFilter('category', item.slug)}
              />
            ))}
          </FilterRow>
          <div className='h-px bg-white/6' />
        </>
      )}

      <FilterRow label='Quốc gia'>
        {nations.map((item) => (
          <Chip
            key={item._id}
            label={item.name}
            active={item.slug === activeCountry}
            onClick={() => updateFilter('country', item.slug)}
          />
        ))}
      </FilterRow>

      <div className='h-px bg-white/6' />

      <FilterRow label='Năm'>
        {YEARS.map((year) => (
          <Chip
            key={year}
            label={String(year)}
            active={String(year) === activeYear}
            onClick={() => updateFilter('year', String(year))}
          />
        ))}
      </FilterRow>
    </>
  )

  return (
    <div className='mb-8 relative'>
      {/* ---------------- FILTER TRIGGER ---------------- */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium transition-colors ${
              isOpen
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'bg-white/5 border-white/10 text-white/90 hover:bg-white/10'
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M3 6h18' />
              <path d='M7 12h10' />
              <path d='M10 18h4' />
            </svg>
            Bộ lọc{' '}
            {hasFilters && (
              <span className='w-2 h-2 rounded-full bg-primary ml-1' />
            )}
          </button>

          {hasFilters && (
            <button
              onClick={clearAll}
              className='hidden md:block text-sm text-white/40 hover:text-white/80 transition-colors duration-200 cursor-pointer'
            >
              Xoá tất cả
            </button>
          )}
        </div>

        {isPending && (
          <div className='flex items-center gap-2 text-xs text-white/40'>
            <div className='w-4 h-4 border-2 border-white/20 border-t-primary rounded-full animate-spin' />
            <span className='hidden md:inline'>Đang tải...</span>
          </div>
        )}
      </div>

      {/* ---------------- DESKTOP GLASS CARD ---------------- */}
      <div
        className={`hidden md:block transition-all duration-300 ease-in-out origin-top overflow-hidden ${
          isOpen
            ? 'opacity-100 max-h-[1000px] mt-4'
            : 'opacity-0 max-h-0 pointer-events-none'
        }`}
      >
        <div className='rounded-2xl bg-white/3 border border-white/8 backdrop-blur-xl overflow-hidden'>
          {renderFilterContent()}
        </div>
      </div>

      {/* ---------------- MOBILE DRAWER OVERLAY ---------------- */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className='absolute inset-0 bg-black/60 backdrop-blur-sm'
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute bottom-0 left-0 right-0 max-h-[85vh] flex flex-col bg-[#0f111a] border-t border-white/10 rounded-t-3xl transition-transform duration-300 ease-out ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {/* Handle */}
          <div className='flex justify-center pt-3 pb-1'>
            <div className='w-12 h-1.5 rounded-full bg-white/20' />
          </div>

          <div className='flex items-center justify-between px-5 pb-3 border-b border-white/5'>
            <h3 className='text-lg font-bold text-white'>Lọc Phim</h3>
            {hasFilters && (
              <button
                onClick={clearAll}
                className='text-xs font-medium text-primary hover:text-primary/80 transition-colors'
              >
                Xóa lọc
              </button>
            )}
          </div>

          {/* Scrollable Filters */}
          <div className='overflow-y-auto pb-8 pt-2 custom-scrollbar'>
            {renderFilterContent()}
          </div>

          {/* Close / Apply Action Area */}
          <div className='p-4 border-t border-white/5 bg-white/5'>
            <button
              onClick={() => setIsOpen(false)}
              className='w-full py-3.5 rounded-xl bg-primary text-white font-bold tracking-wide hover:opacity-90 transition-opacity flex justify-center items-center gap-2'
            >
              {isPending ? (
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
              ) : (
                'Áp Dụng & Đóng'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col md:flex-row md:items-start gap-3 md:gap-4 px-5 py-4'>
      <span className='text-xs font-semibold text-white/50 uppercase tracking-wider md:pt-1.5 shrink-0 md:w-20'>
        {label}
      </span>
      <div className='flex flex-wrap gap-2'>{children}</div>
    </div>
  )
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
        active
          ? 'bg-primary text-white shadow-[0_2px_8px_-2px_var(--primary)]'
          : 'text-white/60 hover:text-white hover:bg-white/10 bg-white/5 md:bg-transparent border border-white/5 md:border-transparent'
      }`}
    >
      {label}
    </button>
  )
}
