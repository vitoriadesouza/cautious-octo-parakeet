import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import UpcomingMoviesView from '@/views/UpcomingMoviesView.vue'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://api.themoviedb.org/3'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
    series: [],
    UpcomingMovies: [],
    movieDetails: {},
    seriesDetails: {},
    page: 1,
    total_pages: 0,
    loading: false,
    error: null,
    query: '',
  }),

  getters: {
    hasMore: (state) => state.page < state.total_pages,
    totalMovies: (state) => state.movies.length,
    totalSeries: (state) => state.series.length,
  },

  actions: {

    async fetchUpcomingMovies(page = 1) {
  this.loading = true
  this.error = null
  try {
    const res = await api.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        language: 'pt-BR',
        page,
        region: 'BR',
      },
    })

    if (page === 1) this.upcomingMovies = res.data.results
    else this.upcomingMovies.push(...res.data.results)

    this.page = res.data.page
    this.total_pages = res.data.total_pages
  } catch (err) {
    this.error = err.response?.data?.status_message || err.message
  } finally {
    this.loading = false
  }
}

    },

    async fetchPopularMovies(page = 1) {
  this.loading = true
  this.error = null
  try {
    const res = await api.get(`${BASE_URL}/movie/popular`, {
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
    this.error = err.response?.data?.status_message || err.message
  } finally {
    this.loading = false
  }
},

    async fetchPopularSeries(page = 1) {
      this.loading = true
      this.error = null
      try {
        const res = await api.get(`${BASE_URL}/discover/tv`, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
            include_adult: false,
            include_null_first_air_dates: false,
            sort_by: 'popularity.desc',
            page,
          },
        })

        if (page === 1) this.series = res.data.results
        else this.series.push(...res.data.results)

        this.page = res.data.page
        this.total_pages = res.data.total_pages
      } catch (err) {
        this.error = err.response?.data?.status_message || err.message
      } finally {
        this.loading = false
      }
    },

  async fetchPopularMovies(page = 1) {
  this.loading = true
  this.error = null
  try {
    const res = await api.get(`${BASE_URL}/movie/popular`, {
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
    this.error = err.response?.data?.status_message || err.message
  } finally {
    this.loading = false
  }
},

    async searchMovies(query, page = 1) {
      this.loading = true
      this.error = null
      this.query = query
      try {
        const res = await api.get(`${BASE_URL}/search/movie`, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
            query,
            page,
            include_adult: false,
          },
        })

        if (page === 1) this.movies = res.data.results
        else this.movies.push(...res.data.results)

        this.page = res.data.page
        this.total_pages = res.data.total_pages
      } catch (err) {
        this.error = err.response?.data?.status_message || err.message
      } finally {
        this.loading = false
      }
    },

    async searchSeries(query, page = 1) {
      this.loading = true
      this.error = null
      this.query = query
      try {
        const res = await api.get(`${BASE_URL}/search/tv`, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
            query,
            page,
            include_adult: false,
          },
        })

        if (page === 1) this.series = res.data.results
        else this.series.push(...res.data.results)

        this.page = res.data.page
        this.total_pages = res.data.total_pages
      } catch (err) {
        this.error = err.response?.data?.status_message || err.message
      } finally {
        this.loading = false
      }
    },

    async fetchMovieDetails(id) {
      this.loading = true
      this.error = null
      try {
        const res = await api.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
            append_to_response: 'credits,videos',
          },
        })

        this.movieDetails = {
          id: res.data.id,
          titulo: res.data.title,
          descricao: res.data.overview,
          lancamento: res.data.release_date,
          duracao: res.data.runtime,
          generos: res.data.genres.map((g) => g.name),
          nota: res.data.vote_average,
          poster: res.data.poster_path,
          backdrop: res.data.backdrop_path,
          atores: res.data.credits.cast.slice(0, 5).map((a) => a.name),
          trailer: res.data.videos.results.find((v) => v.type === 'Trailer')?.key || null,
        }
      } catch (err) {
        this.error = err.response?.data?.status_message || err.message
      } finally {
        this.loading = false
      }
    },

    async fetchSeriesDetails(id) {
      this.loading = true
      this.error = null
      try {
        const res = await api.get(`${BASE_URL}/tv/${id}`, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
            append_to_response: 'credits,videos',
          },
        })

        this.seriesDetails = {
          id: res.data.id,
          titulo: res.data.name,
          descricao: res.data.overview,
          lancamento: res.data.first_air_date,
          temporadas: res.data.number_of_seasons,
          episodios: res.data.number_of_episodes,
          generos: res.data.genres.map((g) => g.name),
          nota: res.data.vote_average,
          poster: res.data.poster_path,
          backdrop: res.data.backdrop_path,
          atores: res.data.credits.cast.slice(0, 5).map((a) => a.name),
          trailer: res.data.videos.results.find((v) => v.type === 'Trailer')?.key || null,
        }
      } catch (err) {
        this.error = err.response?.data?.status_message || err.message
      } finally {
        this.loading = false
      }
    },

    async loadMore(contentType = 'movie') {
      if (this.loading || !this.hasMore) return
      const nextPage = this.page + 1

      if (contentType === 'movie') {
        if (this.query) await this.searchMovies(this.query, nextPage)
        else await this.fetchUpcomingMovies(nextPage) // 👈 ALTERADO AQUI
      } else {
        if (this.query) await this.searchSeries(this.query, nextPage)
        else await this.fetchPopularSeries(nextPage)
      }
    },

    clear() {
      this.movies = []
      this.series = []
      this.page = 1
      this.total_pages = 0
      this.loading = false
      this.error = null
      this.query = ''
      this.movieDetails = {}
      this.seriesDetails = {}
    },
  },
)
