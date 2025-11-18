<template>
    <div class="page">
        <h1 class="title">Bienvenue 👋</h1>

        <div class="grid">
            <router-link to="/cart" class="card">
                <ShoppingCart class="icon" />
                <span>Voir mon panier</span>
            </router-link>

            <router-link to="/orders" class="card">
                <List class="icon" />
                <span>Mes commandes</span>
            </router-link>

            <router-link to="/account" class="card">
                <User class="icon" />
                <span>Mon compte</span>
            </router-link>

            <router-link to="/add-product" class="card">
                <PlusCircle class="icon" />
                <span>Déposer une annonce</span>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ShoppingCart, List, User, PlusCircle } from "lucide-vue-next"
</script>

<style scoped>
.page {
    padding: 2rem;
    text-align: center;
    font-family: "Text Me One", sans-serif;
}

.title {
    font-size: 2rem;
    margin-bottom: 2rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* ➜ 2 cartes par ligne */
    gap: 0.5rem;
    justify-items: center;
    /* centre les cartes */
}

.card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 200px;
    cursor: pointer;
    transition: .2s;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

.card:hover {
    transform: translateY(-3px);
}

.icon {
    width: 32px;
    height: 32px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 650px;
  margin: 0 auto;
}

@media (min-width: 600px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
