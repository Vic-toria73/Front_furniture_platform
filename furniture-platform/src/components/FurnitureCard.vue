<template>
  <div class="card">

    <!-- L'image devient cliquable -->
    <router-link :to="'/furniture/' + furniture.id">
      <img
  :src="furniture.pictures?.[0]?.url"
  @error="onImageError"
  class="card-img"
/>
    </router-link>

    <h3>{{ furniture.name }}</h3>
    <p class="price">{{ furniture.price }} €</p>


    <!-- Ajout au panier -->
    <button class="submit-btn" type="submit" @click="addToCart">
      Ajouter au panier
    </button>

  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import type { Furniture } from "@/models/Furniture";


const props = defineProps<{ furniture: Furniture }>();
const emit = defineEmits(["add-to-cart"]);

const addToCart = () => emit("add-to-cart", props.furniture);

const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/images/placeholder.png";
  }
</script>

<style scoped>
.card {
  width: 260px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
