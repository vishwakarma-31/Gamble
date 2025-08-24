import React, { useState, useEffect, useRef } from 'react';
import GameBoard from './GameBoard';
import BetCalculatorCases from './BetCalculatorCases';
import {
 easyCases, mediumCases, hardCases, expertCases, Case
} from '../data/casesData';
import { shuffle } from '../utils/shuffle';

// Build and fill the case pool based on probability
function buildCasePool(cases: Case[], totalSlots = 100): Case[] {
 const pool: Case[] = [];
 cases.forEach(c =>
  pool.push(...Array(Math.round(c.probability)).fill(c))
 );
 while (pool.length < totalSlots) pool.push(cases[Math.floor(Math.random() * cases.length)]);
 return pool.slice(0, totalSlots);
}

// Checks if two arrays have the exact same order (by ID)
function arraysEqual(a: Case[], b: Case[]): boolean {
 return a.length === b.length && a.every((c, i) => c.id === b[i].id);
}

const ParentCasesGame: React.FC = () => {
 const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'expert'>('easy');
 const [cases, setCases] = useState<Case[]>([]);
 const prevCasesRef = useRef<Case[]>([]);
 const [openedCaseIndex, setOpenedCaseIndex] = useState<number | null>(null);
 const [error, setError] = useState<string>("");

 // Generates a unique, shuffled cases array per roll
 const shuffleUniqueCases = () => {
  let baseCases;
  switch (difficulty) {
   case 'medium': baseCases = mediumCases; break;
   case 'hard': baseCases = hardCases; break;
   case 'expert': baseCases = expertCases; break;
   case 'easy': default: baseCases = easyCases;
  }
  let pool, attempts = 0;
  do {
   pool = shuffle(buildCasePool(baseCases));
   attempts++;
  } while (
   attempts < 10 &&
   arraysEqual(prevCasesRef.current, pool)
  );
  prevCasesRef.current = pool;
  setCases(pool);
 };

 // On difficulty change, shuffle new unique cases
 useEffect(() => {
  shuffleUniqueCases();
 // eslint-disable-next-line
 }, [difficulty]);

 // This runs when Bet is pressed
 const handleBet = () => {
  setOpenedCaseIndex(null);
  shuffleUniqueCases();
  // any bet logic, error handling, etc.
 };

 return (
  <div style={{ display: 'flex', gap: 24 }}>
   <BetCalculatorCases
    roleDice={handleBet}
    error={error}
    difficulty={difficulty}
    setDifficulty={setDifficulty}
   />
   <GameBoard
    cases={cases}
    openedCaseIndex={openedCaseIndex}
    difficulty={difficulty}
   />
  </div>
 );
};

export default ParentCasesGame;
