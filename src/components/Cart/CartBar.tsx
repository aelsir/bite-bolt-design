import React from 'react';
import { Cart } from '../../types';

interface CartBarProps {
  cart: Cart;
  onClick: () => void;
  isBottomNavVisible: boolean;
  isBasketScreen?: boolean;
}

export const CartBar: React.FC<CartBarProps> = ({ cart, onClick, isBottomNavVisible, isBasketScreen }) => {
  const isEmpty = cart.items.length === 0;
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  // Don't render anything if cart is empty
  if (isEmpty) {
    return null;
  }

  return (
    <div className={`fixed ${isBottomNavVisible ? 'bottom-16' : 'bottom-0'} left-0 right-0 flex justify-center z-40 transition-all duration-slide ease-out`}>
      <button 
        className="w-full flex items-center justify-between bg-accent py-4 px-6 shadow-lg rounded-none"
        onClick={onClick}
      >
        {/* Item count on the left */}
        <div className="relative flex items-center">
          <span className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-accent font-bold text-lg">
            {itemCount}
          </span>
        </div>
        {/* Button label in the center */}
        <span className="text-white text-xl">
          {isBasketScreen ? 'Go to checkout' : 'View basket'}
        </span>
        {/* Total price on the right */}
        <span className="font-bold text-white text-lg">
          £{cart.total.toFixed(2)}
        </span>
      </button>
    </div>
  );
};