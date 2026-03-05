'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface PaginationProps {
  currentPage: number
  totalPages: number
  slug: string
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | '...')[] = [1]

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) pages.push('...')

  pages.push(total)

  return pages
}

const ChevronLeft = () => (
  <svg
    className='w-4 h-4'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='m15 18-6-6 6-6' />
  </svg>
)

const ChevronRight = () => (
  <svg
    className='w-4 h-4'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='m9 18 6-6-6-6' />
  </svg>
)

const BTN_ACTIVE =
  'w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer'
const BTN_DISABLED =
  'w-10 h-10 rounded-xl flex items-center justify-center text-white/20 border border-white/5'

export default function Pagination({
  currentPage,
  totalPages,
  slug,
}: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages)
  const searchParams = useSearchParams()

  const getPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    return `/danh-sach/${slug}?${params.toString()}`
  }

  return (
    <nav className='mt-12 flex items-center justify-center gap-1.5'>
      {/* Prev */}
      {currentPage > 1 ? (
        <Link href={getPageLink(currentPage - 1)} className={BTN_ACTIVE}>
          <ChevronLeft />
        </Link>
      ) : (
        <div className={BTN_DISABLED}>
          <ChevronLeft />
        </div>
      )}

      {/* Page Numbers */}
      {pages.map((p, i) =>
        p === '...' ? (
          <span
            key={`ellipsis-${i}`}
            className='w-10 h-10 flex items-center justify-center text-white/30 text-sm select-none'
          >
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={getPageLink(p)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer ${
              p === currentPage
                ? 'bg-primary text-white shadow-[0_4px_12px_-4px_var(--primary)]'
                : 'text-white/60 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
            }`}
          >
            {p}
          </Link>
        ),
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link href={getPageLink(currentPage + 1)} className={BTN_ACTIVE}>
          <ChevronRight />
        </Link>
      ) : (
        <div className={BTN_DISABLED}>
          <ChevronRight />
        </div>
      )}
    </nav>
  )
}
