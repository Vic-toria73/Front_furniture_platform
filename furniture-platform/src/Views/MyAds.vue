<template>
    <div class="success-message" v-if="successMessage" :class="messageType">
        <div class="success-icon">
            <CheckCircle class="w-5 h-5" />
        </div>
        {{ successMessage }}
    </div>
    <div class="page">
        <h2 class="title">Mes annonces</h2>

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
                            <option disabled value="">-- Choisir un type --</option>
                            <option v-for="t in furnitureTypes" :key="t.id" :value="t.id">
                                {{ t.name }}
                            </option>
                        </select>

                        <label>Couleur :</label>
                        <select v-model="selectedFurniture.colorId">
                            <option disabled value="">-- Choisir une couleur --</option>
                            <option v-for="c in colors" :key="c.id" :value="c.id">
                                {{ c.name }}
                            </option>
                        </select>

                        <label>Matériaux :</label>
                        <select v-model="selectedFurniture.materialId">
                            <option disabled value="">-- Choisir un matériau --</option>
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
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in furniture" :key="item.id">

                        <td data-label="Nom">{{ item.name }}</td>
                        <td data-label="Statut">
                            <span :class="['status-badge', item.status.toLowerCase()]">
                                {{ formatStatus(item.status) }}
                            </span>
                        </td>
                        <td data-label="Actions">
                            <button v-if="item.status.toLowerCase() === 'rejected'" class="edit-btn"
                                @click="openModal(item)">
                                Modifier
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
import type { Furniture } from "@/models/Furniture";
import { fetchUserFurnitures, updateFurniture } from "@/services/furnitureService";

import { getFurnitureTypes } from "@/services/productService";
import { getColors } from "@/services/colorService";
import { getMaterials } from "@/services/materialService";

import BaseModal from "@/components/BaseModal.vue";
import { CheckCircle, X } from "lucide-vue-next";


type EditableFurniture = {
    id: number;
    name: string;
    price?: number;
    description?: string;
    typeId?: number;
    colorId?: number;
    materialId?: number;
    height?: number;
    width?: number;
};

//State

const furniture = ref<Furniture[]>([]);
const furnitureTypes = ref<{ id: number; name: string }[]>([]);
const colors = ref<{ id: number; name: string }[]>([]);
const materials = ref<{ id: number; name: string }[]>([]);

const isModalOpen = ref(false);
const selectedFurniture = ref<EditableFurniture | null>(null);

const successMessage = ref("");
const messageType = ref("success");

//LOAD

async function loadData() {
    const [
        furnitureData,
        typesData,
        colorsData,
        materialsData
    ] = await Promise.all([
        fetchUserFurnitures(),
        getFurnitureTypes(),
        getColors(),
        getMaterials()
    ]);

    furniture.value = furnitureData;
    furnitureTypes.value = typesData;
    colors.value = colorsData;
    materials.value = materialsData;
}

onMounted(loadData);

//chargement du status du meuble
function formatStatus(status: string) {
    const s = status.toLowerCase();
    if (s === "validated") return "Validée";
    if (s === "pending") return "En attente";
    if (s === "rejected") return "Refusée";
    return status;
}

//MODAL
function openModal(item: Furniture) {
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
        await updateFurniture(
            selectedFurniture.value.id,
            selectedFurniture.value,
            true
        );

        successMessage.value = "Votre annonce a été modifiée avec succès !";

        // Masquer après 3s
        setTimeout(() => {
            successMessage.value = "";
        }, 3000);

        await loadData();
        isModalOpen.value = false;

    } catch (e) {
        console.error("Erreur update :", e);
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

.status-badge {
    padding: 0.4rem 0.7rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: bold;
    text-transform: capitalize;
}

.status-badge.validated {
    background: rgba(22, 163, 74, 0.15);
    color: #16a34a;
}

.status-badge.pending {
    background: rgba(234, 179, 8, 0.15);
    color: #ca8a04;
}

.status-badge.rejected {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
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
