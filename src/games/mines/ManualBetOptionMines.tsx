import React, { useState } from "react";
import { useUserInfo } from "../../context/UserInfoContext";
import { FaIndianRupeeSign } from "react-icons/fa6";

interface Props {
  isGameStarted: boolean;
}

function ManualBetOptionMines({isGameStarted,}:Props) {
  const { betAmtMines, setBetAmtMines } = useUserInfo();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value);
    

    if (isNaN(parsedValue)) {
      setBetAmtMines(0);
    } else if (parsedValue < 0) {
      setBetAmtMines(0);
    } else{
      setBetAmtMines(parsedValue);
    }
  };

  const { userWalletBalance } = useUserInfo();
  const wallet = userWalletBalance;
  const handleMultiply = () => {
    if (wallet >= 1) {
      const newBetAmt = betAmtMines * 2;
      setBetAmtMines(newBetAmt >= wallet ? wallet : newBetAmt);
    }
  };
  const handleMax = () => {
    setBetAmtMines(wallet);
  };
  const handleDivide = () => {
    setBetAmtMines((prevBetAmt: number) => {
      const newValue = parseFloat((prevBetAmt / 2).toFixed(2));
      return newValue <= 0.01 ? 0.0 : newValue;
    });
  };



  return (
    <>
      <div className="primaryTextColor flex justify-between mt-2 ">
        <span className="font-bold text-[14px]">Bet Amount</span>
        <span className="font-extrabold text-[11px]">₹{0.0 + betAmtMines}</span>
      </div>
   
      <div  className={` ${isGameStarted?'cursor-not-allowed opacity-70 bg-[#2b424e]':'bg-[#355161]'}   rounded flex items-center group shadow-lg`}>
        <input
          disabled={isGameStarted}
          onChange={handleChange}
          value={betAmtMines}
          id="bet-amount"
          className={`w-3/6 ${isGameStarted?'cursor-not-allowed ':''} rounded-l px-3  text-sm/6 text-whit font-extrabold  bg-[#0f212e]  data-[focus]:-outline-offset-2  focus:outline-none  h-11 border-[2px] group-hover:border-[#54798f] transition-all duration-150  ease-in-out focus:border-slate-500 border-[#355161]`}
          type="number"
          step={0.01}
        />
        <button
          disabled={isGameStarted}
          onClick={handleDivide}
          className="font-extrabold text-[13px] p-3 h-full hover:bg-[#54798f] transition-all duration-100 ease-in-out  "
        >
          1/2{" "}
        </button>
        <span className="border  border-black h-5 bg-black"> </span>
        <button
          disabled={isGameStarted}
          onClick={handleMultiply}
          className="font-extrabold text-[14px] p-3 hover:bg-[#54798f] transition-all duration-150 ease-in-out"
        >
          2x
        </button>
        <span className="border border-black h-5 bg-black"> </span>
        <button
          disabled={isGameStarted}
          onClick={handleMax}
          className={` font-extrabold text-[14px] p-3 hover:bg-[#54798f] hover:rounded-r transition-all duration-150 ease-in-out`}
        >
          Max
        </button>
      </div>
    </>
  );
}

export default ManualBetOptionMines;
