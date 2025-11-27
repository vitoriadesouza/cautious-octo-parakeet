<template>
  <div class="movie-card">
    <div class="poster" :style="{ backgroundImage: 'url(' + posterUrl + ')' }">
      <span class="badge">{{ typeLabel }}</span>
      <div class="big-number" v-if="rank">{{ rank }}</div>
    </div>
    <div class="meta">
      <h3 class="name">{{ displayTitle }}</h3>
      <div class="bottom">
        <span class="year">{{ year }}</span>
        <span class="runtime" v-if="runtime">• {{ runtime }}min</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true },
  type: { type: String, default: 'movie' },
  rank: { type: [Number, null], default: null },
})

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'
const posterUrl = props.item.poster_path ? (IMAGE_BASE + props.item.poster_path) : (IMAGE_BASE + props.item.backdrop_path || '')
const displayTitle = props.item.title || props.item.name || props.item.titulo || '—'
const year = (props.item.release_date || props.item.first_air_date || '').slice(0,4)
const runtime = props.item.runtime || null
const typeLabel = props.type === 'tv' || props.item.media_type === 'tv' ? 'SÉRIE' : 'FILME'
</script>

<style scoped>
.movie-card {
  width: 220px;
  min-width: 220px;
  color: #fff;
  flex-shrink: 0;
}

.poster {
  width: 220px;
  height: 330px;
  border-radius: 18px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.7);
}


</style>
