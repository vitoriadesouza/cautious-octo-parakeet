import { defineStore } from 'pinia'
import api from '@/plugins/axios'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://api.themoviedb.org/3'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [],
    upcomingMovies: [],
    movieDetails: {},
    series: [],
    seriesDetails: {},
    moviePage: 1,
    movieTotalPages: 0,
    seriesPage: 1,
    seriesTotalPages: 0,
    upcomingPage: 1,
    upcomingTotalPages: 0,
    query: '',
    loading: false,
    error: null,
  }),

  getters: {
    hasMoreMovies: (s) => s.moviePage < s.movieTotalPages,
    hasMoreSeries: (s) => s.seriesPage < s.seriesTotalPages,
    hasMoreUpcoming: (s) => s.upcomingPage < s.upcomingTotalPages,
  },

  actions: {
    async fetchPopularMovies(page = 1) {
      this.loading = true
      this.error = null
      try {
        const res = await api.get(`${BASE_URL}/movie/popular`, {
          params: { api_key: API_KEY, language: 'pt-BR', page },
        })

        if (page === 1) this.movies = res.data.results
        else this.movies.push(...res.data.results)

        this.moviePage = res.data.page
        this.movieTotalPages = res.data.total_pages
      } catch (err) {
        this.error = err.response?.data?.status_message || err.message
      } finally {
        this.loading = false
      }
    },

async fetchRecentSeries(page = 1) {
  this.loading = true;
  this.error = null;

  try {
    const res = await api.get(`${BASE_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        language: "pt-BR",
        sort_by: "popularity.desc",
        "first_air_date.gte": "2010-01-01",
        "first_air_date.lte": new Date().toISOString().slice(0, 10),
        "vote_average.gte": 7,
        "vote_count.gte": 500,
        with_origin_country: "US|GB|BR",
        page,
      },
    });

    const cleanResults = res.data.results.filter(
      s => s.poster_path && s.first_air_date
    );

    if (page === 1) this.series = cleanResults;
    else this.series.push(...cleanResults);

    this.seriesPage = res.data.page;
    this.seriesTotalPages = res.data.total_pages;
  } catch (err) {
    this.error = err.response?.data?.status_message || err.message;
  } finally {
    this.loading = false;
  }
},

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

        this.upcomingPage = res.data.page
        this.upcomingTotalPages = res.data.total_pages
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

        this.moviePage = res.data.page
        this.movieTotalPages = res.data.total_pages
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

        this.seriesPage = res.data.page
        this.seriesTotalPages = res.data.total_pages
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
          generos: res.data.genres.map(g => g.name),
          nota: res.data.vote_average,
          poster: res.data.poster_path,
          backdrop: res.data.backdrop_path,
          atores: res.data.credits.cast.slice(0, 5).map(a => a.name),
          trailer: res.data.videos.results.find(v => v.type === 'Trailer')?.key || null,
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
          generos: res.data.genres.map(g => g.name),
          nota: res.data.vote_average,
          poster: res.data.poster_path,
          backdrop: res.data.backdrop_path,
          atores: res.data.credits.cast.slice(0, 5).map(a => a.name),
          trailer: res.data.videos.results.find(v => v.type === 'Trailer')?.key || null,
        }
      } catch (err) {
        this.error = err.response?.data?.status_message || err.message
      } finally {
        this.loading = false
      }
    },

    async loadMore(type = 'movie') {
      if (this.loading) return

      if (type === 'movie') {
        const next = this.moviePage + 1
        if (next <= this.movieTotalPages) {
          if (this.query) return this.searchMovies(this.query, next)
          return this.fetchPopularMovies(next)
        }
      }

      if (type === 'series') {
        const next = this.seriesPage + 1
        if (next <= this.seriesTotalPages) {
          if (this.query) return this.searchSeries(this.query, next)
          return this.fetchPopularSeries(next)
        }
      }

      if (type === 'upcoming') {
        const next = this.upcomingPage + 1
        if (next <= this.upcomingTotalPages) {
          return this.fetchUpcomingMovies(next)
        }
      }

    },
async fetchMovieVideos(id) {
  try {
    const res = await api.get(`${BASE_URL}/movie/${id}/videos`, {
      params: {
        api_key: API_KEY,
        language: "pt-BR",
      },
    });
    return res.data.results;
  } catch (err) {
    console.warn("Erro ao carregar vídeos do filme:", err);
    return [];
  }
},

async fetchSeriesVideos(id) {
  try {
    const res = await api.get(`${BASE_URL}/tv/${id}/videos`, {
      params: {
        api_key: API_KEY,
        language: "pt-BR",
      },
    });
    return res.data.results;
  } catch (err) {
    console.warn("Erro ao carregar vídeos da série:", err);
    return [];
  }
},


    clear() {
      this.movies = []
      this.series = []
      this.upcomingMovies = []

      this.moviePage = 1
      this.seriesPage = 1
      this.upcomingPage = 1

      this.movieTotalPages = 0
      this.seriesTotalPages = 0
      this.upcomingTotalPages = 0

      this.query = ''
      this.movieDetails = {}
      this.seriesDetails = {}
      this.error = null
      this.loading = false
    },
  },
})
