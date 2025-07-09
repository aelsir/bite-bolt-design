import React from 'react';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, onClick, className = '' }) => {
  return (
    <div 
      className={`card cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};