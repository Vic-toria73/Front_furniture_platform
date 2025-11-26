import axios from "axios";

const API_URL = "/api/color";

export async function getColors() {
  try {
    const response = await axios.get(API_URL + "/all");
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des couleurs :", error);
    return [];
  }
}
