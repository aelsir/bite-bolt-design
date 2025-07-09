import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onChange,
  min = 0,
  max = 99
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        className="qty-button"
        onClick={handleDecrease}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <span className="min-w-8 text-center font-medium text-text-high dark:text-text-high-dark">
        {value}
      </span>
      <button
        className="qty-button"
        onClick={handleIncrease}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};