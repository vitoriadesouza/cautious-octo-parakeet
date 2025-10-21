import { defineStore } from 'pinia'
import axios from 'axios'


const API_KEY = import.meta.env.VITE_API_KEY

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
    page: 1,
    total_pages: 0,
    loading: false,
    error: null,
    query: '',
  }),

  getters: {
    hasMore: (state) => state.page < state.total_pages,
    movieCount: (state) => state.movies.length,
  },

  actions: {
    async fetchPopular(page = 1) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(`/movie/popular`, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
            page,
          },
        })

        if (page === 1) this.movies = res.data.results
        else this.movies.push(...res.data.results)

        this.page = res.data.page
        this.total_pages = res.data.total_pages
      } catch (err) {
        this.error = err.response?.data?.status_message || err.message || 'Erro ao buscar filmes'
      } finally {
        this.loading = false
      }
    },

    async search(query, page = 1) {
      this.loading = true
      this.error = null
      this.query = query
      try {
        const res = await axios.get(`${BASE_URL}/search/movie`, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
            query,
            page,
          },
        })

        if (page === 1) this.movies = res.data.results
        else this.movies.push(...res.data.results)

        this.page = res.data.page
        this.total_pages = res.data.total_pages
      } catch (err) {
        this.error = err.response?.data?.status_message || err.message || 'Erro na busca'
      } finally {
        this.loading = false
      }
    },

    async loadMore() {
      if (this.loading || !this.hasMore) return
      const nextPage = this.page + 1
      if (this.query) return this.search(this.query, nextPage)
      return this.fetchPopular(nextPage)
    },

    clear() {
      this.movies = []
      this.page = 1
      this.total_pages = 0
      this.loading = false
      this.error = null
      this.query = ''
    },
  },
})





