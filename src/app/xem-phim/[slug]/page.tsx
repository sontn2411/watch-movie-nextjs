import { fetchMovieDetailBySlug } from '@/services/movieService'
import { notFound } from 'next/navigation'
import WatchEpisodeList from '@/components/shared/WatchEpisodeList'
import VideoPlayer from '@/components/shared/VideoPlayer'
import Icon from '@/components/ui/Icon'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ tap?: string }>
}) {
  const { slug } = await params
  const { tap } = await searchParams

  const detailRes = await fetchMovieDetailBySlug(slug)

  if (!detailRes?.status || !detailRes?.data?.item) {
    notFound()
  }

  const { item } = detailRes.data
  const { episodes, name } = item

  // Find the current episode to play
  // Default to the first episode of the first server if no 'tap' is provided
  let activeEpisode = null
  let activeServerName = ''

  if (episodes && episodes.length > 0) {
    // Try to find by slug
    for (const server of episodes) {
      const ep = server.server_data.find((e) => e.slug === tap)
      if (ep) {
        activeEpisode = ep
        activeServerName = server.server_name
        break
      }
    }

    // Fallback to first episode if not found or no tap
    if (!activeEpisode) {
      activeEpisode = episodes[0].server_data[0]
      activeServerName = episodes[0].server_name
    }
  }

  if (!activeEpisode) {
    return (
      <div className='min-h-screen flex items-center justify-center pt-20'>
        <div className='text-center space-y-4'>
          <h2 className='text-2xl font-bold text-white/50'>
            Không tìm thấy tập phim
          </h2>
          <Link href={`/phim/${slug}`} className='text-primary hover:underline'>
            Quay lại chi tiết
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='relative h-screen w-full bg-[#000000] overflow-hidden pt-16 lg:pt-20'>
      <div className='flex flex-col lg:flex-row h-full w-full'>
        {/* Left Side: Video Player Area - Maximize Focus */}
        <div className='flex-1 relative flex items-center justify-center p-0 lg:p-4 bg-black'>
          <div className='w-full aspect-video max-h-[85vh]'>
            <VideoPlayer
              urlM3U8={activeEpisode.link_m3u8}
              urlEmbed={activeEpisode.link_embed}
              poster={item.thumb_url || item.poster_url}
            />
          </div>
        </div>

        {/* Right Side: Sidebar (Episode List & Details) */}
        <div className='w-full lg:w-[400px] shrink-0 h-full flex flex-col bg-[#05050A] border-l border-white/5 shadow-2xl z-10'>
          <div className='p-6 flex-1 overflow-y-auto no-scrollbar pb-10'>
            <h3 className='text-3xl font-black tracking-tight leading-[1.1] mb-8 text-white'>
              {name}
            </h3>
            <WatchEpisodeList episodes={episodes} movieSlug={slug} />
          </div>
        </div>
      </div>
    </div>
  )
}
