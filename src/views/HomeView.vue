<template>
  <div class="home">
    <Navbar />

    <HeroBanner
      v-if="highlight"
      :item="highlight"
      @prev="pickRandomHighlight"
      @next="pickRandomHighlight"
    />

    <!-- Recomendados -->
    <CarouselRow
      title="Recomendados para você"
      :items="recommended"
      see-all-link="/movies"
    />

    <section class="top10" v-if="top10 && top10.length">
  <div class="top10-header">
    <h2>Top 10 de hoje no Brasil</h2>
  </div>
  <div class="top10-list">
    <MovieCard
      v-for="(it, idx) in top10"
      :key="it.id"
      :item="it"
      :rank="idx + 1"
    />
  </div>
</section>


    <!-- Próximos lançamentos -->
<CarouselRow
  title="Em breve nos cinemas"
  :items="recentMovies"
  see-all-link="/movies/upcoming"
/>


    <CarouselRow
      title="Séries recentes"
      :items="recentSeries"
      see-all-link="/series/recent"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/NavbarGTM.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import CarouselRow from '@/components/CarrosselRow.vue'
import MovieCard from '@/components/MovieCard.vue'
import { useMoviesStore } from '@/stores/tmdb.js'
import api from '@/plugins/axios'


const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

const store = useMoviesStore()

const highlight = ref(null) // { type:'movie'|'tv', ...data, trailer: 'YTkey' }
const recentMovies = ref([])
const recentSeries = ref([])
const recommended = ref([])
const top10 = ref([])

async function fetchTop10(){
  try {
    const res = await api.get(`${BASE_URL}/trending/movie/day`, {
      params: {
        api_key: API_KEY,
        language: "pt-BR"
      }
    })
    top10.value = res.data.results.slice(0, 10)
  } catch (e){
    console.error("top10 err", e)
  }
}

async function pickRandomHighlight(){
  // fetch popular movies + series if not loaded
  if (!store.movies.length) await store.fetchPopularMovies(1)
  if (!store.series.length) await store.fetchPopularSeries(1)

  const candidates = [
    ...store.movies.map(m => ({ ...m, type:'movie' })),
    ...store.series.map(s => ({ ...s, type:'tv' }))
  ]
  if (!candidates.length) return

  const chosen = candidates[Math.floor(Math.random() * candidates.length)]
  // fetch details for trailer
  if (chosen.type === 'movie') {
    await store.fetchMovieDetails(chosen.id)
    highlight.value = { ...store.movieDetails, type:'movie', poster_path: chosen.poster_path, backdrop_path: chosen.backdrop_path, trailer: store.movieDetails.trailer }
  } else {
    await store.fetchSeriesDetails(chosen.id)
    highlight.value = { ...store.seriesDetails, type:'tv', poster_path: chosen.poster_path, backdrop_path: chosen.backdrop_path, trailer: store.seriesDetails.trailer }
  }
}

async function fetchRecommended(){
  // Recomendados universais: top by vote_average with minimum votes
  try{
    const res = await api.get(`${BASE_URL}/discover/movie`, {
      params:{
        api_key: API_KEY,
        language: 'pt-BR',
        sort_by: 'vote_average.desc',
        'vote_count.gte': 200,
        page: 1,
      }
    })
    recommended.value = res.data.results
  }catch(e){
    console.error('recommended err', e)
  }
}

  async function fetchUpcoming(){
  await store.fetchUpcomingMovies(1)
  recentMovies.value = store.upcomingMovies
}

async function fetchRecentSeries(){
  try{
    const res = await api.get(`${BASE_URL}/discover/tv`, {
      params:{
        api_key: API_KEY,
        language: 'pt-BR',
        sort_by: 'first_air_date.desc',
        page: 1,
      }
    })
    recentSeries.value = res.data.results
  }catch(e){ console.error(e) }
}

  onMounted(async () => {
    await Promise.all([
      store.fetchPopularSeries(1),
      fetchRecommended(),
      fetchUpcoming(),
      fetchRecentSeries(),
      fetchTop10(),
    ])
    await pickRandomHighlight()
  })
</script>

<style scoped>
.home{
  background: linear-gradient(180deg, #050505 0%, #000 100%);
  min-height:100vh;
  color:#fff;
}
.top10{ padding:36px 56px; }
.top10-header h2{ font-size:32px; margin:0 0 20px 0; display:flex; align-items:center; gap:12px; }
.top10-list{ display:flex; gap:28px; align-items:flex-end; overflow:hidden; padding-bottom:30px; }
</style>
