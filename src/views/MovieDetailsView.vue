<script setup>
import { onMounted, ref, computed } from "vue"
import { useRoute } from "vue-router"
import StarRating from "vue-star-rating"
import router from "@/router"
import VoltarButton from "@/components/VoltarButton.vue"
import FooterGTM from "@/components/FooterGTM.vue"

const route = useRoute()

const movie = ref({})
const cast = ref([])
const showMore = ref(false)

const API = "https://api.themoviedb.org/3"
const KEY = import.meta.env.VITE_API_KEY

onMounted(async () => {
  const id = route.params.id

  const res = await fetch(`${API}/movie/${id}?api_key=${KEY}&language=pt-BR`)
  movie.value = await res.json()

  const resCast = await fetch(`${API}/movie/${id}/credits?api_key=${KEY}&language=pt-BR`)
  cast.value = (await resCast.json()).cast.slice(0, 10)
})

const IMAGE = "https://image.tmdb.org/t/p/w500"
const BACKDROP = "https://image.tmdb.org/t/p/original"

const posterUrl = computed(() => movie.value.poster_path ? IMAGE + movie.value.poster_path : "")

const bgStyle = computed(() => ({
  backgroundImage: movie.value.backdrop_path
    ? `url(${BACKDROP + movie.value.backdrop_path})`
    : "none"
}))

const year = computed(() =>
  movie.value.release_date ? movie.value.release_date.slice(0, 4) : ""
)

const runtime = computed(() => movie.value.runtime || 0)

function actorImage(path) {
  return path ? IMAGE + path : "https://via.placeholder.com/80"
}

function goToActor(id) {
  router.push({ name: "actor-details", params: { id } })
}

</script>

<template>
  <VoltarButton/>
  <div class="details" :style="bgStyle">
    <div class="overlay"></div>

    <div class="content">
      <img class="poster" :src="posterUrl" alt="" />
      <div class="info">
        <h1 class="title">{{ movie.title }}</h1>
        <div class="meta">
          <span>{{ year }}</span>
          <span>•</span>
          <span>{{ runtime }} min</span>
        </div>

        <div class="rating">
          <StarRating
            :rating="movie.vote_average / 2"
            :star-size="22"
            :read-only="true"
          />
          <span class="rating-number">{{ movie.vote_average?.toFixed(1) }}</span>
        </div>

        <p class="overview">
          {{ showMore ? movie.overview : movie.overview?.slice(0, 170) + '...' }}
        </p>

        <button class="more-btn" @click="showMore = !showMore">
          {{ showMore ? "Ver menos" : "Ver mais" }}
        </button>
      </div>
    </div>

    <div class="cast-section">
      <h2>Elenco</h2>

      <div class="cast-list">
        <div
          class="actor"
          v-for="actor in cast"
          :key="actor.id"
          @click="goToActor(actor.id)"
          style="cursor: pointer"
        >
          <img :src="actorImage(actor.profile_path)" />
          <p class="actor-name">{{ actor.name }}</p>
        </div>
      </div>
    </div>

  </div>
  <FooterGTM></FooterGTM>
</template>

<style scoped>
.details {
  position: relative;
  background-size: cover;
  background-position: center;
  padding-bottom: 40px;
  min-height: 100vh;
  color: white;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
}

.content {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 30px;
  padding: 40px;
}

.poster {
  width: 260px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.info {
  max-width: 700px;
}

.title {
  font-size: 38px;
  margin-bottom: 10px;
}

.meta {
  display: flex;
  gap: 8px;
  font-size: 18px;
  opacity: 0.8;
  margin-bottom: 12px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rating-number {
  font-size: 18px;
  opacity: 0.9;
}

.overview {
  margin-top: 20px;
  line-height: 1.5;
  font-size: 17px;
  max-width: 600px;
}

.more-btn {
  margin-top: 10px;
  background: #e50914;
  border: none;
  padding: 8px 14px;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.cast-section {
  position: relative;
  z-index: 2;
  padding: 20px 40px;
}

.cast-section h2 {
  margin-bottom: 12px;
}

.cast-list {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.actor {
  text-align: center;
  width: 100px;
}

.actor img {
  width: 100px;
  height: 130px;
  object-fit: cover;
  border-radius: 8px;
}

.actor-name {
  margin-top: 6px;
  font-size: 14px;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .poster {
    width: 180px;
  }

  .info {
    max-width: 100%;
  }
}
</style>
