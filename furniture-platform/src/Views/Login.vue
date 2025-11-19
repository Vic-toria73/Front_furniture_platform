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
          <input placeholder="Votre email" type="email" v-model="email" required />
        </div>

        <div class="form-group">
          <label>Mot de passe *</label>

          <div class="input-wrapper">
            <Lock class="icon-left" />

            <!-- 🔥 Correction ici : on utilise bien `password` -->
            <input 
              :type="showPassword ? 'text' : 'password'" 
              v-model="password" 
              placeholder="Votre mot de passe"
              required 
            />

            <button type="button" class="toggle-pass" @click="showPassword = !showPassword">
              <Eye v-if="!showPassword" />
              <EyeOff v-else />
            </button>
          </div>
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
import { useAuthStore } from "@/stores/authStore";
import { loginUser } from "@/services/authService";
import { Eye, EyeOff, Lock, LogIn,CheckCircle } from "lucide-vue-next";

// --- States ---
const email = ref("");
const password = ref("");
const showPassword = ref(false);

const successMessage = ref("");
const messageType = ref<"success" | "error">("success");

const auth = useAuthStore();
const router = useRouter();

/* ---------- LOGIN ---------- */
const handleLogin = async () => {
  try {
    const response = await loginUser({
      email: email.value,
      password: password.value,
    });

    console.log("Login API response :", response);

    // Le store n'a pas récupéré de rôle ⇒ identifiants incorrects
    if (!auth.role) {
      messageType.value = "error";
      successMessage.value = "Identifiants incorrects.";
      return;
    }

    await nextTick();
    messageType.value = "success";

    // Redirection selon rôle
    if (auth.role === "ADMIN") {
      successMessage.value = "Bienvenue Lauréline ! 🎉";
      setTimeout(() => router.push("/admin"), 1500);
      return;
    }

    successMessage.value = "Connexion réussie ! 👏";
    setTimeout(() => router.push("/home"), 1500);

  } catch (error) {
    console.error("Erreur login :", error);
    messageType.value = "error";
    successMessage.value = "Impossible de se connecter.";
    password.value = "";
  }
};
</script>

<style scoped>
.main-content {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem; 
}

.card {
  background-color: var(--background);
  border-radius: 0.75rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  width: 100%;
  max-width: 420px;
  font-family: 'Text Me One', sans-serif;
  margin: 1rem auto;
}

.form-group {
  margin-bottom: 1rem; /* ou 1.25rem, ou 1.5rem selon ton goût */
}

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

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  width: 100%;
  padding-left: 40px;  /* espace pour l’icône de gauche */
  padding-right: 40px; /* espace pour le bouton œil à droite */
  height: 40px;
  box-sizing: border-box;
}

.icon-left {
  position: absolute;
  left: 10px;
  width: 18px;
  height: 18px;
}

.toggle-pass {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-pass svg {
  width: 20px;
  height: 20px;
}
</style>
