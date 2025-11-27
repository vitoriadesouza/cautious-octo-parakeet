<template>
  <header class="navbar">
    <div class="left">
      <img :src="logoUrl" alt="logo" class="logo" />
      <nav class="links">
        <router-link to="/" class="link">Home</router-link>
        <router-link to="/movies" class="link">Filmes</router-link>
        <router-link to="/series" class="link">Séries</router-link>
      </nav>
    </div>

    <div class="right">
      <button class="btn icon">🔍</button>
      <button class="btn icon">🔀 Aleatório</button>
    </div>
  </header>
</template>

<script setup>
const logoUrl = '/mnt/data/bad6a5ef-c4bd-4566-b675-77e8ff2985b3.png'
</script>

<style scoped>
.navbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:18px 32px;
  gap:12px;
}
.left{ display:flex; align-items:center; gap:18px; }
.logo{ width:110px; object-fit:contain; }
.links{ display:flex; gap:14px; align-items:center; }
.link{ color:#fff; text-decoration:none; font-weight:600; opacity:0.9; }
.right{ display:flex; gap:12px; align-items:center; }
.btn{ background:transparent; border:1px solid rgba(255,255,255,0.06); padding:8px 12px; border-radius:8px; color:#fff; }
.icon{ background:rgba(255,255,255,0.03); }
.account-btn{ background:#e11d2f; color:#fff; padding:10px 14px; border-radius:10px; text-decoration:none; font-weight:700; }
</style>
