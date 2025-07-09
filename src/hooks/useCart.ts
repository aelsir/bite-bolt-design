import { useState, useCallback } from 'react';
import { Cart, CartItem, MenuItem } from '../types';

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0
  });

  const addToCart = useCallback((
    menuItem: MenuItem, 
    quantity: number, 
    selectedOptions: Record<string, string[]>
  ) => {
    setCart(prevCart => {
      // Calculate item price with options
      let optionsPrice = 0;
      if (menuItem.options) {
        menuItem.options.forEach(option => {
          const selected = selectedOptions[option.id] || [];
          selected.forEach(choiceId => {
            const choice = option.choices.find(c => c.id === choiceId);
            if (choice) {
              optionsPrice += choice.price;
            }
          });
        });
      }
      
      const itemTotalPrice = (menuItem.price + optionsPrice) * quantity;
      
      // Create unique ID for cart item based on menu item and selected options
      const optionsKey = Object.entries(selectedOptions)
        .map(([key, values]) => `${key}:${values.sort().join(',')}`)
        .join('|');
      const cartItemId = `${menuItem.id}_${optionsKey}`;
      
      // Check if item with same options already exists
      const existingItemIndex = prevCart.items.findIndex(item => 
        item.id === cartItemId
      );
      
      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
          totalPrice: newItems[existingItemIndex].totalPrice + itemTotalPrice
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          id: cartItemId,
          menuItem,
          quantity,
          selectedOptions,
          totalPrice: itemTotalPrice
        };
        newItems = [...prevCart.items, newItem];
      }
      
      const newTotal = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
      
      return {
        items: newItems,
        total: newTotal
      };
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        // Remove item
        const newItems = prevCart.items.filter(item => item.id !== itemId);
        const newTotal = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
        return { items: newItems, total: newTotal };
      }
      
      const newItems = prevCart.items.map(item => {
        if (item.id === itemId) {
          const pricePerUnit = item.totalPrice / item.quantity;
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: pricePerUnit * newQuantity
          };
        }
        return item;
      });
      
      const newTotal = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
      
      return { items: newItems, total: newTotal };
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.id !== itemId);
      const newTotal = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
      return { items: newItems, total: newTotal };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0 });
  }, []);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };
};