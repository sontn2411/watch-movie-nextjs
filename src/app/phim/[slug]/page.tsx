import {
  fetchMovieDetailBySlug,
  fetchMovieDetailImage,
  fetchMovieDetailPeople,
} from '@/services/movieService'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sleep } from '@/utils/delay'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  try {
    const res = await fetchMovieDetailBySlug(slug)

    if (!res?.status) {
      return { title: 'Thông tin phim | Watch Mov' }
    }

    const { item } = res.data
    return {
      title: `${item.name} (${item.year}) | Watch Mov`,
      description: item.content.replace(/<[^>]*>/g, '').slice(0, 160),
    }
  } catch (error) {
    return { title: 'Thông tin phim | Watch Mov' }
  }
}

import { headers } from 'next/headers'
import { isMobileDevice } from '@/utils/device'
import MobileDetail from './MobileDetail'
import MovieDetailDesktop from './DesktopDetail'

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  const isMobile = isMobileDevice(userAgent)

  // Parallel fetching with 2s artificial delay
  const [[detailRes, peopleRes]] = await Promise.all([
    Promise.all([
      fetchMovieDetailBySlug(slug),
      // fetchMovieDetailImage(slug),
      fetchMovieDetailPeople(slug),
    ]),
    sleep(2000),
  ])

  if (!detailRes?.status || !detailRes?.data?.item) {
    notFound()
  }

  return isMobile ? (
    <MobileDetail
      detailRes={detailRes}
      // imageRes={imageRes}
      peopleRes={peopleRes}
      slug={slug}
    />
  ) : (
    <MovieDetailDesktop
      detailRes={detailRes}
      // imageRes={imageRes}
      peopleRes={peopleRes}
      slug={slug}
    />
  )
}
