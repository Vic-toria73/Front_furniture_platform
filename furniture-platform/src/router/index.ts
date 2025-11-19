import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Admin from "@/views/Admin.vue";
import Cart from "@/views/Cart.vue";
import User from "@/views/User.vue";
import AddProduct from "@/views/AddProduct.vue";

const routes = [
  // Public : guest OK
  { path: "/home", component: Home },

  // Public : guest OK (page détail)
  {
    path: "/furniture/:id",
    name: "FurnitureDetail",
    component: () => import("@/views/FurnitureDetails.vue"),
  },

  // UNIQUEMENT guest (Si déjà connecté => redirect)
  { path: "/register", component: Register, meta: { requiresGuest: true } },
  { path: "/login", component: Login, meta: { requiresGuest: true } },

  // USER + ADMIN
  { path: "/cart", component: Cart, meta: { requiresUser: true } },
  { path: "/user", component: User, meta: { requiresUser: true } },


  //USER
  { path: "/add-product", component: AddProduct, meta:("@/views/AddProduct.vue") },

  // ADMIN
  { path: "/admin", component: Admin, meta: { requiresAdmin: true } },

  // Fallback
  { path: "/:pathMatch(.*)*", redirect: "/home" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();  
  const role = auth.role; // "GUEST" | "USER" | "ADMIN"

  // ADMIN
  if (to.meta.requiresAdmin && role !== "ADMIN") {
    return "/login";
  }

  // USER (user OU admin)
  if (to.meta.requiresUser && role === "GUEST") {
    return "/login";
  }

  // GUEST UNIQUEMENT
  if (to.meta.requiresGuest && role !== "GUEST") {
    return "/home";
  }

  return true;
});

export default router;
