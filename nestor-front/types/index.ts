export interface Pizza {
  id: string;
  name: string;
  ingredients?: string[];
  price?: number;
}

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  category: 'base' | 'cheese' | 'meat' | 'vegetable' | 'sauce';
}

export interface PizzaCustomization {
  addedIngredients: Ingredient[];
  removedIngredients: string[];
  extraPrice: number;
}

export interface Drink {
  id: number;
  name: string;
  price: number;
  size: string;
  withAlcohol: boolean;
  available: boolean;
}

export interface Dessert {
  id: number;
  name: string;
  price: number;
  available: boolean;
}

export interface Order {
  id: number;
  pizzas: number[];
  drinks: number[];
  desserts: number[];
  totalPrice: number;
  processed: boolean;
  createdAt: Date;
}

export interface CartItem {
  type: 'pizza' | 'drink' | 'dessert';
  id: number;
  name: string;
  price: number;
  quantity: number;
  withAlcohol?: boolean; // Pour les boissons uniquement
  customization?: PizzaCustomization; // Pour les pizzas uniquement
}

export interface Menu {
  pizza: CartItem;
  drink: CartItem;
  dessert: CartItem;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}
