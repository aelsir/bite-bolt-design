import React, { useState, useMemo } from 'react';
import { Category, MenuItem } from '../types';
import { Header } from '../components/Layout/Header';
import { CategoryRail } from '../components/Restaurant/CategoryRail';
import { MenuItemCard } from '../components/Menu/MenuItemCard';
import { Menu, X } from 'lucide-react';

interface CategoryItemsProps {
  categories: Category[];
  menuItems: MenuItem[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onItemSelect: (item: MenuItem) => void;
  onBack: () => void;
  restaurantName: string;
}

export const CategoryItems: React.FC<CategoryItemsProps> = ({
  categories,
  menuItems,
  selectedCategory,
  onCategoryChange,
  onItemSelect,
  onBack,
  restaurantName
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const filteredItems = useMemo(() => {
    let items = menuItems.filter(item => item.category === selectedCategory);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
    }
    
    return items;
  }, [menuItems, selectedCategory, searchQuery]);

  const selectedCategoryName = categories.find(cat => cat.id === selectedCategory)?.name || '';

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark">
      <Header
        showBack
        onBack={onBack}
        showSearch
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search menu items..."
      />

      {/* Horizontal Category Menu */}
      <div className="flex items-center gap-2 px-4 py-0">
        <button
          className="p-2 hover:bg-subsurface dark:hover:bg-subsurface-dark rounded-card transition-colors duration-button flex-shrink-0"
          aria-label="Open menu"
          onClick={() => setShowCategoryModal(true)}
        >
          <Menu size={24} />
        </button>
        <div className="flex-1 overflow-hidden">
          <CategoryRail
            categories={categories}
            selected={selectedCategory}
            onSelect={onCategoryChange}
          />
        </div>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center">
          <div className="bg-white rounded-t-2xl w-full max-w-md mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Select Category</h2>
              <button onClick={() => setShowCategoryModal(false)}>
                <X size={28} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`py-3 rounded-lg font-medium w-full ${
                    selectedCategory === cat.id
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => {
                    onCategoryChange(cat.id);
                    setShowCategoryModal(false);
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="p-4 pb-20">
        <h2 className="text-xl font-bold text-text-high dark:text-text-high-dark mb-4 border-b-2 border-text-high dark:border-text-high-dark pb-2 inline-block">
          {selectedCategoryName}
        </h2>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-body dark:text-text-body-dark">
              {searchQuery ? 'No items match your search.' : 'No items in this category.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map(item => (
              <MenuItemCard
                key={item.id}
                item={item}
                onClick={onItemSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};