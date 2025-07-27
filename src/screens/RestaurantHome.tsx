import React from 'react';
import { Restaurant, Category, FulfillmentType } from '../types';
import { RestaurantCard } from '../components/Restaurant/RestaurantCard';
import { CategoryGrid } from '../components/Restaurant/CategoryGrid';

interface RestaurantHomeProps {
  restaurant: Restaurant;
  categories: Category[];
  fulfillmentType: FulfillmentType;
  onFulfillmentChange: (type: FulfillmentType) => void;
  onCategorySelect: (categoryId: string) => void;
}

export const RestaurantHome: React.FC<RestaurantHomeProps> = ({
  restaurant,
  categories,
  fulfillmentType,
  onFulfillmentChange,
  onCategorySelect
}) => {
  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark">
      <div className="p-4 mb-4">
        <RestaurantCard
          restaurant={restaurant}
          fulfillmentType={fulfillmentType}
          onFulfillmentChange={onFulfillmentChange}
        />
      </div>
      <CategoryGrid
        categories={categories}
        onSelect={onCategorySelect}
      />
    </div>
  );
};