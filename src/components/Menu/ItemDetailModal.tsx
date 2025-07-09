import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Minus, Plus } from 'lucide-react';
import { MenuItem, OptionChoice } from '../../types';

interface ItemDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, selectedOptions: Record<string, string[]>) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (isOpen && item) {
      // Reset state when modal opens
      setQuantity(1);
      setSelectedOptions({});
      setTotalPrice(item.price);
    }
  }, [isOpen, item]);

  useEffect(() => {
    if (!item) return;
    
    // Calculate total price based on selected options
    let optionsPrice = 0;
    
    if (item.options) {
      item.options.forEach(option => {
        const selected = selectedOptions[option.id] || [];
        selected.forEach(choiceId => {
          const choice = option.choices.find(c => c.id === choiceId);
          if (choice) {
            optionsPrice += choice.price;
          }
        });
      });
    }
    
    setTotalPrice((item.price + optionsPrice) * quantity);
  }, [selectedOptions, quantity, item]);

  const handleOptionChange = (optionId: string, choiceId: string, isRadio: boolean) => {
    setSelectedOptions(prev => {
      const current = prev[optionId] || [];
      
      if (isRadio) {
        return { ...prev, [optionId]: [choiceId] };
      } else {
        const isSelected = current.includes(choiceId);
        if (isSelected) {
          return { ...prev, [optionId]: current.filter(id => id !== choiceId) };
        } else {
          return { ...prev, [optionId]: [...current, choiceId] };
        }
      }
    });
  };

  const handleAddToCart = () => {
    if (!item) return;
    onAddToCart(item, quantity, selectedOptions);
    onClose();
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  const isRequiredOptionMissing = () => {
    if (!item || !item.options) return false;
    
    return item.options.some(option => {
      if (!option.required) return false;
      const selected = selectedOptions[option.id] || [];
      return selected.length === 0;
    });
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity duration-slide"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute inset-x-0 bottom-0 bg-surface dark:bg-surface-dark rounded-t-card max-h-[90vh] overflow-hidden flex flex-col animate-slide-up">
        {/* Header with image */}
        <div className="relative">
          {item.image && (
            <div className="w-full h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-surface dark:bg-surface-dark rounded-full flex items-center justify-center shadow-hover"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-32">
          <div className="mb-4">
            <h2 className="text-20 font-bold text-text-high dark:text-text-high-dark mb-2">
              {item.name}
            </h2>
            {item.description && (
              <p className="text-text-body dark:text-text-body-dark">
                {item.description}
              </p>
            )}
          </div>
          
          {/* Options */}
          {item.options?.map(option => (
            <div key={option.id} className="mb-6 p-4 border border-stroke dark:border-stroke-dark rounded-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-text-high dark:text-text-high-dark">
                  {option.name}
                </h3>
                {option.required && (
                  <span className="text-sm text-accent dark:text-accent-dark font-medium">
                    Required
                  </span>
                )}
              </div>
              
              <div className="space-y-3">
                {option.choices.map(choice => {
                  const isSelected = (selectedOptions[option.id] || []).includes(choice.id);
                  
                  return (
                    <label
                      key={choice.id}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type={option.type}
                          name={option.id}
                          checked={isSelected}
                          onChange={() => handleOptionChange(option.id, choice.id, option.type === 'radio')}
                          className="w-5 h-5 text-accent dark:text-accent-dark focus:ring-accent dark:focus:ring-accent-dark"
                        />
                        <span className="text-text-body dark:text-text-body-dark">
                          {choice.name}
                        </span>
                      </div>
                      {choice.price > 0 && (
                        <span className="text-accent dark:text-accent-dark font-medium">
                          +£{choice.price.toFixed(2)}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Sticky Bottom Bar */}
        <div className="sticky bottom-0 bg-surface dark:bg-surface-dark border-t border-stroke dark:border-stroke-dark p-4">
          {/* Quantity Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={handleQuantityDecrease}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-full border border-stroke dark:border-stroke-dark flex items-center justify-center transition-all duration-button ease-out hover:shadow-hover focus:border-accent dark:focus:border-accent-dark disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="min-w-8 text-center font-medium text-text-high dark:text-text-high-dark text-lg">
              {quantity}
            </span>
            <button
              onClick={handleQuantityIncrease}
              className="w-10 h-10 rounded-full border border-stroke dark:border-stroke-dark flex items-center justify-center transition-all duration-button ease-out hover:shadow-hover focus:border-accent dark:focus:border-accent-dark"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isRequiredOptionMissing()}
            className="w-full bg-accent dark:bg-accent-dark text-white font-medium py-4 px-6 rounded-card transition-all duration-button ease-out hover:shadow-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Add • £{totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};