'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Hls from 'hls.js'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Loader2,
} from 'lucide-react'

interface VideoPlayerProps {
  urlM3U8: string
  urlEmbed: string
  poster?: string
}

export default function VideoPlayer({
  urlM3U8,
  urlEmbed,
  poster,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hlsError, setHlsError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Format time (seconds -> mm:ss)
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00'
    const m = Math.floor(timeInSeconds / 60)
    const s = Math.floor(timeInSeconds % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Handle HLS Setup
  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    let hls: Hls | null = null

    if (Hls.isSupported() && urlM3U8) {
      hls = new Hls({
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
      })

      hls.loadSource(urlM3U8)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false)
      })

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error('HLS Fatal Error:', data)
          setHlsError(true)
        }
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl') && urlM3U8) {
      // For Safari native HLS support
      video.src = urlM3U8
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false)
      })
      video.addEventListener('error', () => {
        setHlsError(true)
      })
    } else {
      // Fallback to embed
      setHlsError(true)
    }

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [urlM3U8])

  // Mouse move timeout for controls
  const handleMouseMove = useCallback(() => {
    setIsHovering(true)
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current)
    }
    if (isPlaying) {
      hideControlsTimeoutRef.current = setTimeout(() => {
        setIsHovering(false)
      }, 3000)
    }
  }, [isPlaying])

  useEffect(() => {
    if (!isPlaying) {
      setIsHovering(true)
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current)
      }
    } else {
      handleMouseMove()
    }
  }, [isPlaying, handleMouseMove])

  // Video Events
  const handlePlayPause = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    setCurrentTime(videoRef.current.currentTime)
    setDuration(videoRef.current.duration)
  }

  const handleProgressScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return
    const time = Number(e.target.value)
    videoRef.current.currentTime = time
    setCurrentTime(time)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return
    const vol = Number(e.target.value)
    videoRef.current.volume = vol
    setVolume(vol)
    setIsMuted(vol === 0)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    const newMuted = !isMuted
    videoRef.current.muted = newMuted
    setIsMuted(newMuted)
    if (newMuted) {
      videoRef.current.volume = 0
      setVolume(0)
    } else {
      videoRef.current.volume = 1
      setVolume(1)
    }
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Handle Fullscreen Exit by Esc Key
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // If HLS fails, fallback to standard IFrame
  if (hlsError || !urlM3U8) {
    return (
      <div className='relative aspect-video w-full bg-black lg:rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5'>
        <iframe
          src={urlEmbed}
          className='absolute inset-0 w-full h-full'
          allowFullScreen
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className='relative aspect-video w-full bg-black lg:rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5 group'
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setIsHovering(false)}
    >
      <video
        ref={videoRef}
        className='absolute inset-0 w-full h-full object-contain'
        poster={poster}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onClick={handlePlayPause}
        playsInline
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10 pointer-events-none'>
          <Loader2 className='w-12 h-12 text-primary animate-spin' />
        </div>
      )}

      {/* Main Center Play/Pause button for inactive state */}
      {!isPlaying && !isLoading && (
        <div
          className='absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10 cursor-pointer transition-opacity duration-300'
          onClick={handlePlayPause}
        >
          <div className='w-20 h-20 bg-primary/80 rounded-full flex items-center justify-center text-white backdrop-blur-md shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transform scale-100 group-hover:scale-110 transition-transform duration-300'>
            <Play className='w-10 h-10 ml-1' fill='currentColor' />
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      <div
        className={`absolute inset-x-0 bottom-0 px-4 pb-4 pt-24 bg-linear-to-t from-black/90 via-black/40 to-transparent z-20 transition-opacity duration-300 flex flex-col justify-end ${
          isHovering ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Bar */}
        <div className='w-full flex items-center gap-3 mb-4 cursor-pointer group/progress'>
          <span className='text-xs font-medium tracking-wider text-white/70'>
            {formatTime(currentTime)}
          </span>
          <div className='relative flex-1 h-1.5 bg-white/20 rounded-full overflow-visible flex items-center group-hover/progress:h-2.5 transition-all'>
            <input
              type='range'
              min='0'
              max={duration || 100}
              value={currentTime}
              onChange={handleProgressScrub}
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30'
            />
            <div
              className='absolute top-0 left-0 h-full bg-primary rounded-full pointer-events-none shadow-[0_0_10px_var(--primary)]'
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className='text-xs font-medium tracking-wider text-white/70'>
            {formatTime(duration)}
          </span>
        </div>

        {/* Bottom Controls */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              className='text-white hover:text-primary transition-colors p-1'
            >
              {isPlaying ? (
                <Pause className='w-6 h-6' fill='currentColor' />
              ) : (
                <Play className='w-6 h-6' fill='currentColor' />
              )}
            </button>

            {/* Volume Control */}
            <div className='flex items-center gap-2 group/volume'>
              <button
                onClick={toggleMute}
                className='text-white hover:text-primary transition-colors p-1'
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className='w-6 h-6' />
                ) : (
                  <Volume2 className='w-6 h-6' />
                )}
              </button>
              <div className='w-0 overflow-hidden group-hover/volume:w-24 transition-all duration-300 ease-out flex items-center'>
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='0.05'
                  value={volume}
                  onChange={handleVolumeChange}
                  className='w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary'
                />
              </div>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className='text-white hover:text-primary transition-colors p-1'
            >
              {isFullscreen ? (
                <Minimize className='w-6 h-6' />
              ) : (
                <Maximize className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
