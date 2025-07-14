import { useEffect, useState } from 'react';
import axios from 'axios';

interface Bet {
  _id: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'refunded';
  createdAt: string;
}

const BetHistory = ({ token }: { token: string }) => {
  const [bets, setBets] = useState<Bet[]>([]);

  useEffect(() => {
    axios
      .get('/api/history', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBets(res.data.bets))
      .catch((err) => console.error('Failed to fetch bet history:', err));
  }, [token]);

  return (
    <div className="bg-white rounded p-4 shadow-md w-full max-w-xl mx-auto mt-10">
      <h2 className="font-bold text-xl mb-4">Bet History</h2>
      {bets.length === 0 ? (
        <p className="text-gray-500">No bets found.</p>
      ) : (
        bets.map((bet) => (
          <div
            key={bet._id}
            className={`flex justify-between p-2 border-b text-sm font-medium ${
              bet.status === 'refunded'
                ? 'text-yellow-600'
                : bet.status === 'confirmed'
                ? 'text-green-600'
                : 'text-gray-700'
            }`}
          >
            <span>Rs. {bet.amount}</span>
            <span className="capitalize">{bet.status}</span>
            <span>{new Date(bet.createdAt).toLocaleString()}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default BetHistory;
