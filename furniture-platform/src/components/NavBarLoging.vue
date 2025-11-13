<template>
    <nav class="navbar">
        <NavbarLink to="/panier">
            Panier
        </NavbarLink>

        <NavbarLink to="/compte">
            Compte
        </NavbarLink>

        <NavbarLink to="/connexion">
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