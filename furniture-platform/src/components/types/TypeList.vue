<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAllTypes, type TypeModel } from "@/services/typeService";

const types = ref<TypeModel[]>([]);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    types.value = await getAllTypes();
  } catch (e) {
    error.value = "Impossible de charger les types.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <h2>Liste des Types</h2>

    <div v-if="loading">Chargement...</div>
    <div v-if="error">{{ error }}</div>

    <ul v-if="!loading && !error">
      <li v-for="t in types" :key="t.id">
        {{ t.name }}
      </li>
    </ul>
  </div>
</template>
