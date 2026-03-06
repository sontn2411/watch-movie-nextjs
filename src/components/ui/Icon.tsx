import React from 'react'

export type IconName =
  | 'play'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'clock'
  | 'plus'
  | 'filter'
  | 'search'
  | 'menu'
  | 'close'
  | 'user'
  | 'sort'
  | 'loader'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName
}

export default function Icon({ name, className, ...props }: IconProps) {
  switch (name) {
    case 'play':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className={className}
          {...props}
        >
          <path
            fillRule='evenodd'
            d='M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z'
            clipRule='evenodd'
          />
        </svg>
      )
    case 'chevron-left':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className={className}
          {...props}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 19.5L8.25 12l7.5-7.5'
          />
        </svg>
      )
    case 'chevron-right':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className={className}
          {...props}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 4.5l7.5 7.5-7.5 7.5'
          />
        </svg>
      )
    case 'chevron-down':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className={className}
          {...props}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m19 9-7 7-7-7'
          />
        </svg>
      )
    case 'clock':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.8}
          stroke='currentColor'
          className={className}
          {...props}
        >
          <circle cx='12' cy='12' r='10' />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 6v6l3.5 3.5'
          />
        </svg>
      )
    case 'plus':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className={className}
          {...props}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
      )
    case 'filter':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className={className}
          {...props}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3 6h18M7 12h10M10 18h4'
          />
        </svg>
      )
    case 'search':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className={className}
          {...props}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      )
    case 'menu':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className={className}
          {...props}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      )
    case 'close':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className={className}
          {...props}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      )
    case 'user':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className={className}
          {...props}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
          />
        </svg>
      )
    case 'sort':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className={className}
          {...props}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m9-9l4.5 4.5m0 0l4.5-4.5M21 12v9'
          />
        </svg>
      )
    case 'loader':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className={className}
          {...props}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M7.757 16.243l-2.121 2.121M16.243 16.243l2.121 2.121M7.757 7.757L5.636 5.636'
          />
        </svg>
      )
    default:
      return null
  }
}
