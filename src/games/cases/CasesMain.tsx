'use client';

import React, { useState, useEffect } from 'react';
import BetCalculatorCases from './components/BetCalculatorCases';
import GameBoard from './components/GameBoard';
import { easyCases, mediumCases, hardCases, expertCases, Case } from './data/casesData';

// Fisher–Yates shuffle for true randomness
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Build case pool based on weight (preferred over probability)
function buildCasePool(baseCases: Case[], poolSize = 100): Case[] {
  const pool: Case[] = [];
  const totalWeight = baseCases.reduce((sum, c) => sum + (c.weight || 1), 0);
  
  for (let i = 0; i < poolSize; i++) {
    let random = Math.random() * totalWeight;
    for (const case_ of baseCases) {
      random -= (case_.weight || 1);
      if (random <= 0) {
        pool.push(case_);
        break;
      }
    }
  }
  return pool;
}

const CasesMain: React.FC = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'expert'>('easy');
  const [casePool, setCasePool] = useState<Case[]>([]);
  const [openedCaseIndex, setOpenedCaseIndex] = useState<number | null>(null);
  const [lastWinningIndex, setLastWinningIndex] = useState<number | null>(null);

  useEffect(() => {
    const baseCases = getCasesByDifficulty();
    const newPool = shuffle(buildCasePool(baseCases));
    setCasePool(newPool);
    setOpenedCaseIndex(null);
  }, [difficulty]);

  function getCasesByDifficulty(): Case[] {
    switch (difficulty) {
      case 'medium':
        return mediumCases;
      case 'hard':
        return hardCases;
      case 'expert':
        return expertCases;
      case 'easy':
        return easyCases;
      default:
        return easyCases; // Ensures a return even if difficulty is invalid
    }
  }
  function selectWinningCase(pool: Case[]): number {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * pool.length);
    } while (idx === lastWinningIndex && pool.length > 1);
    setLastWinningIndex(idx);
    return idx; // This return fixes the TS error!
  }

  function handleRollDice() {
    const pool = shuffle(buildCasePool(getCasesByDifficulty()));
    setCasePool(pool);
    const winnerIndex = selectWinningCase(pool);
    setOpenedCaseIndex(winnerIndex);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-[#0f1923]">
      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full max-w-7xl">
        <div className="w-full sm:w-[320px]">
          <BetCalculatorCases
            roleDice={handleRollDice}
            error=""
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </div>
        <GameBoard cases={casePool} openedCaseIndex={openedCaseIndex} difficulty={difficulty} />
      </div>
    </div>
  );
};

export default CasesMain;
