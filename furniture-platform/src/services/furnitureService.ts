import api from "./api";
import type { Furniture, FurnitureStatus } from "@/models/Furniture";


// PUBLIC : récupérer meubles disponibles (VALIDATED + AVAILABLE)
export async function fetchFurnitures(): Promise<Furniture[]> {
  const res = await api.get("/furniture/public");
  return res.data as Furniture[];
}

export async function fetchAdminFurnitures(): Promise<Furniture[]> {
  const res = await api.get("/furniture/admin");
  return res.data as Furniture[];
}

// ADMIN : update du statut
export async function updateFurnitureStatus(id: number, status: FurnitureStatus) {
  return api.patch(`/furniture/${id}/status`, { status });
}
