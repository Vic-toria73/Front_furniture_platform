export interface Picture {
  id: number;
  url: string;
  altText?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Furniture {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  pictures: Picture[];
}