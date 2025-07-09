import React from 'react';

interface PillProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ 
  children, 
  active = false, 
  onClick, 
  className = '' 
}) => {
  const baseClasses = active ? 'pill-active' : 'pill-inactive';
  
  return (
    <button 
      className={`${baseClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};