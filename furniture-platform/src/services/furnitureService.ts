import { useAuthStore } from "@/stores/authStore";
import api from "./api";
import type { Furniture, FurnitureStatus } from "@/models/Furniture";



// PUBLIC : récupérer meubles disponibles (VALIDATED + AVAILABLE)
export async function fetchFurnitures(): Promise<Furniture[]> {
  const res = await api.get("/furniture/public");
  return res.data as Furniture[];
}

//USER
// afficher seulement ses propres annonces
export async function fetchUserFurnitures(): Promise<Furniture[]> {
  const auth = useAuthStore();
  const res = await api.get("/furniture/user/me")
  return res.data as Furniture[];
}

//ADMIN 
// Récupère tous les meubles
export async function fetchAdminFurnitures(): Promise<Furniture[]> {
  const res = await api.get("/furniture/admin");
  return res.data as Furniture[];
}

// update du statut
export async function updateFurnitureStatus(id: number, status: FurnitureStatus) {
  return api.post(`/furniture/${id}/status`, { status });
}

// update complet du meuble
export async function updateFurniture(
  id: number,
  data: {
    name?: string;
    price?: number;
    description?: string;
    typeId?: number;
    colorId?: number;
    materialId?: number;
    height?: number;
    width?: number
  },
  forUser: boolean = false
): Promise<Furniture> {
   const url = forUser
    ? `/furniture/user/${id}`
    : `/furniture/${id}`; // admin

  const res = await api.put(url, data);
  return res.data as Furniture;
}



// Delete le meuble
export async function deleteFurnitureById(id: number): Promise<void> {
  await api.delete(`/furniture/${id}`);
}