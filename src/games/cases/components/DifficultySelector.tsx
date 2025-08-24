import React, { useState } from 'react';
import GameBoard from './GameBoard';
import { easyCases, mediumCases, hardCases, expertCases, Case } from '../data/casesData';

// Fisher–Yates shuffle for true randomness
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Build a pool based on probability (or weight if you want to use `weight`)
function buildCasePool(baseCases: Case[], poolSize = 100): Case[] {
  const pool: Case[] = [];

  baseCases.forEach(c => {
    for (let i = 0; i < Math.round(c.probability); i++) {
      pool.push(c);
    }
  });

  while (pool.length < poolSize) {
    pool.push(baseCases[Math.floor(Math.random() * baseCases.length)]);
  }

  return pool.slice(0, poolSize);
}

type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

const DifficultySelector: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('easy');
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const [casePool, setCasePool] = useState<Case[]>([]);

  const difficultyMap: Record<DifficultyLevel, Case[]> = {
    easy: easyCases,
    medium: mediumCases,
    hard: hardCases,
    expert: expertCases,
  };

  const handleShuffleAndOpen = () => {
    const baseCases = difficultyMap[selectedDifficulty];

    // Build weighted pool + shuffle it
    const pool = shuffle(buildCasePool(baseCases));
    setCasePool(pool);

    // Pick random winner from the pool
    const randomIndex = Math.floor(Math.random() * pool.length);
    setOpenedIndex(randomIndex);
  };

  return (
    <>
      {/* Difficulty buttons */}
      <div className="flex justify-center mb-6 gap-2">
        {(['easy', 'medium', 'hard', 'expert'] as DifficultyLevel[]).map((level) => (
          <button
            key={level}
            onClick={() => {
              setSelectedDifficulty(level);
              setOpenedIndex(null);
              setCasePool([]);
            }}
            className={`px-4 py-2 rounded-lg text-white ${
              selectedDifficulty === level ? 'bg-blue-600' : 'bg-gray-600'
            }`}
          >
            {level.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Game board */}
      <GameBoard
        cases={casePool.length > 0 ? casePool : shuffle(buildCasePool(difficultyMap[selectedDifficulty]))}
        openedCaseIndex={openedIndex}
        difficulty={selectedDifficulty}
      />

      {/* Shuffle button */}
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
