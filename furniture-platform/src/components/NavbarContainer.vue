<template>
  <nav class="navbar flex items-center gap-4 md:gap-6">
    <NavbarLink to="/cart" icon="ShoppingCart">Panier</NavbarLink>
    <NavbarLink to="/user" icon="User">Compte</NavbarLink>
    <NavbarLink to="/home" icon="LogOut">Déconnexion</NavbarLink>
  </nav>
</template>

<script setup lang="ts">
import NavbarLink from './NavbarLink.vue'
</script>
