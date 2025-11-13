import { createRouter, createWebHistory } from "vue-router";
import Register from "../Views/Register.vue";
import Login from "../Views/Login.vue";
import Home from "@/Views/Home.vue";
import Admin from "@/Views/Admin.vue";
import Cart from "@/Views/Cart.vue";
import User from "@/Views/User.vue";

const routes = [

  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/home", component: Home },
  { path: "/admin", component: Admin },
  { path: "/cart", component: Cart },
  { path: "/user", component: User },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

