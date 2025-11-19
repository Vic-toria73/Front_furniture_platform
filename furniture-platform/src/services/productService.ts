import api from "./api"; // ton instance axios

// recupère la liste des types dans la DB
export const getFurnitureTypes = async () => {
  const response = await api.get("/types");
  return response.data; 
};

export const createProduct = (formData: FormData) => {
  return api.post("/furniture/create", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
