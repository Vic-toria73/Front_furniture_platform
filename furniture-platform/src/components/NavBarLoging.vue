<template>
    <nav class="navbar">
        <NavbarLink to="/cart">
            Panier
        </NavbarLink>

        <NavbarLink to="/user">
            Compte
        </NavbarLink>

        <NavbarLink to="/Deconnexion">
            Déconnexion
        </NavbarLink>
    </nav>
</template>
<script setup lang="ts">
import NavbarLink from "./NavbarLink.vue";
defineOptions({
    name: 'NavbarLink',
})
</script>