import React, { useEffect, useState } from 'react'
import { useUserInfo } from '../../../context/UserInfoContext'
import { FaIndianRupeeSign } from 'react-icons/fa6'

interface manualBetProps{
 gameType?: string
}

function ManualBetOption({gameType}: manualBetProps) {
  const { setBetAmt, userWalletBalance } = useUserInfo();

  const [localBetAmt, setLocalBetAmt] = useState<number>(() => {
    const stored = localStorage.getItem('user-amount');
    const parsed = stored ? parseFloat(stored) : 0;
    return isNaN(parsed) ? 0 : parsed;
  });
  useEffect(() => {
    localStorage.setItem('user-amount', localBetAmt.toString());
    setBetAmt(localBetAmt); // Sync to global context if needed elsewhere
  }, [localBetAmt]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setLocalBetAmt(value);
    }
  };

  const handleMultiply = () => {
    if (userWalletBalance >= 1) {
      const newBetAmt = localBetAmt * 2;
      setLocalBetAmt(newBetAmt >= userWalletBalance ? userWalletBalance : newBetAmt);
    }
  };

  const handleDivide = () => {
    const newValue = parseFloat((localBetAmt / 2).toFixed(2));
    setLocalBetAmt(newValue <= 0.01 ? 0.00 : newValue);
  };

  const handleMax = () => {
    setLocalBetAmt(userWalletBalance);
  };
return (
  <>
          <div className='primaryTextColor flex justify-between'>
              <span className='font-bold text-[13px]'>Bet Amount</span>
              <span className='font-extrabold text-[11px]'>₹{localBetAmt.toFixed(2)}</span>

          </div>
      <div className='bg-[#355161] rounded flex items-center group shadow-lg'>
          <input  
          onChange={handleChange} 
          value={localBetAmt} id='bet-amount' 
          className="  w-3/6 rounded-l px-3  text-sm/6 text-whit font-extrabold
             bg-[#0f212e]  data-[focus]:-outline-offset-2  focus:outline-none  h-11 border-[2px] group-hover:border-[#54798f] transition-all duration-150  ease-in-out focus:border-slate-500 border-[#355161]" 
          type="number"
          step={0.01} />
          <button onClick={handleDivide} className='font-extrabold text-[13px] p-3 h-full hover:bg-[#54798f] transition-all duration-100 ease-in-out  '>1/2 </button><span className='border  border-black h-5 bg-black'> </span>
          <button onClick={handleMultiply} className='font-extrabold text-[14px] p-3 hover:bg-[#54798f] transition-all duration-150 ease-in-out'>2x</button>
          {gameType !== 'cases' && 
            <>
              <span className='border border-black h-5 bg-black'> </span>
              <button onClick={handleMax} className='font-extrabold text-[14px] p-3 hover:bg-[#54798f] transition-all duration-150 ease-in-out'>Max</button>
            </>
            
          }
      </div>
      
      </>
)
}



export default ManualBetOption
