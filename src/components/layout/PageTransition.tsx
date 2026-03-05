'use client'

import React, { Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Loading from '@/app/loading'

interface PageTransitionProps {
  children: React.ReactNode
}

/**
 * Inner component that accesses hooks requiring Suspense.
 */
function InnerTransition({ children }: { children: React.ReactNode }) {
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

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <Suspense fallback={<Loading />}>
      <InnerTransition>{children}</InnerTransition>
    </Suspense>
  )
}
