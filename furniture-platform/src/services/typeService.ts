import axios from "axios";

export interface TypeModel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const getAllTypes = async (): Promise<TypeModel[]> => {
  const response = await axios.get("/types");
  return response.data;
};

export const getTypeById = async (id: number): Promise<TypeModel> => {
  const response = await axios.get(`/types/${id}`);
  return response.data;
};

export const createType = async (payload: { name: string }): Promise<TypeModel> => {
  const response = await axios.post("/types", payload);
  return response.data;
};
