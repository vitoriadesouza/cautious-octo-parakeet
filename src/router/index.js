import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import MoviesPage from '@/views/MoviesView.vue'
import SeriesPage from '@/views/SeriesView.vue'
import MovieDetailsView from '@/views/MovieDetailsView.vue'
import SeriesDetailsView from '@/views/SeriesDetailsView.vue'
import ActorDetailsView from '@/views/ActorView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',
      name: 'home',
      component: HomeView },


    { path: '/movies',
      name: 'movies',
      component: MoviesPage },


    { path: '/movie/:id',
      name: 'movie-details',
      component: MovieDetailsView },

    { path: '/series',
      name: 'series',
      component: SeriesPage },


    { path: '/series/:id',
      name: 'series-details',
      component: SeriesDetailsView },


    { path: '/actor/:id',
      name: 'actor-details',
      component: ActorDetailsView },
  ]
})

export default router
