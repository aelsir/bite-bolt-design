import React from 'react';
import { Home, User, Video, Tag } from 'lucide-react';

type TabType = 'home' | 'profile' | 'social' | 'offers';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'social' as TabType, label: 'Social', icon: Video },
    { id: 'offers' as TabType, label: 'Offers', icon: Tag },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface dark:bg-surface-dark border-t border-stroke dark:border-stroke-dark z-50">
      <div className="flex items-center justify-around px-2 py-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors duration-button ${isActive ? 'text-accent dark:text-accent-dark' : 'text-text-body dark:text-text-body-dark'}`}
            >
              <IconComponent 
                size={24} 
                className={`mb-1 ${isActive ? 'text-accent dark:text-accent-dark' : 'text-text-body dark:text-text-body-dark'}`} 
              />
              <span className={`text-xs font-medium ${isActive ? 'text-accent dark:text-accent-dark' : 'text-text-body dark:text-text-body-dark'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};