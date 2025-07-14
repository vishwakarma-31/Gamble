import { useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { BsCollectionPlayFill } from "react-icons/bs";
import OddsButton from "./OddsButton";
import UserContext from "../../../context/UserContext";
import { MatchData, SportData } from '../../../utils/types/liveMatchesCombinedData';

interface Props {
  selectedSport: string;
}

function GameOdds({ selectedSport }: Props) {
  const gameContext = useContext(UserContext);
  const SportsData = gameContext?.gameData;
  const liveGmesInnings = gameContext?.gameInningsData
  console.log("liveInnings",liveGmesInnings);
  


  // State to track which dropdowns are open (by tournament_id)
  const [openIds, setOpenIds] = useState<{ [key: number]: boolean }>({});
  const [gameData, setGameData] = useState<MatchData[][]>([]);
  const [sportDataArray, setSportDataArray] = useState<SportData[] | undefined>(undefined);

  // Toggle the state for a specific dropdown (tournament_id)
  const handleClick = (id: number) => {
    setOpenIds((prevIds) => ({
      ...prevIds,
      [id]: !prevIds[id], // Toggle the dropdown for this id
    }));
  };

  useEffect(() => {
    if (SportsData) {
      const combinedData = SportsData.combinedData.filter(sport => sport.data && sport.data.length);
      setGameData(combinedData.map(item => item.data));

      setSportDataArray(
        SportsData?.combinedData
          .filter(sport => sport.data && sport.data.length)
          .filter(item => item.sport === selectedSport)
      );
    }
  }, [SportsData, selectedSport]); 
  
  const filteredByTournaments = sportDataArray?.map(item => {
    const seenTournaments = new Set();
    const filteredData = item.data.filter(match => {
      if (seenTournaments.has(match.tournament_id)) {
        return false;
      }
      seenTournaments.add(match.tournament_id);
      return true;
    });
    return {
      ...item,
      data: filteredData
    };
  });
console.log(filteredByTournaments);

  return (
    <div className="transition-opacity">
      {filteredByTournaments?.map((item, index) => (
        item.data.map((matchItem) => (
          <div
            key={index}
            className="bg-[#213743] border-[#2f4553] border-t shadow-sm shadow-black cursor-pointer relative w-full overflow-hidden rounded my-4"
          >
            <div onClick={() => handleClick(matchItem.tournament_id)} className="items-center flex justify-between">
              <span
                className={`absolute right-6 top-4 text-[#9cbad3] cursor-pointer transition-all duration-300 ${
                  openIds[matchItem.tournament_id] ? "-rotate-90" : ""
                }`}
              >
                <FaChevronLeft size={13} />
              </span>
            </div>

            <span
              onClick={() => handleClick(matchItem.tournament_id)}
              className="text-[13px] font-semibold flex items-center p-3"
            >
              {matchItem.class_name} / {matchItem.tournament_name}
            </span>

            {openIds[matchItem.tournament_id] && (
              sportDataArray?.map((sportItem) =>
                sportItem.data
                  .filter((match) => match.tournament_id === matchItem.tournament_id)
                  .map((filteredMatch) => (
                    <div
                      key={filteredMatch.tournament_id}
                      className="mt-3 transition-all duration-300"
                    >
                      <hr className="bg-[#2f4553] w-full border-none -translate-y-3 h-[2px]" />
                      <div className="grid grid-cols-2 px-5">
                        <div>
                          <span className="text-xs font-bold w-fit bg-red-800 px-1 mr-1 rounded-sm">
                            live
                          </span>
                         
                         
                          {/* <hr className="bg-[#2f4553] w-[30%] top-[28%] ml-[30%] absolute border-none -translate-y-3 h-[2px]" /> */}
                         
                         
                          <span className="secondaryTextColor text-[10px] w-fit font-medium">
                            {filteredMatch.status.reason},{filteredMatch.away_team_name}
                          </span>
                          <div className="font-bold text-sm mt-2 flex justify-between">
                            <span>{filteredMatch.home_team_name}</span>
                            <div className="flex gap-5 mr-5 secondaryTextColor text-[13px]">
                              <span>{filteredMatch.home_team_score?.display}</span>
                              <span className="text-orange-500">
                                {filteredMatch.home_team_score?.period_1}
                              </span>
                              <span>
                                <ImStatsBars size={16} />
                              </span>
                            </div>
                          </div>
                          <div className="font-bold text-sm flex justify-between mt-2">
                            <span>{filteredMatch.away_team_name}</span>
                            <div className="flex gap-5 mr-5 secondaryTextColor text-[13px]">
                              <span>{filteredMatch.away_team_score?.display}</span>
                              <span className="text-orange-500">
                                {filteredMatch.away_team_score?.period_1}
                              </span>
                              <span>
                                <BsCollectionPlayFill size={16} />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-[10px] mt-2 flex justify-center secondaryTextColor">
                            Winner
                          </div>
                          <div className="grid grid-cols-2 mb-3 mt-2 gap-2">
                            <OddsButton  teamName={filteredMatch.home_team_name}/>
                            <OddsButton  teamName={filteredMatch.away_team_name}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              )
            )}
          </div>
        ))
      ))}
    </div>
  );
}

export default GameOdds;
