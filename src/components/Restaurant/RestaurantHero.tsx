import React from 'react';
import { MapPin, Truck, Home } from 'lucide-react';
import { Restaurant, FulfillmentType } from '../../types';
import { StatusPill } from '../ui/StatusPill';

interface RestaurantHeroProps {
  restaurant: Restaurant;
  fulfillmentType?: FulfillmentType;
}

export const RestaurantHero: React.FC<RestaurantHeroProps> = ({ 
  restaurant, 
  fulfillmentType = 'delivery' 
}) => {
  return (
    <div className="p-4">
      <div className="bg-surface dark:bg-surface-dark rounded-card border border-stroke dark:border-stroke-dark p-4 shadow-hover">
        <div className="flex gap-4">
          {/* Restaurant Image */}
          <div className="w-20 h-20 flex-shrink-0">
            <img
              src={restaurant.logo}
              alt={`${restaurant.name} logo`}
              className="w-full h-full object-cover rounded-card"
            />
          </div>
          
          {/* Restaurant Info */}
          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <h1 className="text-20 font-bold text-text-high dark:text-text-high-dark mb-1 truncate">
                {restaurant.name}
              </h1>
              <p className="text-sm text-text-body dark:text-text-body-dark mb-2">
                Koshary, Bowls, Egyptian
              </p>
            </div>
            
            {/* Delivery Mode */}
            <div className="mb-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                {fulfillmentType === 'delivery' ? (
                  <>
                    <Truck size={14} className="text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      Delivery
                    </span>
                  </>
                ) : (
                  <>
                    <Home size={14} className="text-gray-600 dark:text-gray-400" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Collection
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {/* Status */}
            <div className="mb-2">
              <StatusPill isOpen={restaurant.isOpen} closingTime={restaurant.closingTime} />
            </div>
          </div>
        </div>
        
        {/* Address - Below the card content */}
        <div className="mt-4 pt-4 border-t border-stroke dark:border-stroke-dark">
          <div className="flex items-center gap-2 text-text-subtle dark:text-text-subtle-dark">
            <MapPin size={16} />
            <span className="text-sm">{restaurant.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};