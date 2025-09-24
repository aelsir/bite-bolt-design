import React from 'react';
import { MenuItem } from '../../types';
import { Card } from '../ui/Card';

interface MenuItemCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onClick }) => {
  return (
    <Card onClick={() => onClick(item)} className="mb-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <h3 className="text-16 font-semibold text-text-high dark:text-text-high-dark mb-1">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-sm text-text-body dark:text-text-body-dark mb-2 line-clamp-2">
              {item.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-15 font-semibold text-accent dark:text-accent-dark">
              £{item.price.toFixed(2)}
            </span>
          </div>
        </div>
        
        {item.image && (
          <div className="w-22 h-22 flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded-card"
            />
          </div>
        )}
      </div>
    </Card>
  );
};