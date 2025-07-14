// Updated GameBoard.tsx with centered spin and hidden overflow
import React, { useState, useEffect, useRef } from 'react';
import CaseItems from './CaseItems';
import {
  easyCases,
  mediumCases,
  hardCases,
  expertCases,
  Case
} from '../data/casesData';

interface GameBoardProps {
  cases: Case[];
  openedCaseIndex: number | null;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
}

const GameBoard: React.FC<GameBoardProps> = ({ difficulty, openedCaseIndex }) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const shuffle = (array: Case[]) => [...array].sort(() => Math.random() - 0.5);

  useEffect(() => {
    let selectedCases: Case[];

    switch (difficulty) {
      case 'medium':
        selectedCases = mediumCases;
        break;
      case 'hard':
        selectedCases = hardCases;
        break;
      case 'expert':
        selectedCases = expertCases;
        break;
      case 'easy':
      default:
        selectedCases = easyCases;
    }

    setCases(shuffle(selectedCases));
  }, [difficulty]);

  useEffect(() => {
    if (openedCaseIndex !== null) {
      setIsSpinning(true);
      const timer = setTimeout(() => setIsSpinning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [openedCaseIndex]);

  return (
    <div className="relative w-full h-[700px] bg-[#0f212e] flex items-center justify-center overflow-hidden">
      <div
        ref={containerRef}
        className={`flex gap-3 transition-transform duration-[3000ms] ease-out`}
        style={{
          transform: isSpinning ? 'translateX(-50%)' : 'translateX(0)',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {cases.map((c, idx) => (
          <CaseItems
            key={idx}
            baseColor={c.baseColor}
            panelColor={c.panelColor}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
