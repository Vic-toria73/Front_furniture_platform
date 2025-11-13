<template>
  <nav class="navbar flex items-center gap-4 md:gap-6">
    <NavbarLink to="/panier" icon="ShoppingCart">Panier</NavbarLink>
    <NavbarLink to="/compte" icon="User">Compte</NavbarLink>
    <NavbarLink to="/connexion" icon="LogOut">Déconnexion</NavbarLink>
  </nav>
</template>

<script setup lang="ts">
import NavbarLink from './NavbarLink.vue'
</script>
