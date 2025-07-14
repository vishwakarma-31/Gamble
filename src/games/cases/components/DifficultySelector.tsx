import React, { useState } from 'react';
import GameBoard from './GameBoard';
import { easyCases, mediumCases, hardCases, expertCases } from '../data/casesData';

type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

const DifficultySelector: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('easy');
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  const difficultyMap: Record<DifficultyLevel, typeof easyCases> = {
    easy: easyCases,
    medium: mediumCases,
    hard: hardCases,
    expert: expertCases,
  };

  const handleShuffleAndOpen = () => {
    const randomIndex = Math.floor(Math.random() * difficultyMap[selectedDifficulty].length);
    setOpenedIndex(randomIndex);
  };

  return (
    <>
      <div className="flex justify-center mb-6">
        {['easy', 'medium', 'hard', 'expert'].map((level) => (
          <button
            key={level}
            onClick={() => {
              setSelectedDifficulty(level as DifficultyLevel);
              setOpenedIndex(null);
            }}
            className={`px-4 py-2 rounded-lg text-white ${selectedDifficulty === level ? 'bg-blue-600' : 'bg-gray-600'}`}
          >
            {level.toUpperCase()}
          </button>
        ))}
      </div>

      <GameBoard
              cases={[...difficultyMap[selectedDifficulty]].sort((a, b) => a.probability - b.probability)}
              openedCaseIndex={openedIndex} difficulty={'easy'}      />

      <div className="flex justify-center mt-4">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md"
          onClick={handleShuffleAndOpen}
        >
          Shuffle & Open Random Case
        </button>
      </div>
    </>
  );
};

export default DifficultySelector;
