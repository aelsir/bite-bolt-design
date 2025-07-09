import React from 'react';
import { FulfillmentType } from '../../types';
import { Pill } from '../ui/Pill';

interface FulfillmentToggleProps {
  selected: FulfillmentType;
  onChange: (type: FulfillmentType) => void;
}

export const FulfillmentToggle: React.FC<FulfillmentToggleProps> = ({
  selected,
  onChange
}) => {
  return (
    <div className="flex gap-2 px-4 mb-6">
      <Pill
        active={selected === 'delivery'}
        onClick={() => onChange('delivery')}
        className="text-sm"
      >
        Delivery
      </Pill>
      <Pill
        active={selected === 'collection'}
        onClick={() => onChange('collection')}
        className="text-sm"
      >
        Collection
      </Pill>
    </div>
  );
};