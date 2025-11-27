<template>
  <div class="page">
    <h1>Séries</h1>

    <div v-if="moviesStore.loading" class="loading">Carregando...</div>
    <div v-else class="grid">
      <MovieCard
        v-for="s in moviesStore.series"
        :key="s.id"
        :item="s"
        type="tv"
      />
    </div>

    <button
      v-if="moviesStore.hasMore && !moviesStore.loading"
      @click="loadMore"
      class="load-more"
    >
      Carregar mais
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMoviesStore } from '@/stores/tmdb'
import MovieCard from '@/components/MovieCard.vue'

const moviesStore = useMoviesStore()

onMounted(() => {
  moviesStore.clear()
  moviesStore.fetchPopularSeries()
})

function loadMore() {
  moviesStore.loadMore('tv')
}
</script>

<style scoped>
.page {
  padding: 32px;
  color: white;
}

.grid {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.load-more {
  margin: 20px auto;
  display: block;
  padding: 12px 24px;
  font-size: 16px;
  background: #d81f26;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
</style>

