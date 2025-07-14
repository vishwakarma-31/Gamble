import React, { useEffect, useState } from "react";
import { FaBitcoin } from "react-icons/fa";
interface Props {
    TotalText: string;
    EstText: string
    TotalNumber: number | string;
    EstNumber: number | string;
    Random: boolean;
    AmountBar: boolean;
    setCalculator: (value: boolean) => void;
}
const BottomBetSlip: React.FC<Props> = ({ TotalNumber, EstNumber, TotalText, AmountBar, setCalculator, EstText, Random }) => {
    const [isLoading, setIsLoading] = useState(true); // For shimmer effect
        const Shimmer = ({ className }: { className: string }) => (
            <div className={`shimmer-effect rounded-md ${className}`}></div>
        );
    
        useEffect(() => {
            const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate 2 seconds of loading
            return () => clearTimeout(timer);
        }, []);
    return (
        <div className="bg-[#22313b] absolute w-[96%] text-[14px] bottom-0 flex z-10 flex-col p-4">
            {AmountBar &&
                <div className="bg-[#2e4250] flex flex-row mb-2 px-2 py-2 justify-between items-center">
                    <input onClick={()=>setCalculator(true)} className="w-64 text-white font-semibold bg-transparent border-none outline-none caret-white placeholder-gray-400" value={0} />
                    <FaBitcoin size={15} color="#ec8c08" className="ml-2" />

                </div>}
            <div className="flex flex-row justify-between items-center">
                <div className="text-white opacity-[80%]">{TotalText}</div>
                {isLoading?<Shimmer className="w-20 h-3"></Shimmer>:
                <div className={`flex text-${!Random ? "white" : "[#0595ff]"} font-bold flex-row items-center`}>{TotalNumber} {!Random && <FaBitcoin color="#ec8c08" className="ml-2" />}</div>}
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="text-white opacity-[80%]">{EstText}</div>
                {isLoading?<Shimmer className="w-20 h-3"></Shimmer>:
                <div className="flex flex-row items-center font-bold text-white">{EstNumber} <FaBitcoin color="#ec8c08" className="ml-2" /></div>}
            </div>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 me-1 rounded-md text-sm mt-2 px-5 py-2.5 focus:outline-none font-bold">Register to Bet</button>
        </div>
    )
}
export default BottomBetSlip;