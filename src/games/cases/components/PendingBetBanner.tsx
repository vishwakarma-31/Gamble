// 📁 /frontend/components/PendingBetBanner.tsx
import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface Props {
  betAmount: number;
  difficulty: string;
  onRecover: () => void;
  onDismiss: () => void;
  onAutoRefund: () => void;
}

const PendingBetBanner: React.FC<Props> = ({
  betAmount,
  difficulty,
  onRecover,
  onDismiss,
  onAutoRefund,
}) => {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval);
          onAutoRefund(); // auto refund when time expires
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDismissWithConfirm = () => {
    const confirm = window.confirm('Refund this unresolved bet?');
    if (confirm) {
      onAutoRefund(); // Also refund on confirm
    }
  };

  return (
    <div className="w-full bg-yellow-500 text-black p-3 flex justify-between items-center text-sm font-medium">
      <span className="flex items-center gap-2">
        <FaExclamationTriangle className="text-lg" />
        <span>
          <strong>Unresolved Bet:</strong> You placed ₹{betAmount} on <strong>{difficulty}</strong> before crash. Recover or refund it.
        </span>
        <span className="ml-3 text-xs text-black bg-white px-2 rounded">Auto-refund in {countdown}s</span>
      </span>
      <div className="flex gap-2">
        <button
          onClick={onRecover}
          className="bg-black text-yellow-500 px-3 py-1 rounded"
        >
          Recover
        </button>
        <button
          onClick={handleDismissWithConfirm}
          className="bg-black text-white px-3 py-1 rounded"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default PendingBetBanner;
