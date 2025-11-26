<script setup lang="ts">
import { LogIn, UserPlus } from 'lucide-vue-next';
import NavbarLink from './NavbarLink.vue';

</script>

<template>
  <div class="navbar-guest flex gap-4">
    <NavbarLink to="/register"><UserPlus/> S'inscrire</NavbarLink>
    <NavbarLink to="/login"><LogIn/> Connexion</NavbarLink>
  </div>
</template>
