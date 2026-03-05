import React, { Suspense } from 'react'
import {
  fetchMovieDetailBySlug,
  fetchMovieDetailImage,
  fetchMovieDetailPeople,
} from '@/services/movieService'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { sleep } from '@/utils/delay'
import imdbIcon from '@/assets/images/imdb.png'
import tmdbIcon from '@/assets/images/tmdb.png'

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

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    // Parallel fetching with 2s artificial delay
    const [[detailRes, imageRes, peopleRes]] = await Promise.all([
      Promise.all([
        fetchMovieDetailBySlug(slug),
        fetchMovieDetailImage(slug),
        fetchMovieDetailPeople(slug),
      ]),
      sleep(2000),
    ])

    if (!detailRes?.status || !detailRes?.data?.item) {
      notFound()
    }

    const { item, APP_DOMAIN_CDN_IMAGE } = detailRes.data
    const getFullImageUrl = (path: string) => {
      if (!path) return ''
      if (path.startsWith('http')) return path
      return `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${path}`
    }

    const getTmdbImageUrl = (path: string, size = 'original') => {
      if (!path) return ''
      if (path.startsWith('http')) return path
      return `https://image.tmdb.org/t/p/${size}${path}`
    }

    const images = imageRes?.data?.images || []
    const backdropGallery = images.filter((img) => img.type === 'backdrop')
    const posterImage = images.find((img) => img.type === 'poster')
    const peopleImages = peopleRes?.data?.peoples || []

    const {
      trailer_url,
      poster_url,
      name,
      origin_name,
      lang,
      quality,
      tmdb,
      imdb,
      category,
      year,
      episode_current,
      time,
      content,
    } = item

    console.log('=======', item)

    return (
      <div className='relative min-h-screen bg-gray-950 text-white'>
        <div className='h-screen relative overflow-hidden'>
          {/* Background Layer */}

          <>
            <div className='bg-black/20 absolute inset-0 z-10'></div>
            <div className='bg-linear-to-t from-gray-950 via-transparent to-black/40 absolute inset-0 z-10'></div>
            <Image
              src={getFullImageUrl(poster_url)}
              alt={name}
              fill
              className='object-cover scale-105 blur-[2px] opacity-50'
              priority
            />
          </>

          {/* Content Layer (Top left focus) */}
          <div className='absolute top-0 left-0 w-full p-8 md:p-20 z-20 mt-12 md:mt-16'>
            <div className='max-w-5xl space-y-6 md:space-y-8'>
              {/* Title with radical typography */}
              <div className='space-y-2 md:space-y-4'>
                <h1 className='text-3xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9] drop-shadow-2xl max-w-4xl'>
                  {name}
                </h1>
                <p className='text-xl md:text-2xl font-light text-white/50 italic tracking-tight'>
                  {origin_name}
                </p>
              </div>

              {/* Meta information and Categories */}
              <div className='space-y-6'>
                <div className='flex flex-wrap items-center gap-3 text-xs md:text-sm font-bold tracking-widest uppercase'>
                  <span className='bg-yellow-500 text-black px-2 py-0.5 rounded-none'>
                    {quality}
                  </span>
                  <span className='border border-white/30 px-2 py-0.5 rounded-none'>
                    {lang}
                  </span>
                  {episode_current && (
                    <span className='border border-white/20 px-2 py-0.5 rounded-none text-white/70'>
                      {episode_current}
                    </span>
                  )}
                  {time && (
                    <span className='border border-white/20 px-2 py-0.5 rounded-none text-white/70'>
                      {time}
                    </span>
                  )}
                  {imdb && imdb.vote_average > 0 && (
                    <span className='flex items-center gap-1.5 bg-[#f5c518] text-black px-2 py-0.5 font-black rounded-none'>
                      <Image
                        src={imdbIcon}
                        alt='IMDB'
                        width={24}
                        height={12}
                        className='object-contain'
                      />
                      {imdb.vote_average.toFixed(1)}
                    </span>
                  )}
                  {tmdb && tmdb.vote_average > 0 && (
                    <span className='flex items-center gap-1.5 bg-[#01b4e4] text-white px-2 py-0.5 font-black rounded-none'>
                      <Image
                        src={tmdbIcon}
                        alt='TMDB'
                        width={16}
                        height={16}
                        className='object-contain'
                      />
                      {tmdb.vote_average.toFixed(1)}
                    </span>
                  )}
                  <span className='text-white/60'>{year}</span>
                </div>

                {/* Categories with sharp design */}
                <div className='flex flex-wrap gap-2 pt-2'>
                  {category?.map((cat: any) => (
                    <Link
                      key={cat.id}
                      href={`/the-loai/${cat.slug}`}
                      className='text-[10px] md:text-xs border-b border-white/20 hover:border-white transition-colors uppercase tracking-widest pb-1 mr-4'
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Movie Description (Content) with premium styling */}
              <div
                className='text-sm md:text-base text-white/70 line-clamp-3 md:line-clamp-5 max-w-3xl font-light leading-relaxed pt-2'
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>

          {/* Action Buttons (Bottom left focus) */}
          <div className='absolute bottom-0 left-0 w-full p-8 md:p-20 z-20 mb-8 md:mb-12'>
            <div className='flex items-center gap-4'>
              <Link
                href={`#`}
                className='flex items-center gap-3 bg-white/10 backdrop-blur-md border rounded-full border-white/20 text-white font-black uppercase text-xs md:text-sm px-6 md:px-10 py-3 md:py-4 tracking-tighter hover:bg-primary transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='w-5 h-5 md:w-6 md:h-6'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z'
                    clipRule='evenodd'
                  />
                </svg>
                Xem Phim
              </Link>

              {trailer_url && (
                <Link
                  href={trailer_url}
                  target='_blank'
                  className='flex items-center gap-2 bg-white/5 backdrop-blur-sm border rounded-full border-white/10 text-white/80 font-bold uppercase text-[10px] md:text-xs px-6 py-3 md:py-4 tracking-widest hover:bg-white/20 hover:text-white transition-all duration-500'
                >
                  Trailer
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
