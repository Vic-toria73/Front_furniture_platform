import axios from "axios";

const API_URL = "/api/material";

export async function getMaterials() {
  try {
    const response = await axios.get(API_URL + "/all");
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des matériaux :", error);
    return [];
  }
}
