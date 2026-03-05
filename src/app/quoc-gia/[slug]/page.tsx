import React, { Suspense } from 'react'
import {
  fetchListCategory,
  fetchListNation,
  fetchMovieByNation,
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

  try {
    const res = await fetchMovieByNation(slug, 1)

    if (!res?.status) {
      return { title: 'Phim theo quốc gia | Watch Mov' }
    }

    const title = res.data?.titlePage || 'Phim theo quốc gia'
    return { title: `${title} | Watch Mov` }
  } catch (error) {
    return { title: 'Phim theo quốc gia | Watch Mov' }
  }
}

import { sleep } from '@/utils/delay'

export default async function QuocGiaPage({
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

  const currentPage = Math.max(1, Number(page) || 1)

  try {
    const [[res, listCategory, listNation]] = await Promise.all([
      Promise.all([
        fetchMovieByNation(slug, 24, currentPage, category, year),
        fetchListCategory(),
        fetchListNation(),
      ]),
      sleep(2000),
    ])

    const categories = listCategory?.data?.items ?? []
    const nations = listNation?.data?.items ?? []

    if (!res?.status || !res?.data?.items) {
      notFound()
    }

    const { APP_DOMAIN_CDN_IMAGE } = res.data
    const { totalItems, totalItemsPerPage } = res.data.params.pagination
    const totalPages = Math.ceil(totalItems / totalItemsPerPage)
    const title = res.data?.titlePage || 'Phim theo quốc gia'

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
          <MovieFilter
            categories={categories}
            nations={nations}
            slug={`quoc-gia/${slug}`}
            hideCountry={true}
          />
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
              slug={`quoc-gia/${slug}`}
            />
          </Suspense>
        )}
      </div>
    )
  } catch (error) {
    notFound()
  }
}
