import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/movies',
      name: 'movies',
      component: () => import('../views/MoviesView.vue')
    },

    {
      path: '/movies/upcoming',
      name: 'movies-upcoming',
      component: () => import('../views/UpcomingMoviesView.vue')
    },

    {
      path: '/series',
      name: 'series',
      component: () => import('../views/SeriesView.vue')
    },
    {
      path: '/movie/:id',
      name: 'movie-details',
      component: () => import('../views/MovieDetailsView.vue'),
      props: true
    },
    {
      path: '/series/recent',
      name: 'series-recent',
      component: () => import('../views/RecentSeriesView.vue')
    },
    {
      path: '/actor/:id',
      name: 'actor',
      component: () => import('../views/ActorView.vue')
    },
    {
      path: '/series/:id',
      name: 'series-details',
      component: () => import('../views/SeriesDetailsView.vue'),
      props: true
    }

  ],
})

export default router
