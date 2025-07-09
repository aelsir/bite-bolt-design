import React, { useState } from 'react';
import { FulfillmentType, MenuItem } from './types';
import { restaurant, categories, menuItems } from './data/mockData';
import { RestaurantHome } from './screens/RestaurantHome';
import { CategoryItems } from './screens/CategoryItems';
import { ItemDetailModal } from './components/Menu/ItemDetailModal';
import { CartBar } from './components/Cart/CartBar';
import { useCart } from './hooks/useCart';

type Screen = 'home' | 'category';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('delivery');
  const [selectedCategory, setSelectedCategory] = useState<string>('pizzas');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const { cart, addToCart } = useCart();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentScreen('category');
  };

  const handleItemSelect = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleAddToCart = (
    item: MenuItem, 
    quantity: number, 
    selectedOptions: Record<string, string[]>
  ) => {
    addToCart(item, quantity, selectedOptions);
  };

  const handleCartClick = () => {
    // In a real app, this would navigate to cart screen
    console.log('Cart clicked:', cart);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-surface dark:bg-surface-dark">
        {currentScreen === 'home' && (
          <RestaurantHome
            restaurant={restaurant}
            categories={categories}
            fulfillmentType={fulfillmentType}
            onFulfillmentChange={setFulfillmentType}
            onCategorySelect={handleCategorySelect}
          />
        )}

        {currentScreen === 'category' && (
          <CategoryItems
            categories={categories}
            menuItems={menuItems}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onItemSelect={handleItemSelect}
            onBack={() => setCurrentScreen('home')}
            restaurantName={restaurant.name}
          />
        )}

        <CartBar cart={cart} onClick={handleCartClick} />

        <ItemDetailModal
          item={selectedItem!}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}

export default App;