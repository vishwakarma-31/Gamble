'use client';

import React, { useState, useRef, useEffect } from 'react';
import BetCalculatorCases from './components/BetCalculatorCases';
import GameBoard from './components/GameBoard';
import ColorChances from './components/ColorChances';
import PendingBetBanner from './components/PendingBetBanner';
import {
  easyCases,
  mediumCases,
  hardCases,
  expertCases,
} from './data/casesData';

import { usePersistentBet } from './hooks/usePersistentBet';
import { useBetSafe } from './hooks/useBetSafe';
import { getTokenFromLocalStorage } from './utils/auth';

const CasesMain: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'expert'>('easy');
  const [openedCaseIndex, setOpenedCaseIndex] = useState<number | null>(null);
  const gameBoardRef = useRef<HTMLDivElement>(null);

  const { pendingBet, saveBet, clearBet } = usePersistentBet();
  const [showRefundModal, setShowRefundModal] = useState(false);


  const token = getTokenFromLocalStorage();
  const {
  placeBet,
  confirmBet,
  refundBet,
  betId,
  error
} = useBetSafe({
  token,
  onRefundSuccess: () => setShowRefundModal(true), // 9trigger modal
});



  const getCasesByDifficulty = () => {
    switch (difficulty) {
      case 'medium': return mediumCases;
      case 'hard': return hardCases;
      case 'expert': return expertCases;
      case 'easy':
      default: return easyCases;
    }
  };

  const [isShuffling, setIsShuffling] = useState(false);

  const handleRollDice = async () => {
    const amount = pendingBet?.amount ?? 50; // Replace with input state later

    // Save bet locally
    saveBet({ amount, difficulty, timestamp: Date.now() });

    // Place bet in backend
    const placed = await placeBet(amount);
    if (!placed) return;

    // Simulate rolling
    setIsShuffling(true);
    const cases = getCasesByDifficulty();
    const randomIndex = Math.floor(Math.random() * cases.length);
    setOpenedCaseIndex(randomIndex);

    if (gameBoardRef.current) {
      const scrollContainer = gameBoardRef.current;
      const caseElement = scrollContainer.children[randomIndex] as HTMLElement;
      const offsetLeft = caseElement.offsetLeft - scrollContainer.offsetWidth / 2 + caseElement.offsetWidth / 2;

      scrollContainer.scrollTo({
        left: offsetLeft,
        behavior: 'smooth',
      });
    }

    const timeout = setTimeout(async () => {
      setIsShuffling(false);
      await confirmBet(); // ✅ Finalize bet
      clearBet(); // ✅ Clear local session
    }, 3000);

    // Handle tab close/interruption
    const unloadHandler = () => {
      refundBet();
      clearTimeout(timeout);
    };

    window.addEventListener('beforeunload', unloadHandler);

    // Clean up
    return () => window.removeEventListener('beforeunload', unloadHandler);
  };

  // Restore old bet
  useEffect(() => {
    if (pendingBet) {
      setDifficulty(pendingBet.difficulty);
    }
  }, [pendingBet]);

  

  return (
    <div className="flex flex-col items-center justify-center bg-[#0f1923] min-h-screen w-full py-8 px-4">
      {pendingBet && (
  <PendingBetBanner
    betAmount={pendingBet.amount}
    difficulty={pendingBet.difficulty}
    onRecover={handleRollDice}
    onDismiss={clearBet}
    onAutoRefund={async () => {
      if (betId) {
        await refundBet(); // ⬅ backend API call
        clearBet();        // ⬅ remove from local storage
      }
    }}
  />
)}

{showRefundModal && (
  <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg z-50">
    💰 Bet amount has been refunded successfully.
    <button
      onClick={() => setShowRefundModal(false)}
      className="ml-4 underline"
    >
      Close
    </button>
  </div>
)}


      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full max-w-7xl">
        {/* Left: Bet Calculator */}
        <div className="w-full sm:w-[320px]">
          <BetCalculatorCases
            roleDice={handleRollDice}
            error={error || ''}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </div>

        {/* Right: Game Board + Palette */}
        <div className="w-full flex flex-col items-center overflow-x-auto">
          <div ref={gameBoardRef} className="relative w-max flex gap-3 px-4">
            <GameBoard
              cases={getCasesByDifficulty()}
              openedCaseIndex={openedCaseIndex}
              difficulty={difficulty}
            />

            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
              <ColorChances
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasesMain;
