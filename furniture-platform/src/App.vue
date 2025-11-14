<template>
  <div class="app-container">
    <TheHeader/>
    <!-- Contenu de la page -->
    <main class="content">
      <RouterView />
    </main>

    <TheFooter/>
  </div>
</template>

<script setup lang="ts">
import TheFooter from './components/TheFooter.vue';
import TheHeader from './components/TheHeader.vue';
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Le conteneur principal occupe tout l’écran */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Text Me One', sans-serif;
}

/* Le contenu principal prend tout l’espace disponible */
.content {
  flex: 1;
}

/* Petit ajustement visuel si nécessaire */
body {
  font-family: 'Text Me One', sans-serif;
  background-color: #faf9f8;
}
</style>
