import { useState, useEffect } from 'react'
import { FilmItem } from '@/types/movies'
import { fetchSearchMovie } from '@/services/movieService'
import { useDebounce } from './useDebounce'

export function useSearch(limit: number = 5) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<FilmItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debouncedSearch = useDebounce(searchQuery, 400)

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearch.trim().length > 1) {
        setIsLoading(true)
        try {
          const res = await fetchSearchMovie(debouncedSearch, 1, limit)
          if (res?.data?.items) {
            setSearchResults(res.data.items)
          } else {
            setSearchResults([])
          }
        } catch (error) {
          console.error('Search error:', error)
          setSearchResults([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setSearchResults([])
      }
    }

    fetchResults()
  }, [debouncedSearch, limit])

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    debouncedSearch,
  }
}
