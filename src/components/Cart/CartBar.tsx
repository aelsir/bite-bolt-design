import React from 'react';
import { Cart } from '../../types';

interface CartBarProps {
  cart: Cart;
  onClick: () => void;
}

export const CartBar: React.FC<CartBarProps> = ({ cart, onClick }) => {
  const isEmpty = cart.items.length === 0;
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  // Don't render anything if cart is empty
  if (isEmpty) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-accent text-white p-4 transition-all duration-slide ease-out">
      <button 
        className="w-full flex items-center justify-between"
        onClick={onClick}
      >
        {/* Item count on the left */}
        <div className="w-8 h-8 bg-accent-dark rounded-md flex items-center justify-center font-bold text-white">
          {itemCount}
        </div>
        
        {/* "View Basket" in the center */}
        <span className="font-medium text-white">
          View Basket
        </span>
        
        {/* Total price on the right */}
        <span className="font-bold text-white">
          £{cart.total.toFixed(2)}
        </span>
      </button>
    </div>
  );
};