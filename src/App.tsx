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
          <>
            <BasketScreen cart={cart} onBack={() => setCurrentScreen('home')} />
            <CartBar cart={cart} onClick={() => {}} isBottomNavVisible={false} isBasketScreen={true} />
          </>
        ) : (
          renderTabContent()
        )}

        {/* Only show CartBar on home tab and not in basket */}
        {activeTab === 'home' && currentScreen !== 'basket' && (
          <CartBar cart={cart} onClick={handleCartClick} isBottomNavVisible={isBottomNavVisible} isBasketScreen={false} />
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