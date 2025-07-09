import React from 'react';
import { MapPin, Truck, Home } from 'lucide-react';
import { Restaurant, FulfillmentType } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  fulfillmentType: FulfillmentType;
  onFulfillmentChange: (type: FulfillmentType) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ 
  restaurant, 
  fulfillmentType,
  onFulfillmentChange
}) => {
  // Extract postcode from address
  const addressParts = restaurant.location.split(', ');
  const postcode = addressParts[addressParts.length - 1] || '';
  
  // Generate Google Maps URL
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.location)}`;
  
  // Status logic
  const getStatusDisplay = () => {
    if (restaurant.isOpen) {
      return (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-emerald-500 text-white">
            Open
          </span>
          <span className="text-sm text-text-body dark:text-text-body-dark">
            until {restaurant.closingTime}
          </span>
        </div>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-red-500 text-white">
          Closed
        </span>
      );
    }
  };

  return (
    <div className="relative">
      {/* Cover Background Layer - Full height to show 50% above card */}
      <div 
        className="absolute inset-0 h-48 bg-cover bg-center bg-no-repeat rounded-card"
        style={{ backgroundImage: `url(${restaurant.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/30 rounded-card" />
      </div>
      
      {/* White Card Content - Positioned to reveal 50% of cover */}
      <div className="relative z-10 mt-24 mx-4">
        <div className="bg-white dark:bg-surface-dark rounded-card border border-stroke dark:border-stroke-dark shadow-hover overflow-hidden">
          <div className="flex">
            {/* Restaurant Logo - Perfect Square */}
            <div className="w-20 h-20 flex-shrink-0">
              <img
                src={restaurant.logo}
                alt={`${restaurant.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Restaurant Info - Right Side */}
            <div className="flex-1 p-4 flex flex-col justify-center">
              {/* Restaurant Name */}
              <h1 className="text-lg font-bold text-text-high dark:text-text-high-dark mb-1">
                {restaurant.name}
              </h1>
              
              {/* Short Description */}
              <p className="text-sm text-text-body dark:text-text-body-dark mb-2">
                Koshary, Bowls, Egyptian
              </p>
              
              {/* Status Indicator */}
              <div className="mb-3">
                {getStatusDisplay()}
              </div>
              
              {/* Clickable Address - Postcode Only */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-body dark:text-text-body-dark hover:text-accent dark:hover:text-accent-dark transition-colors duration-button group"
              >
                <MapPin size={16} className="flex-shrink-0" />
                <span className="text-sm group-hover:underline">
                  {postcode}
                </span>
              </a>
            </div>
          </div>
          
          {/* Spacing between content and divider */}
          <div className="h-4"></div>
          
          {/* Horizontal Divider */}
          <div className="border-t border-stroke dark:border-stroke-dark"></div>
          
          {/* Spacing between divider and fulfillment toggle */}
          <div className="h-4"></div>
          
          {/* Fulfillment Toggle - Centered */}
          <div className="pb-4 flex justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => onFulfillmentChange('delivery')}
                className={`flex items-center gap-2 px-4 py-2 rounded-card text-sm font-medium transition-all duration-button ${
                  fulfillmentType === 'delivery'
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-text-body dark:text-text-body-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Truck size={14} />
                Delivery
              </button>
              <button
                onClick={() => onFulfillmentChange('collection')}
                className={`flex items-center gap-2 px-4 py-2 rounded-card text-sm font-medium transition-all duration-button ${
                  fulfillmentType === 'collection'
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-text-body dark:text-text-body-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Home size={14} />
                Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};