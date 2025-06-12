export interface ProductImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Product {
  image: ProductImage;
  name: string;
  category: string;
  price: number;
}

export type ProductList = Product[];

export interface cartItem {
  dessertName: string;
  image: ProductImage;
  quantity: number;
}
