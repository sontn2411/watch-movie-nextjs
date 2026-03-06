import { fetchSearchMovie } from '@/services/movieService'
import MovieGrid from '@/components/shared/MovieGrid'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import { Metadata } from 'next'
import { Suspense } from 'react'
import Pagination from '@/components/shared/Pagination'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>
}): Promise<Metadata> {
  const { keyword } = await searchParams
  return {
    title: keyword
      ? `Kết quả tìm kiếm cho: ${keyword} | Watch Mov`
      : 'Tìm kiếm phim | Watch Mov',
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string; page?: string }>
}) {
  const { keyword = '', page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page))

  if (!keyword.trim()) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center pt-32 px-4'>
        <div className='w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6'>
          <Icon
            name='search'
            className='w-10 h-10 text-white/20'
            strokeWidth={1}
          />
        </div>
        <h1 className='text-2xl font-bold text-white mb-2'>Tìm kiếm phim</h1>
        <p className='text-white/40'>
          Vui lòng nhập từ khóa để bắt đầu tìm kiếm.
        </p>
      </div>
    )
  }

  const res = await fetchSearchMovie(keyword, currentPage, 30)

  if (!res?.data?.items || res.data.items.length === 0) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center pt-32 px-4'>
        <div className='w-20 h-20 rounded-full bg-red-500/5 flex items-center justify-center mb-6'>
          <Icon
            name='search'
            className='w-10 h-10 text-red-500/20'
            strokeWidth={1}
          />
        </div>
        <h1 className='text-2xl font-bold text-white mb-2'>
          Không tìm thấy phim
        </h1>
        <p className='text-white/40'>
          Không có kết quả nào cho từ khóa:{' '}
          <span className='text-white'>"{keyword}"</span>
        </p>
        <Link
          href='/'
          className='mt-8 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all'
        >
          Quay lại trang chủ
        </Link>
      </div>
    )
  }

  const { APP_DOMAIN_CDN_IMAGE } = res.data
  const { totalItems, totalItemsPerPage } = res.data.params.pagination
  const totalPages = Math.ceil(totalItems / totalItemsPerPage)

  return (
    <div className='relative min-h-screen pt-28 px-4 md:px-6 max-w-7xl mx-auto pb-20'>
      {/* Background Ambient Orbs */}
      <div className='absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 mix-blend-screen opacity-50' />

      <div className='relative z-10 mb-10'>
        <h1 className='text-3xl md:text-4xl font-black italic tracking-tighter uppercase text-white'>
          Kết quả tìm kiếm: <span className='text-primary'>"{keyword}"</span>
        </h1>
        <p className='text-white/50 mt-2 font-medium'>
          Tìm thấy {totalItems} phim phù hợp
        </p>
      </div>

      <MovieGrid movies={res.data.items} cdnImage={APP_DOMAIN_CDN_IMAGE} />

      {totalPages > 1 && (
        <Suspense fallback={null}>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </Suspense>
      )}
    </div>
  )
}
