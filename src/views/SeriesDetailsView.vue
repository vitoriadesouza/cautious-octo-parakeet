

<template>
  <VoltarButton/>
  <div class="details" :style="bgStyle">
    <div class="overlay">
      <div class="content">
        <img class="poster" :src="posterUrl" alt="poster" />

        <div class="info">
          <h1>{{ series.name }}</h1>

          <p class="meta">
            {{ year }} • {{ genres }} • {{ series.number_of_seasons }} temporadas
          </p>

        <div class="rating">
      <StarRating
      :star-size="28"
      :show-rating="false"
      :read-only="true"
      :rating="series.vote_average / 2"
      />
    <span class="rating-number">{{ series.vote_average?.toFixed(1) }}</span>
</div>


          <p class="overview">{{ series.overview }}</p>

          <button v-if="trailerKey" class="btn-trailer" @click="openTrailer">
            ▶ Ver trailer
          </button>
        </div>
      </div>

      <div class="cast-section" v-if="cast.length">
        <h2>Elenco</h2>
        <div class="cast-list">
          <div class="cast-card" v-for="c in cast" :key="c.id">
            <img :src="profile(c.profile_path)" />
            <p class="actor-name">{{ c.name }}</p>
            <p class="actor-char">{{ c.character }}</p>
          </div>
        </div>
      </div>

      <div v-if="trailerKey" class="trailer-box">
        <iframe
          width="100%"
          height="500"
          :src="`https://www.youtube.com/embed/${trailerKey}`"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
  <FooterGTM></FooterGTM>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import api from "@/plugins/axios";
import StarRating from "vue-star-rating";
import VoltarButton from "@/components/VoltarButton.vue";
import FooterGTM from "@/components/FooterGTM.vue";


const route = useRoute();

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/original";

const series = ref({});
const cast = ref([]);
const trailerKey = ref(null);

// URLS
const posterUrl = computed(() =>
  series.value.poster_path ? IMG + series.value.poster_path : ""
);

const backdropUrl = computed(() =>
  series.value.backdrop_path ? IMG + series.value.backdrop_path : ""
);

const bgStyle = computed(() => ({
  backgroundImage: `url('${backdropUrl.value}')`,
}));

const year = computed(() =>
  series.value.first_air_date ? series.value.first_air_date.slice(0, 4) : ""
);

const genres = computed(() =>
  series.value.genres ? series.value.genres.map((g) => g.name).join(", ") : ""
);

function profile(path) {
  return path ? "https://image.tmdb.org/t/p/w185" + path : "";
}

function openTrailer() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

async function load() {
  const id = route.params.id;
  const d = await api.get(`${BASE_URL}/tv/${id}`, {
    params: { api_key: API_KEY, language: "pt-BR" },
  });
  series.value = d.data;
  const c = await api.get(`${BASE_URL}/tv/${id}/credits`, {
    params: { api_key: API_KEY, language: "pt-BR" },
  });
  cast.value = c.data.cast;
  const v = await api.get(`${BASE_URL}/tv/${id}/videos`, {
    params: { api_key: API_KEY, language: "pt-BR" },
  });

  const youtube = v.data.results.find(
    (x) => x.site === "YouTube" && x.type === "Trailer"
  );
  trailerKey.value = youtube ? youtube.key : null;
}

onMounted(load);
</script>

<style scoped>
.details {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay {
  backdrop-filter: brightness(0.35);
  padding: 40px;
  min-height: 100vh;
}

.content {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin-bottom: 60px;
}

.poster {
  width: 300px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.6);
}

.info h1 {
  font-size: 46px;
  margin-bottom: 10px;
}

.meta {
  font-size: 18px;
  opacity: 0.85;
  margin-bottom: 10px;
}

.rating {
  margin: 12px 0;
  font-size: 22px;
}

.overview {
  max-width: 700px;
  font-size: 18px;
  line-height: 26px;
  margin-bottom: 20px;
}

.btn-trailer {
  background: red;
  border: none;
  padding: 12px 26px;
  color: #fff;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
}

.cast-section {
  margin-top: 40px;
}

.cast-list {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
}

.cast-card {
  text-align: center;
  min-width: 120px;
}

.cast-card img {
  width: 120px;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
}

.actor-name {
  margin-top: 4px;
  font-size: 14px;
  font-weight: bold;
}

.actor-char {
  font-size: 13px;
  opacity: 0.8;
}

.trailer-box {
  margin-top: 60px;
}
.details,
.details * {
  color: white;
}
.overlay {
  background: rgba(0, 0, 0, 0.65); 
  backdrop-filter: blur(2px);
  padding: 40px;
  min-height: 100vh;
}
.rating {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 15px 0;
}

.rating-number {
  font-size: 20px;
  font-weight: bold;
  opacity: 0.9;
}

</style>
