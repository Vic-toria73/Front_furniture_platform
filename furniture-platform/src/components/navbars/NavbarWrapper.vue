<template>
  <component :is="navbarComponent" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "@/stores/authStore";

import AdminNavbar from "./AdminNavbar.vue";
import UserNavbar from "./UserNavbar.vue";
import GuestNavbar from "./GuestNavbar.vue";

const auth = useAuthStore();

const navbarComponent = computed(() => {
  if (auth.role === "ADMIN") return AdminNavbar;
  if (auth.role === "USER") return UserNavbar;
  return GuestNavbar;
});
</script>
