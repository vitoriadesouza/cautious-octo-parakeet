<template>
  <router-view />
</template>

<script setup>
import api from '@/plugins/axios'
import { useMoviesStore } from './stores/tmdb'

const movies_store = useMoviesStore()
movies_store.fetchUpcomingMovies()
movies_store.fetchPopularSeries()
</script>


<style>

</style>
