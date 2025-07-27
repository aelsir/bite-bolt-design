import React from 'react';
import { Category } from '../../types';
import { Pill } from '../ui/Pill';

interface CategoryRailProps {
  categories: Category[];
  selected?: string;
  onSelect: (categoryId: string) => void;
}

export const CategoryRail: React.FC<CategoryRailProps> = ({
  categories,
  selected,
  onSelect
}) => {
  return (
    <div className="flex gap-3 overflow-x-hidden pb-2">
      {categories.map((category) => (
        <Pill
          key={category.id}
          active={selected === category.id}
          onClick={() => onSelect(category.id)}
          className="whitespace-nowrap text-sm"
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </Pill>
      ))}
    </div>
  );
};