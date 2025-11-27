<template>
  <header class="topo">
    <div class="logo">MEGA<span>FILMES</span></div>

    <nav class="menu">
      <router-link to="/">Home</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/series">Séries</router-link>
    </nav>
  </header>
</template>

<style scoped>
.topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #000;
  color: white;
}

.logo {
  font-size: 26px;
  font-weight: bold;
}

.logo span {
  color: red;
}

.menu {
  display: flex;
  gap: 25px;
}

.menu a {
  color: white;
  font-size: 16px;
  text-decoration: none;
}

.menu a.router-link-active {
  color: red;
}
</style>
