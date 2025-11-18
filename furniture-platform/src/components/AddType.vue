<script setup lang="ts">
import { ref } from "vue";
import { createType } from "@/services/typeService";

const name = ref("");
const message = ref("");

const submit = async () => {
  try {
    await createType({ name: name.value });
    message.value = "Type créé avec succès !";
    name.value = "";
  } catch (e) {
    message.value = "Erreur lors de la création.";
  }
};
</script>

<template>
  <div class="add-type">
    <h2>Créer un nouveau type</h2>

    <form @submit.prevent="submit">
      <input v-model="name" type="text" placeholder="Nom du type" required />
      <button type="submit">Ajouter</button>
    </form>

    <p>{{ message }}</p>
  </div>
</template>
