<template>
  <nav class="navbar">
    <div class="left">
      <h1 class="logo" @click="goHome">GT Movies</h1>

      <router-link to="/">Home</router-link>
      <router-link to="/movies">Filmes</router-link>
      <router-link to="/series">Séries</router-link>
    </div>

    <div class="center">
      <div class="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          class="search-box"
          v-model="query"
          @input="fetchSuggestions"
          @keyup.enter="goToSearch"
        >

        <div class="dropdown" v-if="suggestions.length > 0">
          <div
            v-for="item in suggestions"
            :key="item.id"
            class="suggestion"
            @click="goToItem(item)"
          >
            <img :src="imageBase + item.poster_path" />
            <span>{{ item.title || item.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="right"></div>
  </nav>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const query = ref("")
const suggestions = ref([])

const API = "https://api.themoviedb.org/3"
const KEY = import.meta.env.VITE_API_KEY
const imageBase = "https://image.tmdb.org/t/p/w92"

async function fetchSuggestions() {
  if (query.value.trim().length < 2) {
    suggestions.value = []
    return
  }

  const url = `${API}/search/multi?api_key=${KEY}&language=pt-BR&query=${query.value}`
  const response = await fetch(url)
  const data = await response.json()

  suggestions.value = data.results
    .filter(i => (i.media_type === "movie" || i.media_type === "tv") && i.poster_path)
    .slice(0, 5)
}

function goToSearch() {
  if (!query.value.trim()) return
  router.push(`/search?query=${query.value}`)
  suggestions.value = []
}

function goToItem(item) {
  if (item.media_type === "movie") {
    router.push(`/movie/${item.id}`)
  } else {
    router.push(`/series/${item.id}`)
  }
  query.value = ""
  suggestions.value = []
}

function goHome() {
  router.push("/")
}
</script>

<style scoped>
.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 40px;
  background: #000;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.left {
  display: flex;
  align-items: center;
  gap: 22px;
  min-width: 300px;
}

.logo {
  font-size: 32px;
  font-weight: bold;
  color: #e50914;
  cursor: pointer;
}

a {
  color: white;
  font-size: 18px;
  text-decoration: none;
}

a.router-link-active {
  text-decoration: underline;
}

.center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-container {
  position: relative;
  width: 320px;
}

.search-box {
  background: #111;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #222;
  color: #fff;
  width: 100%;
  font-size: 16px;
}

.right {
  min-width: 300px;
}

.dropdown {
  position: absolute;
  top: 45px;
  width: 100%;
  background: #111;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.4);
}

.suggestion {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  cursor: pointer;
  color: white;
}

.suggestion:hover {
  background: #222;
}

.suggestion img {
  width: 40px;
  border-radius: 4px;
}
.navbar {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 18px 40px;
  background: #000;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.left {
  display: flex;
  align-items: center;
  gap: 22px;
  justify-content: flex-start;
}

.logo {
  font-size: 32px;
  font-weight: bold;
  color: #e50914;
  cursor: pointer;
}

a {
  color: white;
  font-size: 18px;
  text-decoration: none;
}

a.router-link-active {
  text-decoration: underline;
}

.center {
  display: flex;
  justify-content: center;
}

.search-container {
  position: relative;
  width: 380px;
}

.search-box {
  background: #111;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #222;
  color: #fff;
  width: 100%;
  font-size: 16px;
}

.right {
  display: flex;
  justify-content: flex-end;
}

.dropdown {
  position: absolute;
  top: 45px;
  width: 100%;
  background: #111;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.4);
}

.suggestion {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  cursor: pointer;
  color: white;
}

.suggestion:hover {
  background: #222;
}

.suggestion img {
  width: 40px;
  border-radius: 4px;
}

</style>
