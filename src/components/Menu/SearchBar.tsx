import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search menu items..."
}) => {
  return (
    <div className="relative px-4 mb-4">
      <div className="relative">
        <Search 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-subtle dark:text-text-subtle-dark" 
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 rounded-pill border border-stroke dark:border-stroke-dark bg-surface dark:bg-surface-dark text-text-high dark:text-text-high-dark placeholder-text-subtle dark:placeholder-text-subtle-dark focus:outline-none focus:border-accent dark:focus:border-accent-dark transition-colors duration-button min-h-tap-target"
        />
      </div>
    </div>
  );
};