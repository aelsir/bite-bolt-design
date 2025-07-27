import React, { useState } from 'react';
import { FulfillmentType, MenuItem } from './types';
import { restaurant, categories, menuItems } from './data/mockData';
import { RestaurantHome } from './screens/RestaurantHome';
import { CategoryItems } from './screens/CategoryItems';
import { ProfileScreen } from './screens/ProfileScreen';
import { SocialScreen } from './screens/SocialScreen';
import { OffersScreen } from './screens/OffersScreen';
import { ItemDetailModal } from './components/Menu/ItemDetailModal';
import { CartBar } from './components/Cart/CartBar';
import { BottomNavBar } from './components/Layout/BottomNavBar';
import { useCart } from './hooks/useCart';
import { BasketScreen } from './screens/BasketScreen';

type MainScreen = 'home' | 'category' | 'basket';
type TabType = 'home' | 'profile' | 'social' | 'offers';

function App() {
  const [currentScreen, setCurrentScreen] = useState<MainScreen>('home');
  const [activeTab, setActiveTab] = useState<TabType>('home');
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
    setCurrentScreen('basket');
  };

  // Handle tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentScreen('home');
    }
  };

  // Render the active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
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
          </>
        );
      case 'profile':
        return <ProfileScreen />;
      case 'social':
        return <SocialScreen />;
      case 'offers':
        return <OffersScreen />;
      default:
        return null;
    }
  };

  const isBottomNavVisible = !(currentScreen === 'category' || selectedItem || currentScreen === 'basket');

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-surface dark:bg-surface-dark pb-16">
        {currentScreen === 'basket' ? (
          <BasketScreen cart={cart} onBack={() => setCurrentScreen('home')} />
        ) : (
          renderTabContent()
        )}

        {/* Render CartBar or Go to Checkout button based on screen and tab */}
        {activeTab === 'home' && currentScreen !== 'basket' && (
          <CartBar cart={cart} onClick={handleCartClick} isBottomNavVisible={isBottomNavVisible} isBasketScreen={false} />
        )}

        {currentScreen === 'basket' && (
          <div className="fixed bottom-0 left-0 right-0 flex justify-center z-40">
            <button
              className="w-full flex items-center justify-center bg-accent py-4 px-6 rounded-none text-white text-xl font-bold"
              onClick={() => { /* Handle checkout logic here */ }}
            >
              Go to checkout
            </button>
          </div>
        )}

        <ItemDetailModal
          item={selectedItem!}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
        />

        {/* Hide BottomNavBar when browsing a category or viewing an item */}
        {isBottomNavVisible && (
          <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>
    </div>
  );
}

export default App;