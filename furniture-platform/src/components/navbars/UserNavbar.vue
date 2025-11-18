<template>
  <div class="navbar-user">
    <NavbarLink to="/cart">Mon panier</NavbarLink>
    <NavbarLink to="/user">Mon compte</NavbarLink>

    <button class="logout-btn" @click="onLogout">Déconnexion</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import NavbarLink from "./NavbarLink.vue";

const auth = useAuthStore();
const router = useRouter();

function onLogout() {
  auth.logout();
  router.push("/home");
}
</script>
