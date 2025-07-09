export interface Restaurant {
  id: string;
  name: string;
  isOpen: boolean;
  closingTime: string;
  location: string;
  rating: number;
  heroImage: string;
  logo: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  options?: MenuOption[];
  calories?: number;
}

export interface MenuOption {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  required: boolean;
  choices: OptionChoice[];
}

export interface OptionChoice {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: Record<string, string[]>;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export type FulfillmentType = 'delivery' | 'collection';