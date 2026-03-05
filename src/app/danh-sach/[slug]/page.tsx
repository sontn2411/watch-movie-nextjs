import React, { Suspense } from 'react'
import {
  fetchMoviesBySlug,
  fetchListCategory,
  fetchListNation,
  SLUG_TITLES,
  slugs,
} from '@/services/movieService'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MovieGrid from '@/components/shared/MovieGrid'
import Pagination from '@/components/shared/Pagination'
import MovieFilter from '@/components/shared/MovieFilter'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  if (!slugs.includes(slug)) {
    return { title: '404 - Không tìm thấy trang' }
  }

  const res = await fetchMoviesBySlug(slug, 1)

  if (!res?.status) {
    return { title: 'Danh sách phim | Watch Mov' }
  }

  const type = res?.data?.type_list
  const titleType = SLUG_TITLES[type] || 'Danh Sách Phim'
  const title = res.data?.APP_DOMAIN_FRONTEND
    ? `Danh sách phim - ${titleType}`
    : 'Danh sách phim | Watch Mov'

  return { title }
}

export default async function DanhSachPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    page?: string
    category?: string
    country?: string
    year?: string
  }>
}) {
  const { slug } = await params
  const { page, category, country, year } = await searchParams

  if (!slugs.includes(slug)) {
    notFound()
  }

  const currentPage = Math.max(1, Number(page) || 1)

  const [res, listCategory, listNation] = await Promise.all([
    fetchMoviesBySlug(slug, 24, currentPage, category, country, year),
    fetchListCategory(),
    fetchListNation(),
  ])

  const categories = listCategory?.data?.items ?? []
  const nations = listNation?.data?.items ?? []

  if (!res?.status || !res?.data?.items) {
    return (
      <div className='min-h-screen pt-32 px-6 pb-20 flex flex-col items-center justify-center'>
        <h1 className='text-2xl text-white font-bold mb-4'>
          Không tìm thấy phim
        </h1>
        <p className='text-white/60'>
          Rất tiếc, danh sách bạn yêu cầu không tồn tại hoặc đã có lỗi xảy ra.
        </p>
      </div>
    )
  }

  const { APP_DOMAIN_CDN_IMAGE } = res.data
  const { totalItems, totalItemsPerPage } = res.data.params.pagination
  const totalPages = Math.ceil(totalItems / totalItemsPerPage)

  const type = res.data.type_list
  const title = SLUG_TITLES[type] || 'Danh Sách Phim'

  return (
    <div className='relative min-h-[calc(100vh-80px)] pt-[100px] px-4 md:px-6 max-w-7xl mx-auto pb-16 '>
      {/* Background Ambient Orbs */}
      <div className='absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen opacity-50 animate-pulse' />
      <div className='absolute top-40 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10 mix-blend-screen opacity-50' />

      {/* Header */}
      <div className='relative z-10 mb-6 flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-primary inline-block'>
          {title}
        </h1>
        <p className='text-white/50 mt-2 text-sm'>
          Trang {currentPage} / {totalPages}
        </p>
      </div>

      {/* Filter */}
      <Suspense fallback={null}>
        <MovieFilter categories={categories} nations={nations} slug={slug} />
      </Suspense>

      {/* Results */}
      {res.data.items.length > 0 ? (
        <MovieGrid movies={res.data.items} cdnImage={APP_DOMAIN_CDN_IMAGE} />
      ) : (
        <div className='py-20 text-center text-white/50'>
          Không tìm thấy phim phù hợp với bộ lọc đã chọn.
        </div>
      )}

      {totalPages > 1 && (
        <Suspense fallback={null}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            slug={slug}
          />
        </Suspense>
      )}
    </div>
  )
}
