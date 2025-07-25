'use client';

import React, { useState, useRef } from 'react';
import BetCalculatorCases from './components/BetCalculatorCases';
import GameBoard from './components/GameBoard';
import ColorChances from './components/ColorChances';
import {
  easyCases,
  mediumCases,
  hardCases,
  expertCases,
} from './data/casesData';

const CasesMain: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'expert'>('easy');
  const [openedCaseIndex, setOpenedCaseIndex] = useState<number | null>(null);
  const gameBoardRef = useRef<HTMLDivElement>(null);

  const getCasesByDifficulty = () => {
    switch (difficulty) {
      case 'medium':
        return mediumCases;
      case 'hard':
        return hardCases;
      case 'expert':
        return expertCases;
      case 'easy':
      default:
        return easyCases;
    }
  };

  const handleRollDice = () => {
    const cases = getCasesByDifficulty();
    const randomIndex = Math.floor(Math.random() * cases.length);
    setOpenedCaseIndex(randomIndex);

    // Scroll to the selected case
    if (gameBoardRef.current) {
      const scrollContainer = gameBoardRef.current;
      const caseElement = scrollContainer.children[randomIndex] as HTMLElement;
      const offsetLeft = caseElement.offsetLeft - scrollContainer.offsetWidth / 2 + caseElement.offsetWidth / 2;

      scrollContainer.scrollTo({
        left: offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#0f1923] min-h-screen w-full py-8 px-4">
      {/* Container */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full max-w-7xl">
        {/* Left: Bet Calculator */}
        <div className="w-full sm:w-[320px]">
          <BetCalculatorCases
            roleDice={handleRollDice}
            error=""
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </div>

        {/* Right: Game Board + Color Palette */}
        <div className="w-full flex flex-col items-center overflow-x-auto">
          <div ref={gameBoardRef} className="relative w-max flex  px-4">
            <GameBoard
              cases={getCasesByDifficulty()}
              openedCaseIndex={openedCaseIndex}
              difficulty={difficulty}
            />

            {/* Positioning color palette inside board responsively */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
              {/* <ColorChances
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasesMain;