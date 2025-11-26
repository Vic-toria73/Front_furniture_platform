<template>
  <div class="navbar-admin">
    <NavbarLink to="/admin/dashboard"> <LayoutDashboard/> Dashboard</NavbarLink>
    <NavbarLink to="/admin/"> <Clipboard/> Gestion Meubles</NavbarLink>

    <button class="logout-btn" @click="onLogout"> <LogOut/> Déconnexion</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import NavbarLink from "./NavbarLink.vue";
import { Clipboard, LayoutDashboard, LogOut } from "lucide-vue-next";

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
