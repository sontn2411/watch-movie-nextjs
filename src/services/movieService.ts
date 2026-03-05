import { MovieUpdateResponse } from '@/types'
import { ResponseDataFilm, ResponseDataListCategory } from '@/types/movies'

const DOMAIN = 'https://ophim1.com'

export const slugs = [
  'phim-bo',
  'phim-le',
  'tv-shows',
  'hoat-hinh',
  'phim-vietsub',
  'phim-thuyet-minh',
  'phim-long-tien',
  'phim-bo-dang-chieu',
  'phim-bo-hoan-thanh',
  'phim-sap-chieu',
  'subteam',
  'phim-chieu-rap',
]

export const SLUG_TITLES: Record<string, string> = {
  'phim-bo': 'Phim Bộ',
  'phim-le': 'Phim Lẻ',
  'tv-shows': 'TV Shows',
  'hoat-hinh': 'Hoạt Hình',
  'phim-vietsub': 'Phim Vietsub',
  'phim-thuyet-minh': 'Phim Thuyết Minh',
  'phim-long-tien': 'Phim Lồng Tiếng',
  'phim-bo-dang-chieu': 'Phim Bộ Đang Chiếu',
  'phim-bo-hoan-thanh': 'Phim Bộ Hoàn Thành',
  'phim-sap-chieu': 'Phim Sắp Chiếu',
  subteam: 'Subteam',
  'phim-chieu-rap': 'Phim Chiếu Rạp',
}

const ALLOWED_NATIONS = [
  'Trung Quốc',
  'Hàn Quốc',
  'Nhật Bản',
  'Thái Lan',
  'Âu Mỹ',
  'Đài Loan',
  'Hồng Kông',
  'Việt Nam',
]

// Shared revalidation config
const CACHE_1H = { next: { revalidate: 3600 } }

const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, CACHE_1H)
  if (!res.ok) throw new Error(`Fetch failed: ${url} (${res.status})`)
  return res.json()
}

const fetchHomeData = () =>
  fetchJson<MovieUpdateResponse>(`${DOMAIN}/danh-sach/phim-moi-cap-nhat`)

const fetchMoviesBySlug = (
  slug: string,
  limit = 12,
  page = 1,
  category = '',
  country = '',
  year = '',
) =>
  fetchJson<ResponseDataFilm>(
    `${DOMAIN}/v1/api/danh-sach/${slug}?limit=${limit}&page=${page}&category=${category}&country=${country}&year=${year}`,
  )

const fetchListCategory = () =>
  fetchJson<ResponseDataListCategory>(`${DOMAIN}/v1/api/the-loai`)

const fetchListNation = async () => {
  const res = await fetchJson<ResponseDataListCategory>(
    `${DOMAIN}/v1/api/quoc-gia`,
  )
  if (res?.data?.items) {
    res.data.items = res.data.items.filter((item) =>
      ALLOWED_NATIONS.some(
        (allowed) => allowed.toLowerCase() === item.name.toLowerCase(),
      ),
    )
  }
  return res
}

const fetchMovieByCategory = (
  slug: string,
  limit = 24,
  page = 1,
  country = '',
  year = '',
) => {
  return fetchJson<ResponseDataFilm>(
    `${DOMAIN}/v1/api/the-loai/${slug}?limit=${limit}&page=${page}&country=${country}&year=${year}`,
  )
}

export {
  fetchHomeData,
  fetchMoviesBySlug,
  fetchListCategory,
  fetchListNation,
  fetchMovieByCategory,
}
