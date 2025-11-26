import api from "./api";
import { useAuthStore } from "@/stores/authStore";

export interface RegisterData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);

    if (response.status !== 200) throw new Error(`Erreur HTTP ${response.status}`);

  // On stocke le token JWT
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  console.log(response);
  const auth = useAuthStore();
  auth.login(response.data.role, response.data.id?.toString());
  
  return response;
};