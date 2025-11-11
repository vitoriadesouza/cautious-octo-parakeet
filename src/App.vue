<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { is_authenticated } from './plugins/axios'
import { useMoviesStore } from './stores/tmdb'


is_authenticated()
const movies_store = useMoviesStore()
console.log(movies_store.fetchPopularMovies())
console.log(movies_store.fetchPopularSeries())

</script>


<template
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.wrapper {
  text-align: center;
}

nav {
  width: 100%;
  font-size: 12px;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: var(--color-text-light);
  text-decoration: none;
  transition: color 0.2s ease, background-color 0.2s ease;
}

nav a:first-of-type {
  border: none;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a:hover {
  color: var(--color-accent);
}

@media (min-width: 1024px) {
  header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
