import api from "./api";

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
  // On stocke le token JWT
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};


