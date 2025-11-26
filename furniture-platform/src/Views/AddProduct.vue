<template>
    <div class="success-message" v-if="successMessage" :class="messageType">
        <div class="success-icon">
            <CheckCircle class="w-5 h-5" />
        </div>
        {{ successMessage }}
    </div>
    <div class="page">
        <h1 class="title">Déposer une annonce</h1>

        <form class="form" @submit.prevent="submitForm">

            <!-- Nom -->
            <div class="form-group">
                <label for="nameFurniture">Nom du meuble *</label>
                <input id="nameFurniture" type="text" v-model="form.name" required />
            </div>

            <!-- Type -->
            <div class="form-group">
                <label for="typeFurniture">Type *</label>
                <select id="typeFurniture" v-model="form.typeId" required>
                    <option disabled value="">-- Choisir un type --</option>
                    <option v-for="t in furnitureTypes" :key="t.id" :value="t.id">
                        {{ t.name }}
                    </option>
                </select>
            </div>

            <!-- Couleur -->
            <div class="form-group">
                <label for="colorFurniture">Couleur *</label>
                <select id="colorFurniture" v-model="form.colorId" required>
                    <option disabled value="">-- Choisir une couleur --</option>
                    <option v-for="c in colors" :key="c.id" :value="c.id">
                        {{ c.name }}
                    </option>
                </select>
            </div>

            <!-- Matériau -->
            <div class="form-group">
                <label for="materialFurniture">Matériau *</label>
                <select id="materialFurniture" v-model="form.materialId" required>
                    <option disabled value="">-- Choisir un matériau --</option>
                    <option v-for="m in materials" :key="m.id" :value="m.id">
                        {{ m.name }}
                    </option>
                </select>
            </div>

            <!-- Dimensions -->
            <div class="form-group">
                <label for="heightFurniture">Hauteur (cm)</label>
                <input id="heightFurniture" type="number" step="0.1" v-model="form.height" />
            </div>

            <div class="form-group">
                <label for="widthFurniture">Largeur (cm)</label>
                <input id="widthFurniture" type="number" step="0.1" v-model="form.width" />
            </div>

            <!-- Prix -->
            <div class="form-group">
                <label for="priceFurniture">Prix (€)</label>
                <input id="priceFurniture" type="number" step="0.01" v-model="form.price" />
            </div>

            <!-- Description -->
            <div class="form-group">
                <label for="descFurniture">Description *</label>
                <textarea id="descFurniture" v-model="form.description" required rows="4">
      </textarea>
            </div>

            <!-- Photos -->
            <div class="form-group">
                <label for="photosFurniture">Photos *</label>
                <input id="photosFurniture" ref="fileInput" type="file" accept="image/*" multiple
                    @change="handleFiles" />

                <div class="preview" v-if="imagePreview.length">
                    <img v-for="(img, index) in imagePreview" :key="index" :src="img" class="preview-img" />
                </div>
            </div>
            <button class="submit-btn" type="submit">Publier l'annonce</button>
        </form>
    </div>

</template>


<script setup>
import { ref, onMounted } from "vue";
import { CheckCircle } from "lucide-vue-next";
import { getFurnitureTypes, createProduct } from "@/services/productService";
import { getColors } from "@/services/colorService";
import { getMaterials } from "@/services/materialService";
import { useAuthStore } from "@/stores/authStore";

const messageType = ref("success");
const successMessage = ref("");
const fileInput = ref(null);

const form = ref({
    name: "",
    typeId: "",
    colorId: "",
    materialId: "",
    height: "",
    width: "",
    price: "",
    description: ""
});

const files = ref([]);
const imagePreview = ref([]);

const furnitureTypes = ref([]);
const colors = ref([]);
const materials = ref([]);

onMounted(async () => {
    furnitureTypes.value = await getFurnitureTypes();
    colors.value = await getColors();
    materials.value = await getMaterials();
});

const handleFiles = (event) => {
    files.value = [...event.target.files];
    imagePreview.value = files.value.map((file) => URL.createObjectURL(file));
};

const resetForm = () => {
    form.value = {
        name: "",
        typeId: "",
        colorId: "",
        materialId: "",
        height: "",
        width: "",
        price: "",
        description: ""
    };

    files.value = [];
    imagePreview.value = [];

    // Reset l'input file
    if (fileInput.value) {
        fileInput.value.value = "";
    }
};

const submitForm = async () => {
    try {
        const formData = new FormData();
        const auth = useAuthStore();

        formData.append("name", form.value.name);
        formData.append("typeId", form.value.typeId);
        formData.append("colorId", form.value.colorId);
        formData.append("materialId", form.value.materialId);
        formData.append("height", form.value.height);
        formData.append("width", form.value.width);
        formData.append("price", form.value.price);
        formData.append("description", form.value.description);
        formData.append("userId", auth.userId);

        files.value.forEach((file) => {
            formData.append("photos", file);
        });

        await createProduct(formData);

        successMessage.value = "Votre annonce a été déposée avec succès 🎉";
        messageType.value = "success";

        setTimeout(() => {
            successMessage.value = "";
        }, 3000);

        resetForm();
    } catch (error) {
        console.error("Erreur création meuble :", error);

        messageType.value = "error";
        successMessage.value = "Erreur lors du dépôt de l'annonce";

        setTimeout(() => {
            successMessage.value = "";
        }, 3000);
    }
};
</script>

<style scoped>
.page {
    padding: 2rem;
    font-family: "Text Me One", sans-serif;
    max-width: 600px;
    margin: 0 auto;
}

.title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

input,
select,
textarea {
    padding: 0.7rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
}

.btn:hover {
    opacity: 0.9;
}

.preview {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.preview-img {
    width: 90px;
    height: 90px;
    border-radius: 6px;
    object-fit: cover;
    border: 1px solid #ddd;
}
</style>
