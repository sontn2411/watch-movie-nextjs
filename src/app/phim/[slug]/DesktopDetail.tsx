import {
  ResponseDataFilmDetail,
  ResponseDataFilmImage,
  ResponseDataFilmPeoples,
} from '@/types/movies'
import Image from 'next/image'
import Link from 'next/link'
import imdbIcon from '@/assets/images/imdb.png'
import tmdbIcon from '@/assets/images/tmdb.png'
import PeopleSlider from './PeopleSlider'
import EpisodeList from '@/components/shared/EpisodeList'
import Icon from '@/components/ui/Icon'
import TrailerModal from '@/components/shared/TrailerModal'

interface DesktopDetailProps {
  detailRes: ResponseDataFilmDetail
  imageRes: ResponseDataFilmImage
  peopleRes: ResponseDataFilmPeoples
  slug: string
}

export default function MovieDetailDesktop({
  detailRes,
  imageRes,
  peopleRes,
  slug,
}: DesktopDetailProps) {
  const { item, APP_DOMAIN_CDN_IMAGE } = detailRes.data
  const getFullImageUrl = (path: string) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    return `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${path}`
  }

  const images = imageRes?.data?.images || []
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
    episodes,
  } = item

  console.log('======', item)

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
          <div className='max-w-4xl space-y-6 md:space-y-8'>
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
              <div className='flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm font-bold tracking-widest uppercase'>
                <span className='bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 px-3 py-1 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]'>
                  {quality}
                </span>
                <span className='bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]'>
                  {lang}
                </span>
                {episode_current && (
                  <span className='bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-3 py-1 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]'>
                    {episode_current}
                  </span>
                )}
                {time &&
                  !time.includes('?') &&
                  !time.toLowerCase().includes('undefine') && (
                    <span className='bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-3 py-1 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]'>
                      {time}
                    </span>
                  )}
                {imdb && imdb.vote_average > 0 && (
                  <span className='flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 font-black rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]'>
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
                  <span className='flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 font-black rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]'>
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
                <span className='bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-3 py-1 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]'>
                  {year}
                </span>
              </div>

              {/* Categories with elegant distinct design */}
              <div className='flex flex-wrap gap-2 pt-2'>
                {category?.map((cat: any) => (
                  <Link
                    key={cat.id}
                    href={`/the-loai/${cat.slug}`}
                    className='text-xs md:text-xs border-b border-white/20 hover:border-white transition-colors uppercase tracking-widest pb-1 mr-4'
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* Movie Description (Content) with premium styling */}
            <div
              className='text-sm md:text-base text-white/70 line-clamp-3 md:line-clamp-5 max-w-3xl font-light leading-relaxed'
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {/* People Slider */}
            {peopleImages.length > 0 && (
              <div className='pt-2 pb-4 w-full max-w-2xl overflow-hidden'>
                <h3 className='text-sm md:text-base font-bold uppercase tracking-widest text-white/50 mb-3'>
                  Diễn viên
                </h3>
                <PeopleSlider people={peopleImages} />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons (Bottom left focus) */}
        <div className='absolute bottom-8 md:bottom-12 left-0 w-full px-8 md:px-20 z-20 pointer-events-none'>
          <div className='flex items-center gap-4 pointer-events-auto'>
            <Link
              href={`#`}
              className='flex items-center gap-3 bg-white/10 backdrop-blur-md border rounded-full border-white/20 text-white font-black uppercase text-xs md:text-sm px-6 md:px-10 py-3 md:py-4 tracking-tighter hover:bg-primary transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
            >
              <Icon name='play' className='w-5 h-5 md:w-6 md:h-6' />
              Xem Phim
            </Link>

            {trailer_url && <TrailerModal youtubeUrl={trailer_url} />}
          </div>
        </div>

        {/* Desktop Episodes List */}
        {episodes && episodes.length > 0 && (
          <div className='hidden lg:flex absolute left-1/2 w-full top-0 bottom-0 z-9999 flex-col  justify-end pointer-events-none'>
            <div className='pointer-events-auto w-1/2'>
              <EpisodeList episodes={episodes} movieSlug={slug} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
