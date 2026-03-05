import { FilmItem } from '@/types/movies'
import MovieCard from './MovieCard'

interface MovieGridProps {
  movies: FilmItem[]
  cdnImage: string
}

export default function MovieGrid({ movies, cdnImage }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className='py-20 text-center text-white/50'>
        Danh sách này hiện chưa có phim nào.
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8 justify-items-center'>
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} cdnImage={cdnImage} />
      ))}
    </div>
  )
}
