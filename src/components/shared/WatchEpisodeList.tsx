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
  const [sortOrder] = useState<'asc' | 'desc'>('asc')
  const EPISODES_PER_PAGE = 100
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

  // Chunking logic
  const chunks = []
  for (let i = 0; i < sortedEpisodes.length; i += EPISODES_PER_PAGE) {
    chunks.push(sortedEpisodes.slice(i, i + EPISODES_PER_PAGE))
  }

  // Find the initial chunk index based on the current active episode
  const initialChunkIndex = chunks.findIndex((chunk) =>
    chunk.some((ep) => ep.slug === currentTap),
  )

  const [activeChunkIndex, setActiveChunkIndex] = useState(
    initialChunkIndex !== -1 ? initialChunkIndex : 0,
  )

  const currentChunkEpisodes = chunks[activeChunkIndex] || []

  return (
    <div className='flex flex-col gap-6'>
      {/* Server & Pagination Selection */}
      <div className='sticky top-0 z-50 bg-[#05050A] pb-4 -mx-2 px-2 flex flex-col gap-4 shadow-[0_10px_30px_#05050A]'>
        {/* Server Selection Segmented Control */}
        {episodes.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {episodes.map((item, index) => (
              <button
                onClick={() => {
                  setActiveServer(index)
                  setActiveChunkIndex(0) // Reset chunk on server change
                }}
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
        )}

        {/* Chunk Selection (Only show if total episodes > EPISODES_PER_PAGE) */}
        {chunks.length > 1 && (
          <div className='flex gap-2 overflow-x-auto no-scrollbar pb-1'>
            {chunks.map((chunk, index) => {
              const startNum = index * EPISODES_PER_PAGE + 1
              const endNum = Math.min(
                (index + 1) * EPISODES_PER_PAGE,
                sortedEpisodes.length,
              )
              return (
                <button
                  onClick={() => setActiveChunkIndex(index)}
                  key={`chunk-${index}`}
                  className={`px-3 py-1.5 min-w-max text-xs font-bold rounded-md transition-all duration-200 border ${
                    activeChunkIndex === index
                      ? 'bg-white/10 text-white border-white/20'
                      : 'bg-transparent text-white/40 border-transparent hover:bg-white/5 hover:text-white/80'
                  }`}
                >
                  {startNum} - {endNum}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Episode Grid */}
      <div className='grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-3 pb-8'>
        {currentChunkEpisodes.map((item, index) => {
          const isActive = currentTap === item.slug
          return (
            <Link
              key={item.name}
              href={`/xem-phim/${movieSlug}?tap=${item.slug}`}
              className={`group relative flex items-center justify-center aspect-square rounded-xl border transition-all duration-300 hover:scale-[1.05] active:scale-95 ${
                isActive
                  ? 'bg-primary border-primary text-white shadow-[0_4px_20px_-4px_rgba(59,130,246,0.5)]'
                  : 'bg-[#111115] border-white/5 hover:border-primary/50 text-white/70 hover:text-white hover:bg-[#1a1a20]'
              }`}
              style={{
                animation: `fadeIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                animationDelay: `${(index % 20) * 10}ms`,
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
