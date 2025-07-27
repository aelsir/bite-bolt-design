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

type MainScreen = 'home' | 'category';
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
    // In a real app, this would navigate to cart screen
    console.log('Cart clicked:', cart);
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

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-surface dark:bg-surface-dark pb-16">
        {renderTabContent()}

        {/* Only show CartBar on home tab */}
        {activeTab === 'home' && <CartBar cart={cart} onClick={handleCartClick} />}

        <ItemDetailModal
          item={selectedItem!}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
        />

        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}

export default App;