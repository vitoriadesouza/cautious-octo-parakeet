<template>
  <div class="series-page">

    <!-- 🔍 Barra de busca -->
    <div class="search-box">
      <input
        v-model="search"
        @input="handleSearch"
        type="text"
        placeholder="Buscar série..."
      />
    </div>

    <!-- 🎛 Filtros -->
    <div class="filters">

      <!-- Range de anos duplo -->
      <div class="range-box">
        <label>Anos</label>
        <div class="range-control">
          <input type="range" v-model="yearMin" min="1950" max="2025" />
          <input type="range" v-model="yearMax" min="1950" max="2025" />
        </div>
        <div class="year-values">{{ yearMin }} - {{ yearMax }}</div>
      </div>

      <!-- Select de gênero -->
      <div class="select-box">
        <label>Gênero</label>
        <select v-model="selectedGenre">
          <option value="">Todos</option>
          <option v-for="g in genres" :key="g.id" :value="g.id">
            {{ g.name }}
          </option>
        </select>
      </div>

      <!-- Ordenação -->
      <div class="select-box">
        <label>Ordenar</label>
        <select v-model="order">
          <option value="desc">Mais recentes</option>
          <option value="asc">Mais antigos</option>
        </select>
      </div>

    </div>

    <!-- 📺 Grid de séries -->
    <div class="grid">
      <div
        class="card"
        v-for="serie in filteredSeries"
        :key="serie.id"
      >
        <img
          :src="serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : '/no-image.png'"
          alt="poster"
        />

        <div class="tag">SÉRIE</div>
        <h3>{{ serie.name }}</h3>
        <p>{{ serie.first_air_date?.slice(0, 4) || '---' }}</p>
      </div>
    </div>

    <!-- load more -->
    <div class="load-more" v-if="store.hasMore && !store.loading">
      <button @click="loadMoreSeries">Carregar mais</button>
    </div>

    <div class="loading" v-if="store.loading">
      Carregando...
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMoviesStore } from '@/stores/tmdb.js'
import api from '@/plugins/axios'

const store = useMoviesStore()

// busca
const search = ref('')

// filtros
const yearMin = ref(1950)
const yearMax = ref(2025)
const selectedGenre = ref('')
const order = ref('desc')

// lista de gêneros da API
const genres = ref([])

// puxar gêneros
async function fetchGenres() {
  const res = await api.get(`/genre/tv/list`, {
    params: {
      api_key: import.meta.env.VITE_API_KEY,
      language: 'pt-BR'
    }
  })
  genres.value = res.data.genres
}

// carregar séries iniciais
onMounted(async () => {
  await Promise.all([
    store.fetchPopularSeries(1),
    fetchGenres()
  ])
})

// buscar dinamicamente
function handleSearch() {
  if (!search.value) {
    store.fetchPopularSeries(1)
    return
  }

  store.searchSeries(search.value)
}

// load more
function loadMoreSeries() {
  store.loadMore('series')
}

// aplicar filtros
const filteredSeries = computed(() => {
  return store.series
    .filter(s => {
      const year = parseInt(s.first_air_date?.slice(0, 4)) || 0

      return (
        year >= yearMin.value &&
        year <= yearMax.value &&
        (selectedGenre.value
          ? s.genre_ids.includes(parseInt(selectedGenre.value))
          : true)
      )
    })
    .sort((a, b) => {
      const yearA = parseInt(a.first_air_date?.slice(0, 4)) || 0
      const yearB = parseInt(b.first_air_date?.slice(0, 4)) || 0
      return order.value === 'asc' ? yearA - yearB : yearB - yearA
    })
})
</script>

<style scoped>
.series-page {
  width: 100%;
  padding: 20px;
  color: white;
}

/* busca */
.search-box input {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  background: #1a1a1a;
  color: white;
  font-size: 16px;
  margin-bottom: 25px;
}

/* filtros */
.filters {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 25px;
}

.select-box,
.range-box {
  display: flex;
  flex-direction: column;
}

.select-box select {
  padding: 10px;
  border-radius: 8px;
  background: #1a1a1a;
  color: white;
  border: none;
}

/* range duplo */
.range-control {
  display: flex;
  gap: 10px;
}

.range-control input[type="range"] {
  width: 130px;
}

.year-values {
  margin-top: 5px;
  font-size: 14px;
  color: #bbbbbb;
}

/* grid de cards */
.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
}

.card {
  background: #111;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  transition: 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 8px;
}

.card .tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: red;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
}

.card h3 {
  margin-top: 10px;
  font-size: 15px;
}

.card p {
  color: #aaa;
  font-size: 13px;
}

/* load more */
.load-more {
  margin-top: 30px;
  text-align: center;
}

.load-more button {
  padding: 12px 20px;
  background: #d80a0a;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 15px;
}

.loading {
  text-align: center;
  margin-top: 20px;
}
</style>
