<template>
        <div class="success-message" v-if="message">
        <div class="success-icon">
          <CheckCircle class="w-5 h-5" />
        </div>
        {{ message }}
      </div>

      <div class="success-message" v-if="passwordMessage">
        <div class="success-icon">
          <CheckCircle class="w-5 h-5" />
        </div>
        {{ passwordMessage }}
      </div>

<div class="account-container">
    <h2 class="title">Mon compte</h2>

    <form @submit.prevent="saveProfile" class="card">
      <h3>Mes informations</h3>

      <label for="firstName">Prénom</label>
      <input id="firstName" v-model="form.firstName" type="text" />

      <label for="lastName">Nom</label>
      <input id="lastName" v-model="form.lastName" type="text" />

      <label for="email">Email</label>
      <input id="email" v-model="form.email" type="email" />

      <button class="submit-btn"><strong>Enregistrer</strong></button>
    </form>

    <!-- Mot de passe -->
    <form @submit.prevent="changePassword" class="card">
      <h3>Changer mon mot de passe</h3>

      <label for="oldPassword">Ancien mot de passe</label>
      <input id="oldPassword" v-model="passwordForm.oldPassword" type="password" />

      <label for="newPassword">Nouveau mot de passe</label>
      <input id="newPassword" v-model="passwordForm.newPassword" type="password" />

      <button class="donate-btn" style="background-color: #ef4444;" type="submit"><strong>Modifier</strong></button>
    </form>

  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getMyAccount, updateMyAccount, updateMyPassword } from "@/services/userService";
import { CheckCircle } from "lucide-vue-next";

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
});

const passwordForm = ref({
  oldPassword: "",
  newPassword: "",
});

const message = ref("");
const passwordMessage = ref("");

onMounted(async () => {
  const user = await getMyAccount();
  form.value = {
    firstName: user.data.firstName,
    lastName: user.data.lastName,
    email: user.data.email,
  };
});

const saveProfile = async () => {
  await updateMyAccount(form.value);
  message.value = "Profil mis à jour !";

  setTimeout(() => (message.value = ""), 1300);
};

const changePassword = async () => {
  await updateMyPassword(passwordForm.value);
  passwordMessage.value = "Mot de passe mis à jour !";

  passwordForm.value.oldPassword = "";
  passwordForm.value.newPassword = "";

  setTimeout(() => (passwordMessage.value = ""), 1300);
};
</script>

<style scoped>
.account-container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  font-family: "Text Me One", sans-serif;
}

.title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
}

.card {
  background: #fff;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.card label {
  margin-top: 12px;
  margin-bottom: 4px;
  display: block;
}

.card input {
  margin-bottom: 14px;
}

.card button {
  margin-top: 10px;
}
</style>
