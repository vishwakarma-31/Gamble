import ToggleTableComponent from '../../userinterface/components/LandingPageComponents/ToggleTableComponent'
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { useUserInfo } from '../../context/UserInfoContext';
import { BiSolidUpArrow, BiUpArrow } from 'react-icons/bi';
import { FaAngleDoubleRight, FaChevronDown, FaChevronRight, FaChevronUp } from 'react-icons/fa';

import { TbBombFilled } from 'react-icons/tb';
import { rupeeSign } from '../hilo';
import ManualBetOptionMines from './ManualBetOptionMines';
import { MinesGameState } from '../../utils/types/Games';

interface Props{
  Bet:() =>void
  status:string|null
  gemCount:number
  isLoading:boolean
  setGameState:React.Dispatch<React.SetStateAction<MinesGameState>>
  bomb:string
  handleCashout: () => void
  handleClickPickRandomTile:()=>void
}
function BetCalculatorMines({
    gemCount,
    status,
    Bet,
    isLoading,
    setGameState,
    bomb,
    handleCashout,
    handleClickPickRandomTile
    }:Props) {

    
    const toggleOption:toggleOptionProp[] = [
        { title: "Manual", key: 'manual' },
        { title: "Auto", key: 'auto'},
    
      ];

      interface toggleOptionProp {
        title:string;
        key:string;
      }


const handleFirstBetOrCashout = () => {
  if ( status !=='active') {
    setGameState((prev)=>({
      ...prev,
      status:'active'
    }))

    Bet();
  } else  {
    handleCashout()
    setGameState((prev)=>({
      ...prev,
      status:'cashed_out'
    }))

  }
}

  return (
    <div className='bg-[#213743] h-full p-3'>
        {/* <ToggleTableComponent defaultTable='manual'  ClassName='h-9 w-full' containerWidth='w-full' toggleOption={toggleOption}/> */}
        <ManualBetOptionMines isGameStarted={status==='active'}/>
              {
          status==='active'?
          <><h6 className=" font-bold text-[14px] secondaryTextColor mt-2">Mines</h6>
          <div className="w-full">
             <select
                name="mine"
                id="min"
                className="w-full border-[#355161] hover:border-[#54798f] duration-300  rounded text-white bg-[#0F212E] mr-20 h-11 p-2 text-sm border-2 font-bold focus:outline-none hover:cursor-pointer "
                value={bomb}
                disabled={status==='active'}
                onChange={(e) => setGameState((prev)=>({
                  ...prev,
                  bomb:e.target.value
                }))}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
              </select>
            </div>
          </>
          :
          null
         } 
       
     

            {status=== 'active'?
                 <>

                 <div className='grid grid-cols-2 gap-2  items-center '>
                
                <span>
                <h6 className=" font-bold text-[14px] secondaryTextColor mt-2">Mines</h6>

                 <label  className=" border-[#2f4553] hover:border-[#54798f] border-2 duration-300  bg-[#2f4553] shadow shadow-[#1e2931] text-white  text-sm  font-bold text-center px-4  h-11 rounded w-full flex justify-between items-center gap-2">
                 <strong className='flex '> {bomb}  </strong> 
                 </label>
                 </span>


                 <span> 
                 <h6 className=" font-bold text-[14px] secondaryTextColor mt-2">Gems</h6>
  
                 <label  className=" border-[#2f4553] hover:border-[#54798f] border-2 duration-300  bg-[#2f4553] shadow shadow-[#1e2931] text-white  text-sm  font-bold text-center px-4  h-11 rounded w-full flex justify-between items-center gap-2">
                 <strong className='flex '> {25 - parseInt(bomb) - gemCount}  </strong> 
                 </label>
                 </span>    
                 </div>
                 
                 <div className='grid flex-col  items-center '>
                 <h6  className="secondaryTextColor text-[14px] font-bold mt-2"> Total Profit </h6>
                 <label  className="border-[#2f4553] hover:border-[#54798f] border-2 duration-300  bg-[#2f4553] shadow shadow-[#1e2931] text-white  text-sm  font-bold text-center px-4  h-11 rounded w-full flex justify-between items-center gap-2">
                 <strong className='flex '> {0.00 }</strong> 
                 <span className='w-4 h-4 bg-[#eaff2a] rounded-full mr-2 text-[#5e626a] text-sm font-extrabold flex justify-center items-center'>{rupeeSign}</span>
                 </label>
                 </div>
                 </>
                 :
                 null
            }

        <button onClick={handleClickPickRandomTile}  className="mt-3 text-white bg-[#2f4553] shadow-md hover:bg-[#354e5e] text-sm  font-bold text-center px-4  h-12 rounded w-full flex justify-center items-center gap-2" >
            Pick random tile <FaAngleDoubleRight size={16}   color='white'/>
        </button>
        <button  onClick={handleFirstBetOrCashout} className="mt-6 text-black bg-[#04d001] hover:bg-[#059213] shadow-md text-sm  font-bold text-center px-4  h-14 rounded w-full">
             {isLoading ? <TbBombFilled className='transition-all duration-300 bomb justify-self-center ' size={22}/>:  status === 'active'  ? 'Cashout' : 'Bet' }
        </button>

            
           

        <p className='secondaryTextColor font-bold text-[16px] mt-5 flex justify-center'></p>

    </div>
  )
}

export default BetCalculatorMines
