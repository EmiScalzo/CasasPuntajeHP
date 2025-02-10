import React from 'react';
import { House } from '../types';

interface HouseCylinderProps {
  house: House;
  onPointsChange: (points: number) => void;
}

export const HouseCylinder: React.FC<HouseCylinderProps> = ({ house, onPointsChange }) => {
  const buttons = [
    { value: -1, label: '-1' },
    { value: 1, label: '+1' },
    { value: -5, label: '-5' },
    { value: 5, label: '+5' },
  ];

  const handlePointsChange = (change: number) => {
    const newPoints = Math.min(Math.max(house.points + change, 0), 100);
    onPointsChange(newPoints);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className={`text-2xl font-bold ${house.color.text}`}>{house.name}</h2>
      <div className="relative w-24 h-96 border-4 rounded-t-2xl overflow-hidden bg-gray-100">
        <div
          className={`absolute bottom-0 w-full transition-all duration-500 ease-out ${house.color.primary}`}
          style={{ height: `${house.points}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800 bg-white/80 px-2 rounded">
            {house.points}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => handlePointsChange(btn.value)}
            className={`${house.color.primary} text-white px-3 py-1 rounded 
              hover:opacity-90 transition-opacity font-semibold min-w-[48px]
              border-2 border-white/20 shadow-lg`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}