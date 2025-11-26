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
import FurnitureCard from "@/components/furnitures/FurnitureCard.vue";
import { fetchFurnitures } from "@/services/furnitureService";
import type { Furniture } from "@/models/Furniture";

const furniture = ref<Furniture[]>([]);

onMounted(async () => {
  console.log("🔄 onMounted appelé"); // ✅ Ajoute ce log
  furniture.value = await fetchFurnitures();
  console.log("✅ Meubles chargés:", furniture.value.length); // ✅ Et celui-ci
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
