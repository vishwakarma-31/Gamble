import { useState } from 'react';
import axios from 'axios';

interface UseBetSafeOptions {
  token: string;
  onRefundSuccess?: () => void; // ✅ Optional callback
}

export const useBetSafe = ({ token, onRefundSuccess }: UseBetSafeOptions) => {
  const [betId, setBetId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const placeBet = async (amount: number) => {
    try {
      const res = await axios.post(
        '/api/bet/place-bet',
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBetId(res.data.betId);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to place bet');
    }
  };

  const confirmBet = async () => {
    if (!betId) return;
    try {
      await axios.post(
        '/api/bet/confirm-bet',
        { betId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to confirm bet');
    }
  };

  const refundBet = async () => {
    if (!betId) return;
    try {
      await axios.post(
        '/api/bet/refund-bet',
        { betId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Call the onRefundSuccess callback if provided
      if (typeof onRefundSuccess === 'function') {
        onRefundSuccess();
      }

    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to refund bet');
    }
  };

  return {
    placeBet,
    confirmBet,
    refundBet,
    betId,
    error,
  };
};
