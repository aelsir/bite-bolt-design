import { Restaurant, Category, MenuItem } from '../types';

export const restaurant: Restaurant = {
  id: '1',
  name: 'dev',
  isOpen: true,
  closingTime: '23:54',
  location: '54 Hulme Road, None, Manchester, M34 2WZ',
  rating: 5,
  heroImage: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  logo: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=192&h=192&dpr=2'
};

export const categories: Category[] = [
  { id: 'pizzas', name: 'Pizzas', icon: '🍕' },
  { id: 'mains', name: 'Mains', icon: '🍽️' },
  { id: 'meals', name: 'Meals', icon: '🥘' },
  { id: 'pizza-deals', name: 'Pizza Deals', icon: '🎉' },
  { id: 'platters', name: 'Platters', icon: '🍱' },
  { id: 'sides', name: 'Sides', icon: '🍟' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
];

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita',
    description: 'Classic tomato base with fresh mozzarella and basil',
    price: 8.99,
    category: 'pizzas',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=176&h=176&dpr=2',
    calories: 720,
    options: [
      {
        id: 'size',
        name: 'Size',
        type: 'radio',
        required: true,
        choices: [
          { id: 'small', name: 'Small (9")', price: 0 },
          { id: 'medium', name: 'Medium (12")', price: 3 },
          { id: 'large', name: 'Large (15")', price: 6 }
        ]
      },
      {
        id: 'extras',
        name: 'Extra Toppings',
        type: 'checkbox',
        required: false,
        choices: [
          { id: 'pepperoni', name: 'Pepperoni', price: 1.5 },
          { id: 'mushrooms', name: 'Mushrooms', price: 1 },
          { id: 'olives', name: 'Olives', price: 1 }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Special',
    description: 'Create your own pizza — any 4 toppings of your choice.',
    price: 8.99,
    category: 'pizzas',
    calories: 850,
    options: [
      {
        id: 'size',
        name: 'Size',
        type: 'radio',
        required: true,
        choices: [
          { id: 'small', name: 'Small (9")', price: 0 },
          { id: 'medium', name: 'Medium (12")', price: 3 },
          { id: 'large', name: 'Large (15")', price: 6 }
        ]
      },
      {
        id: 'toppings',
        name: 'Choose 4 Toppings',
        type: 'checkbox',
        required: true,
        choices: [
          { id: 'pepperoni', name: 'Pepperoni', price: 0 },
          { id: 'mushrooms', name: 'Mushrooms', price: 0 },
          { id: 'peppers', name: 'Bell Peppers', price: 0 },
          { id: 'onions', name: 'Red Onions', price: 0 },
          { id: 'olives', name: 'Black Olives', price: 0 },
          { id: 'chicken', name: 'Grilled Chicken', price: 0 }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Italiano',
    description: 'Pepperoni, beef, mushroom, red onion.',
    price: 8.99,
    category: 'pizzas',
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=176&h=176&dpr=2',
    calories: 920
  },
  {
    id: '4',
    name: 'Hot & Spicy',
    description: 'Pepperoni, spicy beef, red onion, green peppers & fresh chilli.',
    price: 8.99,
    category: 'pizzas',
    calories: 950
  },
  {
    id: '5',
    name: 'Seafood',
    description: 'Tuna, prawns, anchovies.',
    price: 9.99,
    category: 'pizzas',
    calories: 680
  },
  {
    id: '6',
    name: 'Chicken Tikka Masala',
    description: 'Tender chicken in creamy tikka masala sauce served with basmati rice',
    price: 12.99,
    category: 'mains',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=176&h=176&dpr=2',
    calories: 780
  },
  {
    id: '7',
    name: 'Fish & Chips',
    description: 'Beer-battered cod with chunky chips and mushy peas',
    price: 11.99,
    category: 'mains',
    calories: 890
  },
  {
    id: '8',
    name: 'Family Feast',
    description: '2 large pizzas, garlic bread, and 1.5L drink',
    price: 24.99,
    category: 'meals',
    calories: 1850
  }
];