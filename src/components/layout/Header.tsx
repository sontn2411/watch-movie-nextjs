import { headers } from 'next/headers'
import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'
import { isMobileDevice } from '@/utils/device'
import { fetchListCategory, fetchListNation } from '@/services/movieService'

export default async function Header() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''

  const [listCategory, listNation] = await Promise.all([
    fetchListCategory(),
    fetchListNation(),
  ])

  const categories = listCategory?.data?.items ?? []
  const nations = listNation?.data?.items ?? []

  const isMobile = isMobileDevice(userAgent)

  return isMobile ? (
    <MobileHeader categories={categories} nations={nations} />
  ) : (
    <DesktopHeader categories={categories} nations={nations} />
  )
}
