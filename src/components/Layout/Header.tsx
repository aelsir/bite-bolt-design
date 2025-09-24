import React from 'react';
import { ArrowLeft, Menu, Search, Trash } from 'lucide-react';

interface HeaderProps {
  showBack?: boolean;
  title?: React.ReactNode;
  onBack?: () => void;
  showMenu?: boolean;
  onMenuClick?: () => void;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showRightAction?: boolean;
  RightActionIcon?: React.ElementType;
  onRightActionClick?: () => void;
  rightActionColorClass?: string;
  rightActionBgClass?: string;
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
  searchPlaceholder = "Search menu items...",
  showRightAction = false,
  RightActionIcon,
  onRightActionClick,
  rightActionColorClass = 'text-text-body dark:text-text-body-dark',
  rightActionBgClass = 'bg-transparent hover:bg-subsurface dark:hover:bg-subsurface-dark' // Default transparent background
}) => {
  return (
    <div className="sticky top-0 z-40 bg-surface dark:bg-surface-dark">
      <div className="flex items-center justify-between px-4 py-2 gap-2">
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
          <div className="flex-1 relative">
            <Search 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-subtle dark:text-text-subtle-dark" 
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-12 pr-4 py-2 rounded-card border border-stroke dark:border-stroke-dark bg-surface dark:bg-surface-dark text-text-high dark:text-text-high-dark placeholder-text-subtle dark:placeholder-text-subtle-dark focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors duration-button min-h-tap-target"
            />
          </div>
        ) : title ? (
          <h1 className="text-16 font-semibold text-text-high dark:text-text-high-dark">
            {title}
          </h1>
        ) : null}
        
        {showRightAction && RightActionIcon && (
          <button
            onClick={onRightActionClick}
            className={`p-2 rounded-card transition-colors duration-button ${rightActionBgClass} ${rightActionColorClass}`}
            aria-label="Right action"
          >
            <RightActionIcon size={24} />
          </button>
        )}
        {!showSearch && !showRightAction && <div className="w-10" />} {/* Spacer for centering only when search and right action are not shown */}
      </div>
    </div>
  );
};