<template>
  <header
    class="header flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-[#95674d] text-white font-[var(--font-main)]"
  >
    <!-- Logo -->
    <div class="logo-container flex items-center justify-start mb-2 md:mb-0">
      <img
        src="/logo.png"
        alt="Logo Esprit Meuble"
        class="logo h-32 md:h-36 w-auto"
      />
    </div>

    <!-- Titre -->
    <div class="title-container flex flex-col items-center text-center mb-2 md:mb-0">
      <h1 class="header-title text-2xl md:text-3xl font-semibold">
        Esprit Meuble
      </h1>
      <h2 class="header-subtitle text-sm md:text-base text-[#f5f2f0]">
        Des anciens meubles pour une nouvelle vie
      </h2>
    </div>

    <NavbarWrapper class="header-navbar"/>
  </header>
</template>

<script setup lang="ts">
import NavbarWrapper from './navbars/NavbarWrapper.vue';

defineOptions({ name: 'Header' })
</script>

<style scoped>

/* === STRUCTURE GLOBALE === */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #95674d;
  color: white;
  padding: 0.5rem 2rem;
  font-family: 'Text Me One', sans-serif;
}

.header-subtitle {
  font-size: 1.15rem;
  margin-top: 0.2rem;
  letter-spacing: 0.5px;
  font-weight: 500;

  color: #fff8f4;             /* couleur plus claire */
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35); /* renforce la lisibilité */
}
/* === LOGO === */
.logo-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.logo {
  height: 150px;
  width: auto;
}

/* === TITRE === */
.title-container {
  flex: 1;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  align-items: center;
}

.header-title {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
}

.header-subtitle {
  font-size: 1rem;
  margin: 0;
  color: #f5f2f0;
}

/* === NAVBAR */
.header-navbar {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3rem;
}

/* Styles des liens à l’intérieur de la navbar */
.header-navbar a {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.4rem 0.8rem;
  color: white;
  border-radius: 0.4rem;
  text-decoration: none;
  transition: all 0.25s ease;
}

/* Hover : éclaircissement + zoom */
.header-navbar a:hover {
  background-color: #a87b5b;
  transform: scale(1.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

/* Actif */
.header-navbar a.router-link-active {
  background-color: #b68a6c;
  font-weight: 600;
}

/* === RESPONSIVE === */
@media (max-width: 900px) {
  .header {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .logo-container,
  .header-navbar {
    justify-content: center;
  }

  .logo {
    height: 80px;
  }

  .header-title {
    font-size: 1.6rem;
  }

  .header-subtitle {
    font-size: 0.9rem;
  }

  .header-navbar {
    gap: 1rem;
  }
}
</style>
