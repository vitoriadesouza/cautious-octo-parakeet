

<template>
  <section class="row">
    <div class="row-header">
      <h2>{{ title }}</h2>
      <router-link :to="seeAllLink" class="see-all">›</router-link>
    </div>

    <div class="row-body">
      <button class="arrow left" @click="scroll(-1)">‹</button>

      <div class="list" ref="list">
        <MovieCard
          v-for="(it, idx) in items"
          :key="it.id + '-' + idx"
          :item="it"
          :type="it.media_type || (it.first_air_date ? 'tv' : 'movie')"
          :rank="showRank ? (startRank + idx) : null"
        />
      </div>

      <button class="arrow right" @click="scroll(1)">›</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import MovieCard from './MovieCard.vue'

const props = defineProps({
  title: String,
  items: { type: Array, default: () => [] },
  seeAllLink: { type: String, default: '/' },
  showRank: { type: Boolean, default: false },
  startRank: { type: Number, default: 1 },
})

const list = ref(null)
function scroll(dir){
  if(!list.value) return
  const width = list.value.clientWidth
  list.value.scrollBy({ left: dir * width * 0.8, behavior:'smooth' })
}
</script>

<style scoped>
.row{ padding:28px 56px; color:#fff; }
.row-header{ display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; }
.row-header h2{ font-size:28px; }
.see-all{ color:#fff; font-size:24px; text-decoration:none; }
.row-body{ position:relative; display:flex; align-items:center; }
.list{ display:flex; overflow-x:auto; padding:12px 0; scrollbar-width:none; gap:6px; }
.list::-webkit-scrollbar{ display:none; }
.arrow{ background:rgba(0,0,0,0.6); border:none; color:#fff; width:44px; height:44px; border-radius:50%; position:relative; z-index:2; }
.arrow.left{ margin-right:12px; }
.arrow.right{ margin-left:12px; }
</style>
