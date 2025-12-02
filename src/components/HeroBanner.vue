<template>
  <section class="hero" v-if="item">
    <div class="video-wrap" v-if="youtubeKey">
      <iframe
        class="bg-video"
        :src="youtubeSrc"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <div class="video-overlay"></div>
    </div>

    <div class="hero-content">
      <h1 class="title">{{ itemTitle }}</h1>
      <div class="actions">
        <button class="play">▶ Assistir {{ itemTypeLabel }}</button>
        <button class="list">+ Minha Lista</button>
      </div>
    </div>

    <button class="nav left" @click="$emit('prev')">‹</button>
    <button class="nav right" @click="$emit('next')">›</button>

    <div class="dots">
      <span v-for="i in 3" :key="i" :class="['dot', { active: i===1 }]"></span>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useMoviesStore } from '@/stores/tmdb.js'

const props = defineProps({
  item: { type: Object, required: true }, 
})

const emit = defineEmits(['prev','next'])
const store = useMoviesStore()

const youtubeKey = computed(() => props.item.trailer || null)

const youtubeSrc = computed(() => {
  if (!youtubeKey.value) return ''

  return `https://www.youtube.com/embed/${youtubeKey.value}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${youtubeKey.value}&loop=1`
})

const itemTitle = computed(() => props.item.titulo || props.item.title || props.item.name || '')
const itemTypeLabel = computed(() => (props.item.type === 'tv' ? 'Série' : 'Série'))
</script>

<style scoped>
.hero{
  position:relative;
  height:640px;
  display:flex;
  align-items:flex-end;
  padding:56px;
  color:#fff;
  overflow:hidden;
}
.video-wrap{ position:absolute; inset:0; z-index:0; }
.bg-video{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:160%;
  height:160%;
  pointer-events:none;
  opacity:0.7;
  filter: blur(2px) saturate(90%);
}
.video-overlay{
  position:absolute;
  inset:0;
  background: linear-gradient(180deg, rgba(0,0,0,0.55) 20%, rgba(0,0,0,0.85) 80%);
}
.hero-content{ position:relative; z-index:2; max-width:900px; }
.title{ font-size:72px; font-weight:800; letter-spacing:1px; margin:0 0 18px 0; text-shadow: 0 6px 30px rgba(0,0,0,0.7); }
.actions{ display:flex; gap:14px; }
.play{ background:#e11d2f; border:none; padding:16px 28px; border-radius:40px; color:#fff; font-weight:700; }
.list{ background:rgba(255,255,255,0.06); border:none; padding:14px 22px; border-radius:30px; color:#fff; }

.nav{ position:absolute; top:50%; transform:translateY(-50%); z-index:3; width:44px; height:44px; border-radius:50%; background:rgba(0,0,0,0.5); color:#fff; border:none; font-size:28px; display:flex; align-items:center; justify-content:center; }
.nav.left{ left:20px; }
.nav.right{ right:20px; }

.dots{ position:absolute; bottom:22px; left:50%; transform:translateX(-50%); display:flex; gap:10px; z-index:3;}
.dot{ width:12px; height:12px; border-radius:50%; background:rgba(255,255,255,0.18); }
.dot.active{ background:#fff; box-shadow:0 0 10px rgba(255,255,255,0.25); }
</style>
