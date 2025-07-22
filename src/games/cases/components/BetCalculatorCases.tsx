// BetCalculatorCases.tsx
import React, { useState } from 'react';
import ToggleTableComponent from '../../../userinterface/components/LandingPageComponents/ToggleTableComponent';
import { FaBriefcase } from 'react-icons/fa6';
import { useUserInfo } from '../../../context/UserInfoContext';

interface Props {
  roleDice: () => void;
  error: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  setDifficulty: (value: 'easy' | 'medium' | 'hard' | 'expert') => void;
}

const toggleOption = [
  { title: "Manual", key: 'manual' },
  { title: "Auto", key: 'auto' },
];

const BetCalculatorCases: React.FC<Props> = ({ roleDice, error, difficulty, setDifficulty }) => {
  const { betAmt } = useUserInfo();
  const [isShuffling, setIsShuffling] = useState(false);

  const handleClick = () => {
    setIsShuffling(true);
    roleDice();

    setTimeout(() => {
      setIsShuffling(false);
    }, 2000);
  };

  return (
    <div className="bg-[#203642] p-4 w-full sm:w-[300px] md:w-[270px] h-[701px]">
      <ToggleTableComponent
        defaultTable="manual"
        containerWidth="w-full"
        ClassName="h-10 w-full"
        gameType='cases'
        toggleOption={toggleOption}
      />

      {/* Difficulty */}
      <p className="text-[13px] text-white font-semibold mt-4">Difficulty</p>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard' | 'expert')}
        className="w-full mt-1 h-10 px-3 bg-[#0f212e] text-white text-sm rounded outline-none"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        <option value="expert">Expert</option>
      </select>

      {/* Bet Button */}
      <button
        onClick={handleClick}
        className="mt-4 w-full h-12 bg-[#00e600] text-black font-semibold rounded hover:bg-[#00cc00] flex items-center justify-center"
        disabled={isShuffling}
      >
        {isShuffling ? (
          <FaBriefcase className="animate-shake text-xl" />
        ) : (
          'Bet'
        )}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center text-sm mt-3">{error}</p>}
    </div>
  );
};

export default BetCalculatorCases;