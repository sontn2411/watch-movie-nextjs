'use client'

import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import noImage from '@/assets/images/noImage.jpeg'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

interface Person {
  name: string
  profile_path: string
}

interface PeopleSliderProps {
  people: Person[]
}

const getTmdbImageUrl = (path: string, size = 'original') => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export default function PeopleSlider({ people }: PeopleSliderProps) {
  if (!people || people.length === 0) return null
  console.log('=======', people)
  return (
    <div className='relative group/slider px-8 md:px-10'>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2.5}
        breakpoints={{
          480: { slidesPerView: 3.5 },
          640: { slidesPerView: 4.5 },
          768: { slidesPerView: 5.5 },
        }}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        className='w-full'
      >
        {people.map((person, index) => (
          <SwiperSlide key={index} className='group cursor-pointer'>
            <div className='flex flex-col items-center gap-2'>
              <div className='relative aspect-square w-16 md:w-20 rounded-full overflow-hidden border border-white/10 group-hover:border-white/50 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 bg-white/5 mx-auto'>
                <Image
                  src={
                    person.profile_path
                      ? getTmdbImageUrl(person.profile_path, 'w185')
                      : noImage
                  }
                  alt={person.name}
                  fill
                  sizes='(max-width: 480px) 20vw, (max-width: 768px) 15vw, 10vw'
                  className='object-cover object-[center_20%] group-hover:scale-110 transition-transform duration-500'
                />
              </div>
              <p className='text-[10px] md:text-xs text-center w-full font-medium truncate text-white/70 group-hover:text-white transition-colors duration-300'>
                {person.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className='swiper-button-prev-custom absolute left-0 top-[40%] md:top-[35%] -translate-y-1/2 z-10 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-50 hover:opacity-100 hover:bg-white/30 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none'>
        <Icon name='chevron-left' className='w-4 h-4 md:w-5 md:h-5' />
      </button>

      <button className='swiper-button-next-custom absolute right-0 top-[40%] md:top-[35%] -translate-y-1/2 z-10 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-50 hover:opacity-100 hover:bg-white/30 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none'>
        <Icon name='chevron-right' className='w-4 h-4 md:w-5 md:h-5' />
      </button>
    </div>
  )
}
