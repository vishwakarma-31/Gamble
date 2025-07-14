import React from 'react';

const COLORS = [
  { color: '#4b5563', value: 'grey' },
  { color: '#67e8f9', value: 'cyan' },
  { color: '#3b82f6', value: 'blue' },
  { color: '#ef4444', value: 'red' },
  { color: '#22c55e', value: 'green' },
  { color: '#8b5cf6', value: 'purple' },
  { color: '#facc15', value: 'gold' },
];

const CHANCES: Record<string, { multiplier: string; chance: string }[]> = {
  gold: [{ multiplier: '115x', chance: '0.1000%' }],
  purple: [{ multiplier: '41x', chance: '0.1500%' }],
  green: [
    { multiplier: '15x', chance: '0.4000%' },
    { multiplier: '10x', chance: '0.8500%' },
  ],
  red: [
    { multiplier: '7.5x', chance: '1.5000%' },
    { multiplier: '3.5x', chance: '3.0000%' },
  ],
};

interface Props {
  selectedColor: string | null;
  setSelectedColor: (color: string | null) => void;
}

const ColorChances: React.FC<Props> = ({ selectedColor, setSelectedColor }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Color Palette */}
      <div className="flex gap-2  px-3 py-2">
        {COLORS.map(({ color, value }) => (
          <div
            key={value}
            className={`w-6 h-6 rounded cursor-pointer border-2 ${selectedColor === value ? 'border-white' : 'border-transparent'}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(selectedColor === value ? null : value)}
          />
        ))}
      </div>

      {/* Tooltip Panel */}
      {selectedColor && CHANCES[selectedColor] && (
        <div className="mt-3 w-64 bg-[#1b2a38] text-white rounded shadow-lg p-4 text-sm z-10">
          <div className="flex justify-between font-semibold mb-2 border-b border-gray-600 pb-1">
            <span>Multiplier</span>
            <span>Chance</span>
          </div>
          {CHANCES[selectedColor].map((entry, index) => (
            <div key={index} className="flex justify-between py-1">
              <span>{entry.multiplier}</span>
              <span>{entry.chance}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorChances;