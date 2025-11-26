import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    role: localStorage.getItem("role") || "GUEST",
    userId: localStorage.getItem("userId") || null,
    token: localStorage.getItem("token") || null
  }),

  actions: {
    login(role: string, userId?: string) {
      this.role = role;
      localStorage.setItem("role", role);

      if (userId) {
        this.userId = userId;
        localStorage.setItem("userId", userId);
      }
    },

    logout() {
      this.role = "GUEST";
      this.userId = null;

      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
  }
});
