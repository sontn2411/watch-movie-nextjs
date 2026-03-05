export interface ImdbType {
  id: string
  vote_average: number
  vote_count: number
}

export interface TmdbType {
  id: string
  season: number
  type: string
  vote_count: number
  vote_average: number
}

// OPhim API Types
export interface MovieUpdateItem {
  _id: string
  name: string
  slug: string
  origin_name: string
  poster_url: string
  thumb_url: string
  year: number
  modified: {
    time: string
  }
  imdb: ImdbType
  tmdb: TmdbType
}

export interface MovieUpdateResponse {
  status: boolean
  items: MovieUpdateItem[]
  pathImage: string
  pagination: {
    totalItems: number
    totalItemsPerPage: number
    currentPage: number
    totalPages: number
  }
}
