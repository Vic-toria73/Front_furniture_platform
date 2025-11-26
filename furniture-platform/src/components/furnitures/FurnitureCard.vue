<template>
  <div class="card">

    <router-link class="card-link" :to="{ name: 'FurnitureDetail', params: { id: furniture.id } }">
      <img :src="pictureUrl" @error="onImageError" class="card-img" />



      <h3>{{ furniture.name }}</h3>
      <p v-if="furniture.type">Type : {{ furniture.type.name }}</p>
      <p class="price">{{ furniture.price }} €</p>
    </router-link>

    <button class="submit-btn" type="button" @click="addToCart">
      <strong>Ajouter au panier</strong>
    </button>

  </div>
</template>



<script lang="ts" setup>
import type { Furniture } from "@/models/Furniture";
import { computed, watch } from "vue";

const props = defineProps<{ furniture: Furniture }>();
const emit = defineEmits(["add-to-cart"]);

const addToCart = () => emit("add-to-cart", props.furniture);

const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/images/placeholder.png";
}

const pictureUrl = computed(() => {
  const url = props.furniture.pictures?.[0]?.url;
  if (!url) return "/images/placeholder.png";

  if (url.startsWith("http")) return url;
  if (url.startsWith("/images/")) return url;

  return `http://localhost:8082/uploads/${url.replace(/^\/+/, '')}`;
});

watch(pictureUrl, () => {
  console.log("URL image :", pictureUrl.value);
});
</script>

<style scoped>
.card {
  width: 260px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.card-link {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #f5f5f5;
  display: block;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
}

.submit-btn {
  margin-top: auto;
  /* pousse le bouton en bas */
}
</style>
