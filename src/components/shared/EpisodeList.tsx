'use client'

import { useState } from 'react'
import { episodeItem } from '@/types/movies'
import Icon from '@/components/ui/Icon'
import Link from 'next/link'

interface EpisodeListProps {
  episodes: episodeItem[]
  movieSlug: string
}

export default function EpisodeList({ episodes }: EpisodeListProps) {
  const [activeServer, setActiveServer] = useState(0)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const sortedEpisodes = [...episodes[activeServer].server_data].sort(
    (a, b) => {
      const numA = parseInt(a.name.match(/\d+/)?.[0] || '0')
      const numB = parseInt(b.name.match(/\d+/)?.[0] || '0')
      return sortOrder === 'asc' ? numA - numB : numB - numA
    },
  )

  return (
    <div className='flex flex-col w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl rounded-bl-none rounded-tr-none overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500'>
      {/* Server Selection Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-4 bg-white/5 border-b border-white/10'>
        <div className='flex items-center gap-4 w-full sm:w-auto'>
          <div className='flex items-center gap-2 shrink-0'>
            <div className='w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_var(--primary)]' />
            <span className='text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-white/40'>
              Servers
            </span>
          </div>
          <div className='flex gap-2 no-scrollbar overflow-x-auto pb-1 sm:pb-0'>
            {episodes.map((item, index) => (
              <button
                key={item.server_name}
                onClick={() => setActiveServer(index)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  activeServer === index
                    ? 'bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.server_name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300 active:scale-95 group self-end sm:self-auto'
          title={
            sortOrder === 'asc'
              ? 'Sắp xếp: Thấp đến Cao'
              : 'Sắp xếp: Cao đến Thấp'
          }
        >
          <Icon
            name='sort'
            className={`w-4 h-4 transition-transform duration-500 ${
              sortOrder === 'desc' ? 'rotate-180' : ''
            }`}
          />
          <span className='text-[10px] font-bold uppercase tracking-widest'>
            {sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
          </span>
        </button>
      </div>

      {/* Episode Grid Content */}
      <div className='p-6 h-[30vh]  overflow-y-auto no-scrollbar'>
        <div className='flex flex-wrap gap-4'>
          {sortedEpisodes.map((item, index) => (
            <Link
              key={item.name}
              href={`/xem-phim/${item.slug}`}
              className='group min-w-14 h-14 relative flex items-center justify-center px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:scale-[1.03] active:scale-95'
              style={{
                animation: `fadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                animationDelay: `${index * 20}ms`,
                opacity: 0,
              }}
            >
              <div className='absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10' />
              <span className='text-xs font-bold tracking-tight text-white/60 group-hover:text-white transition-colors'>
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
