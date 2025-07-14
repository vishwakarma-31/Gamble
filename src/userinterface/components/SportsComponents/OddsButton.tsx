import React, { useState } from 'react'
import { MatchData } from '../../../utils/types/liveMatchesCombinedData'


type Props ={
  teamName:string
}

function OddsButton({teamName}:Props) {
const [active,setActive] = useState<boolean>(false)

const handleClick=()=>{
    setActive((t)=>(!t))
}
  return (
    <>
      <button onClick={handleClick} className={` h-[56px] text-start px-2  font-bold hover:bg-blue-900 hover:text-white   hover:bg-opacity-50 ${active===true?'bg-blue-600 text-black font-extrabold':'bg-[#071824] '}  p-1 rounded transition-all ease-in-out duration-300 `}>
        <div className='text-[13px] '>{teamName}</div>
        <div className={`text-[13px]  ${active===true?'text-white':'text-blue-400'}`}>2.80</div>
      </button>
    </>
  )
}

export default OddsButton
