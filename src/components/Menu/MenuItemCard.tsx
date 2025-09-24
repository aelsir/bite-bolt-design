import React from 'react';
import { MenuItem } from '../../types';
import { Card } from '../ui/Card';

interface MenuItemCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onClick }) => {
  return (
    <Card onClick={() => onClick(item)} className="mb-4 h-32">
      <div className="flex gap-4 h-full">
        <div className="flex-1">
          <h3 className="text-16 font-semibold text-text-high dark:text-text-high-dark mb-1">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-sm text-text-body dark:text-text-body-dark mb-2 line-clamp-3 flex-1">
              {item.description}
            </p>
          )}
          
          {/* Options indicator */}
          {item.options && item.options.length > 0 && (
            <div className="text-xs text-text-subtle dark:text-text-subtle-dark mb-2">
              {item.options.length} option{item.options.length > 1 ? 's' : ''} available
            </div>
          )}
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-15 font-semibold text-accent dark:text-accent-dark">
              £{item.price.toFixed(2)}
            </span>
            {item.calories && (
              <span className="text-xs text-text-subtle dark:text-text-subtle-dark">
                {item.calories} cal
              </span>
            )}
          </div>
        </div>
        
        <div className="w-22 h-22 flex-shrink-0">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded-card border border-stroke dark:border-stroke-dark"
            />
          ) : (
            <div className="w-full h-full bg-subsurface dark:bg-subsurface-dark rounded-card border border-stroke dark:border-stroke-dark flex items-center justify-center">
              <span className="text-2xl opacity-30">🍽️</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};