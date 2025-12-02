<template>
  <router-view />
</template>

<script setup>
import { useMoviesStore } from '@/stores/tmdb'

const movies_store = useMoviesStore()

import { onMounted } from 'vue'

onMounted(() => {
  movies_store.fetchUpcomingMovies()
})
</script>

<style>
</style>
