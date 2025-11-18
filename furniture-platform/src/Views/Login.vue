<template>
  <div class="success-message" v-if="successMessage" :class="messageType">
    <div class="success-icon">
      <CheckCircle class="w-5 h-5" />
    </div>
    {{ successMessage }}
  </div>

  <div class="main-content">
    <div class="card">
      <h2 class="card-header">Connexion</h2>

      <form class="form-container" @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="form-label">Email *</label>
          <input
            placeholder="Votre email"
            type="email"
            v-model="email"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Mot de passe *</label>
          <input
            placeholder="Votre mot de passe"
            type="password"
            v-model="password"
            required
          />
        </div>

        <button class="submit-btn" type="submit">
          <LogIn class="w-5 h-5" />
          <span>Se connecter</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { LogIn, CheckCircle } from "lucide-vue-next";
import { useAuthStore } from "@/stores/authStore";
import { loginUser } from "@/services/authService";

interface LoginResponse {
  id?: number;
  role?: "ADMIN" | "USER" | string;
}

const auth = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const successMessage = ref("");
const messageType = ref<"success" | "error">("success");

/* ---------- LOGIN ---------- */
const handleLogin = async () => {
 try {
    const response = loginUser({
        email: email.value,
        password: password.value,
      });

const data = response;
console.log(data);
if (!auth.role) {
      messageType.value = "error";
      successMessage.value = "Identifiants incorrects.";
      return;
    }

    await nextTick();
    messageType.value = "success";

    if (auth.role === "ADMIN") {
      successMessage.value = "Bienvenue Lauréline ! 🎉";
      setTimeout(() => router.push("/admin"), 1500);
      return;
    }

    // USER
    successMessage.value = "Connexion réussie ! 👏";
    setTimeout(() => router.push("/home"), 1500);
  } catch (e) {
    console.error(e);
    messageType.value = "error";
    successMessage.value = "Impossible de se connecter.";
    password.value = "";
  }
   
};
</script>

<style scoped>
.logout-btn {
  background-color: #b45309;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  cursor: pointer;
  width: 100%;
}
.logout-btn:hover {
  background-color: #c1620c;
}
</style>
