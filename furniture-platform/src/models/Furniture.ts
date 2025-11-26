import type { TypeModel } from "./TypeModel";
import type { ColorModel } from "./ColorModels";

export interface Picture {
  id: number;
  url: string;
  altText?: string;
  createdAt: string;
  updatedAt: string;
}
 
export interface MaterialModel {
  id: number;
  name: string;
}

export type FurnitureStatus =
  | "DRAFT"
  | "PENDING"
  | "VALIDATED"
  | "AVAILABLE"
  | "RESERVED"
  | "SOLD"
  | "DELETED"
  | "REJECTED";

export interface Furniture {
  id: number;
  name: string;
  description?: string;
  height?: number;
  width?: number;
  price?: number;
  color?: ColorModel;
  colorId?: number;
  material?: MaterialModel;
  materialId?: number; 
  status: FurnitureStatus;
  type?: TypeModel;
  typeId?: number;
  orderId?: number;
  addressId?: number;
  userId?: number;
  createdAt: string;
  updatedAt: string;
  pictures: Picture[];
}