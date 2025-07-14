// /frontend/hooks/usePersistentBet.ts
import { useEffect, useState } from 'react';

interface PersistentBet {
  amount: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  timestamp: number;
}

export function usePersistentBet() {
  const [pendingBet, setPendingBet] = useState<PersistentBet | null>(null);

  // Load from session storage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('pendingBet');
    if (saved) {
      try {
        setPendingBet(JSON.parse(saved));
      } catch (err) {
        sessionStorage.removeItem('pendingBet');
      }
    }
  }, []);

  const saveBet = (bet: PersistentBet) => {
    sessionStorage.setItem('pendingBet', JSON.stringify(bet));
    setPendingBet(bet);
  };

  const clearBet = () => {
    sessionStorage.removeItem('pendingBet');
    setPendingBet(null);
  };

  return { pendingBet, saveBet, clearBet };
}
