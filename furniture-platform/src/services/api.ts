import axios from "axios";

console.log("API LOADED with baseURL =", "http://localhost:8082/api");

const api = axios.create({
  baseURL: "http://localhost:8082/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor pour ajouter automatiquement le token JWT si connecté
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;