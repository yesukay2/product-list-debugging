export interface Dessert {
  image: DessertImages;
  name: string;
  category: string;
  price: number;
}

interface DessertImages {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}
