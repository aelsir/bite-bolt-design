import React from 'react';

interface StatusPillProps {
  isOpen: boolean;
  closingTime?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ isOpen, closingTime }) => {
  if (isOpen) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-emerald-500 text-white">
        Open
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-red-500 text-white">
      Closed
    </span>
  );
};