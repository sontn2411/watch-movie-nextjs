'use client'
import { useState } from 'react'
import { episodeItem } from '@/types/movies'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface WatchEpisodeListProps {
  episodes: episodeItem[]
  movieSlug: string
}

export default function WatchEpisodeList({
  episodes,
  movieSlug,
}: WatchEpisodeListProps) {
  const [activeServer, setActiveServer] = useState(0)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const searchParams = useSearchParams()
  const currentTap =
    searchParams.get('tap') || episodes[0]?.server_data[0]?.slug

  const sortedEpisodes = [...episodes[activeServer].server_data].sort(
    (a, b) => {
      const numA = parseInt(a.name.match(/\d+/)?.[0] || '0')
      const numB = parseInt(b.name.match(/\d+/)?.[0] || '0')
      return sortOrder === 'asc' ? numA - numB : numB - numA
    },
  )

  return (
    <div className='flex flex-col gap-6 h-full'>
      {/* Server Selection Segmented Control */}
      {episodes.length > 0 && (
        <div className='sticky top-0 z-10 bg-[#05050A]/90 backdrop-blur-md pb-4 pt-2 -mx-2 px-2'>
          <div className='flex flex-wrap gap-2'>
            {episodes.map((item, index) => (
              <button
                onClick={() => setActiveServer(index)}
                key={item.server_name}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                  activeServer === index
                    ? 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                    : 'bg-white/5 text-white/50 border border-transparent hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.server_name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Episode Grid */}
      <div className='grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-3 pb-8'>
        {sortedEpisodes.map((item, index) => {
          const isActive = currentTap === item.slug
          return (
            <Link
              key={item.name}
              href={`/xem-phim/${movieSlug}?tap=${item.slug}`}
              className={`group relative flex items-center justify-center aspect-square rounded-xl border transition-all duration-300 hover:scale-[1.05] active:scale-95 ${
                isActive
                  ? 'bg-primary border-primary text-white shadow-[0_4px_20px_-4px_rgba(59,130,246,0.5)] z-10'
                  : 'bg-[#111115] border-white/5 hover:border-primary/50 text-white/70 hover:text-white hover:bg-[#1a1a20]'
              }`}
              style={{
                animation: `fadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                animationDelay: `${(index % 20) * 15}ms`,
                opacity: 0,
              }}
            >
              {isActive && (
                <div className='absolute inset-0 bg-primary opacity-20 blur-md rounded-xl -z-10 animate-pulse-slow' />
              )}
              <span className='text-sm font-bold tracking-tight transition-colors'>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
