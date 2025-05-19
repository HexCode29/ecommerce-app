export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartProduct {
  productId: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
}
