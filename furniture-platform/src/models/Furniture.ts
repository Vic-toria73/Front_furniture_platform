import type { TypeModel } from "./TypeModel";

export interface Picture {
  id: number;
  url: string;
  altText?: string;
  createdAt: string;
  updatedAt: string;
}

export type FurnitureStatus =
  | "DRAFT"
  | "PENDING"
  | "VALIDATED"
  | "AVAILABLE"
  | "RESERVED"
  | "SOLD"
  | "DELETED";

export interface Furniture {
  id: number;
  name: string;
  description?: string;
  height?: number;
  width?: number;
  price?: number;
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