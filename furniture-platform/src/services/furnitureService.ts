import api from "./api";
import type { Furniture } from "@/models/Furniture";

export const getAllFurniture = async (): Promise<Furniture[]> => {
  const response = await api.get("/furniture");
  return response.data;
};

