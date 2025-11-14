<template>
  <!-- Message de succès -->
  <div class="success-message" v-if="message">
    <div class="success-icon">
      <CheckCircle class="w-5 h-5" />
    </div>
    {{ message }}
  </div>

  <div class="main-content">
    <div class="card">
      <h2 class="card-header">Inscription</h2>

      <form class="form-container" @submit.prevent="register">
        <div class="form-group">
          <label class="form-label">Email *</label>
          <div class="input-icon">
            <Mail class="icon" />
            <input
              type="email"
              v-model="form.email"
              placeholder="Votre email"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Prénom *</label>
          <div class="input-icon">
            <User class="iconUser" />
            <input
              type="text"
              v-model="form.firstname"
              placeholder="Votre prénom"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Nom *</label>
          <div class="input-icon">
            <User class="icon" />
            <input
              type="text"
              v-model="form.lastname"
              placeholder="Votre nom"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Mot de passe *</label>
          <div class="input-icon">
            <Lock class="icon" />
            <input
              type="password"
              v-model="form.password"
              placeholder="Votre mot de passe"
              required
            />
          </div>
        </div>

        <button class="submit-btn" type="submit">
          <LogIn class="w-5 h-5" />
          <span>S'inscrire</span>
        </button>
      </form>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { registerUser } from "../services/authService";
import TheHeader from "@/components/TheHeader.vue";
import { CheckCircle, Lock, LogIn, Mail, User } from "lucide-vue-next";

const form = reactive({
  email: "",
  firstname: "",
  lastname: "",
  password: "",
});

const message = ref("");

const register = async () => {
  try {
    const response = await registerUser(form);
    message.value = response.message || "Inscription réussie !";
  } catch (error: any) {
    message.value = error.response?.data?.error || "Erreur lors de l'inscription";
  }
};
</script>
<style scoped>
/* === SUCCESS MESSAGE === */
.success-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #e6fffa;
  border: 1px solid #38b2ac;
  color: #065f46;
  padding: 0.75rem 1rem;
  margin: 1rem auto;
  max-width: 400px;
  border-radius: 0.5rem;
  font-family: 'Text Me One', sans-serif;
}

.success-icon {
  color: #10b981;
}

/* === LAYOUT PRINCIPAL === */
.main-content {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* évite le chevauchement du header */
  min-height: calc(100vh - 220px); /* 220px = header + footer estimés */
  padding: 4rem 1rem 6rem; /* ajoute de l’air en haut et en bas */
  background-color: #f9fafb;
  font-family: 'Text Me One', sans-serif;
}

/* === CARD === */
.card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 420px;
  font-family: 'Text Me One', sans-serif;
  position: relative;
  z-index: 1; /* évite d'être masqué */
}

/* === HEADER DE LA CARD === */
.card-header {
  font-size: 1.5rem;
  font-weight: 600;
  color: #171717;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* === FORM === */
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #333;
}

.input-icon {
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.input-icon input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
}

.icon {
  color: #6b7280;
  margin-right: 0.5rem;
}

/* === BOUTON === */
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  background-color: #2f855a;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.submit-btn:hover {
  background-color: #276749;
}

</style>
