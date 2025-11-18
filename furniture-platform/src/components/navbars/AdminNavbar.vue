<template>
  <div class="navbar-admin">
    <NavbarLink to="/admin/dashboard">Dashboard</NavbarLink>
    <NavbarLink to="/admin/">Gestion Meubles</NavbarLink>

    <button class="logout-btn" @click="onLogout">Déconnexion</button>
  </div>
</template>

<script setup lang="ts">
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

<style scoped>
.navbar-admin {
  display: flex;
  gap: 1rem;
}
.logout-btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid white;
  background: transparent;
  color: white;
}
.logout-btn:hover {
  background: rgba(255,255,255,0.2);
}
</style>
