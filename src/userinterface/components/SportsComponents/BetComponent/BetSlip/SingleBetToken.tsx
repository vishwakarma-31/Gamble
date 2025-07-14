import { ImCross } from "react-icons/im";
import { FaBitcoin } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { useState } from "react";
interface Props {
    setCalculator: (value: boolean) => void; 
  }
const SingleBetToken:React.FC<Props>=({setCalculator})=> {
    const [estPayout, setEstPayout] = useState(0);
    const [betAmount, setBetAmount] = useState(0);
    const data = [
        {
            PlayersName: "Michal hasi",
            EstPayout: estPayout,
            BetAmount: 0,
            isLive: true,
            isSettled: false,
            StockRate: "increase",
            Bet: 1.77
        },
        {
            PlayersName: "David Jack",
            EstPayout: 0,
            BetAmount:0,
            isLive: false,
            isSettled: false,
            StockRate: "decrease",
            Bet: 2.55
        },
        {
            PlayersName: "Ruii Koiii",
            EstPayout: 0,
            BetAmount: 0,
            isLive: true,
            isSettled: true,
            StockRate: "increase",
            Bet: 2.55
        },
        {
            PlayersName: "Ruii Koiii",
            EstPayout: 0,
            BetAmount: 0,
            isLive: true,
            isSettled: true,
            StockRate: "increase",
            Bet: 2.55
        },
    ];

    
    return (
        <>
            {data.map((item, index) => (
                <div
                key={index}
                className="flex rounded-md bg-[#22313b] w-[92%] m-2 pb-2 flex-col justify-between relative"
              >
                <div
                  className="absolute bottom-0 left-0 w-full h-[12px]"
                  style={{
                    background: `
                      radial-gradient(circle at bottom, #0e1921 6px, transparent 6px)`,
                    backgroundSize: '12px 12px',
                    backgroundRepeat: 'repeat-x',
                  }}
                  
                ></div>
              
                    <div className="bg-[#2e4250] text-[15px] py-1.5 px-3 rounded-t-md font-medium w-[100%] flex items-center justify-between flex-row">
                        <div className="flex flex-row space-x-2 items-center">
                            {item.isLive && (
                                <div className="text-[12px] bg-[#d30d01] px-1 rounded-sm">Live</div>
                            )}
                            <div>{item?.PlayersName}</div>
                        </div>
                        <ImCross color="#c9c9c9" size={10} />
                    </div>
                    <div className="flex flex-col w-full py-2">
                        <div className="justify-between px-3 text-[15px] text-white opacity-[70%]">
                            Winner
                        </div>
                        <div className="justify-between flex items-end flex-row px-3 text-[15px] text-white">
                            <div className="text-white font-bold">Michal Clark</div>
                            {item.isSettled === false ?
                                <div className="text-[#0595ff] items-center flex flex-row font-bold">
                                    {item.StockRate === "increase" && (
                                        <IoMdArrowDropdown size={17} color="red" />
                                    )}
                                    {item.StockRate === "decrease" && (
                                        <IoMdArrowDropup size={17} color="#88ff00" />
                                    )}
                                    <div>{item.Bet}</div>
                                </div> : <div className="text-red-500">Settled</div>}
                        </div>
                        <div className="justify-between items-center flex flex-row px-3 mt-1 text-[15px] text-white">
                            <div className="w-[170px] justify-between items-center border-gray-700 border-2 flex flex-row rounded-sm bg-[#0d1e29] px-2 py-2">
                               <input onClick={()=>setCalculator(true)} className="w-64 text-white font-semibold bg-transparent border-none outline-none caret-white placeholder-gray-400" value={item.BetAmount}/> <FaBitcoin color="#ec8c08" />
                            </div>
                            <div className="flex space-y-1 items-end text-white flex-col leading-tight">
                                <div className="text-[12px] opacity-[70%]">Est payout</div>
                                <div className="text-[14px] flex flex-row items-center">
                                    <div className="opacity-[70%]">{item.EstPayout}</div>
                                    <div>
                                        <FaBitcoin color="#ec8c08" className="ml-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            ))}
        </>
    );
}
export default SingleBetToken;
