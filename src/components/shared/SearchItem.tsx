import React from 'react'
import Link from 'next/link'
import { FilmItem } from '@/types/movies'

interface SearchItemProps {
  movie: FilmItem
  onClick?: () => void
}

export default function SearchItem({ movie, onClick }: SearchItemProps) {
  return (
    <Link
      href={`/phim/${movie.slug}`}
      onClick={onClick}
      className='flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors group'
    >
      <div className='relative w-12 h-16 shrink-0 rounded-lg overflow-hidden border border-white/10 bg-white/5'>
        <img
          src={`https://ophim1.com/_next/image?url=https%3A%2F%2Fimg.otruyenapi.com%2Fuploads%2Fmovies%2F${movie.poster_url}-poster.jpg&w=128&q=75`}
          alt={movie.name}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
          onError={(e) => {
            ;(e.target as HTMLImageElement).src =
              'https://placehold.co/128x192/06060c/white?text=No+Poster'
          }}
        />
      </div>
      <div className='flex flex-col gap-0.5 min-w-0 flex-1'>
        <h4 className='text-sm font-semibold text-white/90 truncate group-hover:text-primary transition-colors leading-tight'>
          {movie.name}
        </h4>
        <p className='text-[11px] text-white/40 font-medium truncate'>
          {movie.origin_name}
        </p>
        <div className='flex items-center gap-2 mt-0.5'>
          <span className='text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/60 font-bold'>
            {movie.year}
          </span>
          <span className='text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-bold uppercase'>
            {movie.quality}
          </span>
        </div>
      </div>
    </Link>
  )
}
