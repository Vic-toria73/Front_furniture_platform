<template>
  <div class="navbar-user">
    <NavbarLink to="/cart"> <ShoppingCart/> Mon panier</NavbarLink>
    <NavbarLink to="/user"> <User /> Mon compte</NavbarLink>

    <button class="logout-btn" @click="onLogout"> <LogOut/> Déconnexion</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import NavbarLink from "./NavbarLink.vue";
import { LogOut, ShoppingCart, User } from "lucide-vue-next";


const auth = useAuthStore();
const router = useRouter();

function onLogout() {
  auth.logout();
  router.push("/home");
}
</script>
