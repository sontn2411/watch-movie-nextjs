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

interface MobileDetailProps {
  detailRes: ResponseDataFilmDetail
  imageRes?: ResponseDataFilmImage
  peopleRes?: ResponseDataFilmPeoples | null
  slug: string
}

export default function MobileDetail({
  detailRes,
  // imageRes,
  peopleRes,
  slug,
}: MobileDetailProps) {
  const { item, APP_DOMAIN_CDN_IMAGE } = detailRes.data
  const getFullImageUrl = (path: string) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    return `${APP_DOMAIN_CDN_IMAGE}/uploads/movies/${path}`
  }

  // const images = imageRes?.data?.images || []
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

  return (
    <div className='relative min-h-screen bg-gray-950 text-white overflow-x-hidden'>
      {/* Hero Section with Background */}
      <div className='relative min-h-[70vh] md:min-h-screen flex flex-col justify-end'>
        {/* Background Layer */}
        <div className='absolute inset-0'>
          <div className='bg-black/20 absolute inset-0 z-10'></div>
          <div className='bg-linear-to-t from-gray-950 via-transparent to-black/40 absolute inset-0 z-10'></div>
          <Image
            src={getFullImageUrl(poster_url)}
            alt={name}
            fill
            className='object-cover scale-105 blur-[2px] opacity-40'
            priority
          />
        </div>

        {/* Hero Content (Floating on bottom of hero area) */}
        <div className='relative z-20 p-4 md:p-20 w-full max-w-7xl mx-auto'>
          <div className='space-y-6 md:space-y-8'>
            {/* Title with radical typography */}
            <div className='space-y-2 md:space-y-4'>
              <h1 className='text-3xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9] drop-shadow-2xl'>
                {name}
              </h1>
              <p className='text-xl md:text-2xl font-light text-white/50 italic tracking-tight uppercase'>
                {origin_name}
              </p>
            </div>

            {/* Meta information and Categories */}
            <div className='space-y-6'>
              <div className='flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm font-bold tracking-widest uppercase'>
                <span className='bg-white/10 backdrop-blur-md border border-white/20 text-yellow-500 px-3 py-1 rounded-full shadow-2xl'>
                  {quality}
                </span>
                <span className='bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full shadow-2xl'>
                  {lang}
                </span>
                {episode_current && (
                  <span className='bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-3 py-1 rounded-full shadow-2xl'>
                    {episode_current}
                  </span>
                )}
                {time &&
                  !time.includes('?') &&
                  !time.toLowerCase().includes('undefine') && (
                    <span className='bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-3 py-1 rounded-full shadow-2xl'>
                      {time}
                    </span>
                  )}
                {imdb && imdb.vote_average > 0 && (
                  <span className='flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 font-black rounded-full shadow-2xl'>
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
                <span className='bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-3 py-1 rounded-full shadow-2xl'>
                  {year}
                </span>
              </div>

              {/* Categories */}
              <div className='flex flex-wrap gap-2 pt-2'>
                {category?.map((cat: any) => (
                  <Link
                    key={cat.id}
                    href={`/the-loai/${cat.slug}`}
                    className='text-xs border-b border-white/20 hover:border-white transition-colors uppercase tracking-widest pb-1 mr-4'
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-4 pt-4'>
              <Link
                href={`#`}
                className='flex items-center gap-3 bg-white/10 backdrop-blur-md border rounded-full border-white/20 text-white font-black uppercase text-xs md:text-sm px-8 md:px-12 py-3 md:py-4 tracking-tighter hover:bg-primary transition-all duration-500 hover:scale-105 shadow-2xl'
              >
                <Icon name='play' className='w-5 h-5 md:w-6 md:h-6' />
                Xem Phim
              </Link>
              {trailer_url && <TrailerModal youtubeUrl={trailer_url} />}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section (Scrollable Area) */}
      <div className='relative z-30 bg-gray-950 px-4 md:px-20 py-12 md:py-20 max-w-7xl mx-auto w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20'>
          {/* Left Column: Description & Actors */}
          <div className='lg:col-span-12 space-y-16'>
            {/* Movie Description */}
            <div className='space-y-6'>
              <h3 className='text-sm md:text-base font-bold uppercase tracking-[0.3em] text-white/30'>
                Nội dung phim
              </h3>
              <div
                className='text-base md:text-lg text-white/70 font-light leading-relaxed max-w-4xl'
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            {/* People Slider */}
            {peopleImages.length > 0 && (
              <div className='space-y-6'>
                <h3 className='text-sm md:text-base font-bold uppercase tracking-[0.3em] text-white/30'>
                  Diễn viên
                </h3>
                <PeopleSlider people={peopleImages} />
              </div>
            )}

            {/* Episode List (Integrated into flow) */}
            {episodes && episodes.length > 0 && (
              <div className='space-y-6'>
                <h3 className='text-sm md:text-base font-bold uppercase tracking-[0.3em] text-white/30'>
                  Danh sách tập phim
                </h3>
                <div className='w-full lg:w-3/4'>
                  <EpisodeList episodes={episodes} movieSlug={slug} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
