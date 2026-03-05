import { ImdbType, TmdbType } from '.'

export interface Pagination {
  currentPage: number
  pageRanges: number
  totalItems: number
  totalItemsPerPage: number
}

export interface CategoryItemType {
  id: string
  name: string
  slug: string
}

export interface CountryItemType {
  id: string
  name: string
  slug: string
}

export interface FilmItem {
  tmdb: TmdbType
  imdb: ImdbType
  _id: string
  name: string
  slug: string
  origin_name: string
  alternative_names: string[]
  type: string
  thumb_url: string
  sub_docquyen: boolean
  time: string
  episode_current: string
  quality: string
  lang: string
  year: number
  category: CategoryItemType[]
  country: CountryItemType[]
  poster_url: string
}

export interface dataFilm {
  type_list: string
  APP_DOMAIN_FRONTEND: string
  APP_DOMAIN_CDN_IMAGE: string
  params: {
    type_slug: string
    pagination: Pagination
  }
  items: FilmItem[]
  titlePage: string
}

export interface ResponseDataFilm {
  status: boolean
  message: string
  data: dataFilm
}

interface ServerDataItem {
  name: string
  slug: string
  fileName: string
  link_embed: string
  link_m3u8: string
}

export interface episodeItem {
  server_name: string
  server_data: ServerDataItem[]
}

export interface DataDetailFilm extends FilmItem {
  content: string
  status: string
  trailer_url: string
  episode_total: string
  view: number
  actor: string[]
  director: string[]
  category: CategoryItemType[]
  country: CountryItemType[]
  episodes: episodeItem[]
}

export interface ResponseDataFilmDetail {
  status: boolean
  message: string
  data: {
    type_list: string
    APP_DOMAIN_FRONTEND: string
    APP_DOMAIN_CDN_IMAGE: string
    params: {
      type_slug: string
      pagination: Pagination
    }
    item: DataDetailFilm
  }
}

export interface ImageSizes {
  original: string
  w1280: string
  w300: string
  w780: string
}

export interface ImageSizesPoster {
  original: string
  w154: string
  w185: string
  w342: string
  w500: string
  w780: string
  w92: string
}

export interface imageItem {
  width: number
  height: number
  aspect_ratio: number
  type: string
  file_path: string
}

export interface ResponseDataFilmPeoples {
  status: boolean
  message: string
  data: {
    image_sizes: {
      backdrop: ImageSizes
      poster: ImageSizesPoster
    }
    peoples: PeopleItem[]
  }
}

interface PeopleItem {
  character: string
  gender: number
  gender_name: string
  known_for_department: string
  name: string
  original_name: string
  profile_path: string
  tmdb_people_id: number
  adult: boolean
  also_known_as: string[]
}

export interface ItemData {
  _id: string
  name: string
  slug: string
}

export interface ResponseDataListCategory {
  status: boolean
  message: string
  data: {
    items: ItemData[]
  }
}

export interface ResponseDataFilmImage {
  status: boolean
  message: string
  data: {
    imdb_id: string
    ophim_id: string
    slug: string
    tmdb_id: number
    tmdb_season: number
    tmdb_type: string
    image_sizes: {
      backdrop: ImageSizes
      poster: ImageSizesPoster
    }
    images: imageItem[]
  }
}
