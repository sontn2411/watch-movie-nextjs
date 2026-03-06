'use client'

import React, { useState, useEffect } from 'react'
import Icon from '@/components/ui/Icon'

interface TrailerModalProps {
  youtubeUrl: string
}

export default function TrailerModal({ youtubeUrl }: TrailerModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Extract YouTube video ID
  const getEmbedUrl = (url: string) => {
    let videoId = ''
    if (url.includes('youtube.com/watch')) {
      try {
        const urlParams = new URL(url).searchParams
        videoId = urlParams.get('v') || ''
      } catch (e) {
        videoId = ''
      }
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : ''
  }

  const embedUrl = getEmbedUrl(youtubeUrl)

  // Block scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // If we couldn't parse a youtube URL, we can fallback to opening in new tab
  if (!embedUrl) {
    return (
      <a
        href={youtubeUrl}
        target='_blank'
        rel='noreferrer'
        className='flex items-center gap-2 bg-white/5 backdrop-blur-sm border rounded-full border-white/10 text-white/80 font-bold uppercase text-[10px] md:text-xs px-6 py-3 md:py-4 tracking-widest hover:bg-white/20 hover:text-white transition-all duration-500 cursor-pointer'
      >
        <Icon name='play' className='w-3 h-3 md:w-4 md:h-4' />
        Trailer
      </a>
    )
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='flex items-center gap-2 bg-white/5 backdrop-blur-sm border rounded-full border-white/10 text-white/80 font-bold uppercase text-[10px] md:text-xs px-6 py-3 md:py-4 tracking-widest hover:bg-white/20 hover:text-white transition-all duration-500 cursor-pointer'
      >
        <Icon name='play' className='w-3 h-3 md:w-4 md:h-4' />
        Trailer
      </button>

      {isOpen && (
        <div className='fixed inset-0 z-999 flex items-center justify-center p-4 md:p-10'>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-black/80 backdrop-blur-[10px]'
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className='relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 z-10 scale-100 animate-in fade-in zoom-in-95 duration-200'>
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className='absolute top-3 right-3 md:top-4 md:right-4 z-20 w-10 h-10 bg-black/50 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all cursor-pointer border border-white/10'
            >
              <Icon name='close' className='w-5 h-5' />
            </button>

            <iframe
              src={embedUrl}
              title='Trailer'
              className='w-full h-full border-none'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}
