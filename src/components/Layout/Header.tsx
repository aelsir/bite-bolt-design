import React from 'react';
import { ArrowLeft, Menu, Search } from 'lucide-react';

interface HeaderProps {
  showBack?: boolean;
  title?: string;
  onBack?: () => void;
  showMenu?: boolean;
  onMenuClick?: () => void;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export const Header: React.FC<HeaderProps> = ({
  showBack,
  title,
  onBack,
  showMenu,
  onMenuClick,
  showSearch,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = "Search menu items..."
}) => {
  return (
    <div className="sticky top-0 z-40 bg-surface dark:bg-surface-dark border-b border-stroke dark:border-stroke-dark">
      <div className="flex items-center justify-between p-4 gap-4">
        <div className="flex items-center gap-4 flex-shrink-0">
          {showBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-subsurface dark:hover:bg-subsurface-dark rounded-card transition-colors duration-button"
              aria-label="Go back"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          {showMenu && (
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-subsurface dark:hover:bg-subsurface-dark rounded-card transition-colors duration-button"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          )}
        </div>
        
        {showSearch && onSearchChange ? (
          <div className="flex-1 relative max-w-md">
            <Search 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-subtle dark:text-text-subtle-dark" 
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 rounded-pill border border-stroke dark:border-stroke-dark bg-surface dark:bg-surface-dark text-text-high dark:text-text-high-dark placeholder-text-subtle dark:placeholder-text-subtle-dark focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors duration-button min-h-tap-target"
            />
          </div>
        ) : title ? (
          <h1 className="text-16 font-semibold text-text-high dark:text-text-high-dark">
            {title}
          </h1>
        ) : null}
        
        <div className="w-10" /> {/* Spacer for centering */}
      </div>
    </div>
  );
};