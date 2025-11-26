<template>
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

      <!-- Email -->
      <div class="form-group">
        <label for="emailInput">Email *</label>
        <div class="input-icon">
          <Mail class="icon" />
          <input id="emailInput" type="email" v-model="form.email" required />
        </div>
      </div>

      <!-- Prénom -->
      <div class="form-group">
        <label for="firstNameInput">Prénom *</label>
        <div class="input-icon">
          <User class="icon" />
          <input id="firstNameInput" type="text" v-model="form.firstname" required />
        </div>
      </div>

      <!-- Nom -->
      <div class="form-group">
        <label for="lastNameInput">Nom *</label>
        <div class="input-icon">
          <User class="icon" />
          <input id="lastNameInput" type="text" v-model="form.lastname" required />
        </div>
      </div>

      <!-- Mot de passe -->
      <div class="form-group">
        <label for="passwordInput">Mot de passe *</label>
        <div class="input-icon">
          <Lock class="icon" />

          <input
            id="passwordInput"
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            placeholder="Votre mot de passe"
            required
          />

          <button
            type="button"
            class="toggle-password"
            @click="showPassword = !showPassword"
            aria-label="Afficher ou masquer le mot de passe"
          >
            <Eye v-if="!showPassword" class="eye-icon" />
            <EyeOff v-else class="eye-icon" />
          </button>
        </div>
      </div>

      <!-- Confirmation mot de passe -->
      <div class="form-group">
        <label for="passwordConfirmInput">Confirmer le mot de passe *</label>
        <div class="input-icon">
          <Lock class="icon" />

          <input
            id="passwordConfirmInput"
            :type="showPassword2 ? 'text' : 'password'"
            v-model="form.password_confirmation"
            placeholder="Confirmez votre mot de passe"
            required
          />

          <button
            type="button"
            class="toggle-password"
            @click="showPassword2 = !showPassword2"
            aria-label="Afficher ou masquer la confirmation du mot de passe"
          >
            <Eye v-if="!showPassword2" class="eye-icon" />
            <EyeOff v-else class="eye-icon" />
          </button>
        </div>
      </div>

      <!-- Message erreur -->
      <p v-if="error" style="color:red; margin-top:-10px;">
        {{ error }}
      </p>

      <button class="submit-btn" type="submit">
        <LogIn class="w-5 h-5" />
        <span>S'inscrire</span>
      </button>

    </form>
  </div>
</div>
</template>



<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Mail, User, Lock, LogIn, CheckCircle, Eye, EyeOff } from "lucide-vue-next";

const router = useRouter();

const form = ref({
  email: "",
  firstname: "",
  lastname: "",
  password: "",
  password_confirmation: "",
});

const showPassword = ref(false);
const showPassword2 = ref(false);
const message = ref("");
const error = ref("");

const register = async () => {
  error.value = "";
  message.value = "";

  // Vérification mots de passe
  if (form.value.password !== form.value.password_confirmation) {
    error.value = "Les mots de passe ne correspondent pas.";
    return;
  }

  try {
    const response = await fetch("http://localhost:8082/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: form.value.email,
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        password: form.value.password,
        role: "USER"
      }),
    });

    const raw = await response.text();
    console.log("Réponse brute backend :", raw);

    if (!response.ok) {
      error.value = raw || "Impossible de créer le compte.";
      return;
    }

    message.value = "Inscription réussie 🎉";

    // Redirection après 1,3 seconde
    setTimeout(() => router.push("/login"), 1300);

  } catch (err) {
    console.warn("Erreur d'inscription :", err);
    error.value = "Une erreur est survenue. Réessayez.";
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
  align-items: flex-start;
  /* évite le chevauchement du header */
  min-height: calc(100vh - 220px);
  /* 220px = header + footer estimés */
  padding: 4rem 1rem 6rem;
  /* ajoute de l’air en haut et en bas */
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
  z-index: 1;
  /* évite d'être masqué */
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
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

</style>
