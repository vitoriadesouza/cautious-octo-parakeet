<template>
  <div class="movies-page">
    <Navbar />
    <header class="header">
      <h1>Filmes</h1>

      <button class="category-btn" @click="toggleCategories">
        Categorias ▾
      </button>
    </header>

    <div v-if="showCategories" class="categories-panel">
      <div class="genre"
        v-for="g in genres"
        :key="g.id"
      >
        <input
          type="checkbox"
          :value="g.id"
          v-model="selectedGenres"
        >
        <label>{{ g.name }}</label>
      </div>

      <button class="apply-btn" @click="applyFilters">
        Aplicar filtros
      </button>
    </div>
    <div class="grid">
      <div
        class="movie-card"
        v-for="movie in movies"
        :key="movie.id"
        @click="goToMovie(movie.id)"
      >
        <img
          :src="IMAGE + movie.poster_path"
          :alt="movie.title"
        />
        <p class="title">{{ movie.title }}</p>
      </div>
    </div>
    <div class="load-more-container" v-if="hasMore">
      <button class="load-more-btn" @click="loadMore">
        Carregar mais
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import Navbar from "@/components/NavbarGTM.vue"
import api from "@/plugins/axios"

const router = useRouter()
const IMAGE = "https://image.tmdb.org/t/p/w500"
const API_KEY = import.meta.env.VITE_API_KEY
const BASE = "https://api.themoviedb.org/3"

const movies = ref([])
const page = ref(1)
const totalPages = ref(1)

const genres = ref([])
const selectedGenres = ref([])

const showCategories = ref(false)

function toggleCategories() {
  showCategories.value = !showCategories.value
}

async function loadGenres() {
  const res = await api.get(`${BASE}/genre/movie/list`, {
    params: { api_key: API_KEY, language: "pt-BR" }
  })
  genres.value = res.data.genres
}

async function loadMovies(reset = false) {
  const res = await api.get(`${BASE}/discover/movie`, {
    params: {
      api_key: API_KEY,
      language: "pt-BR",
      page: page.value,
      with_genres: selectedGenres.value.join(",") || undefined,
      sort_by: "popularity.desc",
    }
  })

  totalPages.value = res.data.total_pages

  if (reset) {
    movies.value = res.data.results
  } else {
    movies.value.push(...res.data.results)
  }
}

function applyFilters() {
  page.value = 1
  loadMovies(true)
}

function loadMore() {
  if (page.value < totalPages.value) {
    page.value++
    loadMovies()
  }
}

function goToMovie(id) {
  router.push(`/movie/${id}`)
}

const hasMore = computed(() => page.value < totalPages.value)

onMounted(async () => {
  await loadGenres()
  await loadMovies(true)
})
</script>

<style scoped>
.movies-page {
  padding: 30px;
  color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-btn {
  background: #e50914;
  padding: 10px 16px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 6px;
}

.categories-panel {
  background: #111;
  padding: 16px;
  border-radius: 8px;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.genre {
  display: flex;
  gap: 8px;
  align-items: center;
}

.apply-btn {
  grid-column: 1 / -1;
  margin-top: 10px;
  padding: 10px;
  background: #e50914;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
}

.grid {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.movie-card {
  cursor: pointer;
  transition: transform .2s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  border-radius: 8px;
}

.title {
  margin-top: 6px;
  font-size: 17px;
  font-weight: 600;
}


.load-more-container {
  text-align: center;
  margin-top: 30px;
}

.load-more-btn {
  background: #e50914;
  color: #fff;
  border: none;
  padding: 12px 18px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: .2s;
}

.load-more-btn:hover {
  transform: scale(1.05);
}
</style>
