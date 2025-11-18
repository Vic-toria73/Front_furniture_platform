<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Validation des meubles</h1>

    <table class="table-auto w-full border">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2">Nom</th>
          <th class="p-2">Prix</th>
          <th class="p-2">Statut</th>
          <th class="p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in furnitures" :key="item.id" class="border-b">
          <td class="p-2">{{ item.name }}</td>
          <td class="p-2">{{ item.price }} €</td>
          <td class="p-2">{{ item.status }}</td>

          <td class="p-2">
            <button
              v-if="item.status === 'PENDING'"
              class="bg-green-600 text-white px-3 py-1 rounded mr-2"
              @click="changeStatus(item.id, 'VALIDATED')"
            >
              Valider
            </button>

            <button
              v-if="item.status === 'PENDING'"
              class="bg-red-600 text-white px-3 py-1 rounded"
              @click="changeStatus(item.id, 'DELETED')"
            >
              Refuser
            </button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { fetchAdminFurnitures, updateFurnitureStatus } from "@/services/furnitureService";
import type { Furniture, FurnitureStatus } from "@/models/Furniture";

const furnitures = ref<Furniture[]>([]);

async function loadData() {
  furnitures.value = await fetchAdminFurnitures();
}

async function changeStatus(id: number, status: FurnitureStatus | string) {
  await updateFurnitureStatus(id, status as FurnitureStatus);
  await loadData();
}

onMounted(loadData);
</script>

