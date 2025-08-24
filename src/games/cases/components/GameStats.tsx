import React from 'react';
import { useUserInfo } from '../../../context/UserInfoContext';

interface GameStatsProps {
  totalBets: number;
  totalWins: number;
  currentStreak: number;
  bestWin: number;
}

const GameStats: React.FC<GameStatsProps> = ({ totalBets, totalWins, currentStreak, bestWin }) => {
  const { betAmt } = useUserInfo();

  const winRate = totalBets > 0 ? ((totalWins / totalBets) * 100).toFixed(1) : '0.0';

  return (
    <div className="bg-[#203642] p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-white mb-4">Game Statistics</h3>
      
      <div className="space-y-3">
        {/* Current Balance */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">Balance:</span>
          <span className="text-white font-semibold">
            ${(betAmt || 0).toFixed(2)}
          </span>
        </div>

        {/* Total Bets */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">Total Bets:</span>
          <span className="text-white font-semibold">{totalBets}</span>
        </div>

        {/* Win Rate */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">Win Rate:</span>
          <span className="text-white font-semibold">{winRate}%</span>
        </div>

        {/* Current Streak */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">Current Streak:</span>
          <span className="text-white font-semibold">{currentStreak}</span>
        </div>

        {/* Best Win */}
        <div className="flex justify-between items-center">
          <span className="text-gray-300 text-sm">Best Win:</span>
          <span className="text-green-400 font-semibold">{bestWin.toFixed(2)}x</span>
        </div>
      </div>

      {/* Progress Bar for Win Rate */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Win Rate</span>
          <span>{winRate}%</span>
        </div>
        <div className="w-full bg-[#0f212e] rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(parseFloat(winRate), 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default GameStats;
