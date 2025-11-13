<template>
  <TheHeader />

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
          <label class="form-label">Prénom *</label>
          <input placeholder="Votre email" type="text" v-model="email" />
        </div>
        <div class="form-group">
          <label class="form-label">Mot de passe *</label>
          <input
            placeholder="Votre mot de passe"
            required
            type="password"
            v-model="password"
          />
        </div>
        <button class="submit-btn" type="submit">
           <LogIn class="w-5 h-5" />
          <span>Se connecter</span>
        </button>
      </form>
    </div>
  </div>

  <TheFooter/>
</template>

<script setup lang="ts">
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

import { Mail, User, Lock, LogIn, CheckCircle } from "lucide-vue-next";

interface LoginResponse {
  id?: number
  role?: 'ADMIN' | 'USER' | string
}

const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')
const successMessage = ref<string>('')
const messageType = ref<'success' | 'error'>('success')

const handleLogin = async (): Promise<void> => {
  try {
    const response = await fetch('http://localhost:8082/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

    const data: LoginResponse = await response.json()
    localStorage.setItem('email', email.value)

    if (data.role === 'ADMIN') {
      localStorage.setItem('role', 'ADMIN')

      successMessage.value = ''
      await nextTick()

      messageType.value = 'success'
      successMessage.value = 'Bienvenue Lauréline ! 🎉'

      setTimeout(() => {
        router.push('/admin')
      }, 2000)
    } else if (data.role === 'USER') {
      localStorage.setItem('role', 'USER')
      if (data.id) localStorage.setItem('userId', data.id.toString())

      successMessage.value = ''
      await nextTick()

      messageType.value = 'success'
      successMessage.value = 'Connexion réussie ! 👏'

      setTimeout(() => {
        router.push('/home')
      }, 2000)
    } else {
      messageType.value = 'error'
      successMessage.value = 'Identifiants incorrects'
    }
  } catch (err) {
    messageType.value = 'error'
    successMessage.value = 'Impossible de se connecter. Veuillez réessayer.'
    password.value = ''
    console.warn('Erreur de connexion détectée:', err)
  }
}
</script>

<style scoped>
/* === SUCCESS / ERROR === */
.success {
  background-color: #06c186;
}

.error {
  background-color: red;
}

/* === CENTRAGE CARTE === */
.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 150px); /* ajusté pour header */
  padding: 1rem;
  background-color: #f9fafb;
  font-family: 'Text Me One', sans-serif; /* police uniforme */
}

/* carte */
.card {
  display: inline-block;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin: 1rem;
  max-width: 400px;
  width: 100%;
  font-family: 'Text Me One', sans-serif; /* police uniforme */
}

/* titre de la carte */
.card-header {
  font-size: 1.25rem;
  font-weight: 600;
  color: #171717;
  margin-bottom: 1rem;
  text-align: center;
}

/* espacement des inputs */
.form-group {
  margin-bottom: 1rem; /* espace régulier entre label, input et bouton */
}

/* bouton */
.submit-btn {
  margin-top: 0.5rem; /* un petit espace supplémentaire si nécessaire */
}
</style>
