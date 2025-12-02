<template>
  <button class="back-btn" @click="router.back()">
    ‹ Voltar
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 20;

  background: rgba(0,0,0,0.55);
  padding: 10px 16px;
  border-radius: 12px;
  border: none;
  cursor: pointer;

  font-size: 18px;
  color: #fff;
  transition: 0.2s ease;
}

.back-btn:hover {
  background: rgba(0,0,0,0.75);
  transform: scale(1.05);
}
</style>
