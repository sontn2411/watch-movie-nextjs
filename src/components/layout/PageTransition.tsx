'use client'

import React, { Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Loading from '@/app/loading'

interface PageTransitionProps {
  children: React.ReactNode
}

/**
 * PageTransition wrapper that forces the Suspense boundary to re-suspend
 * whenever the pathname or search parameters change.
 * This ensures the global loading.tsx is shown on every navigation.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Create a unique key based on the full URL path and query string
  const key = `${pathname}?${searchParams.toString()}`

  return (
    <Suspense key={key} fallback={<Loading />}>
      <div className='page-fade-in'>{children}</div>
    </Suspense>
  )
}
