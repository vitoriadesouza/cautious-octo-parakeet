<template>
  <div class="actor-page" :style="bgStyle">
    <div class="overlay"></div>

    <div class="header">
      <img class="profile" :src="profileImage" alt="" />

      <div class="info">
        <h1>{{ actor.name }}</h1>

        <div class="sub">
          <span class="label">FILMOGRAFIA</span>
        </div>

        <div class="counts">
          <span class="movies">
            <b>{{ movies.length }}</b> Filmes
          </span>

          <span class="series">
            <b>{{ series.length }}</b> Séries
          </span>

          <span class="total">
            <b>{{ movies.length + series.length }}</b> Total
          </span>
        </div>
      </div>
    </div>

    <!-- FILMOGRAFIA -->
    <div class="filmography">
      <h2>Filmografia</h2>

      <!-- TABS -->
      <div class="tabs">
        <button :class="{ active: tab === 'all' }" @click="tab = 'all'">Todos</button>
        <button :class="{ active: tab === 'movies' }" @click="tab = 'movies'">Filmes ({{ movies.length }})</button>
        <button :class="{ active: tab === 'series' }" @click="tab = 'series'">Séries ({{ series.length }})</button>
      </div>

      <!-- GRID -->
      <div class="grid">
        <div
          v-for="item in filteredList"
          :key="item.id"
          class="card"
          @click="$router.push(`/${item.media_type}/` + item.id)"
        >
          <img :src="poster(item.poster_path)" />

          <span class="badge">
            {{ item.media_type === 'movie' ? 'FILME' : 'SÉRIE' }}
          </span>

          <h3>{{ item.title || item.name }}</h3>

          <div class="meta">
            <span>{{ (item.release_date || item.first_air_date || '').slice(0, 4) }}</span>
            <div class="rate">⭐ {{ item.vote_average?.toFixed(1) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const actor = ref({})
const movies = ref([])
const series = ref([])
const tab = ref("all")

const API = "https://api.themoviedb.org/3"
const KEY = import.meta.env.VITE_API_KEY
const IMG = "https://image.tmdb.org/t/p/w500"
const BACKDROP = "https://image.tmdb.org/t/p/original"

onMounted(async () => {
  const id = route.params.id

  // 1. Informações do ator
  const res = await fetch(`${API}/person/${id}?api_key=${KEY}&language=pt-BR`)
  actor.value = await res.json()

  // 2. Filmografia
  const resCredits = await fetch(`${API}/person/${id}/combined_credits?api_key=${KEY}&language=pt-BR`)
  const credits = await resCredits.json()

  movies.value = credits.cast.filter(c => c.media_type === "movie")
  series.value = credits.cast.filter(c => c.media_type === "tv")
})

const profileImage = computed(() =>
  actor.value.profile_path ? IMG + actor.value.profile_path : "https://via.placeholder.com/300"
)

const bgStyle = computed(() => ({
  backgroundImage: actor.value.profile_path
    ? `url(${BACKDROP + actor.value.profile_path})`
    : "none"
}))

const filteredList = computed(() => {
  if (tab.value === "movies") return movies.value
  if (tab.value === "series") return series.value
  return [...movies.value, ...series.value]
})

function poster(path) {
  return path ? IMG + path : "https://via.placeholder.com/300x450"
}
</script>


<style scoped>
.actor-page {
  position: relative;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-bottom: 80px;
}
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.75);
}
.header {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 40px;
  padding: 80px 60px 40px;
}
.profile {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #fff;
}
.info h1 {
  font-size: 55px;
  font-weight: 700;
  color: #fff;
}
.sub .label {
  color: #ccc;
  font-size: 18px;
}
.counts {
  margin-top: 15px;
  display: flex;
  gap: 25px;
  font-size: 20px;
  color: #fff;
}
.counts b {
  font-size: 24px;
}
.filmography {
  position: relative;
  z-index: 2;
  padding: 40px 60px;
  color: #fff;
}
.tabs {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}
.tabs button {
  background: #222;
  border: 1px solid #333;
  padding: 10px 22px;
  border-radius: 30px;
  color: #fff;
  cursor: pointer;
}
.tabs button.active {
  background: #fff;
  color: #000;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 25px;
  margin-top: 35px;
}
.card {
  background: #111;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}
.card img {
  width: 100%;
  height: 260px;
  object-fit: cover;
}
.card h3 {
  font-size: 17px;
  margin: 10px;
}
</style>



