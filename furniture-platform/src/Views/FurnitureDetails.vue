<template>
  <div class="container">

    <!-- LOADING -->
    <div v-if="loading" class="loading">Chargement...</div>

    <!-- ERREUR -->
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- PAGE DETAIL -->
    <div v-else-if="furniture" class="detail">

      <!-- SECTION IMAGES -->
      <div class="pictures">
        <img 
          class="main-picture"
          :src="selectedImage ?? defaultImage"
          :alt="furniture.name"
          @error="onImageError"
        />

        <div class="thumbs">
          <img 
            v-for="pic in furniture.pictures"
            :key="pic.id"
            class="thumb"
            :src="fixUrl(pic.url)"
            :alt="pic.altText || 'Image meuble'"
            @click="select(pic.url)"
            @error="onImageError"
          />
        </div>
      </div>

      <!-- SECTION TEXTE -->
      <div class="info">
        <h1>{{ furniture.name }}</h1>
        <p><strong>Type :</strong> {{ furniture.type?.name }}</p>
        <p><strong>Couleur :</strong> {{ furniture.color?.name }}</p>
        <p><strong>Matériaux :</strong> {{ furniture.material?.name }}</p>
        <p><strong>Hauteur :</strong> {{ furniture.height }} cm</p>
        <p><strong>Largeur :</strong> {{ furniture.width }} cm</p>
        <p class="price">{{ furniture.price }} €</p>
        <p class="description">{{ furniture.description }}</p>

        <button @click="addToCart" class="btn">Ajouter au panier</button>
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import type { Furniture } from "@/models/Furniture";

const route = useRoute();

const furniture = ref<Furniture | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const selectedImage = ref<string | null>(null);

const fixUrl = (url: string | undefined) => {
  if (!url) return "/images/placeholder.png";

  // URL externe
  if (url.startsWith("http")) return url;

  // Nettoyage
  let clean = url.replace(/^\/+/, ""); // retire tous les "/" au début

  // Évite le doublon /uploads/uploads/
  clean = clean.replace(/^uploads\/uploads\//, "uploads/");

  // Si le chemin ne commence pas par "uploads/", on l'ajoute
  if (!clean.startsWith("uploads/")) {
    clean = "uploads/" + clean;
  }

  return `http://localhost:8082/${clean}`;
};

// Fallback image
const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;

  // Empêche la boucle infinie si placeholder ne charge pas
  if (img.src.includes("placeholder.png")) return;

  img.src = "/images/placeholder.png";
}

// Image par défaut
const defaultImage = computed(() => {
  const first = furniture.value?.pictures?.[0];
  return fixUrl(first?.url);
});

// Click miniature
const select = (url: string) => {
  selectedImage.value = fixUrl(url);
};

// Charge annonce
onMounted(async () => {
  try {
    const id = route.params.id;
    const res = await axios.get(`/api/furniture/public/${id}`);
    furniture.value = res.data;
  } catch {
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
}

.btn {
  background: #3a7;
  color: white;
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
