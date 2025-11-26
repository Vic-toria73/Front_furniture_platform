<template>
  <div class="page">

    <h2 class="title">Validation des meubles</h2>
    <!-- MODAL -->
    <BaseModal v-model="isModalOpen" v-if="selectedFurniture">
      <div class="card">

        <button class="close-btn" @click="isModalOpen = false">
          <X :size="26" />
        </button>

        <h2 class="modal-title">Modifier le meuble</h2>

        <div class="modal-form">

          <div class="modal-group">
            <label>Nom :</label>
            <input v-model="selectedFurniture.name" type="text" />
          </div>

          <div class="modal-group">
            <label>Type :</label>
            <select v-model="selectedFurniture.typeId">
              <option disabled :value="undefined">-- Choisir un type --</option>
              <option v-for="t in furnitureTypes" :key="t.id" :value="t.id">
                {{ t.name }}
              </option>
            </select>

            <label>Couleur :</label>
            <select v-model="selectedFurniture.colorId">
              <option disabled :value="undefined">-- Choisir une couleur --</option>
              <option v-for="c in colors" :key="c.id" :value="c.id">
                {{ c.name }}
              </option>
            </select>

            <label>Materiaux :</label>
            <select v-model="selectedFurniture.materialId">
              <option disabled :value="undefined">-- Choisir un matériau --</option>
              <option v-for="m in materials" :key="m.id" :value="m.id">
                {{ m.name }}
              </option>
            </select>
          </div>
          <div class="modal-group">
            <label>Hauteur (cm) :</label>
            <input type="number" v-model="selectedFurniture.height" />
          </div>

          <div class="modal-group">
            <label>Largeur (cm) :</label>
            <input type="number" v-model="selectedFurniture.width" />
          </div>


          <div class="modal-group">
            <label>Prix :</label>
            <input v-model="selectedFurniture.price" type="number" />
          </div>

          <div class="modal-group">
            <label>Description :</label>
            <textarea v-model="selectedFurniture.description" rows="3"></textarea>
          </div>

        </div>

        <div class="modal-buttons">
          <button @click="isModalOpen = false" class="btn-secondary">
            Annuler
          </button>
          <button @click="saveFurniture" class="btn-primary">Sauvegarder</button>
        </div>

      </div>
    </BaseModal>
    <div class="table-wrapper">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Statut</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in furniture" :key="item.id">
            <td data-label="Nom">{{ item.name }}</td>
            <td data-label="Prix">{{ item.price }} €</td>
            <td data-label="Statut">{{ item.status }}</td>
            <td class="actions" data-label="Actions">
              <button class="action-btn edit" @click="openEditModal(item)">
                <Pencil :size="18" />
              </button>
              <button class="action-btn delete" @click="deleteFurniture(item.id)">
                <Trash2 :size="18" />
              </button>
              <button v-if="item.status === 'PENDING'" class="action-btn validate"
                @click="changeStatus(item.id, 'VALIDATED')">
                <Check :size="18" />
              </button>
              <button v-if="item.status === 'PENDING'" class="action-btn reject"
                @click="changeStatus(item.id, 'REJECTED')">
                <X :size="18" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Pencil, Trash2, Check, X } from "lucide-vue-next";

import type { Furniture, FurnitureStatus } from "@/models/Furniture";
import {
  fetchAdminFurnitures,
  deleteFurnitureById,
  updateFurnitureStatus,
  updateFurniture
} from "@/services/furnitureService";
import { getFurnitureTypes } from "@/services/productService";
import { getColors } from "@/services/colorService";
import { getMaterials } from "@/services/materialService";

import BaseModal from "@/components/BaseModal.vue";

const furniture = ref<Furniture[]>([]);
const furnitureTypes = ref<{ id: number; name: string }[]>([]);
const colors = ref<{ id: number; name: string }[]>([]);
const materials = ref<{ id: number; name: string }[]>([]);

// Modal
const isModalOpen = ref(false);
const selectedFurniture = ref<{
  id: number;
  name: string;
  price?: number;
  description?: string;
  typeId: number | undefined;
  colorId: number | undefined;
  materialId: number | undefined;
  height: number | undefined;
  width: number | undefined;
} | null>(null);

// Load
async function loadData() {
  const [furnitureData, typesData, colorsData, materialsData] = await Promise.all([
    fetchAdminFurnitures(), // récupère tous les meubles
    getFurnitureTypes(), // " les types
    getColors(),
    getMaterials()
  ]);

  furniture.value = furnitureData;
  furnitureTypes.value = typesData;
  colors.value = colorsData;
  materials.value = materialsData;
}

onMounted(loadData);

function openEditModal(item: Furniture) {
  selectedFurniture.value = {
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description,
    typeId: item.type?.id,
    colorId: item.color?.id,
    materialId: item.material?.id,
    height: item.height,
    width: item.width
  };
  isModalOpen.value = true;
}

async function saveFurniture() {
  if (!selectedFurniture.value) return;

  try {
    const payload = {
      name: selectedFurniture.value.name,
      price: selectedFurniture.value.price,
      description: selectedFurniture.value.description,
      typeId: selectedFurniture.value.typeId || undefined,
      colorId: selectedFurniture.value.colorId || undefined,
      materialId: selectedFurniture.value.materialId || undefined,
      height: selectedFurniture.value.height,
      width: selectedFurniture.value.width
    };

    await updateFurniture(selectedFurniture.value.id, payload);
    isModalOpen.value = false;
    await loadData();
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    alert("Erreur lors de la sauvegarde");
  }
}

// Delete
async function deleteFurniture(id: number) {
  if (!confirm("Voulez-vous vraiment supprimer ce meuble ?")) return;
  await deleteFurnitureById(id);
  await loadData();
}

// Update status
async function changeStatus(id: number, status: FurnitureStatus) {
  try {
    await updateFurnitureStatus(id, status);
    const item = furniture.value.find(f => f.id === id);
    if (item) {
      item.status = status;
    }
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la mise à jour du statut.");
  }
}
</script>

<style scoped>
/* GLOBAL PAGE */
.page {
  padding: 2rem;
  font-family: "Text Me One", sans-serif;
  max-width: 900px;
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}


/* BUTTON CLOSE */
.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: black;
}


/* TABLE */
.table-wrapper {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table th {
  padding: 0.9rem;
  text-align: left;
  background: #f6f1ee;
  font-size: 1.1rem;
}

.styled-table td {
  padding: 0.9rem;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
}

.styled-table tr:hover {
  background: #faf7f5;
}

/* ACTION BUTTONS */
.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-btn {
  padding: 5px;
  border-radius: 6px;
  transition: 0.15s ease;
}

/* 🔵 EDIT (bleu) */
.action-btn.edit {
  color: #3b82f6;
}

.action-btn.edit:hover {
  background: rgba(59, 130, 246, 0.1);
}

/* 🔴 DELETE (rouge) */
.action-btn.delete {
  color: #ef4444;
}

.action-btn.delete:hover {
  background: rgba(239, 68, 68, 0.1);
}

/* 🟢 VALIDATE (vert) */
.action-btn.validate {
  color: #16a34a;
}

.action-btn.validate:hover {
  background: rgba(22, 163, 74, 0.1);
}

/* ⚫ REJECT (gris/noir) */
.action-btn.reject {
  color: #444;
}

.action-btn.reject:hover {
  background: rgba(0, 0, 0, 0.08);
}

/* MODAL */
.modal-title {
  text-align: center;
  font-size: 1.7rem;
  margin-bottom: 1rem;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-group {
  display: flex;
  flex-direction: column;
}

.modal-group label {
  margin-bottom: 0.3rem;
}

input {
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fafafa;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1.3rem;
}

.btn-primary {
  background: #4caf50;
  color: white;
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  border: none;
}

.btn-secondary {
  background: #d9534f;
  color: white;
  padding: 0.7rem 1.4rem;
  border-radius: 8px;
  border: none;
}

.btn-primary:hover,
.btn-secondary:hover {
  opacity: 0.85;
}

@media (max-width: 1024px) {
  .page {
    padding: 1.5rem;
  }

  .styled-table th,
  .styled-table td {
    padding: 0.7rem;
  }

  .actions {
    gap: 6px;
  }
}

@media (max-width: 600px) {

  /* On remplace le tableau par un affichage plus lisible */
  .styled-table thead {
    display: none;
    /* cache l'entête */
  }

  .styled-table tr {
    display: block;
    padding: 1rem;
    margin-bottom: 1rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }

  .styled-table td {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 0;
    border: none;
    font-size: 1rem;
  }

  /* On recrée les labels (Nom, Prix, Statut...) */
  .styled-table td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #555;
  }

  /* Actions en bas de la carte */
  .actions {
    justify-content: flex-end;
    margin-top: 0.7rem;
  }
}
</style>
