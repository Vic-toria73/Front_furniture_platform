<template>
  <div class="container">
    
    <!-- LOADING -->
    <div v-if="loading" class="loading">Chargement...</div>

    <!-- ERREUR -->
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- PAGE DETAIL (ne s'affiche que si furniture existe) -->
    <div v-else-if="furniture" class="detail">

      <!-- Section image -->
      <div class="pictures">
        <img
          class="main-picture"
          :src="selectedImage || furniture.pictures?.[0]?.url || '/images/placeholder.png'"
          :alt="furniture.name"
          @error="onImageError"
        />

        <div class="thumbs">
          <img
            v-for="pic in furniture.pictures"
            :key="pic.id"
            class="thumb"
            :src="pic.url"
            :alt="pic.altText"
            @click="selectedImage = pic.url"
            @error="onImageError"
          />
        </div>
      </div>

      <!-- Section description -->
      <div class="info">
        <h1>{{ furniture.name }}</h1>
        <p class="type"><strong>Type :</strong> {{ furniture.type?.name }}</p>
        <p class="price">{{ furniture.price }} €</p>
        <p class="description">{{ furniture.description }}</p>

        <button @click="addToCart" class="btn">
          Ajouter au panier
        </button>
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import type { Furniture } from "@/models/Furniture";

const route = useRoute();

const furniture = ref<Furniture | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const selectedImage = ref<string | null>(null);

// Fallback image handler (obligatoire en TS)
const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/images/placeholder.png";
};

onMounted(async () => {
  try {
    const id = route.params.id;
    const res = await axios.get(`/api/furniture/public/${id}`);
    console.log("ID :", id);
console.log("Réponse API :", res.data);
    furniture.value = res.data;
  } catch (err) {
    error.value = "Impossible de charger le meuble.";
  } finally {
    loading.value = false;
  }
});

const addToCart = () => {
  console.log("Ajouter au panier :", furniture.value);
};
</script>

<style scoped>
.container {
  padding: 40px;
  display: flex;
  justify-content: center;
}

.detail {
  display: flex;
  gap: 40px;
  max-width: 1200px;
}

.pictures {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.main-picture {
  max-width: 500px;
  max-height: 400px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  background: #f5f5f5;
}

.thumbs {
  display: flex;
  gap: 10px;
}

.thumb {
  width: 80px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 8px;
  opacity: 0.8;
}

.thumb:hover {
  opacity: 1;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #3a7;
}

.btn {
  background: #3a7;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
}

.btn:hover {
  background: #2a5;
}

.loading,
.error {
  font-size: 1.3rem;
  text-align: center;
}
</style>
