<template>
  <div class="list-container">
    <FurnitureCard
      v-for="meuble in furniture"
      :key="meuble.id"
      :furniture="meuble"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import FurnitureCard from "@/components/FurnitureCard.vue";
import { getAllFurniture } from "@/services/furnitureService";
import type { Furniture } from "@/models/Furniture";

const furniture = ref<Furniture[]>([]);

onMounted(async () => {
  furniture.value = await getAllFurniture();
});

const addToCart = (item: Furniture) => {
  console.log("Ajout au panier :", item);
};
</script>

<style scoped>
.list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
