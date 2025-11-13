<template>
 <RouterView/>
</template>

<script setup lang="ts">
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
}

/* Le contenu principal prend tout l’espace disponible */
.main-content {
  flex: 1;
}

/* Petit ajustement visuel si nécessaire */
body {
  font-family: 'Text Me One', sans-serif;
  background-color: #faf9f8;
}
</style>