import React from 'react';
import { Tag, Clock, Scissors } from 'lucide-react';

interface Offer {
  id: string;
  restaurantName: string;
  restaurantLogo: string;
  title: string;
  description: string;
  promoCode: string;
  expiryDate: string;
  discount: string;
}

const mockOffers: Offer[] = [
  {
    id: '1',
    restaurantName: 'Pizza Palace',
    restaurantLogo: 'https://images.unsplash.com/photo-1542834369-f10ebf06d3e0?w=100&h=100&auto=format&fit=crop',
    title: '30% Off Your First Order',
    description: 'Get 30% off your first order with Pizza Palace. Minimum order £20.',
    promoCode: 'WELCOME30',
    expiryDate: '2023-12-31',
    discount: '30%'
  },
  {
    id: '2',
    restaurantName: 'Burger Joint',
    restaurantLogo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&auto=format&fit=crop',
    title: 'Buy One Get One Free',
    description: 'Buy any burger and get another one free. Valid on weekdays only.',
    promoCode: 'BOGOF',
    expiryDate: '2023-11-30',
    discount: 'BOGO'
  },
  {
    id: '3',
    restaurantName: 'Sushi Express',
    restaurantLogo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=100&h=100&auto=format&fit=crop',
    title: '£5 Off Orders Over £25',
    description: 'Enjoy £5 off your order when you spend £25 or more at Sushi Express.',
    promoCode: 'SUSHI5',
    expiryDate: '2023-12-15',
    discount: '£5'
  },
  {
    id: '4',
    restaurantName: 'Taco Town',
    restaurantLogo: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&auto=format&fit=crop',
    title: 'Free Delivery',
    description: 'Free delivery on all orders over £15. No promo code needed.',
    promoCode: 'FREEDEL',
    expiryDate: '2023-12-31',
    discount: 'Free Delivery'
  }
];

export const OffersScreen: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // In a real app, you would show a toast notification here
    alert(`Promo code ${code} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-high dark:text-text-high-dark mb-2">
          Special Offers
        </h1>
        <p className="text-text-body dark:text-text-body-dark">
          Exclusive deals and discounts from your favorite restaurants
        </p>
      </div>

      <div className="space-y-4">
        {mockOffers.map((offer) => (
          <div 
            key={offer.id}
            className="bg-white dark:bg-surface-dark rounded-lg border border-stroke dark:border-stroke-dark shadow-hover overflow-hidden"
          >
            {/* Offer Header */}
            <div className="p-4 border-b border-stroke dark:border-stroke-dark flex items-center">
              <img 
                src={offer.restaurantLogo} 
                alt={offer.restaurantName} 
                className="w-12 h-12 rounded-lg object-cover mr-3"
              />
              <div>
                <h3 className="font-bold text-text-high dark:text-text-high-dark">
                  {offer.restaurantName}
                </h3>
                <div className="flex items-center text-xs text-text-subtle dark:text-text-subtle-dark">
                  <Clock size={12} className="mr-1" />
                  <span>Expires {formatDate(offer.expiryDate)}</span>
                </div>
              </div>
              <div className="ml-auto bg-accent/10 dark:bg-accent-dark/20 text-accent dark:text-accent-dark px-3 py-1 rounded-full font-bold text-sm">
                {offer.discount}
              </div>
            </div>
            
            {/* Offer Content */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-text-high dark:text-text-high-dark mb-2">
                {offer.title}
              </h2>
              <p className="text-text-body dark:text-text-body-dark mb-4">
                {offer.description}
              </p>
              
              {/* Promo Code */}
              <div className="flex items-center justify-between bg-subsurface dark:bg-subsurface-dark p-3 rounded-lg">
                <div className="flex items-center">
                  <Tag size={16} className="text-accent dark:text-accent-dark mr-2" />
                  <span className="font-mono font-bold text-text-high dark:text-text-high-dark">
                    {offer.promoCode}
                  </span>
                </div>
                <button 
                  onClick={() => copyToClipboard(offer.promoCode)}
                  className="flex items-center text-accent dark:text-accent-dark font-medium text-sm"
                >
                  <Scissors size={14} className="mr-1" />
                  Copy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};