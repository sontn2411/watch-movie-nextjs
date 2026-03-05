import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import Header from '@/components/layout/Header'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'WatchMov — Xem Phim Online Miễn Phí',
  description:
    'Xem phim bộ, phim lẻ, TV shows, hoạt hình vietsub, thuyết minh lồng tiếng chất lượng cao. Cập nhật phim mới nhất mỗi ngày.',
  keywords: 'xem phim online, phim vietsub, phim thuyết minh, phim bộ, phim lẻ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='vi'>
      <body className={`${geistSans.variable} antialiased pb-20`}>
        <Header />
        <main className='min-h-screen page-fade-in'>{children}</main>
      </body>
    </html>
  )
}
