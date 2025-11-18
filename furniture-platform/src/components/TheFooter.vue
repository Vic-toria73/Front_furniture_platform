<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Section gauche : logo ou nom du site -->
      <!-- Section centrale : liens -->
      <nav class="footer-links">
        <RouterLink to="/home" class="footer-link">FAQ</RouterLink>
        <RouterLink to="/home" class="footer-link">Contact</RouterLink>
        <RouterLink to="/home" class="footer-link">À propos</RouterLink>
        <RouterLink to="/home" class="footer-link">Mentions légales</RouterLink>
      </nav>

      <!-- Section droite : réseaux sociaux -->
      <div class="footer-socials">
        <a href="https://facebook.com" target="_blank" aria-label="Facebook" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="white" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>

        <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="white" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Ligne de copyright -->
    <div class="footer-bottom">
      <p>© {{ new Date().getFullYear() }} Esprit Meuble — Tous droits réservés</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Footer',
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Text+Me+One&display=swap');

.footer {
  background-color: #95674d;
  color: white;
  font-family: 'Text Me One', sans-serif;
  padding: 2rem 1rem 1rem;
  border-top: 1px solid #7a523e;
}

/* === CONTENEUR GLOBAL === */
.footer-content {
  max-width: 1200px;
  margin: 0 auto;

  /* On centre tout verticalement et horizontalement */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  text-align: center;
}

/* === LIENS CENTRAUX === */
.footer-links {
  display: flex;
  justify-content: center; /* ✅ Centré horizontalement */
  align-items: center; /* ✅ Aligné verticalement */
  gap: 1.5rem;
  flex-wrap: wrap;
  margin: 0 auto; /* Pour s’assurer du centrage */
}

.footer-link {
  color: white;
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 1rem;
}

.footer-link:hover {
  color: #d2b48c; /* marron clair au survol */
  transform: scale(1.05);
}

/* === RÉSEAUX SOCIAUX === */
.footer-socials {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.social-link:hover {
  transform: scale(1.2);
}

/* === BAS DU FOOTER === */
.footer-bottom {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: #f2e8e5;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 0.75rem;
  width: 100%;
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
    gap: 1rem;
  }
}

</style>