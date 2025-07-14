import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../../assets/images/gamblegrid.png";
import { IoSettings } from "react-icons/io5";
import { RiRectangleLine } from "react-icons/ri";
import { MdAreaChart } from "react-icons/md";
import { GoStar, GoStarFill } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { FaChartBar } from "react-icons/fa";
import TooltipComponent from "../universalComponents/ToolTipComponent";
import BetCalculator from "./BetCalculator";
import GamePlay from "../../../games/dice_role";
import StartGame from "../../../games/dice_role/components/StartGame";
import HiLo from "../../../games/hilo";
import MinesHome from "../../../games/mines/Index";
// import Mines from "../../../games/mines";
// import DiceRoller from '../../../games/diceTotal/main';

function GameLayout() {
  const params = useParams();
  const game = params.game;
  const [theaterMode, setTheaterMode] = useState<boolean>(false);

  const handleTheaterMode = () => {
    setTheaterMode((theaterMode) => !theaterMode);
    console.log(theaterMode);
  };

  const [isGameStarted, setIsGameStarted] = useState(false);

  const toggleGamePlay = () => {
    setIsGameStarted((prev) => !prev);
  };

  return (
    <div className="flex justify-center px-6 mt-10   ">
      <div
        className={` lg:w-[1200px] lg:grid lg:grid-cols-12 h-full  aspect-video relative ${
          theaterMode ? "lg:w-[1400px] h-[90rem] " : ""
        }  w-[550px]  rounded-md`}
      >
        <div className="lg:  grid col-span-12 rounded-l-lg overflow-hidden">
          <div className="w-full h-full overflow-hidden   ">
            <>
              {
                // <GamePlay />
                // <HiLo logo=""/>
                // <Mines/>
                <MinesHome />

                
              }
            </>

            {/* <DiceRoller/> */} 
          </div>
        </div>
        {/* <div className=" bg-blue-600 col-span-3 rounded-r-lg overflow-hidden">
          <BetCalculator />
        </div> */}
        <div className="lg:col-span-12  flex items-center bg-[#0f212e] border-t-4 border-t-[#263f4d] rounded-b-lg  w-full h-[7vh] z-50 absolute -bottom-[66px] sm:-[400px] ">
          <div className="flex  items-center text-[#9cbad3] ml-5 cursor-pointer border-r-[.05rem] ">
            <TooltipComponent tooltipText="Game Setting">
              {" "}
              <IoMdSettings className="hover:text-white m-4" />
            </TooltipComponent>
            <TooltipComponent tooltipText="Enable Theater Mode">
              {" "}
              <RiRectangleLine
                onClick={handleTheaterMode}
                className="hover:text-white m-4 text-[18px]  md:flex hidden "
              />
            </TooltipComponent>
            <TooltipComponent tooltipText="Open Live Stats">
              {" "}
              <FaChartBar className="hover:text-white m-4" />
            </TooltipComponent>
            <TooltipComponent tooltipText="Favourite Game">
              {" "}
              <GoStar className="hover:text-white m-4" />
            </TooltipComponent>
            <TooltipComponent tooltipText="Favourite Game">
              {" "}
              <GoStarFill className="hover:text-white m-4" />
            </TooltipComponent>
          </div>
          <div className="w-full flex justify-center">
            <img src={logo} alt="" className="w-20 ml-64" />
          </div>
          <div className="w-full flex justify-end px-10"> Gamble Grid</div>
        </div>
      </div>
    </div>
  );
}

export default GameLayout;
