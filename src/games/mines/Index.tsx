import { useEffect, useState, useRef } from "react";
import "./index.css";
import Winning from "./Winning";
import BetCalculatorMines from "./BetCalculatorMines";
import gemSound from "./assets/gemSound.mp3";
import bombSound from "./assets/bombSound.mp3";
import betButtonSound from "./assets/betButtonSound.mp3";
import cashoutSound from "./assets/cashoutSound.mp3";
import ReShuffle from "./ReShuffle";
import { useUserInfo } from "../../context/UserInfoContext";
import { useGameSocket } from "../../hooks/useSocket";
import gemImg from "./assets/gem.svg";
import bombImg from "./assets/bomb.svg";
import bombEffectGif from "./assets/mineEffect.CTwuSNug.gif"
import {
  saveGameSession,
  deleteGameSession,
  getGameSession,
  deleteAllGameSessions,
} from "../../utils/security/StoreGameSession";
import { MinesGameState } from "../../utils/types/Games";
import { use } from "matter-js";
import Cookies from "js-cookie";

export default function MinesHome() {
  const initialState: MinesGameState = {
    gameId: "",
    grid: Array(25).fill(""),
    winningPopUp: false,
    isClient: false,
    reshuffling: false,
    negativeBet: false,
    status: null,
    amountInWallet: null,
    gemCount: 0,
    bomb: "3",
    winAmount: 0,
    maxWinAmount: 0,
    profit: 0.0,
    clickedMines: [],
    gameMessage: "",
    clickedIndex: null,
    clickedIndices: [],
  };
  const [gameState, setGameState] = useState<MinesGameState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingBet, setIsLoadingBet] = useState<boolean>(false);
  const gameIdRef  = useRef<string>("");


  console.log("clickewdIndex", gameState.clickedIndices,gameIdRef.current);

  const { socket, emitEvent, onEvent, connected } = useGameSocket("mines");
  const userId = Cookies.get("userId") || "";
  const { betAmtMines } = useUserInfo();
  const audioContextRef = useRef<AudioContext | null>(null);
  const bombBufferRef = useRef<AudioBuffer | null>(null);
  const betButtonBufferRef = useRef<AudioBuffer | null>(null);
  const cashoutBufferRef = useRef<AudioBuffer | null>(null);
  const gemBufferRef = useRef<AudioBuffer | null>(null);

  const ENCRYPTION_PASSWORD: string = "SuperSecretPass!"; // Ideally not hard-coded

  useEffect(() => {
    audioContextRef.current = new ((window as any).AudioContext ||
      (window as any).webkitAudioContext)();

    const loadAudio = async (
      file: string,
      bufferRef: React.MutableRefObject<AudioBuffer | null>
    ) => {
      const response = await fetch(file);
      const arrayBuffer = await response.arrayBuffer();
      if (audioContextRef.current) {
        bufferRef.current = await audioContextRef.current.decodeAudioData(
          arrayBuffer
        );
      }
    };

    loadAudio(bombSound, bombBufferRef);
    loadAudio(betButtonSound, betButtonBufferRef);
    loadAudio(cashoutSound, cashoutBufferRef);
    loadAudio(gemSound, gemBufferRef);

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  // useEffect(() => {
   
  //   const handleGameStatus = async () => {
  //     if (gameState.status === "lost") {
  //       await deleteAllGameSessions();
  //       return;
  //     } else if (gameState.status === "cashed_out") {
  //       await deleteAllGameSessions();
  //       return;
  //     }
  //   };
  //   handleGameStatus();
  // }, []);

   // game session storage
   const handleSave = async (gameId: string): Promise<void> => {
    try {
      if (gameState.status === "active" || gameIdRef.current) {
        await saveGameSession(gameId, gameState, ENCRYPTION_PASSWORD);
        console.log("Game session saved securely.");
      }
    
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };

  // Restore session on component mount or reconnection
  useEffect(() => {
    setIsLoadingBet(true);
    const Game_Session_Id = localStorage.getItem("gameId") ;
    if (!Game_Session_Id) {
      setIsLoadingBet(false);
      return;
    }
    (async () => {
      try {
        const savedState = await getGameSession(
          Game_Session_Id,
          ENCRYPTION_PASSWORD
        );
        if (savedState) {
          setGameState(savedState as MinesGameState);
          console.log("Restored game state:", savedState);
          gameIdRef.current = savedState.gameId ;
        }
      } catch (error) {
        console.error("Error restoring session:", error);
      } finally {
        setIsLoadingBet(false);
      }
    })();
  }, []);

  // Delete session example (e.g., when game is completed)
  const handleDelete = async (GameId:string): Promise<void> => {
    try {
      await deleteGameSession(GameId);
      console.log("Game session deleted.");
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const playSound = (buffer: AudioBuffer | null) => {
    if (!audioContextRef.current || !buffer) return;

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    source.start(0);
  };
  // useEffect(() => {
  //   const handleGameOver = ({ minePositions, gemPositions }: { minePositions: number[]; gemPositions: number[] }) => {
  //     setGrid((prev) => {
  //       const newGrid = [...prev];
  //       minePositions.forEach((index) => (newGrid[index] = "💣"));
  //       gemPositions.forEach((index) => (newGrid[index] = "💎"));
  //       return newGrid;
  //     });
  //     // setMessage("Game Over! All mines and gems revealed.");
  //     // setGameId(null);
  //     setIsLoading(false);
  //   };

  //   onEvent("gameOver", handleGameOver);

  //   return () => {

  //   };
  // }, []);

  // Handle bet button click
  const betButtonClicked = async () => {
    setIsLoadingBet(true);
    if (!socket) return;
    if (gameState.status === "lost") {          
      await deleteAllGameSessions();

    }
    setGameState(initialState)
    playSound(betButtonBufferRef.current);
    console.log('useridddddddddddddddddddddddddddddddddddddddd',userId);
    
    emitEvent("placeBet", {
      userId,
      betAmount: betAmtMines,
      bombCount: gameState.bomb,
    });
  };

  // Handle mine click
  const clickingMine = (index: number) => {
    if (
      gameState.status === "lost" ||
      gameState.clickedMines.includes(index)
    )
      return;
    setIsLoading(true);
    setGameState((prev) => ({
      ...prev,
      clickedIndex: index,
    }));
   const gameId = gameIdRef.current;
    emitEvent("clickMine", { gameId, index, userId });
  };


  const handleGameStart = async (data: any) => {
    gameIdRef.current = data.gameId;
    setGameState((prev) => { 
      const _gameId = gameIdRef.current
      const _status = "active"
      return {...prev, gameId:_gameId, status:_status};
    });

    //  await handleSave(gameIdRef.current);
   
    setIsLoadingBet(false);
    try {
      localStorage.setItem("gameId", data.gameId);
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };
  const betError = (data: any) => {
    console.log("Error", data);
  };
  const handleGameError = ({ message }: { message: string }) => {
    console.error("Game Error:", message);
    setGameState((prev) => {
      const _gameMessage = message
      return {...prev, gameMessage:_gameMessage}
    });
  };
  const handleTileClicked = async ({
    type,
    message,
    index,
    bombPositions,
    GameId,
  }: {
    type: "bomb" | "gem";
    message: string;
    index: number;
    bombPositions: number[];
    gemPositions: number[];
    GameId: string;
  }) => {
    setIsLoading(true);

    if (gameState.status === "lost") return;

    setGameState((prev) => {
      if (prev.grid[index] !== "") return prev;
      const newGrid = [...prev.grid];
      newGrid[index] = type === "bomb" ? "bomb" : "gem";
      const newGemCount = type === "gem" ? prev.gemCount + 1 : prev.gemCount;
      const newClickedIndeices =  [...prev.clickedIndices, index];
      const _status = "active"
      return { ...prev, grid: newGrid,gemCount: newGemCount, status: _status, clickedIndices: newClickedIndeices };

    });
     playSound(
        type === "bomb" ? bombBufferRef.current : gemBufferRef.current
      );
  

    // handleSave(GameId);
    setIsLoading(false);

    if (message === "💥 Game Over! You hit a bomb.") {
      
 
      setGameState((prev) => {
        
        const _status = "lost"
        return {...prev, status:_status}
      });
      try {
        await deleteGameSession(gameIdRef.current);
        console.log("Game session deleted.");
      } catch (error) {
        console.error("Error deleting session:", error);
      }
      const remaingGemPositions = gameState.grid
        .map((_, i) => i)
        .filter((i) => !bombPositions.includes(i))
        .filter((i) => !gameState.clickedIndices.includes(i));
      // console.log("Remaining gem positions:", remaingGemPositions);

      setGameState((prev) => {
        const newGrid = [...prev.grid];
        // reveal all bombs
        bombPositions.forEach((bombIndex) => {
          if (newGrid[bombIndex] === "") {
            newGrid[bombIndex] = "bomb";
          }
        });
        // reveal all gems
        remaingGemPositions.forEach((gemIndex) => {
          if (newGrid[gemIndex] === "") {
            newGrid[gemIndex] = "gem";
          }
        });

        return { ...prev, grid: newGrid };
      });
    }
  };

  const handleCashout =()=>{
    if (!socket) return;
    setIsLoadingBet(true); 
    socket.emit("cashout", {userId, gameId:gameIdRef.current });
  }

  const Cashout = async (data: any) => {  

    setIsLoadingBet(false);
    setGameState((prev) => {
      const _status = "cashed_out"
      const _winAmount = data.winnings
      const _profit = data.profitMultiplier
      
      return {...prev, status:_status, }
    });
    if (data.success === true) {
   
      try {
        await deleteGameSession(gameIdRef.current);
        console.log("Game session deleted for:", gameIdRef.current);
      } catch (error) {
        console.error("Error deleting session:", error);
      }
     
     
      const remaingGemPositions = gameState.grid
        .map((_, i) => i)
        .filter((i) => !data.bombPositions.includes(i))
        .filter((i) => !gameState.clickedIndices.includes(i));
 
      console.log("Remaining gem positions:", remaingGemPositions);

      setGameState((prev) => {
        const newGrid = [...prev.grid];
        // reveal all bombs
        data.bombPositions.forEach((bombIndex:number) => {
          if (newGrid[bombIndex] === "") {
            newGrid[bombIndex] = "bomb";
          }
        });
        // reveal all gems
        remaingGemPositions.forEach((gemIndex) => {
          if (newGrid[gemIndex] === "") {
            newGrid[gemIndex] = "gem";
          }
        });

        

        return { ...prev, grid: newGrid, winningPopUp: true, profit:data.profitMultiplier, winAmount:data.payout };
      });

      
    }
  }

  useEffect(() => {
    if (!socket) return;
    onEvent("betPlaced", handleGameStart);
    onEvent("betError", betError);
    onEvent("bombClicked", (data) =>
      handleTileClicked({ ...data, type: "bomb" })
    );
    onEvent("gemClicked", (data) =>
      handleTileClicked({ ...data, type: "gem" })
    );
    onEvent("gameError", handleGameError);
    onEvent("cashoutSuccess", Cashout)
  

    return () => {
      socket.off("betPlaced", handleGameStart);
      socket.off("betError", betError);
      socket.off("bombClicked", handleTileClicked);
      socket.off("gemClicked", handleTileClicked);
      socket.off("gameError", handleGameError);
      socket.off("cashoutSuccess", Cashout)

    };
  }, [socket]);

  useEffect(() => {
    if (gameState.status==='active' && gameState.gameId) {
      handleSave(gameIdRef.current);   
    }else{
      deleteAllGameSessions();
     handleDelete(gameIdRef.current);
    }
  }, [gameState.grid, gameState.status]); 

    // pick a random number between 0 and 24
    const generateRandomNumber = (): number => {
     const number = Math.floor(Math.random() * 25);     
      if (gameState.clickedIndices.includes(number)) {
        return generateRandomNumber();
      }
      return number;
    }

    const handleClickPickRandomTile = () => {
      if (gameState.status === "active") {
        const randomIndex = generateRandomNumber();
        
        clickingMine(randomIndex);
      }else return
      
    }


  // const gems = 25 - Number(bomb);

  //SETTING ISCLIENT TO TRUE WHEN THE COMPONENT LOADS ON CLIENT SIDE
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // //USE EFFECT TO SET THE NEW AMOUNT IN LOCAL STORAGE WHENEVER THE AMOUNT IN WALLET CHANGES
  // useEffect(() => {
  //   if (isClient) {
  //     const storedAmount = localStorage.getItem("walletAmount");
  //     if (storedAmount) {
  //       setAmountInWallet(JSON.parse(storedAmount));
  //     }
  //   }
  // }, [isClient]);

  // useEffect(() => {
  //   if (isClient) {
  //     localStorage.setItem("walletAmount", JSON.stringify(amountInWallet));
  //   }
  // }, [amountInWallet, isClient]);

  //FUNCTION WHICH IS HANDLING THE ADD BUTTON ON ADD MONEY COMPONENT AND ADDING THE AMOUNT TO WALLET
  // const addButtonClicked = () => {
  //   // FUNCTION THAT SETS THE WALLET AMOUNT UPTO 2 DECIMAL PLACES AFTER ADDING MONEY IN THE WALLET
  //   setAmountInWallet((prevAmount) => {
  //     let updatedAmount;

  //     if (prevAmount !== null) {
  //       updatedAmount = prevAmount + Number(addAmountField);
  //     } else {
  //       updatedAmount = amountInWallet;
  //     }

  //     if (updatedAmount !== null) {
  //       return parseFloat(updatedAmount.toFixed(2));
  //     }
  //     return amountInWallet;
  //   });

  //   setAddMoneyButton(false);
  //   setAddAmountField(null);
  // };

 

  //FUNCTION HANDLING THE BET BUTTON AND IT WILL SUBTRACT THE BET AMOUNT FROM THE AMOUNT IN WALLET ONLY IF AMOUNT IN WALLET IS GREATER THAN OR EQUAL TO THE BET AMOUNT
  // const betButtonClicked = () => {
  //   if (betAmtMines === "") {
  //     // setBetAmountAlert(true);
  //     console.log("bet amount is not entered");
  //   } else {
  //     if (Number(betAmtMines) < 0) {
  //       // setNegativeBet(true);
  //     } else if (
  //       amountInWallet !== null &&
  //       amountInWallet >= Number(betAmount)
  //     ) {
  //       //LOGIC TO IMPLEMENT THE WALLET BALANCE UPTO 2 DECIMAL PLACES AFTER SUBTRACTING THE AMOUNT IN WALLET WITH BET AMOUNT
  //       setAmountInWallet((prevAmount) => {
  //         let updatedAmountInWallet;
  //         if (prevAmount !== null) {
  //           updatedAmountInWallet = prevAmount - Number(betAmount);
  //         } else {
  //           updatedAmountInWallet = amountInWallet;
  //         }

  //         if (updatedAmountInWallet !== null) {
  //           return parseFloat(updatedAmountInWallet.toFixed(2));
  //         }
  //         return amountInWallet;
  //       });

  //       //ARRAY STORING THE INDEX WHERE BOMB WILL BE PLACED
  //       let bombArr: number[] = [];

  //       //GENERATING RANDOM NUMBERS AND THEN STORING THEM IN THE BOMBCOUNT ARRAY
  //       while (bombArr.length < Number(bomb)) {
  //         let randomNumber = generateRandomNumber();
  //         if (!bombArr.includes(randomNumber)) {
  //           bombArr.push(randomNumber);
  //         }
  //       }
  //       // console.log("Generated bomb array:", bombArr);
  //       setBombCount(bombArr);

  //       //SWITCHING OFF THE BET BUTTON WHEN THE USER STARTS A BET
  //       setActiveBet(true);
  //       setBombClicked(false);
  //       console.log("new bet started and active bet is ON");

  //       //SWITCHING ON THE SHUFFLING BUTTON WHEN THE USER STARTS A BET
  //       setShuffleAllowed(true);
  //       setWinningPopUp(false);
  //       setClickedIndices({});
  //       setProfit(1);
  //       setGemCount(0);
  //       setMaxWin(false);
  //       console.log("Number of gems:", gems);
  //       setWinAmount(0);
  //       playSound(betSoundRef);
  //     } else {
  //       setGreaterBet(true);
  //     }
  //   }
  // };

 

  //FUNCTION TO HANDLE THE LOGIC WHEN CASHOUT BUTTON IS CLICKED
  // const cashoutClicked = () => {
  //   setActiveBet(false);
  //   setWinningPopUp(true);
  //   const calculatedWinAmount = (profit * Number(betAmtMines)).toFixed(2);
  //   setAmountInWallet((prev) =>
  //     Number((prev! + Number(calculatedWinAmount)).toFixed(2))
  //   );
  //   setWinAmount(Number(calculatedWinAmount));

  //   //WHEN CASHOUT BUTTON CLICKED, THIS SOUND PLAYS
  //   // playSound(cashoutSoundRef);
  // };

  // //FUNCTION TO UPDATE MULTIPLIER ON EVERY MINE CLICK
  // const profitMultiplier = () => {
  //   if (bomb === "1") {
  //     setProfit(oneBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "2") {
  //     setProfit(twoBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "3") {
  //     setProfit(threeBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "4") {
  //     setProfit(fourBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "5") {
  //     setProfit(fiveBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "6") {
  //     setProfit(sixBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "7") {
  //     setProfit(sevenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "8") {
  //     setProfit(eightBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "9") {
  //     setProfit(nineBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "10") {
  //     setProfit(tenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "11") {
  //     setProfit(elevenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "12") {
  //     setProfit(twelveBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "13") {
  //     setProfit(thirteenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "14") {
  //     setProfit(fourteenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "15") {
  //     setProfit(fifteenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "16") {
  //     setProfit(sixteenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "17") {
  //     setProfit(seventeenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "18") {
  //     setProfit(eighteenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "19") {
  //     setProfit(nineteenBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "20") {
  //     setProfit(twentyBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "21") {
  //     setProfit(twentyOneBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "22") {
  //     setProfit(twentyTwoBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "23") {
  //     setProfit(twentyThreeBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   } else if (bomb === "24") {
  //     setProfit(twentyFourBombArr[gemCount]);
  //     // setWinAmount( profit * Number(betAmount) );
  //   }
  // };

  // //FUNCTION WHICH WILL WORK WHEN A MINE IS CLICKED, LOGGING TO THE CONSOLE
  // const mineClicked = (index: number) => {
  //   console.log("Clicked index:", index);
  //   console.log("Bomb count array:", bombCount);
  //   if (bombCount.includes(index)) {
  //     setClickedIndices((prev) => ({ ...prev, [index]: "bomb" }));
  //     console.log("Bomb Clicked");
  //     playSound(bombSoundRef);
  //   } else {
  //     setClickedIndices((prev) => ({ ...prev, [index]: "gem" }));
  //     console.log("Gem Clicked");
  //     setGemCount((prev) => prev + 1);
  //     playSound(gemSoundRef);

  //     if (gemCount === gems) {
  //       maxWinFunction();
  //     }

  //     profitMultiplier();
  //   }

  //   if (bombCount.includes(index)) {
  //     setBombClicked(true);
  //     setActiveBet(false);
  //     setProfit(0);
  //     console.log("bet has been set to false again");
  //   }
  // };

  // const maxWinFunction = () => {
  //   setMaxWin(true);

  //   if (bomb === "1") {
  //     const lastIndex = oneBombArr.length - 1;
  //     //  maxWinAmount = oneBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(oneBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "2") {
  //     const lastIndex = twoBombArr.length - 1;
  //     //  maxWinAmount = twoBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twoBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "3") {
  //     const lastIndex = threeBombArr.length - 1;
  //     // maxWinAmount = threeBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(threeBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "4") {
  //     const lastIndex = fourBombArr.length - 1;
  //     //  maxWinAmount = fourBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(fourBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "5") {
  //     const lastIndex = fiveBombArr.length - 1;
  //     //  maxWinAmount = fiveBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(fiveBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "6") {
  //     const lastIndex = sixBombArr.length - 1;
  //     // maxWinAmount = sixBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(sixBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "7") {
  //     const lastIndex = sevenBombArr.length - 1;
  //     //  maxWinAmount = sevenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(sevenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "8") {
  //     const lastIndex = eightBombArr.length - 1;
  //     //  maxWinAmount = eightBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(eightBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "9") {
  //     const lastIndex = nineBombArr.length - 1;
  //     //  maxWinAmount = nineBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(nineBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "10") {
  //     const lastIndex = tenBombArr.length - 1;
  //     //  maxWinAmount = tenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(tenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "11") {
  //     const lastIndex = elevenBombArr.length - 1;
  //     //  maxWinAmount = elevenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(elevenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "12") {
  //     const lastIndex = twelveBombArr.length - 1;
  //     //  maxWinAmount = twelveBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twelveBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "13") {
  //     const lastIndex = thirteenBombArr.length - 1;
  //     //  maxWinAmount = thirteenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(thirteenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "14") {
  //     const lastIndex = fourteenBombArr.length - 1;
  //     //  maxWinAmount = fourteenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(fourteenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "15") {
  //     const lastIndex = fifteenBombArr.length - 1;
  //     //  maxWinAmount = fifteenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(fifteenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "16") {
  //     const lastIndex = sixteenBombArr.length - 1;
  //     //  maxWinAmount = sixteenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(sixteenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "17") {
  //     const lastIndex = seventeenBombArr.length - 1;
  //     //  maxWinAmount = seventeenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(seventeenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "18") {
  //     const lastIndex = eighteenBombArr.length - 1;
  //     //  maxWinAmount = eighteenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(eighteenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "19") {
  //     const lastIndex = nineteenBombArr.length - 1;
  //     // maxWinAmount = nineteenBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(nineteenBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "20") {
  //     const lastIndex = twentyBombArr.length - 1;
  //     //  maxWinAmount = twentyBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twentyBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "21") {
  //     const lastIndex = twentyOneBombArr.length - 1;
  //     //  maxWinAmount = twentyOneBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twentyOneBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "22") {
  //     const lastIndex = twentyTwoBombArr.length - 1;
  //     //  maxWinAmount = twentyTwoBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twentyTwoBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "23") {
  //     const lastIndex = twentyThreeBombArr.length - 1;
  //     // maxWinAmount = twentyThreeBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twentyThreeBombArr[lastIndex] * Number(betAmount));
  //   } else if (bomb === "24") {
  //     const lastIndex = twentyFourBombArr.length - 1;
  //     //  maxWinAmount = twentyFourBombArr[lastIndex] * Number(betAmount);
  //     setMaxWinAmount(twentyFourBombArr[lastIndex] * Number(betAmount));
  //   }

  //   setActiveBet(false);

  //   console.log("All gems are clicked");
  // };

  // useEffect(() => {
  //   if (gemCount === gems) {
  //     maxWinFunction();
  //   }
  // }, [gemCount]);

  //array of length 25 to display all div boxes through loop
  const divs = Array.from({ length: 25 });

  return (
    <>
      <div
        className={`my-8 h-[44rem] w-[20rem] bg-[#0f212e] rounded-xl flex flex-col-reverse justify-between  shadow-2xl
        
        sm:my-7 sm:h-[48rem] sm:w-[31rem] sm:bg-[#0f212e] sm:rounded-xl sm:flex sm:flex-col-reverse sm:justify-between sm:items-center sm:shadow-2xl
        
        md:my-5 md:h-[31rem] md:w-[44rem] md:bg-[#0f212e] md:rounded-xl md:flex md:flex-row md:justify-between md:items-center md:shadow-2xl
        
        lg:my-6 lg:h-[30rem] lg:w-[58rem] lg:bg-[#0f212e] lg:rounded-xl lg:flex lg:flex-row lg:justify-between lg:items-center lg:shadow-2xl
        
        xl:my-6 xl:h-[32rem] xl:w-[75rem] xl:bg-[#0f212e] xl:rounded-xl xl:flex xl:flex-row xl:justify-between xl:items-center xl:shadow-2xl
        
        2xl:my-0 2xl:h-full 2xl:w-full 2xl:bg-[#0f212e] 2xl:rounded-xl 2xl:grid grid-cols-12  2xl:shadow-2xl ${
          gameState.reshuffling ? "blur-sm" : ""
        } `}
      >
        <div className="2xl:col-span-3 h-full  w-full ">
          <BetCalculatorMines
            handleClickPickRandomTile={handleClickPickRandomTile}
            bomb={gameState.bomb}
            setGameState={setGameState}
            Bet={betButtonClicked}
            isLoading={isLoadingBet}
            gemCount={gameState.gemCount}
            status={gameState.status}
            handleCashout={handleCashout}
          />
        </div>

        {/* GRID BOX */}
        <div
          
          className={`my-12 grid grid-rows-5 grid-cols-5 gap-y-3 justify-items-center items-center mr-0 h-[20rem] w-[17rem] rounded-2xl  
            
            sm:my-12 sm:grid sm:grid-rows-5 sm:grid-cols-5 sm:gap-y-4 sm:justify-items-center sm:items-center sm:mr-0 sm:h-[21rem] sm:w-[21rem] sm:rounded-2xl
            
            md:grid md:grid-rows-5 md:grid-cols-5 md:gap-y-2 md:justify-items-center md:items-center md:mr-8 md:h-[20rem] md:w-[20rem] md:rounded-2xl
            
            lg:grid lg:grid-rows-5 lg:grid-cols-5 lg:gap-y-3 lg:justify-items-center lg:items-center lg:mr-14 lg:h-[25rem] lg:w-[24rem] lg:rounded-2xl
            
            xl:grid xl:grid-rows-5 xl:grid-cols-5 xl:gap-y-4 xl:justify-items-center xl:items-center xl:mr-24 xl:h-[27rem] xl:w-[28rem] xl:rounded-2xl
            
            2xl:grid 2xl:grid-rows-5 2xl:grid-cols-5  2xl:col-span-9 2xl:m-1  2xl:h-[40rem] 2xl:w-[40rem] 2xl:mx-auto  2xl:gap-2  2xl:rounded-2xl  
            ${gameState.winningPopUp ? "" : ""}  `}
        >
          {/* LOOPING THROUGH THE DIV TO SHOW MINES */}
          {gameState.grid.map((tile, index) => {
            const isCurrentIndexClicked = gameState.clickedIndex == index;
            const isClicked = gameState.clickedIndices?.includes(index);
            const imageSizeClass = isClicked ? "p-5 " : "p-8 opacity-30";
            const bombClicked = gameState.grid.includes("bomb");

            return (
              <button
                disabled={isLoadingBet}
                
                key={index}
                className={`h-[2.8rem] w-[2.8rem] bg-[#2f4553] flex justify-center items-center rounded-sm mineField 
                      
                      sm:h-[3.4rem] sm:w-[3.4rem] sm:bg-[#2f4553] sm:flex sm:justify-center sm:items-center sm:rounded-sm sm:mineField
                      
                      md:h-[3.2rem] md:w-[3.2rem] md:bg-[#2f4553] md:flex md:justify-center md:items-center md:rounded-md md:mineField
                      
                      lg:h-[4.2rem] lg:w-[4.2rem] lg:bg-[#2f4553] lg:flex lg:justify-center lg:items-center lg:rounded-lg lg:mineField
                      
                      xl:h-[4.5rem] xl:w-[4.5rem] xl:bg-[#2f4553] xl:flex xl:justify-center xl:items-center xl:rounded-lg xl:mineField
                      
                      2xl:h-[7.2rem] 2xl:w-[7.4rem] 2xl:bg-[#2f4553] 2xl:flex 2xl:justify-center 2xl:items-center 2xl:rounded-lg hover:cursor-pointer 2xl:mineField 
                      ${isClicked ? "mineClicked  " : ""} ${bombClicked ? "mineClicked " : ""} ${isLoading && isCurrentIndexClicked && gameState.status !== "lost" ? "pulse": ""}
                        `}
                onClick={() => {
                  if (!isClicked) {
                    clickingMine(index);
                  }
                }}
              >
                {tile === "bomb" && (<>
                {isClicked &&   
                <img
                  
                  src={`${bombEffectGif}?t=${Date.now()}`}
                  className="absolute justify-center items-center duration-150"
                  />
                  }
                
                  <img
                    src={bombImg}
                    alt="Bomb"
                    className={` popUp ${imageSizeClass}`}
                  />
              </>  )}
                {tile === "gem" && (
                  <img
                    src={gemImg}
                    alt="Gem"
                    className={` popUp ${imageSizeClass}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* {maxWin && (
        <Winning winningMultiplier={profit} winningAmount={maxWinAmount} />
      )} */}

      {gameState.winningPopUp && (
        <Winning
          winningMultiplier={gameState.profit}
          winningAmount={gameState.winAmount}
        />
      )}

      {gameState.reshuffling && <ReShuffle />}
    </>
  );
}
