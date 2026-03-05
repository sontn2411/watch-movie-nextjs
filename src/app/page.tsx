import HeroCarousel from '@/components/shared/HeroCarousel'
import MovieSection from '@/components/shared/MovieSection'
import {
  fetchHomeData,
  fetchMoviesBySlug,
  slugs,
  SLUG_TITLES,
} from '@/services/movieService'

export default async function Home() {
  const homeData = await fetchHomeData()

  // Take top movies for the carousel
  const carouselMovies = homeData.items
  const cdnImage = homeData.pathImage

  // Fetch all sections in parallel
  const sectionsData = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const res = await fetchMoviesBySlug(slug)
        return {
          slug,
          items: res.data.items,
          cdnImage: res.data.APP_DOMAIN_CDN_IMAGE,
        }
      } catch {
        return { slug, items: [], cdnImage: '' }
      }
    }),
  )

  return (
    <div className='flex flex-col w-full min-h-screen pb-12'>
      <HeroCarousel movies={carouselMovies} cdnImage={cdnImage} />

      {/* Movie Sections */}
      <div className='flex flex-col gap-20 mt-8'>
        {sectionsData.map(({ slug, items, cdnImage }) => {
          if (!items || items.length === 0) return null
          return (
            <MovieSection
              key={slug}
              title={SLUG_TITLES[slug] || slug}
              slug={slug}
              movies={items}
              cdnImage={cdnImage}
            />
          )
        })}
      </div>
    </div>
  )
}
