import React, { useState } from 'react';
import { Cart, CartItem } from '../types';
import { Header } from '../components/Layout/Header';
import { Trash, Minus, Plus } from 'lucide-react';

interface BasketScreenProps {
  cart: Cart;
  onBack: () => void;
}

export const BasketScreen: React.FC<BasketScreenProps> = ({ cart, onBack }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [note, setNote] = useState('');
  const [items, setItems] = useState<CartItem[]>(cart.items);

  // Promo logic
  let promotion = 0;
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  if (appliedPromo === 'AAAA') {
    promotion = subtotal * 0.3;
  } else if (appliedPromo === 'BBBB') {
    promotion = Math.min(10, subtotal);
  }
  const deliveryFees = 2.99;
  const fees = 0.99;
  const total = subtotal - promotion + deliveryFees + fees;

  // Handlers
  const handleApplyPromo = () => {
    setAppliedPromo(promoCode.trim().toUpperCase());
  };
  const handleQuantityChange = (id: string, delta: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta), totalPrice: (item.totalPrice / item.quantity) * Math.max(1, item.quantity + delta) } : item
    ));
  };
  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  const handleClearBasket = () => {
    setItems([]);
  };

  return (
    <div className="pb-32 max-w-xl mx-auto">
      <Header 
        showBack 
        onBack={onBack} 
        title={<span className="ml-2">Your Basket</span>} 
        showRightAction={true}
        RightActionIcon={Trash}
        onRightActionClick={handleClearBasket}
        rightActionColorClass="text-red-500"
        rightActionBgClass="hover:bg-red-50"
      />
      <div className="p-4">
        <div className="mb-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500">Your basket is empty.</div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex justify-between items-stretch p-3 bg-white dark:bg-subsurface-dark rounded-lg shadow-sm border border-stroke dark:border-stroke-dark">
                {/* Left side: Item name, options, quantity controls */}
                <div className="flex flex-col flex-1">
                  <div className="font-semibold text-text-high dark:text-text-high-dark text-base">{item.menuItem.name}</div>
                  {Object.keys(item.selectedOptions).length > 0 && (
                    <div className="text-sm text-text-body dark:text-text-body-dark mt-1">
                      Options: {Object.entries(item.selectedOptions).map(([k, v]) => `${k}: ${v.join(', ')}`).join('; ')}
                    </div>
                  )}
                  {/* Quantity Control */}
                  <div className="flex items-center gap-1 mt-2">
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)} 
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200 text-text-high dark:bg-gray-700 dark:text-text-high-dark hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="min-w-[24px] text-center font-medium text-text-high dark:text-text-high-dark text-base">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)} 
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200 text-text-high dark:bg-gray-700 dark:text-text-high-dark hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Right side: Delete button & Price */}
                <div className="flex flex-col items-end justify-between h-full ml-4 self-stretch">
                  {/* Delete button aligned with title */}
                  <button 
                    onClick={() => handleRemoveItem(item.id)} 
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md hover:bg-red-50 transition"
                  >
                    <Trash size={18} className="text-red-500" />
                  </button>
                  {/* Price */}
                  <div className="font-bold text-accent text-lg">£{item.totalPrice.toFixed(2)}</div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="bg-gray-100 rounded-lg p-4 mb-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          {promotion > 0 && (
            <div className="flex justify-between">
              <span>Promotion</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded">-£{promotion.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery Fees</span>
            <span>£{deliveryFees.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Fees</span>
            <span>£{fees.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-300 text-lg font-bold">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <label className="block font-semibold mb-1 sr-only">Promo Code</label>
          <input
            type="text"
            value={promoCode}
            onChange={e => setPromoCode(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Enter promo code"
          />
          <button onClick={handleApplyPromo} className="bg-accent text-white px-4 py-2 rounded">Apply</button>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Note</label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Add a note for the restaurant (optional)"
          />
        </div>
      </div>
      {/* Fixed Go to Checkout button at the bottom */}
      <div className="fixed left-0 right-0 bottom-0 flex justify-center z-50">
        <button className="w-full bg-accent text-white py-4 px-6 mb-3 text-xl font-semibold rounded shadow-lg">
          Go to checkout
        </button>
      </div>
    </div>
  );
};