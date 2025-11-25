<template>
  <div class="card">
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
.card{ width:220px; margin-right:18px; color:#fff; }
.poster{
  height:330px;
  border-radius:18px;
  background-size:cover;
  background-position:center;
  position:relative;
  overflow:hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.7);
}
.badge{ position:absolute; top:12px; left:12px; background:rgba(0,0,0,0.6); padding:6px 8px; border-radius:8px; font-size:12px; font-weight:700; }
.big-number{
  position:absolute; right: -20px; bottom: -20px; font-size:140px; font-weight:800; color:rgba(255,255,255,0.95);
  text-shadow: 0 8px 30px rgba(0,0,0,0.8);
  transform: rotate(0deg);
  pointer-events:none;
}
.meta{ margin-top:12px; }
.name{ font-size:16px; margin:0 0 6px 0; font-weight:700; }
.bottom{ font-size:13px; color:rgba(255,255,255,0.75); display:flex; gap:8px; align-items:center; }
</style>
