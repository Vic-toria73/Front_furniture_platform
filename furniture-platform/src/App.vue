<template>
  <div id="app">
    <TheHeader />

    <main class="content">
      <router-view />
    </main>

    <TheFooter />
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

#app {
  min-height: 100vh;        /* Toute la hauteur */
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;                  /* Le main prend tout l'espace disponible */
}

/* Petit ajustement visuel si nécessaire */

</style>
