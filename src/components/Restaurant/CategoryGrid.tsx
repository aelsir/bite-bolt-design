import React from 'react';
import { Category } from '../../types';

interface CategoryGridProps {
  categories: Category[];
  onSelect: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelect
}) => {
  // Sample category images - in a real app these would come from the data
  const categoryImages: Record<string, string> = {
    'pizzas': 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    'mains': 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    'meals': 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    'pizza-deals': 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    'platters': 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    'sides': 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    'desserts': 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    'drinks': 'https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
  };

  return (
    <div className="px-4 pb-20">
      <h2 className="text-xl font-bold text-text-high dark:text-text-high-dark mb-6">
        Categories
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className="group bg-surface dark:bg-surface-dark rounded-card border border-stroke dark:border-stroke-dark overflow-hidden transition-all duration-button ease-out hover:shadow-hover focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark"
          >
            {/* Category Image */}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={categoryImages[category.id] || categoryImages['pizzas']}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Category Info */}
            <div className="p-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">{category.icon}</span>
                <h3 className="font-semibold text-text-high dark:text-text-high-dark">
                  {category.name}
                </h3>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};